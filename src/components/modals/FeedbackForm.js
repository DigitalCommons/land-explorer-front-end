import React from "react";
import Modal from "./Modal";

const FeedbackForm = () => {
  return (
    <>
      <Modal id="feedbackForm" customClass={'feedback-form'} slideDirection="right">
        <h1>Feedback</h1>
      </Modal>
    </>
  );
};

export default FeedbackForm;
