import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Draggable from './Draggable';
import PoliticalInfoDisplay from './PoliticalInfoDisplay';

class NavPoliticalData extends Component{
    constructor(props){
        super(props);

        this.state={
            postcode: "",
            council: "",
            ward: "",
            displayInfo: false,
        };

        this.updateInfo     = this.updateInfo.bind(this);
    }

    updateInfo(event){

        event.preventDefault();

        this.state.postcode = document.getElementById("postcodeInput").value;

        let dummydata = {"wgs84_lat": 55.00837170721976, "coordsyst": "G", "shortcuts": {"WMC": 65594, "ward": 152037, "council": 2529}, "wgs84_lon": -1.5819540103700276, "postcode": "NE7 7NB", "easting": 426835, "areas": {"900000": {"parent_area": null, "generation_high": 19, "all_names": {}, "id": 900000, "codes": {}, "name": "House of Commons", "country": "", "type_name": "UK Parliament", "generation_low": 1, "country_name": "-", "type": "WMP"}, "2529": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 2529, "codes": {"ons": "00CJ", "gss": "E08000021", "unit_id": "9784", "local-authority-eng": "NET"}, "name": "Newcastle City Council", "country": "E", "type_name": "Metropolitan district", "generation_low": 1, "country_name": "England", "type": "MTD"}, "42787": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 42787, "codes": {"ons": "E02001714"}, "name": "Newcastle upon Tyne 007", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OMG"}, "11812": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 11812, "codes": {"ons": "01", "gss": "E15000001", "unit_id": "41422"}, "name": "North East", "country": "E", "type_name": "European region", "generation_low": 1, "country_name": "England", "type": "EUR"}, "152037": {"parent_area": 2529, "generation_high": 36, "all_names": {}, "id": 152037, "codes": {"gss": "E05011443", "unit_id": "9752"}, "name": "Dene & South Gosforth", "country": "E", "type_name": "Metropolitan district ward", "generation_low": 33, "country_name": "England", "type": "MTW"}, "108839": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 108839, "codes": {"ons": "E01008320"}, "name": "Newcastle upon Tyne 007C", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OLG"}, "35593": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 35593, "codes": {"ons": "E02001714"}, "name": "Newcastle upon Tyne 007", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OMF"}, "148974": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 148974, "codes": {"nhse": "13T"}, "name": "Newcastle Gateshead", "country": "E", "type_name": "Clinical Commissioning Group", "generation_low": 29, "country_name": "England", "type": "CCG"}, "900001": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 900001, "codes": {}, "name": "European Parliament", "country": "", "type_name": "European Parliament", "generation_low": 1, "country_name": "-", "type": "EUP"}, "65594": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 65594, "codes": {"gss": "E14000832", "unit_id": "25150"}, "name": "Newcastle upon Tyne East", "country": "E", "type_name": "UK Parliament constituency", "generation_low": 13, "country_name": "England", "type": "WMC"}, "74461": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 74461, "codes": {"ons": "E01008320"}, "name": "Newcastle upon Tyne 007C", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OLF"}}, "northing": 568281}
        
        try{   
        //API calls are limited to 50 a day so to use the dummy data for now    
        
        let dataJSON = this.callAPI();

        //let dataJSON = dummydata; 
            
        this.setState({
            council: dataJSON.areas[dataJSON.shortcuts.council].name,
            ward:   dataJSON.areas[dataJSON.shortcuts.ward].name,
            displayInfo: true
        });
            this.error(false);
        }
        catch(e){
            this.error(true);
            this.setState({
                displayInfo: false
            })
        }
        
    }

    callAPI(){
        let datasrc = "https://mapit.mysociety.org/postcode/" + this.state.postcode;
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",datasrc,false);
        Httpreq.send(null);

        /* asynchronous attempt that failed to work
        let xhr = new XMLHttpRequest();
        xhr.open("GET",datasrc,true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4){
                if(xhr.readyState === 200){
                    console.log(xhr.responseText);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function(e){
            console.error(xhr.statusText);
        };

        xhr.send(null); */

        return JSON.parse(Httpreq.responseText); 
    }

    error(errorValue){
        if(errorValue)
            document.getElementById("errorMessage").innerHTML = "Please enter valid postcode";
        else{
            document.getElementById("errorMessage").innerHTML = "";
        }
        
    }

    getMPfromPostcode(){
        let output = "The MP for this postcode is Nick Brown";

        if(this.state.postcode =! "")
            return output;
        else
            return "";
    }

    render(){
        return(
            <NavTray
                title="Political Data"
                open={this.props.open && this.props.active === 'Political Data'}
                onClose={this.props.onClose}
                css = "nav-left-tray-wide"
                >
                <div id = "PoliticalData">
                
                <h4>Political Data Search</h4>
                <h5>Enter postcode below to select an area:</h5>
                

                <form onSubmit={this.updateInfo}>
                    <input id="postcodeInput" type="text" placeholder="Post code" value={this.state.value} />
                    <input id="submit" type="submit" placeholder="Submit"></input>
                </form>
        
                <PoliticalInfoDisplay 
                    postcode = {this.state.postcode}
                    council = {this.state.council}
                    ward = {this.state.ward}
                    displayInfo = {this.state.displayInfo}
                >
                </PoliticalInfoDisplay>

                <p id="errorMessage" style={{}}></p>
                   
                <NavTrayItem draggable={false} title="All Ward Boundaries" layerId='wards-may-2019-boundaries-uk-d9ukjy'/>
                     
                <p id = "copyright-footer">  
                    Contains National Statistics data 
                    <span id = "Copyright"> &#169; </span> 
                    Crown copyright and database right 2019  
                </p>
 
 
                </div>
                </NavTray>
        )
    }
}

export default NavPoliticalData;