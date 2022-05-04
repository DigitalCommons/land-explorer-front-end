import React, { Component } from 'react';
import { connect } from 'react-redux';
import Save from './modals/Save';
import MyMaps from './modals/MyMaps';
import MySharedMaps from './modals/MySharedMaps';
import Share from './modals/Share/Share';
import NewMap from './modals/NewMap';
import Location from './modals/Location';

class Modals extends Component {
    render() {
        let { drawControl, redrawPolygons } = this.props;
        return (
            <div>
                <Share />
                <Save />
                <MyMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
                <MySharedMaps drawControl={drawControl} redrawPolygons={redrawPolygons} />
                <Location />
                <NewMap drawControl={drawControl} />
            </div>
        );
    }
}

Modals.propTypes = {};

export default connect(null)(Modals);
