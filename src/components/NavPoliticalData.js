import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Draggable from './Draggable';

class NavPoliticalData extends Component{
    constructor(props){
        super(props);
    }

    getPostcodeFromAddress(address){
        //lookup(address);

        return "NE77NB";
    }

    getCouncilFromPostcode(postcode){
        let council = "";

        let datasrc = "https://mapit.mysociety.org/postcode/" + postcode;

        //let Httpreq = new XMLHttpRequest(); // a new request
        //Httpreq.open("GET",datasrc,false);
        //Httpreq.send(null);
        //let dataJSON = JSON.parse(Httpreq.responseText); 

        let dataJSON = {"wgs84_lat": 55.00837170721976, "coordsyst": "G", "shortcuts": {"WMC": 65594, "ward": 152037, "council": 2529}, "wgs84_lon": -1.5819540103700276, "postcode": "NE7 7NB", "easting": 426835, "areas": {"900000": {"parent_area": null, "generation_high": 19, "all_names": {}, "id": 900000, "codes": {}, "name": "House of Commons", "country": "", "type_name": "UK Parliament", "generation_low": 1, "country_name": "-", "type": "WMP"}, "2529": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 2529, "codes": {"ons": "00CJ", "gss": "E08000021", "unit_id": "9784", "local-authority-eng": "NET"}, "name": "Newcastle City Council", "country": "E", "type_name": "Metropolitan district", "generation_low": 1, "country_name": "England", "type": "MTD"}, "42787": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 42787, "codes": {"ons": "E02001714"}, "name": "Newcastle upon Tyne 007", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OMG"}, "11812": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 11812, "codes": {"ons": "01", "gss": "E15000001", "unit_id": "41422"}, "name": "North East", "country": "E", "type_name": "European region", "generation_low": 1, "country_name": "England", "type": "EUR"}, "152037": {"parent_area": 2529, "generation_high": 36, "all_names": {}, "id": 152037, "codes": {"gss": "E05011443", "unit_id": "9752"}, "name": "Dene & South Gosforth", "country": "E", "type_name": "Metropolitan district ward", "generation_low": 33, "country_name": "England", "type": "MTW"}, "108839": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 108839, "codes": {"ons": "E01008320"}, "name": "Newcastle upon Tyne 007C", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OLG"}, "35593": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 35593, "codes": {"ons": "E02001714"}, "name": "Newcastle upon Tyne 007", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OMF"}, "148974": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 148974, "codes": {"nhse": "13T"}, "name": "Newcastle Gateshead", "country": "E", "type_name": "Clinical Commissioning Group", "generation_low": 29, "country_name": "England", "type": "CCG"}, "900001": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 900001, "codes": {}, "name": "European Parliament", "country": "", "type_name": "European Parliament", "generation_low": 1, "country_name": "-", "type": "EUP"}, "65594": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 65594, "codes": {"gss": "E14000832", "unit_id": "25150"}, "name": "Newcastle upon Tyne East", "country": "E", "type_name": "UK Parliament constituency", "generation_low": 13, "country_name": "England", "type": "WMC"}, "74461": {"parent_area": null, "generation_high": 36, "all_names": {}, "id": 74461, "codes": {"ons": "E01008320"}, "name": "Newcastle upon Tyne 007C", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OLF"}}, "northing": 568281}

        council = dataJSON.areas[2529].name;

        console.log(council);

        return council;
    }

    render(){
        return(
            <NavTray
                title="Political Data"
                open={this.props.open && this.props.active === 'Political Data'}
                onClose={this.props.onClose}
                css = "nav-left-tray-wide"
                >
                    <p>The council for {this.getPostcodeFromAddress("133 Benton Park Road")} is {this.getCouncilFromPostcode(this.getPostcodeFromAddress("133 Benton Park Road"))}</p>
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