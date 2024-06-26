import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMap } from "../../actions/MapActions";
import moment from "moment";
import constants from "../../constants";

// TODO: share some common code with MyMaps
export const MySharedMaps = ({ stage, setStage, closeModal }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState({ id: null, name: null });

  const allMaps = useSelector((state) => state.myMaps.maps);
  const sharedMaps = allMaps.filter(
    (map) => map.access !== constants.MAP_ACCESS_OWNER
  );
  const error = useSelector((state) => state.myMaps.error);

  const mapList = sharedMaps.map((item, i) => {
    const map = item.map;
    const momentDate = moment(map.lastModified).format("DD/MM/YYYY");
    return (
      <tr
        key={`map-${i}`}
        className={`table-map shared-maps__table ${
          active.id === map.eid ? "active" : ""
        }`}
        onClick={() => {
          setActive({ id: map.eid, name: map.name });
        }}
      >
        <td>
          <i
            className={
              item.access === constants.MAP_ACCESS_READ_ONLY
                ? "shared-maps__read-icon"
                : "shared-maps__write-icon"
            }
          ></i>{" "}
          {map.name}
        </td>
        <td>{momentDate}</td>
        <td
          className={`table-icon ${
            map.isSnapshot ? "snapshot-icon" : "map-icon"
          }`}
          title={map.isSnapshot ? "snapshot" : "map"}
        />
      </tr>
    );
  });

  return stage === "load" ? (
    <>
      <div
        className="modal-content modal-content-trash"
        style={{ textAlign: "center" }}
      >
        {`Load "${active.name}"?`}
        <br />
        <br />
        Any unsaved changes to the current map will be lost.
      </div>
      <div className="modal-buttons">
        <div
          className="button button-cancel button-small"
          onClick={() => {
            setStage("list");
          }}
        >
          Cancel
        </div>
        <div
          className="button button-small"
          onClick={() => {
            console.log("Open shared map", active.id);
            dispatch(openMap(active.id));
            closeModal();
            setStage("list");
          }}
        >
          Ok
        </div>
      </div>
    </>
  ) : mapList.length ? (
    <>
      <div className="modal-content">
        <div
          style={{
            height: "165px",
            overflowY: "scroll",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Modified</th>
                <th className="table-icon">Type</th>
              </tr>
            </thead>
            <tbody>{mapList}</tbody>
          </table>
        </div>
      </div>
      <div className="modal-buttons">
        <div className="button button-cancel button-small" onClick={closeModal}>
          Cancel
        </div>
        <div
          className="button button-small"
          onClick={() => {
            if (active !== null) {
              setStage("load");
            }
          }}
        >
          Open
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="modal-content modal-content-trash">
        {error ? (
          <p>There was an error loading shared maps.</p>
        ) : (
          <p>There are no shared maps.</p>
        )}
      </div>
    </>
  );
};
