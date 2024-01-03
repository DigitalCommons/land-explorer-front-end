import React, { useState } from "react";
import Modal from "./Modal";
import InputTextarea from "../common/InputTextarea";
import Button from "../common/Button";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const noOfPages = 2;
  const textareaRows = isMobile ? "6" : "2";

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

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: "feedbackForm",
    });
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
          {!isMobile ? (
            // Desktop Feedback Form
            <>
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
            </>
          ) : (
            // Mobile Feedback Form
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
                          We believe that information about land is powerful,
                          and can help people and communities to create real
                          change. By letting us know how you are using
                          LandExplorer we can make a stronger case from more
                          data to be made public and available for everyone.
                        </span>
                        <span className="feedback-form__copy-expanded">
                          We'll use this information to improve LandExplorer,
                          gain support for our work and campaign for publicly
                          accessible data. We will ensure that you and any
                          groups you refer to remain anonymous unless we gain
                          your express permission via email.
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
                    <InputTextarea
                      name={"question-1"}
                      label={"What is LandExplorer helping you to do today?"}
                      rows={textareaRows}
                    />
                    <InputTextarea
                      name={"question-2"}
                      label={
                        "What impact can this have for you and your community?"
                      }
                      rows={textareaRows}
                    />
                  </>
                )}
                {currentPage === 2 && (
                  // Mobile Feedback Form Page 2
                  <>
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
                      type={"button"}
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
              <Button
                buttonClass={"button-new green full-width"}
                type={"button"}
                buttonAction={() => {}}
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      </Modal>
    </>
  );
};

export default FeedbackForm;
