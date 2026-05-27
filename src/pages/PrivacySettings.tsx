import { setAnalyticsConsent } from "@/actions/UserActions";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const analyticsConsent = useAppSelector(
    (state) => state.user.analyticsConsent,
  );

  const [currentAnalyticsConsent, setCurrentAnalyticsConsent] = useState(
    analyticsConsent ?? false,
  );

  const toggleAnalyticsConsent = async () => {
    setCurrentAnalyticsConsent(!currentAnalyticsConsent);
  };

  const savePrivacySettings = async () => {
    await dispatch(setAnalyticsConsent(currentAnalyticsConsent));
    navigator("/app/my-account");
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
            toggle={toggleAnalyticsConsent}
            tooltip="Enable or disable analytics tracking"
          />
          <span className="privacy-settings__toggle-label">
            Allow Analytics
          </span>
        </div>
        {/* <div className="privacy-settings__button-group"> */}
        <button className="rounded-button" onClick={savePrivacySettings}>
          Save Changes
        </button>
        {/* </div> */}
        <p className="privacy-settings__copy-footer">
          *This means analytics data may be linked to an identifier, but not to
          your real name.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings;
