import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventAction, EventCategory, trackEvent } from "../../analytics";
import { isMobile } from "react-device-detect";

const ProfilePic = () => {
  const dispatch = useDispatch();
  const { initials, pic } = useSelector((state) => state.user);
  const activeTool = useSelector((state) => state.leftPane.active);

  return (
    <div
      className="topbar--userlogo"
      style={{
        backgroundImage: pic ? `url(${pic})` : "none",
      }}
      onClick={() => {
        trackEvent(EventCategory.USER_MENU, EventAction.OPEN);
        dispatch({ type: "TOGGLE_MENU_PROFILE" });
        // Close left pane if mobile and tool is active
        if (activeTool != "" && isMobile) dispatch({ type: "CLOSE_TRAY" });
      }}
    >
      {initials}
    </div>
  );
};

export default ProfilePic;
