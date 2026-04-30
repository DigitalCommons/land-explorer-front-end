import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import constants from "../../constants";
import useClickOutside from "../../hooks/useClickOutside";

const StaticSiteMenu = () => {
  const open = useAppSelector((state) => state.menu.staticSite);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (open) dispatch({ type: "CLOSE_STATIC_SITE_MENU" });
  };

  useClickOutside(menuRef, handleClose);

  return (
    <div
      style={{
        display: open ? "block" : "none",
        zIndex: 1000001,
      }}
    >
      <div
        className="tooltip-menu tooltip-static-site-menu modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={menuRef}
      >
        <a target="_blank" href={`${constants.STATIC_SITE_URL}`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            Home
          </div>
        </a>
        <a target="_blank" href={`${constants.STATIC_SITE_URL}/#about`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            About
          </div>
        </a>
        <a target="_blank" href={`${constants.STATIC_SITE_URL}/#partners`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            Partners
          </div>
        </a>
        <a target="_blank" href={`${constants.STATIC_SITE_URL}/#community`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            Community
          </div>
        </a>
        <a target="_blank" href={`${constants.STATIC_SITE_URL}/#news`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            Blog
          </div>
        </a>
        <a target="_blank" href={`${constants.STATIC_SITE_URL}/#contact`}>
          <div className="tooltip-menu-item" onClick={handleClose}>
            Contact
          </div>
        </a>
      </div>
    </div>
  );
};

export default StaticSiteMenu;
