import React, { useState } from 'react';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openMap, deleteMap } from '../../actions/MapActions';
import moment from 'moment';
import constants from "../../constants";

export const MyMaps = ({ stage, setStage, closeModal }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState({ id: null, name: null });

  const allMaps = useSelector((state) => state.myMaps.maps);
  const myMaps = allMaps.filter(
    (map) => map.access === constants.MAP_ACCESS_OWNER
  );
  const error = useSelector((state) => state.myMaps.error);

  const close = () => {
    closeModal();
    setStage("list");
    setActive({ id: null, name: null });
  };

  const deleteActiveMap = async () => {
    await dispatch(deleteMap(active.id));
    setStage("list");
  };

  const mapList = myMaps.map((item, i) => {
    const map = item.map;
    const momentDate = moment(map.lastModified).format("DD/MM/YYYY");
    return (
      <tr
        key={`map-${i}`}
        className={`table-map ${active.id === map.eid ? "active" : ""}`}
        onClick={() => {
          setActive({ id: map.eid, name: map.name });
        }}
      >
        <td>{map.name}</td>
        <td style={{ width: "100px" }}>{momentDate}</td>
        <td
          className={`table-icon ${
            map.isSnapshot ? "snapshot-icon" : "map-icon"
          }`}
          title={map.isSnapshot ? "snapshot" : "map"}
        />
        <td
          className="table-icon table-trash"
          onClick={() => setStage("trash")}
        />
      </tr>
    );
  });

  const trash = (
    <>
      <div className="modal-content modal-content-trash">
        {`Delete "${active.name}"? This cannot be undone.`}
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
        <div className="button button-small" onClick={deleteActiveMap}>
          Delete
        </div>
      </div>
    </>
  );

  const load = (
    <>
      <div
        className="modal-content modal-content-trash"
        style={{ textAlign: "center" }}
      >
        {`Load "${active.name}"?`}
        <br />
        <br />
        {/* Skip this prompt if the changes are saved and there's no saving error */}
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
            console.log("Open saved map", active.id);
            dispatch(openMap(active.id));
            close();
          }}
        >
          Ok
        </div>
      </div>
    </>
  );

  const noMaps = (
    <>
      <div className="modal-content modal-content-trash">
        {error ? (
          <p>There was an error loading maps.</p>
        ) : (
          <p>There are no maps.</p>
        )}
      </div>
    </>
  );

  return stage === "trash" ? (
    trash
  ) : stage === "load" ? (
    load
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
                <th style={{ width: "100px" }}>Modified</th>
                <th className="table-icon">Type</th>
                <th className="table-icon"></th>
              </tr>
            </thead>
            <tbody>{mapList}</tbody>
          </table>
        </div>
      </div>
      <div className="modal-buttons">
        <div className="button button-cancel button-small" onClick={close}>
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
    noMaps
  );
};
