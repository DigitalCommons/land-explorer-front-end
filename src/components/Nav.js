import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavInformation from './NavInformation';
import NavLandData from './NavLandData';
import NavCommunityAssets from './NavCommunityAssets';
import NavDrawingTools from './NavDrawingTools';
import analytics from '../analytics';

const Nav = ({ drawControl }) => {
    const dispatch = useDispatch();
    const { open, active, activeTool } = useSelector(state => state.navigation);
    const { isSnapshot, currentMapId } = useSelector(state => state.mapMeta)
    const readOnly = useSelector(state => state.readOnly.readOnly);
    const currentMarker = useSelector(state => state.markers.currentMarker);
    const activePolygon = useSelector(state => state.drawings.activePolygon);
    const maps = useSelector(state => state.myMaps.maps);
    const type = useSelector(state => state.user.type);

    const council = type == 'council';

    const closeTray = () => {
        dispatch({ type: 'CLOSE_TRAY' });
    }

    const closeNav = () => {
        if (active !== '') {
            dispatch({ type: 'CLOSE_TRAY' });

            setTimeout(() => {
                dispatch({ type: 'CLOSE_NAVIGATION' });
            }, 200);
        } else {
            dispatch({ type: 'CLOSE_NAVIGATION' });
        }
    }

    const clickIcon = (tray) => {
        active === tray ?
            dispatch({ type: 'CLOSE_TRAY' }) :
            dispatch({ type: 'SET_ACTIVE', payload: tray });
    }

    const handleTrashClick = () => {
        if (activeTool === 'edit') {
            const selected = drawControl.draw.getSelected();
            if (selected.features[0]) {
                const id = selected.features[0].id;
                drawControl.draw.delete(id);
                dispatch({
                    type: 'DELETE_POLYGON',
                    payload: id
                })
            }
        } else if (activePolygon !== null) {
            // Delete the active Polygon
            drawControl.draw.delete(activePolygon);
            dispatch({
                type: 'DELETE_POLYGON',
                payload: activePolygon
            })
        } else if (currentMarker !== null) {
            // Delete the current marker
            dispatch({
                type: 'CLEAR_MARKER',
                payload: currentMarker
            })
        }
    }

    return (
        <nav>
            <div className="toggle-nav"
                onClick={() => {
                    analytics.event(analytics._event.SIDE_NAV, 'Open');
                    dispatch({ type: 'TOGGLE_NAVIGATION' })
                }}
            >
            </div>
            <div className="nav-left"
                style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
            >
                <div className="nav-left-icon close"
                    onClick={closeNav}
                />
                <div id="drawing-tools-icon"
                    className={`nav-left-icon drawing-tools ${active === 'Drawing Tools' && 'active'}`}
                    style={{ opacity: readOnly ? .5 : 1 }}
                    onClick={() => {
                        if (!readOnly) {
                            analytics.event(analytics._event.SIDE_NAV + ' Drawing', 'Open');
                            clickIcon('Drawing Tools')
                        }
                    }}
                    data-tip
                    data-for="ttDrawingTools"
                />
                {council ? <div className={`nav-left-icon data-layers ${active === 'Community Assets' && 'active'}`}
                    onClick={() => {
                        analytics.event(analytics._event.SIDE_NAV + ' Community Assets', 'Open');
                        clickIcon('Community Assets')
                    }}
                    data-tip
                    data-for="ttCommunityAssets"
                /> :
                    <div className={`nav-left-icon data-layers ${active === 'Land Data' && 'active'}`}
                        onClick={() => {
                            analytics.event(analytics._event.SIDE_NAV + ' Land Data', 'Open');
                            clickIcon('Land Data')
                        }}
                        data-tip
                        data-for="ttLandData"
                    />}
                <div className={`nav-left-icon info ${active === 'Land Information' && 'active'}`}
                    onClick={() => {
                        analytics.event(analytics._event.SIDE_NAV + ' Land Information', 'Open');
                        clickIcon('Land Information')
                    }}
                    data-tip
                    data-for="ttInfo"
                />
                <div className="nav-left-icon save"
                    data-tip
                    data-for="ttSave"
                    onClick={() => {
                        analytics.event(analytics._event.SIDE_NAV + ' Save', 'Clicked');
                        dispatch({ type: 'OPEN_MODAL', payload: "save" })
                    }}
                />
                <div
                    id="share-icon"
                    className="nav-left-icon share"
                    data-tip
                    data-for="ttShare"
                    style={{
                        opacity: readOnly && !isSnapshot ? .5 : 1
                    }}
                    onClick={() => {
                        if (!readOnly || isSnapshot) {
                            analytics.event(analytics._event.SIDE_NAV + ' Share', 'Clicked');
                            analytics.pageview('/app/my-maps/share');
                            dispatch({ type: 'OPEN_MODAL', payload: "share" })
                            if (currentMapId)
                                dispatch({
                                    type: 'SET_MAP_TO_SHARE',
                                    payload: maps.filter(map => map.map.eid == currentMapId)[0]
                                })
                        }
                    }}
                />
            </div>
            {
                // If not read only, render drawing tools
                !readOnly && (
                    <NavDrawingTools
                        active={active}
                        open={open}
                        onClose={closeTray}
                        handleTrashClick={handleTrashClick}
                        drawControl={drawControl}
                    />
                )
            }
            {council ? <NavCommunityAssets
                open={open}
                active={active}
                onClose={closeTray}
            /> : <NavLandData
                open={open}
                active={active}
                onClose={closeTray}
            />}
            <NavInformation
                open={open && active === 'Land Information'}
                onClose={closeTray}
            />
        </nav>
    );
}

export default Nav;
