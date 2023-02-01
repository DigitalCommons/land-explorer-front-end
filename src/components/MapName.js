import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MapName = ({ }) => {
    const [editing, setEditing] = useState(false);

    const dispatch = useDispatch();
    const mapName = useSelector((state) => state.map.name);

    const ref = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (editing && ref.current && !ref.current.contains(e.target)) {
                setEditing(false);
                dispatch({
                    type: "SET_MAP_NAME",
                    payload: ref.current.textContent
                });
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [editing])

    return <p
        ref={ref}
        className={`map-name-text ${editing && "editable"}`}
        contentEditable={editing}
        onClick={() => setEditing(true)}
    >{mapName || "Untitled Map"}</p>

}

export default MapName;