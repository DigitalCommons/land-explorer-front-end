import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MarkerSection = ({ marker }) => {
    const dispatch = useDispatch();
    const currentMarker = useSelector((state) => state.markers.currentMarker);

    const roundTo = (num, scale) => {
        if (!(("" + num).indexOf("e") !== -1)) {
            return +(Math.round(num + "e+" + scale) + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = "";
            if (+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }

    const open = marker.uuid === currentMarker;

    return (
        <div className="left-pane-tray-section">
            <div
                className="left-pane-tray-section-title marker-section"
                onClick={() => {
                    if (open) {
                        dispatch({
                            type: 'CLEAR_CURRENT_MARKER'
                        });
                    } else {
                        dispatch({
                            type: 'SET_CURRENT_MARKER',
                            payload: marker.uuid
                        });
                    }
                }}
            >
                <h4
                    style={{
                        marginLeft: '48px',
                        fontWeight: 'bold',
                        width: '140px',
                        overflowWrap: 'anywhere'
                    }}
                >
                    {marker.name}
                </h4>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '12px',
                        width: '24px',
                        height: '24px',
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={require('../../assets/img/icon-chevron.svg')}
                        alt=""
                        style={{
                            transformOrigin: 'center',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    />
                </div>
            </div>
            <div
                style={{
                    overflow: open ? '' : 'hidden',
                    height: open ? 'auto' : '0',
                    padding: open ? '24px' : '0',
                    borderBottom: open ? '1px solid #ccc' : 'none',
                    background: '#78838f',
                    color: 'white'
                }}
            >
                <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>Position</p>
                <p style={{ marginTop: 0, marginBottom: 0 }}>{`Longitude:  ${roundTo(
                    marker.coordinates[0],
                    6
                )}`}</p>
                <p style={{ marginTop: 0 }}>{`Latitude: ${roundTo(marker.coordinates[1], 6)}`}</p>
            </div>
        </div>
    );
};


export default MarkerSection;
