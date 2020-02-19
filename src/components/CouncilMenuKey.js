import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Key from "./Key";

class CouncilMenuKey extends Component {
  constructor(props) {
    super(props);
    this.layers = {
      "Community Space": {
        name: "Community Space",
        data: {
          "Community Space": "red"
        }
      },
      Public: {
        name: "Public",
        data: {
          Public: "blue"
        }
      },
      "Sports Leisure": {
        name: "Sports Leisure",
        data: {
          "Sports Leisure": "purple"
        }
      },
      "Community Business": {
        name: "Community Business",
        data: {
          "Community Business": "green"
        }
      },
      "Business Night": {
        name: "Business Night",
        data: {
          "Business Night": "brown"
        }
      },
      "Voluntary Sector": {
        name: "Voluntary Sector",
        data: {
          "Voluntary Sector": "grey"
        }
      }
    };
  }

  renderKeys() {
    return this.props.activeCommunityAssets.map((layer, i) => {
      return (
        <Key
          key={i}
          name={this.layers[layer].name}
          data={this.layers[layer].data}
        />
      );
    });
  }

  render() {
    let { open, activeCommunityAssets } = this.props;
    let mobile = window.innerWidth < 480;
    return mobile ? (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "scroll",
          background: "white",
          zIndex: 10000000,
          display: open && activeCommunityAssets.length ? "block" : "none"
        }}
      >
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px"
          }}
          onClick={() => {
            this.props.dispatch({ type: "CLOSE_MENU_COUNCILKEY" });
          }}
        >
          <img
            style={{ height: "16px", width: "16px" }}
            src={require("../assets/img/icon-close-new.svg")}
            alt=""
          />
        </div>
        <div
          style={{
            height: "100%",
            width: "100%",
            boxSizing: "border-box",
            padding: "24px",
            paddingTop: "0px"
          }}
        >
          <h2>Layer Key</h2>
          {activeCommunityAssets && this.renderKeys()}
          {activeCommunityAssets.length === 0 && <div>No Layers selected</div>}
        </div>
      </div>
    ) : (
      <div
        style={{
          display: open && activeCommunityAssets.length ? "block" : "none"
        }}
      >
        <div
          className="tooltip-menu tooltip-menu-layers tooltip-menu-key modal"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div
            style={{
              height: "300px",
              width: "220px",
              overflowY: "scroll",
              padding: "6px"
            }}
          >
            <h3 style={{ marginTop: 0 }}>Layer Key</h3>
            {activeCommunityAssets && this.renderKeys()}
            {activeCommunityAssets.length === 0 && (
              <div>No Layers selected</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

CouncilMenuKey.propTypes = {
  open: PropTypes.bool.isRequired
};

const mapStateToProps = ({ menu, communityAssets }) => ({
  open: menu.councilKey,
  activeCommunityAssets: communityAssets.activeCommunityAssets
});

export default connect(mapStateToProps)(CouncilMenuKey);
