import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../actions/ModalActions";
import analytics from "../../analytics";

const MenuProfile = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.menu.profile);

  const closeProfileMen = () => {
    dispatch({ type: "CLOSE_MENU_PROFILE" });
  };

  return (
    <div
      style={{
        display: open ? "block" : "none",
      }}
    >
      <div className="tooltip-menu tooltip-menu-profile modal">
        <Link to="/app/my-account">
          <div className="tooltip-menu-item">My Account</div>
        </Link>
        <div
          className="tooltip-menu-item"
          onClick={() => {
            analytics.pageview("/app/my-maps");
            dispatch(openModal("openMap"));
          }}
        >
          My Maps
        </div>
        <div
          className="tooltip-menu-item"
          onClick={() => {
            dispatch({ type: "LOG_OUT" });
            closeProfileMen();
          }}
        >
          Logout
        </div>
        <div
          className="tooltip-menu-item no-hover"
          style={{
            marginTop: "10px",
          }}
        >
          <div
            className="button button-medium"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://opencollective.com/digitalcommonscoop");
              closeProfileMen();
            }}
          >
            Donate
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuProfile;
