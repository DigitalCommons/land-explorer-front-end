import React from "react";
import { useDispatch, useSelector } from "react-redux";
import analytics from "../../analytics";
import { isMobile } from "react-device-detect";

console.log("avatar click2", analytics.event());

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
        analytics.event(analytics._event.USER_MENU, "Open");
        dispatch({ type: "TOGGLE_MENU_PROFILE" });
        // conditional if mobile and tool is active
        if (activeTool != "" && isMobile) dispatch({ type: "CLOSE_TRAY" });
      }}
    >
      {initials}
    </div>
  );
};

export default ProfilePic;
