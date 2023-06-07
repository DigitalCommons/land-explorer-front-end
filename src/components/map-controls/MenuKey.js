import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Key from './Key';

const MenuKey = ({ open, setOpen }) => {
    const landDataLayers = useSelector((state) => state.mapLayers.landDataLayers);
    const dispatch = useDispatch();

    const layers = {
        "provisional-agricultural-land-ab795l": {
            name: "Agricultural land classification",
            data: {
                "Grade 1": "#3980d0",
                "Grade 2": "#10c3ef",
                "Grade 3": "#0fb08f",
                "Grade 4": "#f9f90d",
                "Grade 5": "#c9748e",
                "Exclusion": "#b2b2b2",
                "Non Agricultural": "#b2b2b2",
                "Urban": "#b2b2b2"
            }
        },
        "national-forest-estate-soil-g-18j2ga": {
            name: "National forest estate soils",
            data: {
                "Basin Bog": "#b2b2b2",
                "Brown Earth": "#895c44",
                "Calcareous Soil": "#4de600",
                "Eroded Bog": "#9c9c9c",
                "Flat or Raised Bogs": "#686868",
                "Flushed Blanket Bog": "#333333",
                "Ground-water Gley": "#014ea6",
                "Ironpan Soil": "#fc5601",
                "Littoral Soil": "#fefe67",
                "Man-made Soil": "#ab00e5",
                "Peaty Surface-water Gley": "#0085a8",
                "Podzol": "#e60002",
                "Skeletal Soil": "#e7e600",
                "Surface-water Gley": "#00a8e7",
                "Unflushed Blanket Bog": "#010101",
                "Valley Complex": "#8d8ead",
            }
        },
        "historic-flood-map-5y05ao": {
            name: "Historic flood map",
            data: {
                "Flood": "hsl(196, 80%, 70%)"
            }
        },
        "sites-of-special-scientific-i-09kaq4": {
            name: "Sites of scientific interest",
            data: {
                "Site of Interest": "hsl(1, 40%, 40%)",
            }
        },
        "special-protection-areas-engl-71pdjg": {
            name: "Special protection areas",
            data: {
                "Protection Area": "hsl(51, 40%, 40%)"
            }
        },
        "special-areas-of-conservation-bm41zr": {
            name: "Special areas of conservation",
            data: {
                "Conservation Area": "hsl(101, 40%, 40%)",
            }
        },
        "ncc-brownfield-sites": {
            name: "Brownfield",
            data: {
                "Brownfield": "hsla(0, 24%, 20%, 0.5)"
            }
        },
        "local-authority-greenbelt-bou-9r44t6": {
            name: "Greenbelt",
            data: {
                "Greenbelt": "hsla(113, 97%, 50%, 0.4)"
            }
        },
        "wards-cu4dni": {
            name: "Wards",
            data: {
                "Wards": "hsl(245, 100%, 50%)"
            }
        },
        "county-4ef4ik": {
            name: "Counties",
            data: {
                "Counties": "hsla(113, 97%, 50%, 0.4)"
            }
        },
        "westminster_const_region-8r33ph": {
            name: "Westminster Constituencies",
            data: {
                "Constituencies": "hsl(183, 97%, 50%)"
            }
        },
        "district_borough_unitary_regi-bquzqt": {
            name: "Councils",
            data: {
                "Councils": "hsl(56, 97%, 50%)"
            }
        },
        "parish": {
            name: "Parishes",
            data: {
                "Parish": "hsl(280,60%,70%)"
            }
        },
        "devolved-powers": {
            name: "Devolved Powers",
            data: {
                "Devolved Powers": "hsl(320,97%,50%)"
            }
        }
    }

    const keys = landDataLayers.map((layer, i) =>
        <Key
            key={i}
            name={layers[layer].name}
            data={layers[layer].data}
        />
    );

    return <>
        <div className="menu-key-button"
            onClick={() => setOpen(!open)}
        />
        {isMobile ?
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'scroll',
                background: 'white',
                zIndex: 10000000,
                display: open && landDataLayers.length ? 'block' : 'none',
            }}>
                <div style={{
                    position: 'fixed',
                    top: '24px',
                    right: '24px',
                }}
                    onClick={() => setOpen(false)}
                >
                    <img
                        style={{ height: '16px', width: '16px' }}
                        src={require('../../assets/img/icon-close-new.svg')}
                        alt=""
                    />
                </div>
                <div style={{
                    height: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '24px',
                    paddingTop: '0px'
                }}>
                    <h2>Layer Key</h2>
                    {keys.length ? keys : <div>No Layers selected</div>}
                </div>
            </div>
            :
            <div style={{
                display: open && landDataLayers.length ? 'block' : 'none'
            }}>
                <div className="tooltip-menu tooltip-menu-key modal"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <div style={{
                        height: '300px',
                        width: '220px',
                        overflowY: 'scroll',
                        padding: '6px'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Layer Key</h3>
                        {keys.length ? keys : <div>No Layers selected</div>}
                    </div>
                </div>
            </div>
        }
    </>;
}

export default MenuKey;
