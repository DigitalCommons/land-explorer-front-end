import React from "react";
import Modal from "./Modal";

const FeedbackSuccess = () => {
  return (
    <Modal
      id="feedbackSuccess"
      customClass={"feedback-popup__container success"}
      slideDirection={"right"}
    >
      <div className="feedback-success">
        <h1 className="feedback-popup__title">Thank you for your feedback</h1>
      </div>
    </Modal>
  );
};

export default FeedbackSuccess;
