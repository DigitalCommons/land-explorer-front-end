import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { Link } from "react-router-dom";
import { openModal } from "../../actions/ModalActions";
import constants from "../../constants";
import { trackEvent } from "@/analytics";
import { logOut } from "@/actions/AuthenticationActions";

const ProfileMenu = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.menu.profile);

  const closeProfileMenu = () => {
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
            dispatch(openModal("openMap"));
          }}
        >
          My Maps
        </div>
        <div
          className="tooltip-menu-item"
          onClick={() => {
            trackEvent("User_ViewedGuide", {
              source: "profile-menu",
            });
            window.open(constants.USER_GUIDE_URL, "_blank");
            closeProfileMenu();
          }}
        >
          User Guide
        </div>
        <div
          className="tooltip-menu-item"
          onClick={() => {
            dispatch(logOut());
            closeProfileMenu();
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
              closeProfileMenu();
            }}
          >
            Donate
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
