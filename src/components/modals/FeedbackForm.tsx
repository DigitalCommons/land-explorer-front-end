// FeedbackForm.js
import { FormEvent } from "react";
import { useAppDispatch } from "@/hooks/react-redux";
import axios from "axios";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import Modal from "./Modal";
import { openModal } from "../../actions/ModalActions";
import Button from "../common/Button";
import InputTextarea from "../common/InputTextarea";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";

const FeedbackForm = () => {
  const dispatch = useAppDispatch();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          name={"question_use_case"}
          value={formData.question_use_case}
          onChange={(e) =>
            handleFieldChange("question_use_case", e.target.value)
          }
          onBlur={() => handleFieldBlur("question_use_case")}
          errorText={"Question 1 is required"}
          errorCondition={
            !isFieldValid("question_use_case") &&
            (touchedFields["question_use_case"] || submitted)
          }
        />
        {/* Question 2 */}
        <InputTextarea
          label={"What impact can this have for you and your community?"}
          name={"question_impact"}
          value={formData.question_impact}
          onChange={(e) => handleFieldChange("question_impact", e.target.value)}
          onBlur={() => handleFieldBlur("question_impact")}
          errorText={"Question 2 is required"}
          errorCondition={
            !isFieldValid("question_impact") &&
            (touchedFields["question_impact"] || submitted)
          }
        />
        {/* Question 3 */}
        <InputTextarea
          label={"Who will benefit from this?"}
          name={"question_who_benefits"}
          value={formData.question_who_benefits}
          onChange={(e) =>
            handleFieldChange("question_who_benefits", e.target.value)
          }
          onBlur={() => handleFieldBlur("question_who_benefits")}
          errorText={"Question 3 is required"}
          errorCondition={
            !isFieldValid("question_who_benefits") &&
            (touchedFields["question_who_benefits"] || submitted)
          }
        />
        {/* Question 4 */}
        <InputTextarea
          label={"What would make LandExplorer even better?"}
          name={"question_improvements"}
          value={formData.question_improvements}
          onChange={(e) =>
            handleFieldChange("question_improvements", e.target.value)
          }
          onBlur={() => handleFieldBlur("question_improvements")}
          errorText={"Question 4 is required"}
          errorCondition={
            !isFieldValid("question_improvements") &&
            (touchedFields["question_improvements"] || submitted)
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
