// FeedbackForm.js
import React from "react";
import { useDispatch } from "react-redux";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import Modal from "./Modal";
import { isMobile } from "react-device-detect";
import Button from "../common/Button";
import InputTextarea from "../common/InputTextarea";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const textareaRows = isMobile ? "6" : "2";
  // Use the custom hook to manage form state and validation logic
  const {
    formData,
    touchedFields,
    handleFieldChange,
    handleFieldBlur,
    isFieldValid,
    isFormValid,
    resetForm,
    setFormSubmitted,
    submitted,
  } = useFeedbackForm();

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: "feedbackForm",
    });
    resetForm();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted();

    if (isFormValid()) {
      const submittedData = { ...formData };
      console.log("Submitted Data:", submittedData);

      closeModal();
    }
  };

  console.log("is form valid?", isFormValid());

  console.log("set form submitted", submitted);

  // Render the form using individual form groups for each question
  return (
    <Modal
      id="feedbackForm"
      customClass={"feedback-form__container"}
      slideDirection="right"
    >
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-test__container">
          <div className="form-test__textareas">
            {/* Question 1 */}
            <InputTextarea
              label={"What is LandExplorer helping you to do today?"}
              name={"question1"}
              rows={textareaRows}
              value={formData.question1}
              onChange={(e) => handleFieldChange("question1", e.target.value)}
              onBlur={() => handleFieldBlur("question1")}
              errorText={"Question 1 is required"}
              errorCondition={
                !isFieldValid("question1") &&
                (touchedFields["question1"] || submitted)
              }
            />
            {/* Question 2 */}
            <InputTextarea
              label={"What impact can this have for you and your community?"}
              name={"question2"}
              rows={textareaRows}
              value={formData.question2}
              onChange={(e) => handleFieldChange("question2", e.target.value)}
              onBlur={() => handleFieldBlur("question2")}
              errorText={"Question 2 is required"}
              errorCondition={
                !isFieldValid("question2") &&
                (touchedFields["question2"] || submitted)
              }
            />
            {/* Question 3 */}
            <InputTextarea
              label={"Who will benefit from this?"}
              name={"question3"}
              rows={textareaRows}
              value={formData.question3}
              onChange={(e) => handleFieldChange("question3", e.target.value)}
              onBlur={() => handleFieldBlur("question3")}
              errorText={"Question 3 is required"}
              errorCondition={
                !isFieldValid("question3") &&
                (touchedFields["question3"] || submitted)
              }
            />
            {/* Question 4 */}
            <InputTextarea
              label={"What would make LandExplorer even better?"}
              name={"question4"}
              rows={textareaRows}
              value={formData.question4}
              onChange={(e) => handleFieldChange("question4", e.target.value)}
              onBlur={() => handleFieldBlur("question4")}
              errorText={"Question 4 is required"}
              errorCondition={
                !isFieldValid("question4") &&
                (touchedFields["question4"] || submitted)
              }
            />
          </div>

          <div className="feedback-form__button-group">
            {/* Cancel button */}
            <Button
              buttonClass={"button-new grey full-width"}
              type={"button"}
              buttonAction={() => closeModal()}
            >
              Cancel
            </Button>
            {/* Submit button */}
            <Button
              buttonClass={"button-new green full-width"}
              type={"submit"}
              // disabled={!isFormValid()}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default FeedbackForm;
