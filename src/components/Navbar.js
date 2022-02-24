import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { findDOMNode } from "react-dom";
import ReactTooltip from "react-tooltip";
import MenuMain from "./MenuMain";
import MenuProfile from "./MenuProfile";
import MenuLayers from "./MenuLayers";
import ProfilePic from "./ProfilePic";
import { connect } from "react-redux";
import MenuKey from "./MenuKey";
import CouncilMenuKey from "./CouncilMenuKey";
import analytics from "../analytics";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { user } = this.props;
    return !this.props.limited && user.populated ? (
      <div>
        <div className="navbar-shadow"></div>
        <div className="navbar">
          <Link to="/app/">
            <div className="logo">
            </div>
          </Link>
          <div className="search-bar">
            <span id="geocoder"></span>
          </div>
          <div className="navbar-right">
            <div className="navbar--username">{`${user.firstName} ${user.lastName}`}</div>
            <ProfilePic initials={user.initials} />
            <div
              className="hamburger"
              id="hamburger"
              onClick={() => {
                analytics.event(analytics._event.MAIN_MENU, "Open");
                this.props.dispatch({ type: "TOGGLE_MENU_MAIN" });
              }}
            >
            </div>
          </div>
        </div>
        <MenuMain />
        <MenuProfile />
        <MenuLayers />

        {user.type == "council" ? <CouncilMenuKey /> : <MenuKey />}
      </div>
    ) : (
      <div>
        <div className="navbar-shadow"></div>
        <div className="navbar">
          <Link to="/app/">
            <div className="big-logo"></div>
          </Link>
          <div className="navbar-right">
            <div
              className="hamburger"
              id="hamburger"
              onClick={() => {
                analytics.event(analytics._event.MAIN_MENU, "Open");
                this.props.dispatch({ type: "TOGGLE_MENU_MAIN" });
              }}
            >
              <img src={require("../assets/img/icon-hamburger.svg")} alt="" />
            </div>
          </div>
        </div>
        <MenuMain limited={true} />
      </div>
    );
  }
}

Navbar.propTypes = {
  limited: PropTypes.bool
};

const mapStateToProps = ({ user }) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  user: user
});

export default connect(mapStateToProps)(Navbar);
