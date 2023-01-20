import React, { Component } from 'react';
import { connect } from 'react-redux';
import Save from './modals/Save';
import MyMaps from './modals/MyMaps';
import MySharedMaps from './modals/MySharedMaps';
import OpenMap from './modals/OpenMap';
import NewMap from './modals/NewMap';
import Location from './modals/Location';
import EmailShare from './modals/EmailShare';
import Download from './modals/Download';
import LinkShare from './modals/LinkShare';

class Modals extends Component {
    render() {
        let { drawControl, redrawPolygons } = this.props;
        return (
            <div>
                <EmailShare />
                <Download />
                <LinkShare />
                <Save />
                <MyMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
                <MySharedMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
                <OpenMap drawControl={drawControl} redrawPolygons={redrawPolygons} />
                <Location />
                <NewMap drawControl={drawControl} />
            </div>
        );
    }
}

Modals.propTypes = {};

export default connect(null)(Modals);
