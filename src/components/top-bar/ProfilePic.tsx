import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { isMobile } from "react-device-detect";

type Props = {
  initials?: string;
};

const ProfilePic = (_props: Props) => {
  const dispatch = useAppDispatch();
  const { initials, pic } = useAppSelector((state) => state.user);
  const activeTool = useAppSelector((state) => state.leftPane.active);

  return (
    <div
      className="topbar--userlogo"
      style={{
        backgroundImage: pic ? `url(${pic})` : "none",
      }}
      onClick={() => {
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
