import React, {Component} from 'react';
import NavTray from './NavTray';
import axios from 'axios';
import constants from "../constants";
import {getAuthHeader,getToken} from "../components/Auth";
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';
import CouncilNavTrayItem from './common/CouncilNavTrayItem';
import { confirmAlert } from 'react-confirm-alert';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

    }

    state = {
        file: null
    }

    setFile(e){
        let file = e.target.files[0]

        this.setState({file: file})
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
                    title="Voluntary Sector"
                    draggable={true}
                    layerId= "Voluntary Sector">
                </CouncilNavTrayItem>
                
                <label>
                Upload CSV
                <input type="file" name="file" accept=".csv" onChange={(e) => this.setFile(e)} />
                </label>

                <input type="button" value="Upload file" onClick={this.uploadWithFormData} />
            </NavTray>
        );
    }

     uploadWithFormData(){
        const formData = new FormData();
        formData.append("file", this.state.file);
       
        this.submitForm(formData, (msg) => console.log(msg));
    }

    submitForm(data, setResponse) {
        // axios({
        //     url: `${constants.ROOT_URL}/upload`,
        //     method: 'POST',
        //     data: data,
        //     headers: {
        //         'Content-Type': "multipart/form-data",
        //         authorization: getToken()
        //     }
        // })
        axios.post(`${constants.ROOT_URL}/api/council/upload`, data, getAuthHeader())
            .then((response) => {
                setResponse(response.data);
            }).catch((error) => {
                setResponse("error");
            })
       }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);