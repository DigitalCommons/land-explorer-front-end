import React, { useState } from "react";
import Modal from "./Modal";
import InputTextarea from "../common/InputTextarea";
import Button from "../common/Button";
import { isMobile } from "react-device-detect";

const FeedbackForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = 2;
  const textareaRows = isMobile ? "4" : "2";

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

  console.log("mobile", isMobile);
  console.log("currentPage", currentPage);

  return (
    <>
      <Modal
        id="feedbackForm"
        customClass={"feedback-form__container"}
        slideDirection="right"
      >
        <form className="feedback-form">
          {currentPage === 1 && (
            <div className="feedback-form__mobile-page">
              <div className="feedback-form__head">
                <h1 className="feedback-form__title">
                  How are you using LandExplorer?
                </h1>
                <p className="feedback-form__copy">
                  We believe that information about land is powerful, and can
                  help people and communities to create real change. By letting
                  us know how you are using LandExplorer we can make a stronger
                  case from more data to be made public and available for
                  everyone.
                </p>
                <p className="feedback-form__copy">
                  We'll use this information to improve LandExplorer, gain
                  support for our work and campaign for publicly accessible
                  data. We will ensure that you and any groups you refer to
                  remain anonymous unless we gain your express permission via
                  email.
                </p>
              </div>
              <InputTextarea
                name={"question-1"}
                label={"What is LandExplorer helping you to do today?"}
                rows={textareaRows}
              />
              <InputTextarea
                name={"question-2"}
                label={"What impact can this have for you and your community?"}
                rows={textareaRows}
              />
            </div>
          )}
          {currentPage === 2 && (
            <div className="feedback-form__mobile-page">
              <InputTextarea
                name={"question-3"}
                label={"Who will benefit from this?"}
                rows={textareaRows}
              />
              <InputTextarea
                name={"question-4"}
                label={"What would make LandExplorer even better?"}
                rows={textareaRows}
              />
            </div>
          )}
          <div className="feedback-form__pagingation">
            <ul>
              <li>
                <button
                  className="feedback-form__pagination-button"
                  type="button"
                  onClick={previousPage}
                >
                  Previous
                </button>
              </li>
              <li>
                <button
                  className="feedback-form__pagination-button"
                  type="button"
                  onClick={nextPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
          <div className="feedback-form__button-group">
            <Button
              buttonClass={"button-new grey full-width"}
              type={"button"}
              buttonAction={() => {}}
            >
              Cancel
            </Button>
            <Button
              buttonClass={"button-new green full-width"}
              type={"button"}
              buttonAction={() => {}}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FeedbackForm;
