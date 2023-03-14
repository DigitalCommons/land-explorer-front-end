import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadNewestMap, saveCurrentMap } from '../actions/MapActions';

const UNTITLED_NAME = 'Untitled Map';

const MapTitleBar = () => {
    const dispatch = useDispatch();
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const mapName = useSelector((state) => state.map.name);
    const saving = useSelector((state) => state.mapMeta.saving);
    const saveError = useSelector((state) => state.mapMeta.saveError);
    const lastSaved = useSelector((state) => state.mapMeta.lastSaved);
    const [editing, setEditing] = useState(false);

    // We use this variable, rather than directly checking currentMapId, so that the 'add title'
    // prompt doesn't flicker between a new map being saved then loaded.
    const [isNewMap, setIsNewMap] = useState(currentMapId === null);

    // Distinct possibilities for the saving status
    const saved = !isNewMap && !saving && !saveError;
    const savingNoError = !isNewMap && saving && !saveError;
    const unableToSave = !isNewMap && saveError;

    const popupOnHover = saved || unableToSave;
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
        if (currentMapId !== null) {
            // Load the map that was just saved
            dispatch(loadNewestMap());
        }
    }

    const onClickTitle = () => {
        // Select all text if untitled
        if (ref.current.textContent === UNTITLED_NAME) {
            window.getSelection().selectAllChildren(ref.current);
        }

        setEditing(true);
    }

    return <div className="map-title-bar">
        <p
            ref={ref}
            className={`map-name-text ${editing && 'editable'}`}
            spellCheck={false}
            contentEditable={true}
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
            {isNewMap &&
                <p className="map-saving-text" onClick={onClickTitle}>
                    {editing || 'add title to save map'}
                </p>
            }
            {savingNoError &&
                <p className={"map-saving-text"}>
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
                    {unableToSave && (saving ? 'unsaved changes, retrying...' : 'unable to save')}
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
