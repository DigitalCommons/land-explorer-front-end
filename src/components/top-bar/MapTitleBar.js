import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNewestMap, saveCurrentMap } from '../../actions/MapActions';
import { isMobile } from 'react-device-detect';

const UNTITLED_NAME = 'Untitled Map';

const MapTitleBar = ({ expanded }) => {
    const dispatch = useDispatch();
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const isOnline = useSelector(state => state.connectivity.isOnline);
    const mapName = useSelector((state) => state.map.name);
    const { saving, saveError, lastSaved, isSnapshot, writeAccess } = useSelector((state) => state.mapMeta);
    const [editing, setEditing] = useState(false);

    // We use this variable, rather than directly checking currentMapId, so that the 'add title'
    // prompt doesn't flicker between a new map being saved then loaded.
    const [isNewMap, setIsNewMap] = useState(currentMapId === null);

    // Distinct possibilities for the saving status
    let status;
    let popupOnHover = false;
    if (isSnapshot || !writeAccess || isMobile) {
        // We don't use the read-only Redux state, because we still want to show the saving status
        // if we have no internet connection
        status = 'noEdit';
    } else if (isNewMap) {
        status = 'editingNewMap';
    } else if (saveError) {
        status = 'error';
        popupOnHover = true;
    } else if (saving) {
        status = 'savingNoError';
    } else {
        status = 'saved';
        popupOnHover = true;
    }

    const saved = status === 'saved';
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        setIsNewMap(currentMapId === null);
        setPopupVisible(false);
    }, [currentMapId]);

    const ref = useRef();

    const onClickOutside = async () => {
        setIsNewMap(false);

        // Set name to untitled if blank
        if (ref.current.textContent.trim() === '') {
            ref.current.textContent = UNTITLED_NAME;
        }

        const name = ref.current.textContent;

        setEditing(false);

        // Remove highlighting of text
        window.getSelection().removeAllRanges();

        console.log('Set map name', name);
        dispatch({
            type: 'SET_MAP_NAME',
            payload: name
        });

        await dispatch(saveCurrentMap(false, false, name));
        if (currentMapId === null) {
            // If this was a new map, load the map that we just saved
            dispatch(loadNewestMap());
        }
    }

    const canEditTitle = writeAccess && isOnline;

    const onClickTitle = () => {
        if (canEditTitle) {
            setEditing(true);
        }
    }

    const onFocusTitle = () => {
        if (canEditTitle && ref.current.textContent === UNTITLED_NAME) {
            // Select all text if untitled
            window.getSelection().selectAllChildren(ref.current);
        }
    }

    return <div className={`map-title-bar${expanded ? "" : " map-title-bar-collapsed"}`}>
        <p
            id={"map-name"}
            ref={ref}
            className={`map-name-text ${editing && 'editable'}`}
            spellCheck={false}
            contentEditable={canEditTitle}
            onClick={onClickTitle}
            onFocus={onFocusTitle}
            onBlur={() => {
                if (editing) // check that user wasn't just cycling through elements with Tab
                    onClickOutside();
            }}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    setEditing(true);
                    e.target.blur();
                }
                //limit map name to 30 characters
                const mapName = document.getElementById("map-name");
                if (mapName.textContent.length > 30) {
                    mapName.textContent = mapName.textContent.slice(0, 30);
                    document.execCommand('selectAll', false, null);
                    document.getSelection().collapseToEnd();
                }

            }}
            suppressContentEditableWarning={true}
        >
            {mapName || UNTITLED_NAME}
        </p>
        <div>
            {status === 'noEdit' &&
                <p className="map-saving-text">
                    {`${isMobile ? 'Mobile ' : ''}read-only mode`}
                </p>
            }
            {status === 'editingNewMap' &&
                <p className="map-saving-text" onClick={onClickTitle}>
                    {editing || !canEditTitle || 'add title to save map'}
                </p>
            }
            {status === 'savingNoError' &&
                <p className="map-saving-text">
                    saving...
                </p>
            }
            {popupOnHover &&
                <p
                    className={`map-saving-text ${saved && 'saved'}`}
                    onMouseOver={() => setPopupVisible(true)}
                    onMouseOut={() => setPopupVisible(false)}
                >
                    {saved && 'changes saved!'}
                    {(status === 'error') && (saving ? 'unsaved changes, retrying...' : 'unable to save')}
                </p>
            }
            {popupVisible &&
                <div style={{
                    position: "relative",
                    bottom: "-120px",
                    left: "100px"
                }}>
                    <div className="popup-content-saving">
                        <div className="popup-saving-icon-container">
                            {saved ?
                                <img src={require("../../assets/img/icon-tick--green.svg")} /> :
                                <img src={require("../../assets/img/icon-cross.svg")} />}
                        </div>
                        <div className="popup-saving-text-container">
                            <p className="popup-saving-text">
                                {!saved && 'Unable to save'}
                                {!saved && <br />}
                                {`Last saved ${lastSaved}`}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default MapTitleBar;
