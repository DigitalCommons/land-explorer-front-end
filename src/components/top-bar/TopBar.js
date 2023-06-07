import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuMain from "./MenuMain";
import MenuProfile from "./MenuProfile";
import MapTitleBar from "./MapTitleBar";
import MapMenu from "./MapMenu";
import ProfilePic from "./ProfilePic";
import { useDispatch, useSelector } from "react-redux";
import Geocoder from "./Geocoder";
import analytics from "../../analytics";

const TopBar = ({ limited }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [searchExpanded, setSearchExpanded] = useState(false);

  return !limited && user.populated ? (
    <div>
      <div className="topbar-shadow"></div>
      <div className="topbar">
        <Link to="/app">
          <div className="logo" />
        </Link>
        <div className="topbar-middle">
          <div className="topbar-map-interactions">
            <MapMenu />
            <MapTitleBar expanded={!searchExpanded} />
          </div>
          <div className="search-bar">
            <Geocoder
              bbox={[-11.535645, 49.109838, 3.493652, 63.144431]}
              expanded={searchExpanded}
              setExpanded={setSearchExpanded}
            />
          </div>
        </div>
        <div className="topbar-right">
          <div className="topbar-username">{`${user.firstName} ${user.lastName}`}</div>
          <ProfilePic initials={user.initials} />
          <div
            className="hamburger hamburger-logged-in"
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
    </div>
  ) : (
    <div>
      <div className="topbar-shadow"></div>
      <div className="topbar">
        <Link to="/app">
          <div className="logo" />
        </Link>
        <div className="topbar-right">
          <div
            className="hamburger"
            id="hamburger"
            onClick={() => {
              analytics.event(analytics._event.MAIN_MENU, "Open");
              dispatch({ type: "TOGGLE_MENU_MAIN" });
            }}
          >
            <img src={require("../../assets/img/icon-hamburger.svg")} alt="" />
          </div>
        </div>
      </div>
      <MenuMain limited={true} />
    </div>
  );
}

export default TopBar;
