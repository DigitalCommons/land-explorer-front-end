import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGroupPolygon from "./DataGroupPolygon";
import DataGroupLine from "./DataGroupLine";
import { loadDataGroups } from '../actions/DataGroupActions';

const MapDataGroups = ({ popupVisible, setPopupVisible }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDataGroups());
  }, []);

  const allDataGroups = useSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter(group => activeGroups.includes(group.iddata_groups));

  const dataGroupPolygons = [];
  const dataGroupLines = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup) => {
      if (dataGroup.polygons) {
        dataGroup.polygons.forEach((polygon) => {
          dataGroupPolygons.push(
            <DataGroupPolygon
              key={polygon.uuid}
              polygon={polygon}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />);
        });
      }
      if (dataGroup.lines) {
        dataGroup.lines.forEach((line) => {
          dataGroupLines.push(
            <DataGroupLine
              key={line.uuid}
              line={line}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />);
        });
      }
    });

  return (
    <>
      {dataGroupPolygons}
      {dataGroupLines}
    </>
  );
};

export default MapDataGroups;
