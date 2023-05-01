import React, { Component } from 'react';
import { connect } from 'react-redux';
import convert from 'convert-units';

/** Info section for polygons and lines */
class PolygonSection extends Component {
    constructor(props) {
        super(props);
    }

    perimeter = (km) => {
        if (km < 2) {
            return `${this.roundTo(convert(km).from('km').to('m'), 2)} m`
        } else {
            return `${this.roundTo(km, 3)} km`
        }
    }

    area = (m2) => {
        if (m2 < 100000) {
            return `${this.roundTo(m2, 2)} m2`
        } else {
            return `${this.roundTo(convert(m2).from('m2').to('km2'), 3)} km2`
        }
    }
    areaHectares = (m2) => {
        return `${this.roundTo(convert(m2).from('m2').to('ha'), 3)} hectares`
    }
    areaAcres = (m2) => {
        return `${this.roundTo(convert(m2).from('m2').to('ac'), 3)} acres`
    }

    roundTo(num, scale) {
        if (!(("" + num).indexOf("e") !== -1)) {
            return +(Math.round(num + "e+" + scale) + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if (+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }
    render() {
        let { polygon, activePolygon, dispatch } = this.props;
        let open = polygon.uuid === activePolygon;
        return (
            <div className="nav-tray-section">
                <div className={`nav-tray-section-title polygon-section${polygon.type === 'Polygon' ? '' : '-line'}`}
                    onClick={() => {
                        if (open) {
                            dispatch({
                                type: 'CLEAR_ACTIVE_POLYGON',
                            })
                        } else {
                            dispatch({
                                type: 'SET_ACTIVE_POLYGON',
                                payload: polygon.uuid
                            })
                        }
                    }}
                >
                    <h4 style={{
                        marginLeft: '48px',
                        fontWeight: 'bold',
                        width: '140px'
                    }}>{polygon.name}</h4>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '12px',
                        width: '24px',
                        height: '24px',
                        textAlign: 'center'
                    }}>
                        <img
                            src={require('../assets/img/icon-chevron.svg')} alt=""
                            style={{
                                transformOrigin: 'center',
                                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
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
                    }}>
                    <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                        {`${polygon.type === 'Polygon' ? 'Perimeter' : 'Length'}`}
                    </p>
                    <p style={{ marginTop: '6px' }}>{this.perimeter(polygon.length)}</p>
                    {
                        polygon.type === 'Polygon' && (
                            <React.Fragment>
                                <p style={{ marginBottom: '6px', fontWeight: 'bold' }}>Area</p>
                                <p style={{ marginBottom: 0, marginTop: '6px' }}>{this.area(polygon.area)}</p>
                                <p style={{ marginTop: 0, marginBottom: 0 }}>{this.areaHectares(polygon.area)}</p>
                                <p style={{ marginTop: 0 }}>{this.areaAcres(polygon.area)}</p>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ drawings }) => ({
    activePolygon: drawings.activePolygon,
})

export default connect(mapStateToProps)(PolygonSection);
