import { setAnalyticsConsent } from "@/actions/UserActions";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConsentBanner = () => {
  const dispatch = useAppDispatch();
  const { analyticsConsent } = useAppSelector((state) => state.user);
  
  const handleAnalyticsConsentSet = async (value: boolean) => {
    await dispatch(setAnalyticsConsent(value));
  };
  
  if (analyticsConsent !== null && analyticsConsent !== undefined) {
    return null;
  }
  return (
    <div id="consent-banner-container" className="consent-banner-container">
      <div id="analytics-consent-banner" className="consent-banner">
        <div className="consent-banner__copy-container">
          <div className="consent-banner__copy">
            <FontAwesomeIcon
              className="consent-banner__copy-icon"
              icon={faCircleInfo}
            />
            <div className="consent-banner__copy-text">
              <div className="consent-banner__copy-title">
                Help improve Land Explorer
              </div>
              <p className="consent-banner__copy">
                We use pseudonymous* analytics to understand how people use Land
                Explorer and improve the service. You can turn this off at any
                time in Privacy settings.
              </p>
              <p className="consent-banner__copy-footer">
                *This means analytics data may be linked to an identifier, but
                not to your real name.
              </p>
            </div>
          </div>
        </div>
        <div className="consent-banner__buttons">
          <button
            className="rounded-button"
            onClick={() => handleAnalyticsConsentSet(true)}
          >
            Allow analytics
          </button>
          <button
            className="rounded-button-outline-lg"
            onClick={() => handleAnalyticsConsentSet(false)}
          >
            Turn off analytics
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ConsentBanner;
