import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { openModal } from "../../actions/ModalActions";
import Button from "../common/Button";
import { setAskForFeedback } from "../../actions/UserActions";

const FeedbackPopUp = () => {
  const dispatch = useDispatch();
  const propertyLayerActive = useSelector(
    (state) => state.landOwnership.activeDisplay
  );
  const feedbackPreference = useSelector((state) => state.user.askForFeedback);

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: "feedbackPopUp",
    });
  };

  const openFeedbackForm = () => {
    closeModal();
    dispatch(openModal("feedbackForm"));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      dispatch(setAskForFeedback(false));
    } else {
      dispatch(setAskForFeedback(true));
    }
  };

  // Show modal on mouseleave
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && feedbackPreference) {
        setTimeout(() => {
          dispatch(openModal("feedbackPopUp"));
        }, 300);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [feedbackPreference]);

  // Show modal after delay if property layer is active
  useEffect(() => {
    let timeoutId;
    if (propertyLayerActive && feedbackPreference) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(openModal("feedbackPopUp"));
      }, 300000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [propertyLayerActive]);

  return (
    <Modal
      id="feedbackPopUp"
      customClass={"feedback-popup__container"}
      slideDirection="right"
    >
      <div className="feedback-popup">
        <h1 className="feedback-popup__title">
          How are you using LandExplorer?
        </h1>
        <p className="feedback-popup__copy">
          We believe that information about land is powerful, and can help
          people and communities to create real change. By letting us know how
          you are using LandExplorer we can make a stronger case from more data
          to be made public and available for everyone. Will you take a moment
          to tell us how LandExplorer is helping you today?
        </p>
      </div>
      <div className="feedback-popup__bottom">
        <div className="feedback-popup__checkbox">
          <input
            type="checkbox"
            name="feedbackPopupCheckbox"
            id="feedbackPopupCheckbox"
            onChange={handleCheckboxChange}
            checked={!feedbackPreference}
          />
          <span className="feedback-popup__checkbox--checkmark"></span>
          <label htmlFor="feedbackPopupCheckbox">Don't show this again</label>
        </div>
        <div className="feedback-popup__button-group">
          <Button
            buttonClass={"button-new blue feedback-popup__button"}
            type={"button"}
            buttonAction={() => closeModal()}
          >
            Maybe later
          </Button>
          <Button
            buttonClass={"button-new green feedback-popup__button"}
            type={"button"}
            buttonAction={() => openFeedbackForm()}
          >
            Sure
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackPopUp;
