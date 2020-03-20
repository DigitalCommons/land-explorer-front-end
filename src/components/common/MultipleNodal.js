import React, { Component } from "react";
import { Marker } from "react-mapbox-gl";
import { connect } from "react-redux";
import axios from "axios";
import { getAuthHeader } from "../Auth";
import constants from "../../constants";
import Swal from "sweetalert2";

class MultipleNodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBoxState: false,
      infoBox: "close",
      viewCompany: ""
    };

    this.openPopup = this.openPopup.bind(this);
    this.displayInfoIfActive = this.displayInfoIfActive.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.readMore = this.readMore.bind(this);
    this.readLess = this.readLess.bind(this);
    this.readCompany = this.readCompany.bind(this);
    this.deleteNodal = this.deleteNodal.bind(this);
    this.editNodal = this.editNodal.bind(this);
  }

  getImgByCategoryId(id) {
    const redMarker = require("../../assets/img/sign-post-red.svg");
    const blueMarker = require("../../assets/img/sign-post-blue.svg");
    const purpleMarker = require("../../assets/img/sign-post-purple.svg");
    const greenMarker = require("../../assets/img/sign-post-green.svg");
    const brownMarker = require("../../assets/img/sign-post-brown.svg");
    const greyMarker = require("../../assets/img/sign-post-grey.svg");
    const orangeMarker = require("../../assets/img/sign-post-orange.svg");

    switch (id) {
      case 0:
        return orangeMarker;
      case 1:
        return redMarker;
      case 2:
        return blueMarker;
      case 3:
        return purpleMarker;
      case 4:
        return greenMarker;
      case 5:
        return brownMarker;
      case 6:
        return orangeMarker;
      default:
        return greyMarker;
    }
  }

  readMore() {
    this.setState({ checkBoxState: true });
  }

  readLess() {
    this.setState({ checkBoxState: false });
  }

  openPopup() {
    this.props.dispatch({
      type: "TURN_ON_NODAL",
      payload: {
        id: this.props.id
      }
    });
    this.setState({ infoBox: "list" });
  }

  closePopup() {
    this.props.dispatch({
      type: "CLOSE_NODALS"
    });
    this.setState({ infoBox: "close" });
  }

  readCompany(id) {
    this.setState({ viewCompany: id, infoBox: "company" });
  }

  deleteNodal(e) {
    Swal.fire({
      icon: "warning",
      title: "Confirm Deleting the asset",
      text: `If you delete ${this.props.name} ,all other assets at this adddres will be deleted! `,
      confirmButtonText: "DELETE",
      cancelButtonText: "I want to keep the asset!",
      showCancelButton: true,
      showLoaderOnConfirm: true,

      preConfirm: () => {
        axios
          .post(
            `${constants.ROOT_URL}/api/council/markers/delete/`,
            {
              id: this.props.id
            },
            getAuthHeader()
          )
          .then(response => {
            //       let {id} = props;
            // this.setState({ id:this.props.id-- });
            // console.log(this.props.id)

            this.props.refresh();

            this.props.removeNodal(this.props.id);

            // this.props.dispatch({
            //     type: 'DELETE_NODAL',
            //     payload: {
            //         id:     this.props.id,
            //     }
            // });

            Swal.fire({
              icon: "success",
              title: "Changes have been saved"
            });
          })
          .catch(err => {
            console.log(err);
            console.trace(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! Please try again later."
            });
          });
      }
    });
  }

  editNodal(companyData) {
    Swal.fire({
      icon: "warning",
      title: "Edit the asset",
      text: `Editing ${companyData.name}.`,

      html: ` 
              <label for="nameForm">Name</label>
              <input id="nameForm" value='${companyData.name}'>
              </input>
              <br />
              <label for = "address_1Form"> Address Line 1 : </label>
              <input id="address_1Form" value='${companyData.address_1}'></input>
                        
              <br /><label for = "address_2form" >Address Line 2 : </label><input id="address_2Form" value='${companyData.address_2}'></input>
              
              <br /><label for = "address_3form">Address Line 3 : </label><input id="address_3Form" value='${companyData.address_3}'></input>
              
              <br /><label for = "address_4form">Address Line 4 : </label><input id="address_4Form" value='${companyData.address_4}'></input>
              
              <br /><label for = "categoryForm">Category</label><input id="categoryForm" value='${companyData.category_id}'></input>
              <br/>
              <label for = "sub_categoryForm">Sub Category :</label><input id="sub_categoryForm" value='${companyData.sub_category}'></input>
              <br /><label for = "typeForm"> Type :</label><input
                id="typeForm"
                value='${companyData.type}'
              ></input>
             <br /><label for = "community_spaceForm">Community Form :</label><input
                id="community_spaceForm"
                value='${companyData.community_space}'
              ></input>
              <br /><label for = "council_facilityForm">Council Facility</label><input
                id="council_facilityForm"
                value='${companyData.council_facility}'
              ></input>
              <br /><label for = "notesForm">Notes :</label><input
                id="notesForm"
                value='${companyData.notes}'
              ></input>
              <br /><label for = "web_addressForm">Website</label><input
                id="web_addressForm"
                value='${companyData.web_address}'
              ></input>
              <br /><label for = "emailForm"> Email :</label><input
                id="emailForm"
                value='${companyData.email}'
              ></input>
             <br /><label for = "telephoneForm">Telephone: </label> <input
                id="telephoneForm"
                value='${companyData.telephone}'
              ></input>
              <br /><label for = "contact_nameForm"> Contact Name : </label><input
                id="contact_nameForm"
                value='${companyData.contact_name}'
                placeholder=${companyData.addressLine4}
              ></input>
              <br /><label for = "space_avaiableForm">Space Avaiable</label><input
                id="space_availableForm"
                value='${companyData.space_available}'
              ></input>
              <br /><label for = "specialist_spaceForm"> Specialist Space : </label><input
                id="specialist_spaceForm"
                value='${companyData.specialist_spaces}'
              ></input>
              <br /><label for ="kitchenForm"> Kitchen : </label><input
                id="kitchenForm"
                value='${companyData.kitchen}'
              ></input>
              <br /><label for = "disabled_accessForm"> Disabled Access</label><input
                id="disabled_accessForm"
                value='${companyData.disabled_access}'
              ></input>
              <br /><label for ="price_rangeForm"> Price Range</label><input
                id="price_rangeForm"
                value='${companyData.price_range}'
              ></input>
            `,

      confirmButtonText: "Submit Edit",
      cancelButtonText: "Discard edits",
      showCancelButton: true,
      showLoaderOnConfirm: true,

      preConfirm: () => {
        axios
          .post(
            `${constants.ROOT_URL}/api/council/markers/update/`,
            {
              id: this.props.id,
              name: document.getElementById("nameForm").value,
              address_1: document.getElementById("address_1Form").value,
              address_2: document.getElementById("address_2Form").value,
              address_3: document.getElementById("address_3Form").value,
              address_4: document.getElementById("address_4Form").value,
              postcode: document.getElementById("postcodeForm").value,
              category_id: document.getElementById("categoryForm").value,
              sub_category: document.getElementById("sub_categoryForm").value,
              type: document.getElementById("typeForm").value,
              community_space: document.getElementById("community_spaceForm")
                .value,
              council_facility: document.getElementById("council_facilityForm")
                .value,
              notes: document.getElementById("notesForm").value,
              web_address: document.getElementById("web_addressForm").value,
              email: document.getElementById("emailForm").value,
              telephone: document.getElementById("telephoneForm").value,
              contact_name: document.getElementById("contact_nameForm").value,
              space_available: document.getElementById("space_availableForm")
                .value,
              specialist_spaces: document.getElementById(
                "specialist_spacesForm"
              ).value,
              kitchen: document.getElementById("kitchenForm").value,
              disabled_access: document.getElementById("disabled_accessForm")
                .value,
              price_range: document.getElementById("price_rangeForm").value
            },
            getAuthHeader()
          )
          .then(response => {
            this.props.refresh();

            //this.props.updateNodal(this.props.id);

            Swal.fire({
              icon: "success",
              title: "Changes have been saved"
            });
          });
      }
    });
  }

  displayInfoIfActive() {
    if (this.props.id !== this.props.activeNodal) return;

    const closeIcon = require("../../assets/img/icon-close-new.svg");
    const DeleteCommunityAsset = require("../../assets/img/icon-trash-red.svg");
    let editIcon = require("../../assets/img/icon-drawing-tools.svg");

    let buttonStyle = {
      color: "grey",
      textDecoration: "underline"
    };

    let closeStyle = {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      position: "absolute",
      top: "12px",
      cursor: "pointer",
      right: "12px",
      zIndex: "5"
    };

    //Show list of companies in this marker
    if (this.state.infoBox === "list") {
      return (
        <div className="nodal">
          <span onClick={this.closePopup} src={closeIcon} className="Closebtn">
            &#x2715;
          </span>
          <h2 className="nodal_title">Organisations:</h2>
          <div className="nodal_body">
            {this.props.councilData.map((el, key) => {
              return (
                <div
                  className="nodal_body_content"
                  onClick={() => this.readCompany(key)}
                >
                  &#8594; {el.name}
                </div>
              );
            })}
          </div>
          <div className="SpeechBubble"></div>
        </div>
      );
    }

    //Show the selected company from the list

    if (this.state.infoBox === "company") {
      if (this.state.viewCompany !== "") {
        let companyData = this.props.councilData[this.state.viewCompany];
        return (
          <div className="nodal">
            <span
              onClick={this.closePopup}
              src={closeIcon}
              className="Closebtn"
            >
              &#x2715;
            </span>
            <div
              onClick={() => this.setState({ infoBox: "list" })}
              className="popup-buttons left"
            >
              <h2>&#8592; back</h2>
            </div>
            <h2 className="nodal_title">
              {companyData.name}
              <button
                className="DeleteCommunityAsset"
                onClick={() => this.deleteNodal(companyData.id)}
              >
                <img
                  src={DeleteCommunityAsset}
                  alt="DeleteCommunityAsset"
                  key={this.props.id}
                />
              </button>
              <button
                onClick={() => this.editNodal(companyData)}
                className="EditIcon"
              >
                <img src={editIcon} />
              </button>
            </h2>
            {this.state.checkBoxState ? (
              <div>
                <table className="w3-table">
                  <tbody>
                    <tr>
                      <td valign="top">Address:</td>
                      <td>
                        {companyData.address_1} {companyData.address_2}{" "}
                        {companyData.address_3} {companyData.address_4}
                      </td>
                    </tr>
                    <tr>
                      <td>Postcode:</td>
                      <td>{companyData.postcode}</td>
                    </tr>
                    <tr>
                      <td>Category:</td>
                      <td>{companyData.sub_category}</td>
                    </tr>
                    <tr>
                      <td>Type:</td>
                      <td>{companyData.type}</td>
                    </tr>
                    <tr>
                      <td>Ward:</td>
                      <td>{companyData.ward}</td>
                    </tr>
                    {companyData.contact_name &&
                    companyData.contact_name !== "" ? (
                      <tr>
                        <td>Contact name:</td>
                        <td>{companyData.contact_name}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.telephone && companyData.telephone !== "" ? (
                      <tr>
                        <td>Phone:</td>
                        <td>{companyData.telephone}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.email && companyData.email !== "" ? (
                      <tr>
                        <td>Email:</td>
                        <td>{companyData.email}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.web_address &&
                    companyData.web_address !== "" ? (
                      <tr>
                        <td>Website:</td>
                        <td>{companyData.web_address}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.community_space &&
                    companyData.community_space !== "" ? (
                      <tr>
                        <td>Community space:</td>
                        <td>{companyData.community_space}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.council_facility &&
                    companyData.council_facility !== "" ? (
                      <tr>
                        <td>Council facility:</td>
                        <td>{companyData.council_facility}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.notes && companyData.notes !== "" ? (
                      <tr>
                        <td>Notes:</td>
                        <td>{companyData.notes}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.space_available &&
                    companyData.space_available !== "" ? (
                      <tr>
                        <td>Space Available:</td>
                        <td>{companyData.space_available}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.specialist_spaces &&
                    companyData.specialist_spaces !== "" ? (
                      <tr>
                        <td>Specialist Space:</td>
                        <td>{companyData.specialist_spaces}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.kitchen && companyData.kitchen !== "" ? (
                      <tr>
                        <td>Kitchen:</td>
                        <td>
                          {companyData.kitchen === "Y"
                            ? "Yes"
                            : companyData.kitchen}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.disabled_access &&
                    companyData.disabled_access !== "" ? (
                      <tr>
                        <td>Disabled Access:</td>
                        <td>
                          {companyData.disabled_access === "Y"
                            ? "Yes"
                            : companyData.disabled_access}
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {companyData.price_range &&
                    companyData.price_range !== "" ? (
                      <tr>
                        <td>Price Range:</td>
                        <td>{companyData.price_range}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
                <div onClick={this.readLess} className="popup-buttons left">
                  <h2>Read less</h2>
                </div>
              </div>
            ) : (
              <div>
                <table className="w3-table">
                  <tbody>
                    <tr>
                      <td valign="top">Address:</td>
                      <td>
                        {companyData.address_1} {companyData.address_2}{" "}
                        {companyData.address_3} {companyData.address_4}
                      </td>
                    </tr>
                    <tr>
                      <td>Postcode:</td>
                      <td>{companyData.postcode}</td>
                    </tr>
                    <tr>
                      <td>Category:</td>
                      <td>{companyData.sub_category}</td>
                    </tr>
                    <tr>
                      <td>Type:</td>
                      <td>{companyData.type}</td>
                    </tr>
                    <tr>
                      <td>Ward:</td>
                      <td>{companyData.ward}</td>
                    </tr>
                  </tbody>
                </table>
                <div onClick={this.readMore} className="popup-buttons left">
                  <h2>Read More</h2>
                </div>
              </div>
            )}
            <div className="SpeechBubble"></div>
          </div>
        );
      }
    }
  }

  render() {
    console.log("Making multiple marker with type: " + this.props.type);
    return (
      <Marker
        style={{ zIndex: this.props.id === this.props.activeNodal ? 4 : 3 }}
        coordinates={this.props.coordinates}
      >
        {this.displayInfoIfActive()}
        <img
          alt="Marker on map"
          src={this.getImgByCategoryId(this.props.category_id)}
          style={{ height: "30px", width: "30px" }}
          onClick={this.openPopup}
        />
      </Marker>
    );
    /*
        if(this.props.councilData[0].id === this.props.activeNodal)
        {
           
            return (<Marker 
                        style = { { zIndex: this.props.councilData[0].id === this.props.activeNodal? 4 : 3}}  
                        coordinates = {[this.props.councilData[0].Lng,this.props.councilData[0].Lat]}
                    >
                    {this.displayInfoIfActive()}
                    <img 
                        alt="Marker in Map"
                        src={this.getImgByType(this.props.councilData[0].Layer.slice(0,1))} 
                        style={{height: '30px',width: '30px', }}
                    />
                    </Marker>);
        }
        else
            return (<Marker 
                        style = { { zIndex: this.props.councilData[0].id === this.props.activeNodal? 4 : 3}}  
                        coordinates = {[this.props.councilData[0].Lng,this.props.councilData[0].Lat]}
                        onClick={this.openPopup}
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            alt="Marker in Map"
                            src={this.getImgByType(this.props.councilData[0].Layer.slice(0,1))} 
                            style={{height: '30px',width: '30px', }}
                        />
                    </Marker>);
                    */
  }
}

const mapStateToProps = ({ nodal, map }) => ({
  activeNodal: nodal.activeNodal,
  zoom: map.zoom
});

export default connect(mapStateToProps)(MultipleNodal);
