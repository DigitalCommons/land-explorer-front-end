import React, {Component} from 'react';
import NavTray from './NavTray';
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';
import CouncilNavTrayItem from './common/CouncilNavTrayItem';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <NavTray
                title="Community Assets"
                open={this.props.open && this.props.active === 'Community Assets'}
                onClose={this.props.onClose}
                css = {'nav-left-tray-community-assets'}
            >
               <CouncilNavTrayItem 
                    title="Community Space"
                    draggable={true}
                    layerId= "Community Space">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Public"
                    draggable={true}
                    layerId= "Public">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Sports Leisure"
                    draggable={true}
                    layerId= "Sports Leisure">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Community Business"
                    draggable={true}
                    layerId= "Community Business">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Business Night"
                    draggable={true}
                    layerId= "Business Night">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Business"
                    draggable={true}
                    layerId= "Business">
                </CouncilNavTrayItem>
                <CouncilNavTrayItem 
                    title="Voluntary Sector"
                    draggable={true}
                    layerId= "Voluntary Sector">
                </CouncilNavTrayItem>
                <p><span style = {{backgroundColor: 'red'}}>--</span>: Community Space</p>
                <p><span style = {{backgroundColor: 'blue'}}>--</span>: Public</p>
                <p><span style = {{backgroundColor: 'purple'}}>--</span>: Sports Leisure</p>
                <p><span style = {{backgroundColor: 'green'}}>--</span>: Community Business</p>
                <p><span style = {{backgroundColor: 'brown'}}>--</span>: Business Night</p>
                <p><span style = {{backgroundColor: 'grey'}}>--</span>: Business</p>
                <p><span style = {{backgroundColor: 'orange'}}>--</span>: Voluntary Sector</p>

            </NavTray>
        );
    }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);