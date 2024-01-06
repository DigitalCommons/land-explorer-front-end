// FeedbackForm.js
import React from "react";
import Modal from "./Modal";
import Button from "../common/Button";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import { useDispatch } from "react-redux";

const FeedbackForm = () => {
  const dispatch = useDispatch();
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
            <div className="form-group" key="question1">
              <label htmlFor="question1" className="form-label">
                Question 1:
              </label>
              <textarea
                id="question1"
                name="question1"
                rows="2"
                value={formData.question1}
                onChange={(e) => handleFieldChange("question1", e.target.value)}
                onBlur={() => handleFieldBlur("question1")}
                className="form-textarea"
              />
              {!isFieldValid("question1") &&
                (touchedFields["question1"] || submitted) && (
                  <span className="error">Question 1 is required</span>
                )}
            </div>

            {/* Question 2 */}
            <div className="form-group" key="question2">
              <label htmlFor="question2" className="form-label">
                Question 2:
              </label>
              <textarea
                id="question2"
                name="question2"
                rows="2"
                value={formData.question2}
                onChange={(e) => handleFieldChange("question2", e.target.value)}
                onBlur={() => handleFieldBlur("question2")}
                className="form-textarea"
              />
              {!isFieldValid("question2") &&
                (touchedFields["question2"] || submitted) && (
                  <span className="error">Question 2 is required</span>
                )}
            </div>

            {/* Question 3 */}
            <div className="form-group" key="question3">
              <label htmlFor="question3" className="form-label">
                Question 3:
              </label>
              <textarea
                id="question3"
                name="question3"
                rows="2"
                value={formData.question3}
                onChange={(e) => handleFieldChange("question3", e.target.value)}
                onBlur={() => handleFieldBlur("question3")}
                className="form-textarea"
              />
              {!isFieldValid("question3") &&
                (touchedFields["question3"] || submitted) && (
                  <span className="error">Question 3 is required</span>
                )}
            </div>

            {/* Question 4 */}
            <div className="form-group" key="question4">
              <label htmlFor="question4" className="form-label">
                Question 4:
              </label>
              <textarea
                id="question4"
                name="question4"
                rows="2"
                value={formData.question4}
                onChange={(e) => handleFieldChange("question4", e.target.value)}
                onBlur={() => handleFieldBlur("question4")}
                className="form-textarea"
              />
              {!isFieldValid("question4") &&
                (touchedFields["question4"] || submitted) && (
                  <span className="error">Question 4 is required</span>
                )}
            </div>

            {/* Add more question groups as needed */}
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
