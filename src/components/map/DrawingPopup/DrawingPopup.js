import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveObjectToMap,
  editMapObjectInfo,
} from "../../../actions/MapActions";
import { editDataGroupObjectInfo } from "../../../actions/DataGroupActions";
import PopupContent from "./PopupContent/PopupContent";
import PopupCopy from "./PopupCopy/PopupCopy";
import PopupStatus from "./PopupStatus/PopupStatus";
import { saveObjectToDataGroup } from "../../../actions/DataGroupActions"; 

export const MODE = {
  DISPLAY: "display",
  COPY: "copy",
  SAVING: "saving",
  SUCCESS: "success",
  ERROR: "error",
  EDIT: "edit",
};

/***
 * @param object the drawn object that the popup is associated with
 * @param type 'marker', 'polygon' or 'line'
 * @param source 'map' or 'datagroup'
 * @param closeDescription callback when the popup is closed
 * @returns a React popup element
 ***/

const DrawingPopup = ({ object, type, source, closeDescription }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(MODE.DISPLAY);
  const [name, setName] = useState(object.name);
  const [copyTo, setCopyTo] = useState("map");
  const [description, setDescription] = useState(object.description);
  const [selectedMap, setSelectedMap] = useState();
  const [selectedDataGroup, setSelectedDataGroup] = useState();

  const { readOnly, isOnline, currentMapId, allMaps, allDataGroups } =
    useSelector((state) => ({
      readOnly: state.readOnly.readOnly,
      isOnline: state.connectivity.isOnline,
      currentMapId: state.mapMeta.currentMapId,
      allMaps: state.myMaps.maps,
      allDataGroups: state.dataGroups.dataGroupTitlesAndIDs,
    }));

  // Logic for determining maps and data groups based on source
  let maps, dataGroups;
  if (source === "map") {
    // All editable maps that aren't this one
    maps = allMaps.filter(
      (map) => !map.map.isSnapshot && map.map.eid !== currentMapId
    );
    dataGroups = allDataGroups;
  } else {
    // All editable maps
    maps = allMaps.filter((map) => !map.map.isSnapshot);
    // All data groups apart from this one
    dataGroups = allDataGroups.filter(
      (dataGroup) => dataGroup.id !== object.data_group_id
    );
  }

  // Functions for copying objects to map and data group
  const copyObjectToMap = async (object, map) => {
    const data = regulariseObjectData(object);
    const success = await dispatch(saveObjectToMap(type, data, map.map.eid));
    setMode(success ? MODE.SUCCESS : MODE.ERROR);
  };

  const copyObjectToDataGroup = async (object, dataGroup) => {
    const data = regulariseObjectData(object);
    const success = await dispatch(
      saveObjectToDataGroup(type, data, dataGroup.id)
    );
    setMode(success ? MODE.SUCCESS : MODE.ERROR);
  };

  const editObjectInfo = async (newName, newDescription) => {
    if (source === "map") {
      dispatch(
        editMapObjectInfo(
          type,
          currentMapId,
          object.uuid,
          newName,
          newDescription
        )
      );
    } else {
      dispatch(
        editDataGroupObjectInfo(
          type,
          object.data_group_id,
          object.uuid,
          newName,
          newDescription
        )
      );
      // TODO: indicate in the popup when this fails to save?
    }
  };

  const close = () => {
    closeDescription();
    setMode(MODE.DISPLAY);
    setSelectedMap(undefined);
    setSelectedDataGroup(undefined);
  };

  return (
    <div className="popup-content">
      <div className="popup-close" onClick={close} />
      <PopupContent
        mode={mode}
        name={name}
        description={description}
        setMode={setMode}
        setDescription={setDescription}
        editObjectInfo={editObjectInfo}
        setName={setName}
        isOnline={isOnline}
        readOnly={readOnly}
      />
      {mode === MODE.COPY && (
        <PopupCopy
          object={object}
          copyTo={copyTo}
          setCopyTo={setCopyTo}
          selectedMap={selectedMap}
          setSelectedMap={setSelectedMap}
          selectedDataGroup={selectedDataGroup}
          setSelectedDataGroup={setSelectedDataGroup}
          maps={maps}
          dataGroups={dataGroups}
          copyObjectToMap={copyObjectToMap}
          copyObjectToDataGroup={copyObjectToDataGroup}
          setMode={setMode}
          type={type}
        />
      )}
      {mode === MODE.SAVING && <PopupStatus mode={MODE.SAVING} />}
      {mode === MODE.SUCCESS && (
        <PopupStatus
          mode={MODE.SUCCESS}
          selectedMap={selectedMap}
          selectedDataGroup={selectedDataGroup}
          type={type}
        />
      )}
      {mode === MODE.ERROR && (
        <PopupStatus
          mode={MODE.ERROR}
          selectedMap={selectedMap}
          selectedDataGroup={selectedDataGroup}
          type={type}
        />
      )}
    </div>
  );
};

const regulariseObjectData = (object) => ({
  name: object.name,
  description: object.description,
  vertices:
    object.vertices?.coordinates ||
    object.data?.geometry?.coordinates ||
    undefined,
  center:
    object.center?.coordinates ||
    object.center ||
    object.coordinates ||
    object.location.coordinates,
  length: object.length || undefined,
  area: object.area || undefined,
});

export default DrawingPopup;
