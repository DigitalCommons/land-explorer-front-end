import React from "react";
import { Link } from "react-router-dom";
import MenuMain from "./MenuMain";
import MenuProfile from "./MenuProfile";
import MenuLayers from "./MenuLayers";
import MapTitleBar from "./MapTitleBar";
import MapMenu from "./MapMenu";
import ProfilePic from "./ProfilePic";
import { useDispatch, useSelector } from "react-redux";
import MenuKey from "./MenuKey";
import Geocoder from "./Geocoder";
import analytics from "../analytics";

const Navbar = ({ limited }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return !limited && user.populated ? (
    <div>
      <div className="navbar-shadow"></div>
      <div className="navbar">
        <Link to="/app">
          <div className="logo" />
        </Link>
        <div className="navbar-middle">
          <div className="navbar-map-interactions">
            <MapTitleBar />
            <MapMenu />
          </div>
          <div className="search-bar">
            <Geocoder bbox={[-11.535645, 49.109838, 3.493652, 63.144431]} />
          </div>
        </div>
        <div className="navbar-right">
          <div className="navbar--username">{`${user.firstName} ${user.lastName}`}</div>
          <ProfilePic initials={user.initials} />
          <div
            className="hamburger"
            id="hamburger"
            onClick={() => {
              analytics.event(analytics._event.MAIN_MENU, "Open");
              dispatch({ type: "TOGGLE_MENU_MAIN" });
            }}
          >
          </div>
        </div>
      </div>
      <MenuMain />
      <MenuProfile />
      <MenuLayers />
      <MenuKey />
    </div>
  ) : (
    <div>
      <div className="navbar-shadow"></div>
      <div className="navbar">
        <Link to="/app">
          <div className="logo" />
        </Link>
        <div className="navbar-right">
          <div
            className="hamburger"
            id="hamburger"
            onClick={() => {
              analytics.event(analytics._event.MAIN_MENU, "Open");
              dispatch({ type: "TOGGLE_MENU_MAIN" });
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

export default Navbar;
