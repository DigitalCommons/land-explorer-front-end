import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import DataGroupPolygon from "./DataGroupPolygon";
import DataGroupLine from "./DataGroupLine";
import { loadDataGroups } from "../../actions/DataGroupActions";

type Props = {
  popupVisible: any;
  setPopupVisible: (id: any) => void;
};

const MapDataGroups = ({ popupVisible, setPopupVisible }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDataGroups());
  }, []);

  const allDataGroups = useAppSelector((state) => state.dataGroups.dataGroupsData);
  const activeGroups = useAppSelector((state) => state.dataGroups.activeGroups);
  const activeDataGroups = allDataGroups.filter((group: any) =>
    activeGroups.includes(group.id)
  );

  const dataGroupPolygons: React.ReactElement[] = [];
  const dataGroupLines: React.ReactElement[] = [];

  activeDataGroups &&
    activeDataGroups.forEach((dataGroup: any) => {
      const dataGroupColour = dataGroup.hex_colour;

      // Note that datagroup markers are added to the Markers component, not here, to allow for
      // clustering

      if (dataGroup.polygons) {
        dataGroup.polygons.forEach((polygon: any) => {
          dataGroupPolygons.push(
            <DataGroupPolygon
              key={polygon.uuid}
              polygon={polygon}
              access={dataGroup.access}
              dataGroupColour={dataGroupColour}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />
          );
        });
      }
      if (dataGroup.lines) {
        dataGroup.lines.forEach((line: any) => {
          dataGroupLines.push(
            <DataGroupLine
              key={line.uuid}
              line={line}
              access={dataGroup.access}
              dataGroupColour={dataGroupColour}
              setPopupVisible={setPopupVisible}
              popupVisible={popupVisible}
            />
          );
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
