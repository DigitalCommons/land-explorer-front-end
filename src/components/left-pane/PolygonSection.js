import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import convert from 'convert-units';

const PolygonSection = ({ polygon }) => {
    const dispatch = useDispatch();
    const activePolygon = useSelector((state) => state.drawings.activePolygon);

    const perimeter = (km) => {
        if (km < 2) {
            return `${roundTo(convert(km).from('km').to('m'), 2)} m`;
        } else {
            return `${roundTo(km, 3)} km`;
        }
    };

    const area = (m2) => {
        if (m2 < 100000) {
            return `${roundTo(m2, 2)} m2`;
        } else {
            return `${roundTo(convert(m2).from('m2').to('km2'), 3)} km2`;
        }
    };

    const areaHectares = (m2) => {
        return `${roundTo(convert(m2).from('m2').to('ha'), 3)} hectares`;
    };

    const areaAcres = (m2) => {
        return `${roundTo(convert(m2).from('m2').to('ac'), 3)} acres`;
    };

    const roundTo = (num, scale) => {
        if (!(`${num}`.includes('e'))) {
            return +(Math.round(`${num}e+${scale}`) + `e-${scale}`);
        } else {
            const arr = `${num}`.split('e');
            let sig = '';
            if (+arr[1] + scale > 0) {
                sig = '+';
            }
            return +(Math.round(+arr[0] + `e${sig}${+arr[1] + scale}`) + `e-${scale}`);
        }
    };

    const open = polygon.uuid === activePolygon;

    return (
        <div className="left-pane-tray-section">
            <div
                className={`left-pane-tray-section-title polygon-section${polygon.type === 'Polygon' ? '' : '-line'
                    }`}
                onClick={() => {
                    if (open) {
                        dispatch({
                            type: 'CLEAR_ACTIVE_POLYGON'
                        });
                    } else {
                        dispatch({
                            type: 'SET_ACTIVE_POLYGON',
                            payload: polygon.uuid
                        });
                    }
                }}
            >
                <h4
                    style={{
                        marginLeft: '48px',
                        fontWeight: 'bold',
                        width: '140px'
                    }}
                >
                    {polygon.name}
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
                    padding: open ? '12px 24px' : '0',
                    borderBottom: open ? '1px solid #ccc' : 'none',
                    background: '#78838f',
                    color: 'white'
                }}
            >
                <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                    {`${polygon.type === 'Polygon' ? 'Perimeter' : 'Length'}`}
                </p>
                <p style={{ marginTop: '6px' }}>{perimeter(polygon.length)}</p>
                {polygon.type === 'Polygon' && (
                    <>
                        <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>Area</p>
                        <p style={{ marginBottom: 0, marginTop: '6px' }}>{area(polygon.area)}</p>
                        <p style={{ marginTop: 0, marginBottom: 0 }}>{areaHectares(polygon.area)}</p>
                        <p style={{ marginTop: 0 }}>{areaAcres(polygon.area)}</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PolygonSection;
