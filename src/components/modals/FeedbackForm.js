// FeedbackForm.js
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import Modal from "./Modal";
import { openModal } from "../../actions/ModalActions";
import Button from "../common/Button";
import InputTextarea from "../common/InputTextarea";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";

const FeedbackForm = () => {
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted();

    if (isFormValid()) {
      const submittedData = { ...formData };

      // Send data to API
      await axios
        .post(
          `${constants.ROOT_URL}/api/user/feedback`,
          submittedData,
          getAuthHeader()
        )
        .then((response) => {
          console.log("Feedback Form Response:", response);
          closeModal();
          setTimeout(() => {
            dispatch(openModal("feedbackSuccess"));
          }, 300);
        })
        .catch((err) => {
          console.log("Feedback Form Error:", err);
        });
    }
  };

  return (
    <Modal
      id="feedbackForm"
      customClass={"feedback-form__container"}
      slideDirection="right"
    >
      <form className="feedback-form" onSubmit={handleSubmit}>
        {/* Desktop Feedback Form */}
        <div className="feedback-form__head">
          <h1 className="feedback-form__title">
            How are you using LandExplorer?
          </h1>
          <p className="feedback-form__copy">
            We believe that information about land is powerful, and can help
            people and communities to create real change. Tell us how you are
            using LandExplorer so we can improve the app, gain support for our
            work, and make a stronger case from more data to be made publicly
            accessible. You and any groups you refer to will remain anonymous
            unless we gain your express permission via email.
          </p>
        </div>
        {/* Question 1 */}
        <InputTextarea
          label={"What is LandExplorer helping you to do today?"}
          name={"question1"}
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
          value={formData.question4}
          onChange={(e) => handleFieldChange("question4", e.target.value)}
          onBlur={() => handleFieldBlur("question4")}
          errorText={"Question 4 is required"}
          errorCondition={
            !isFieldValid("question4") &&
            (touchedFields["question4"] || submitted)
          }
        />
        {/* Form Buttons */}
        <div className="feedback-form__button-group">
          <Button
            buttonClass={"button-new grey full-width"}
            type={"button"}
            buttonAction={() => closeModal()}
          >
            Cancel
          </Button>
          <Button buttonClass={"button-new green full-width"} type={"submit"}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FeedbackForm;
