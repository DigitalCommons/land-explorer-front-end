import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ConsentBanner = () => {
 
  return (
    <div
      id="analytics-consent-banner"
      className="consent-banner"
    >
      <div className="consent-banner__copy-container">
        <div className="consent-banner__copy">          
          <FontAwesomeIcon className="consent-banner__copy-icon" icon={faCircleInfo} />
          <div className="consent-banner__copy-text">
            <div className="consent-banner__copy-title">Help improve Land Explorer</div>
            <p className="consent-banner__copy">
              We use anonymous analytics to understand how people use Land Explorer and improve the service. You can turn this off at any time in Privacy settings.
            </p>
          </div>
        </div>
      </div>
      <div className="consent-banner__buttons">
        <button className="rounded-button" onClick={() => {}}>Allow analytics</button>
        <button className="rounded-button-outline" onClick={() => {}}>Turn off analytics</button>
      </div>
    </div>
    )
  
};

export default ConsentBanner;
