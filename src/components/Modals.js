import React from 'react';
import MyMaps from './modals/MyMaps';
import MySharedMaps from './modals/MySharedMaps';
import OpenMap from './modals/OpenMap';
import NewMap from './modals/NewMap';
import Location from './modals/Location';
import EmailShare from './modals/EmailShare';
import Download from './modals/Download';
import LinkShare from './modals/LinkShare';
import SaveCopy from './modals/SaveCopy';
import SaveSnapshot from './modals/SaveSnapshot';

const Modals = ({ drawControl, redrawPolygons }) => <div>
    <EmailShare />
    <Download />
    <LinkShare />
    <SaveCopy />
    <SaveSnapshot />
    <MyMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
    <MySharedMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
    <OpenMap drawControl={drawControl} redrawPolygons={redrawPolygons} />
    <Location />
    <NewMap drawControl={drawControl} />
</div>

export default Modals;
