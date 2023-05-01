import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { loadNewestMap, saveCurrentMap } from '../actions/MapActions';

const UNTITLED_NAME = 'Untitled Map';

const MapTitleBar = () => {
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
            // Select all text if untitled
            if (ref.current.textContent === UNTITLED_NAME) {
                window.getSelection().selectAllChildren(ref.current);
            }

            setEditing(true);
        }
    }

    return <div className="map-title-bar">
        <p
            ref={ref}
            className={`map-name-text ${editing && 'editable'}`}
            spellCheck={false}
            contentEditable={canEditTitle}
            onClick={onClickTitle}
            onBlur={onClickOutside}
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    e.target.blur();
                }
            }}
            suppressContentEditableWarning={true}
        >
            {mapName || UNTITLED_NAME}
        </p>
        <div>
            {status === 'noEdit' &&
                <p className="map-saving-text">
                    {`${isMobile ? 'mobile ' : ''}read-only mode`}
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
                                <img src={require("../assets/img/icon-tick--green.svg")} /> :
                                <img src={require("../assets/img/icon-cross.svg")} />}
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
