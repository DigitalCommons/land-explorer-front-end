import ToggleSwitch from "@/components/common/ToggleSwitch";
import { Link } from "react-router-dom";

const PrivacySettings = () => {
  const changePrivacySettings = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="privacy-settings__container modal">
      <div className="privacy-settings">
        <h3 className="privacy-settings__title">Privacy Settings</h3>
        {<Link to="/app/my-account" className="modal-close" />}
        <p className="privacy-settings__copy">
          {" "}
          We use pseudonymous* analytics to understand how people use Land
          Explorer and improve the service. You can turn this on/off at any time
          using the toggle below.
        </p>

        <form onSubmit={changePrivacySettings}>
          <div className="privacy-settings__toggle-group">
            <ToggleSwitch
              on={true}
              toggle={() => {}}
              tooltip="Enable or disable analytics tracking"
            />
            <span className="privacy-settings__toggle-label">
              Allow Analytics
            </span>
          </div>
        </form>

        <p className="privacy-settings__copy-footer">
          *This means analytics data may be linked to an identifier, but not to
          your real name.
        </p>
      </div>
    </div>
  );
};

export default PrivacySettings;
