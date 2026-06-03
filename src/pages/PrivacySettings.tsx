import { setAnalyticsConsent } from "@/actions/UserActions";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const PrivacySettings = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const { analyticsConsent } = useAppSelector((state) => state.user);

  const [currentAnalyticsConsent, setCurrentAnalyticsConsent] = useState(
    analyticsConsent ?? false,
  );

  const toggleAnalyticsConsent = async () => {
    setCurrentAnalyticsConsent(!currentAnalyticsConsent);
  };

  const savePrivacySettings = async () => {
    const success = await dispatch(
      setAnalyticsConsent(currentAnalyticsConsent),
    );
    if (!success) {
      Swal.fire({
        icon: "error",
        text: "Failed to save privacy settings. Please try again.",
        toast: true,
        timer: 3000,
        position: "top",
        didOpen: (popup) => {
          const container = popup.parentElement;
          if (container) container.style.zIndex = "100010";
        },
      });
    } else {
      navigator("/app/my-account");
    }
  };

  return (
    <div className="privacy-settings__container modal">
      <div className="privacy-settings">
        <h3 className="privacy-settings__title">Privacy Settings</h3>
        {<Link to="/app/my-account" className="modal-close" />}
        <p className="privacy-settings__copy">
          {" "}
          We use pseudonymous* analytics to understand how people use Land
          Explorer and improve the service.
          <br />
          <br />
          You can turn this on/off at any time using the toggle below.
        </p>
        <div className="privacy-settings__toggle-group">
          <ToggleSwitch
            on={currentAnalyticsConsent === true}
            tooltip="Enable or disable analytics tracking"
            toggle={toggleAnalyticsConsent}
          />
          <span>Allow Analytics</span>
        </div>
        <button className="rounded-button" onClick={savePrivacySettings}>
          Save Changes
        </button>
        <p className="privacy-settings__copy-footer">
          *This means analytics data may be linked to an identifier, but not to
          your real name.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings;
