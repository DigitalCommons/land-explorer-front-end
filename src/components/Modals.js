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

const Modals = () => <div>
    <EmailShare />
    <Download />
    <LinkShare />
    <SaveCopy />
    <SaveSnapshot />
    <MyMaps />
    <MySharedMaps />
    <OpenMap />
    <Location />
    <NewMap />
</div>

export default Modals;
