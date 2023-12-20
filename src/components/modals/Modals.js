import React from 'react';
import MyMaps from './MyMaps';
import MySharedMaps from './MySharedMaps';
import OpenMap from './OpenMap';
import NewMap from './NewMap';
import Location from './Location';
import EmailShare from './EmailShare';
import Download from './Download';
import LinkShare from './LinkShare';
import SaveCopy from './SaveCopy';
import SaveSnapshot from './SaveSnapshot';
import FeedbackForm from './FeedbackForm';

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
    <FeedbackForm />
</div>

export default Modals;
