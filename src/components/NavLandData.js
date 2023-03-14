import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import DataToggle from './common/DataToggle';
import Draggable from './Draggable';
import { toggleDataGroup } from '../actions/DataGroupActions';

const DataLayersContainer = ({ children, title }) => {
    const [expanded, setExpanded] = useState(true);

    return <div>
        <div className='data-section-title' onClick={() => setExpanded(!expanded)}>
            <h4 style={{ fontWeight: 'bold' }}>{title}</h4>
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
                    src={require('../assets/img/chevron.svg')} alt=""
                    style={{
                        transformOrigin: 'center',
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            </div>
        </div>
        {expanded && children}
    </div>
}

const NavLandData = ({ open, active, onClose }) => {
    const dispatch = useDispatch();

    const userGroupTitlesAndIDs = useSelector((state) => state.dataGroups.userGroupTitlesAndIDs);
    const dataGroupTitlesAndIDs = useSelector((state) => state.dataGroups.dataGroupTitlesAndIDs);
    const activeGroups = useSelector((state) => state.dataGroups.activeGroups);
    const displayProperties = useSelector((state) => state.landOwnership.displayActive);

    const description = <p className='land-data-description'>
        Want to add your own data to Land Explorer? <a href="https://landexplorer.coop/#contact" target="_blank">Contact Us.</a>
    </p>

    return (
        <NavTray
            title="Data Layers"
            open={open && active === 'Land Data'}
            onClose={onClose}
            header={description}
        >
            <DataLayersContainer title={"Land Data"}>
                <Draggable itemHeight={58}>
                    <NavTrayItem draggable={true} title="Agricultural land classification" layerId='provisional-agricultural-land-ab795l' />
                    <NavTrayItem draggable={true} title="National Forest Estate soils" layerId='national-forest-estate-soil-g-18j2ga' />
                    <NavTrayItem draggable={true} title="Historic flood map" layerId='historic-flood-map-5y05ao' />
                    <NavTrayItem draggable={true} title="Sites of special scientific interest" layerId='sites-of-special-scientific-i-09kaq4' />
                    <NavTrayItem draggable={true} title="Special protection areas" layerId='special-protection-areas-engl-71pdjg' />
                    <NavTrayItem draggable={true} title="Special areas of conservation" layerId='special-areas-of-conservation-bm41zr' />
                    <NavTrayItem draggable={true} title="Greenbelt" layerId='local-authority-greenbelt-bou-9r44t6' />
                    <NavTrayItem draggable={true} title="Brownfield" layerId='ncc-brownfield-sites' />
                </Draggable>
            </DataLayersContainer>
            <DataLayersContainer title={"Land Ownership"}>
                <DataToggle
                    title={"Land Registry"}
                    active={displayProperties}
                    onToggle={() => dispatch({ type: "TOGGLE_PROPERTY_DISPLAY" })}
                />
            </DataLayersContainer>
            <DataLayersContainer title={"Administrative Boundaries"}>
                <NavTrayItem draggable={false} title="Wards" layerId='wards-cu4dni' />
                <NavTrayItem draggable={false} title="Parishes" layerId='parish' />
                <NavTrayItem draggable={false} title="Local Councils" layerId='district_borough_unitary_regi-bquzqt' />
                <NavTrayItem draggable={false} title="Parliamentary Constituencies" layerId='westminster_const_region-8r33ph' />
                <NavTrayItem draggable={false} title="Devolved Powers" layerId='devolved-powers' />
                <NavTrayItem draggable={false} title="Counties" layerId='county-4ef4ik' />
            </DataLayersContainer>
            {userGroupTitlesAndIDs && userGroupTitlesAndIDs.map(userGroup =>
                <DataLayersContainer title={userGroup.title} key={userGroup.id}>
                    {dataGroupTitlesAndIDs && dataGroupTitlesAndIDs.filter(dataGroup => dataGroup.userGroupId == userGroup.id).map(dataGroup =>
                        <DataToggle
                            title={dataGroup.title}
                            active={activeGroups.includes(dataGroup.id)}
                            key={dataGroup.id}
                            onToggle={() => dispatch(toggleDataGroup(dataGroup.id))}
                        />)}
                </DataLayersContainer>
            )}
        </NavTray>
    );
}

export default NavLandData;
