import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { openModal } from "../../actions/ModalActions";
import Button from "../common/Button";

const FeedbackPopUp = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = () => {
    setShowModal(false);
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
    const unChecked = !e.target.checked;
    setShowModal(unChecked);
    localStorage.setItem("showModal", JSON.stringify(unChecked));
  };

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !dontShowModal()) {
        setShowModal(true);
        setTimeout(() => {
          dispatch(openModal("feedbackPopUp"));
        }, 300);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const dontShowModal = () => {
    const feedbackModalPreference = localStorage.getItem("showModal");
    return feedbackModalPreference === "false";
  };

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
