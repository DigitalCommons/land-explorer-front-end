import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { openModal } from "../../actions/ModalActions";
import iconChevron from "../../assets/img/icon-chevron.svg";

const MapMenu = () => {
  const isOnline = useAppSelector((state) => state.connectivity.isOnline);
  const { ownMap } = useAppSelector((state) => state.mapMeta);
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (expanded && ref.current && !ref.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [expanded]);

  const clickToOpenModal = (modalId: string, needsConnection = false) => {
    if (needsConnection && !isOnline) return;
    setExpanded(false);
    dispatch(openModal(modalId));
  };

  const needsConnectionClassName = isOnline
    ? "map-menu-option"
    : "map-menu-option-disabled";

  return (
    <div className="map-menu-container" ref={ref}>
      <img
        src={iconChevron}
        alt="map-menu-icon"
        className="map-menu-icon"
        onClick={() => setExpanded(!expanded)}
        draggable={false}
      />
      {expanded && (
        <div className="map-menu">
          <p
            className="map-menu-option"
            onClick={() => clickToOpenModal("newMap")}
          >
            New
          </p>
          <p
            className="map-menu-option"
            onClick={() => clickToOpenModal("openMap")}
          >
            Open
          </p>
          <p
            className={needsConnectionClassName}
            onClick={() => clickToOpenModal("saveCopy", true)}
          >
            Save a copy
          </p>
          <p
            className={needsConnectionClassName}
            onClick={() => clickToOpenModal("saveSnapshot", true)}
          >
            Create Snapshot
          </p>
          {ownMap && (
            <p
              className={needsConnectionClassName}
              onClick={() => clickToOpenModal("emailShare", true)}
            >
              Share
            </p>
          )}
          <p
            className={needsConnectionClassName}
            onClick={() => clickToOpenModal("download", true)}
          >
            Export Shapefile
          </p>
          {ownMap && (
            <p
              className={needsConnectionClassName}
              onClick={() => clickToOpenModal("link", true)}
            >
              Generate GeoJSON
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MapMenu;
