import React, { useState } from 'react';
import { useSelector } from "react-redux";
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import DataGroupToggle from './common/DataGroupToggle';
import Draggable from './Draggable';

const DataLayersContainer = ({ children, title }) => {
    const [expanded, setExpanded] = useState(true);

    return <div>
        <div className='data-section-title-container'>
            <h3 className='data-section-title' onClick={() => setExpanded(!expanded)}>{title}</h3>
            <p className='expand-button' onClick={() => setExpanded(!expanded)}>{expanded ? "v" : "<"}</p>
        </div>
        {expanded && children}
    </div>
}

const NavLandData = ({ open, active, onClose }) => {
    const userGroupTitlesAndIDs = useSelector((state) => state.dataGroups.userGroupTitlesAndIDs);
    const dataGroupTitlesAndIDs = useSelector((state) => state.dataGroups.dataGroupTitlesAndIDs);
    const activeGroups = useSelector((state) => state.dataGroups.activeGroups);

    const userGroupSections = userGroupTitlesAndIDs && userGroupTitlesAndIDs.map(userGroup =>
        <DataLayersContainer title={userGroup.title} key={userGroup.id}>
            {dataGroupTitlesAndIDs && dataGroupTitlesAndIDs.filter(dataGroup => dataGroup.userGroupId == userGroup.id).map(dataGroup =>
                <DataGroupToggle title={dataGroup.title} layerId={dataGroup.id} active={activeGroups.includes(dataGroup.id)} key={dataGroup.id} />)}
        </DataLayersContainer>
    )

    return (
        <NavTray
            title="Data Layers"
            open={open && active === 'Land Data'}
            onClose={onClose}
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
            {userGroupSections}
        </NavTray>
    );
}

export default NavLandData;