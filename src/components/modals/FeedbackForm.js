import React, { useEffect } from "react";
import Modal from "./Modal";
import InputTextarea from "../common/InputTextarea";
import Button from "../common/Button";
import { isMobile } from "react-device-detect";

const FeedbackForm = () => {
  const textareaRows = isMobile ? "4" : "2";

  console.log("mobile", isMobile);

  return (
    <>
      <Modal
        id="feedbackForm"
        customClass={"feedback-form"}
        slideDirection="right"
      >
        <div className="feedback-form__inner">
          <h1 className="feedback-form__title">
            How are you using LandExplorer?
          </h1>
          <p className="feedback-form__copy">
            We believe that information about land is powerful, and can help
            people and communities to create real change. By letting us know how
            you are using LandExplorer we can make a stronger case from more
            data to be made public and available for everyone.
          </p>
          <p className="feedback-form__copy">
            We'll use this information to improve LandExplorer, gain support for
            our work and campaign for publicly accessible data. We will ensure
            that you and any groups you refer to remain anonymous unless we gain
            your express permission via email.
          </p>
          <form>
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
        </div>
      </Modal>
    </>
  );
};

export default FeedbackForm;
