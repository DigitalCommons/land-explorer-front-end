import React from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import MenuMain from "./MenuMain";
import MenuProfile from "./MenuProfile";
import MenuLayers from "./MenuLayers";
import MapName from "./MapName";
import ProfilePic from "./ProfilePic";
import { useDispatch, useSelector } from "react-redux";
import MenuKey from "./MenuKey";
import CouncilMenuKey from "./CouncilMenuKey";
import Geocoder from "./Geocoder";
import analytics from "../analytics";

const Navbar = ({ limited }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return !limited && user.populated ? (
    <div>
      <div className="navbar-shadow"></div>
      <div className="navbar">
        <Link to="/app/">
          <div className="logo">
          </div>
        </Link>
        <div className="search-bar">
          <Geocoder bbox={[-11.535645, 49.109838, 3.493652, 63.144431]} />
        </div>
        <MapName />
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
