// FeedbackForm.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFeedbackForm from "../../hooks/useFeedbackForm";
import Modal from "./Modal";
import { openModal } from "../../actions/ModalActions";
import { isMobile } from "react-device-detect";
import Button from "../common/Button";
import InputTextarea from "../common/InputTextarea";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = 2;
  const textareaRows = isMobile ? "6" : "2";

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
    if (isMobile) {
      setCurrentPage(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted();

    if (isFormValid()) {
      const submittedData = { ...formData };
      console.log("Submitted Data:", submittedData);

      closeModal();
      setTimeout(() => {
        dispatch(openModal("feedbackSuccess"));
      }, 300);
    }
  };

  const nextPage = () => {
    if (currentPage < noOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (isMobile) {
      setCurrentPage(1);
    }
  }, []);

  console.log("is form valid?", isFormValid());
  console.log("set form submitted", submitted);

  return (
    <Modal
      id="feedbackForm"
      customClass={"feedback-form__container"}
      slideDirection="right"
    >
      <form className="feedback-form" onSubmit={handleSubmit}>
        {!isMobile ? (
          <>
            {/* Desktop Feedback Form */}
            <div className="feedback-form__head">
              <h1 className="feedback-form__title">
                How are you using LandExplorer?
              </h1>
              <p className="feedback-form__copy">
                We believe that information about land is powerful, and can help
                people and communities to create real change. By letting us know
                how you are using LandExplorer we can make a stronger case from
                more data to be made public and available for everyone.
              </p>
              <p className="feedback-form__copy">
                We'll use this information to improve LandExplorer, gain support
                for our work and campaign for publicly accessible data. We will
                ensure that you and any groups you refer to remain anonymous
                unless we gain your express permission via email.
              </p>
            </div>
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
          </>
        ) : (
          <>
            <div className="feedback-form__mobile-page">
              {currentPage === 1 && (
                // Mobile Feedback Form Page 1
                <>
                  <div className="feedback-form__head">
                    <h1 className="feedback-form__title">
                      How are you using LandExplorer?
                    </h1>
                    <p className="feedback-form__copy">
                      <input
                        type="checkbox"
                        id="expandCollapse"
                        name="expandCollapse"
                      />
                      <span>
                        We believe that information about land is powerful, and
                        can help people and communities to create real change.
                        By letting us know how you are using LandExplorer we can
                        make a stronger case from more data to be made public
                        and available for everyone.
                      </span>
                      <span className="feedback-form__copy-expanded">
                        We'll use this information to improve LandExplorer, gain
                        support for our work and campaign for publicly
                        accessible data. We will ensure that you and any groups
                        you refer to remain anonymous unless we gain your
                        express permission via email.
                        <label
                          for="expandCollapse"
                          className="feedback-form__copy-collapse"
                        >
                          Show Less
                        </label>
                      </span>
                      <label
                        for="expandCollapse"
                        className="feedback-form__copy-expand"
                      >
                        Show More
                      </label>
                    </p>
                  </div>
                  {/* Question 1 */}
                  <InputTextarea
                    label={"What is LandExplorer helping you to do today?"}
                    name={"question1"}
                    rows={textareaRows}
                    value={formData.question1}
                    onChange={(e) =>
                      handleFieldChange("question1", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("question1")}
                    errorText={"Question 1 is required"}
                    errorCondition={
                      !isFieldValid("question1") &&
                      (touchedFields["question1"] || submitted)
                    }
                  />
                  {/* Question 2 */}
                  <InputTextarea
                    label={
                      "What impact can this have for you and your community?"
                    }
                    name={"question2"}
                    rows={textareaRows}
                    value={formData.question2}
                    onChange={(e) =>
                      handleFieldChange("question2", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("question2")}
                    errorText={"Question 2 is required"}
                    errorCondition={
                      !isFieldValid("question2") &&
                      (touchedFields["question2"] || submitted)
                    }
                  />
                </>
              )}
              {currentPage === 2 && (
                // Mobile Feedback Form Page 2
                <>
                  {/* Question 3 */}
                  <InputTextarea
                    label={"Who will benefit from this?"}
                    name={"question3"}
                    rows={textareaRows}
                    value={formData.question3}
                    onChange={(e) =>
                      handleFieldChange("question3", e.target.value)
                    }
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
                    onChange={(e) =>
                      handleFieldChange("question4", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("question4")}
                    errorText={"Question 4 is required"}
                    errorCondition={
                      !isFieldValid("question4") &&
                      (touchedFields["question4"] || submitted)
                    }
                  />
                </>
              )}
            </div>
            {/* Mobile Pagination & Button Group */}

            <div className="feedback-form__mobile-page-bottom">
              {/* Pagination */}
              <ul className="feedback-form__pagingation">
                <li>
                  <button
                    className={`feedback-form__pagination-button previous ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                    type="button"
                    onClick={previousPage}
                  />
                </li>
                <li
                  className={`feedback-form__pagination-number ${
                    currentPage === 1 ? "selected" : ""
                  }`}
                >
                  1
                </li>
                <li>|</li>
                <li
                  className={`feedback-form__pagination-number ${
                    currentPage === 2 ? "selected" : ""
                  }`}
                >
                  2
                </li>
                <li>
                  <button
                    className={`feedback-form__pagination-button next ${
                      currentPage === 2 ? "disabled" : ""
                    }`}
                    type="button"
                    onClick={nextPage}
                  />
                </li>
              </ul>
              {/* Page 1 Buttons */}
              {isMobile && currentPage === 1 && (
                <div className="feedback-form__button-group">
                  <Button
                    buttonClass={"button-new grey full-width"}
                    type={"button"}
                    buttonAction={() => closeModal()}
                  >
                    Cancel
                  </Button>
                  <Button
                    buttonClass={"button-new blue full-width"}
                    type={"button"}
                    buttonAction={() => nextPage()}
                  >
                    Next
                  </Button>
                </div>
              )}
              {/* Page 2 Buttons */}
              {isMobile && currentPage === 2 && (
                <div className="feedback-form__button-group">
                  <Button
                    buttonClass={"button-new green full-width"}
                    type={"submit"}
                    buttonAction={() => {}}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
        {/* Desktop Button Group */}
        {!isMobile && (
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
        )}
      </form>
    </Modal>
  );
};

export default FeedbackForm;
