import React from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Draggable from './Draggable';

const NavForSale = ({ open, active, onClose }) => (
    <NavTray
        title="For Sale"
        open={open && active === 'For Sale'}
        onClose={onClose}
    >
        <Draggable itemHeight={58}>
            <NavTrayItem draggable={true} title="Agricultural land classification" layerId='provisional-agricultural-land-ab795l'/>
            <NavTrayItem draggable={true} title="National Forest Estate soils" layerId='national-forest-estate-soil-g-18j2ga'/>
            <NavTrayItem draggable={true} title="Historic flood map" layerId='historic-flood-map-5y05ao'/>
            <NavTrayItem draggable={true} title="Sites of special scientific interest" layerId='sites-of-special-scientific-i-09kaq4'/>
            <NavTrayItem draggable={true} title="Special protection areas" layerId='special-protection-areas-engl-71pdjg'/>
            <NavTrayItem draggable={true} title="Special areas of conservation" layerId='special-areas-of-conservation-bm41zr'/>
            <NavTrayItem draggable={true} title="Greenbelt" layerId='local-authority-greenbelt-bou-9r44t6'/>
            <NavTrayItem draggable={true} title="Brownfield" layerId='ncc-brownfield-sites'/>
        </Draggable>
   </NavTray>
);

export default NavForSale;