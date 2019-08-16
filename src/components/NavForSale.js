import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavTray from './NavTray';
import NavTraySection from './common/NavTraySection';
import MarkerSection from './MarkerSection';
import PolygonSection from './PolygonSection';


class NavForSale extends Component {

    render() {
        let { onClose, polygons, activePolygon, markers, currentMarker } = this.props;
        return (
            <NavTray
                title="For Sale"
                open={this.props.open}
                onClose={onClose}
            >
                {
                    (polygons.length || markers.length) ? (
                        <React.Fragment>
                            {this.renderMarkers()}
                            {this.renderPolygons()}
                        </React.Fragment>
                    ): (
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '24px'
                        }}>
                            No markers or polygons
                        </div>
                    )
                }
            </NavTray>
        );
    }
}

const mapStateToProps = ({ information, informationSections, markers, drawings }) => ({
    information,
    informationSections,
    markers: markers.markers,
    currentMarker: markers.currentMarker,
    polygons: drawings.polygons,
    activePolygon: drawings.activePolygon,
});

export default connect(mapStateToProps)(NavForSale);