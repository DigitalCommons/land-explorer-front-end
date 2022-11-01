import React, { Component } from "react";
import NavTray from "./NavTray";
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import { turnOnLayer, turnOffLayer } from "../actions/CommunityAssetsActions";
import { connect } from "react-redux";
import CouncilNavTrayItem from "./common/CouncilNavTrayItem";
import Swal from "sweetalert2";

class NavCommunityAssets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };
  }

  setFile(e) {
    let file = e.target.files[0];

    this.setState({
      file: file,
      loaded: 0
    });
  }

  onChangeHandler = event => {
    let file = event.target.files[0];
    this.setState({
      file: file,
      loaded: 0
    });
  };

  render() {
    return (
      <NavTray
        title="Community Assets"
        open={this.props.open && this.props.active === "Community Assets"}
        onClose={this.props.onClose}
        css={"nav-left-tray-community-assets"}
      >
        <CouncilNavTrayItem
          title="Community Space"
          draggable={true}
          layerId="Community Space"
        ></CouncilNavTrayItem>
        <CouncilNavTrayItem
          title="Public"
          draggable={true}
          layerId="Public"
        ></CouncilNavTrayItem>
        <CouncilNavTrayItem
          title="Sports Leisure"
          draggable={true}
          layerId="Sports Leisure"
        ></CouncilNavTrayItem>
        <CouncilNavTrayItem
          title="Community Business"
          draggable={true}
          layerId="Community Business"
        ></CouncilNavTrayItem>
        <CouncilNavTrayItem
          title="Business Night"
          draggable={true}
          layerId="Business Night"
        ></CouncilNavTrayItem>
        <CouncilNavTrayItem
          title="Voluntary Sector"
          draggable={true}
          layerId="Voluntary Sector"
        ></CouncilNavTrayItem>

        <div style={{ margin: 10 }}>
          <label style={{ padding: 10 }}>
            Upload CSV
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={this.onChangeHandler}
            />
          </label>

          <button
            onClick={this.uploadWithFormData}
            className="button button-medium"
            style={{ borderWidth: 0 }}
          >
            Upload file
          </button>
        </div>
      </NavTray>
    );
  }

  get = function (obj, key) {
    return key.split(".").reduce(function (o, x) {
      return typeof o == "undefined" || o === null ? o : o[x];
    }, obj);
  };

  uploadWithFormData = () => {
    const formData = new FormData();
    formData.append("file", this.state.file);

    Swal.fire({
      icon: "warning",
      title: "Confirm replacing data",
      text:
        "This action will replace existing data with the new uploaded document.",
      confirmButtonText: "Submit",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios
          .post(
            `${constants.ROOT_URL}/api/council/upload/replace/`,
            formData,
            getAuthHeader()
          )
          .then(response => {
            if (response.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text:
                  response.data.rows_affected +
                  " rows of new data added to the system. Please refresh page to reload new data."
              });
            }
          })
          .catch(error => {
            let err_msg =
              this.get(error, "response.data.Message") === undefined
                ? "There has been an error. Please try again later."
                : error.response.data.Message;
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err_msg
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    //this.submitForm(formData, (msg) => console.log(msg));
  };

  submitForm(data, setResponse) {
    axios
      .post(
        `${constants.ROOT_URL}/api/council/upload/replace/`,
        data,
        getAuthHeader()
      )
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        setResponse("error");
      });
  }
}

export default connect(null, { turnOnLayer, turnOffLayer })(NavCommunityAssets);
