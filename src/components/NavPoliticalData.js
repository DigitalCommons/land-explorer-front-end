import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Draggable from './Draggable';

class NavPoliticalData extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <NavTray
                title="Political Data"
                open={this.props.open && this.props.active === 'Political Data'}
                onClose={this.props.onClose}
                >
                    <Draggable itemHeight={58}>
                        <NavTrayItem draggable={true} title="MP Boundaries" layerId='provisional-agricultural-land-ab795l'/>
                        <NavTrayItem draggable={true} title="Council Boundaries" layerId='national-forest-estate-soil-g-18j2ga'/>
                        <NavTrayItem draggable={true} title="Last Election Results" layerId='historic-flood-map-5y05ao'/>
                     </Draggable>
                </NavTray>
        )
    }
}

export default NavPoliticalData;