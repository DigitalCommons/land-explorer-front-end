import { useState } from "react";
import { Link } from "react-router-dom";
import StaticSiteMenu from "./StaticSiteMenu";
import ProfileMenu from "./ProfileMenu";
import MapTitleBar from "./MapTitleBar";
import MapMenu from "./MapMenu";
import ProfilePic from "./ProfilePic";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import SearchBar from "./SearchBar";
import iconHamburger from "../../assets/img/icon-hamburger.svg";

type Props = {
  limited?: boolean;
};

const TopBar = ({ limited }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
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
          <SearchBar
            expanded={searchExpanded}
            setExpanded={setSearchExpanded}
          />
        </div>
        <div className="topbar-right">
          <div className="topbar-username">{`${user.firstName} ${user.lastName}`}</div>
          <ProfilePic initials={user.initials} />
          <div
            className="hamburger hamburger-logged-in"
            id="hamburger"
            onClick={() => dispatch({ type: "TOGGLE_MENU_MAIN" })}
          ></div>
        </div>
      </div>
      <StaticSiteMenu />
      <ProfileMenu />
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
            onClick={() => dispatch({ type: "TOGGLE_MENU_MAIN" })}
          >
            <img src={iconHamburger} alt="" />
          </div>
        </div>
      </div>
      <StaticSiteMenu />
    </div>
  );
};

export default TopBar;
