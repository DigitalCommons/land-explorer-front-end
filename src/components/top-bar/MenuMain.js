import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../../constants";
import { openModal } from "../../actions/ModalActions";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch } from "react-redux";

const MenuMain = ({ limited }) => {
  const open = useSelector((state) => state.menu.main);
  const mainMenuRef = useRef(null);
  const mobile = window.innerWidth < 480;
  const dispatch = useDispatch();

  const closeMainMenu = () => {
    if (open) dispatch({ type: "CLOSE_MENU_MAIN" });
  };

  useClickOutside(mainMenuRef, closeMainMenu);

  return (
    <div
      style={{
        display: open ? "block" : "none",
        zIndex: 1000001,
      }}
    >
      <div
        className="tooltip-menu tooltip-menu-main modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={mainMenuRef}
      >
        <a target="_blank" href={`${constants.STATIC_SITE_URL}`}>
          <div className="tooltip-menu-item" onClick={closeMainMenu}>
            Home
          </div>
        </a>
        {!mobile && (
          <>
            <a target="_blank" href={`${constants.STATIC_SITE_URL}/#about`}>
              <div className="tooltip-menu-item" onClick={closeMainMenu}>
                About
              </div>
            </a>
            <a target="_blank" href={`${constants.STATIC_SITE_URL}/#partners`}>
              <div className="tooltip-menu-item" onClick={closeMainMenu}>
                Partners
              </div>
            </a>
            <a target="_blank" href={`${constants.STATIC_SITE_URL}/#community`}>
              <div className="tooltip-menu-item" onClick={closeMainMenu}>
                Community
              </div>
            </a>
            <a target="_blank" href={`${constants.STATIC_SITE_URL}/#news`}>
              <div className="tooltip-menu-item" onClick={closeMainMenu}>
                Blog
              </div>
            </a>
            <a target="_blank" href={`${constants.STATIC_SITE_URL}/#contact`}>
              <div className="tooltip-menu-item" onClick={closeMainMenu}>
                Contact
              </div>
            </a>
          </>
        )}
        {!limited && mobile && (
          <Link to="/app/my-account">
            <div className="tooltip-menu-item">My Account</div>
          </Link>
        )}
        {!limited && mobile && (
          <div
            onClick={() => {
              dispatch(openModal("myMaps"));
            }}
            className="tooltip-menu-item"
          >
            My Maps
          </div>
        )}
        {!limited && mobile && (
          <div
            onClick={() => {
              dispatch(openModal("mySharedMaps"));
            }}
            className="tooltip-menu-item"
          >
            Shared Maps
          </div>
        )}
        {!limited && mobile && (
          <div
            className="tooltip-menu-item no-hover"
            style={{
              marginBottom: "10px",
            }}
          >
            <div
              className="button button-medium"
              onClick={() => dispatch({ type: "LOG_OUT" })}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuMain;
