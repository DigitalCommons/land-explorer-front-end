import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import InputTextarea from "../common/InputTextarea";
import Button from "../common/Button";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  // const noOfPages = 2;
  const textareaRows = isMobile ? "6" : "2";

  // const nextPage = () => {
  //   if (currentPage < noOfPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const previousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
      payload: "feedbackForm",
    });
  };

  const intialFocusRef = useRef();
  const errorRef = useRef();

  const [question1, setQuestion1] = useState("");
  const [validQuestion1, setValidQuestion1] = useState(false);
  const [question1Focus, setQuestion1Focus] = useState(false);

  const [question2, setQuestion2] = useState("");
  const [validQuestion2, setValidQuestion2] = useState(false);
  const [question2Focus, setQuestion2Focus] = useState(false);

  const [question3, setQuestion3] = useState("");
  const [validQuestion3, setValidQuestion3] = useState(false);
  const [question3Focus, setQuestion3Focus] = useState(false);

  const [question4, setQuestion4] = useState("");
  const [validQuestion4, setValidQuestion4] = useState(false);
  const [question4Focus, setQuestion4Focus] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (validQuestion1 && validQuestion2 && validQuestion3 && validQuestion4) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [validQuestion1, validQuestion2, validQuestion3, validQuestion4]);

  // useEffect(() => {
  //   if (question1Focus) {
  //     intialFocusRef.current.focus();
  //   }
  // }, [question1Focus]);

  useEffect(() => {
    setValidQuestion1(question1 !== "");
    setQuestion1Focus(false);
  }, [question1]);

  useEffect(() => {
    setValidQuestion2(question2 !== "");
    setQuestion2Focus(false);
  }, [question2]);

  useEffect(() => {
    setValidQuestion3(question3 !== "");
    setQuestion3Focus(false);
  }, [question3]);

  useEffect(() => {
    setValidQuestion4(question4 !== "");
    setQuestion4Focus(false);
  }, [question4]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid) {
      const formData = {
        "Question 1": question1,
        "Question 2": question2,
        "Question 3": question3,
        "Question 4": question4,
      };
      console.log(formData);

      setQuestion1("");
      setQuestion2("");
      setQuestion3("");
      setQuestion4("");

      closeModal();
    }
  };

  console.log("mobile", isMobile);
  console.log("currentPage", currentPage);

  console.log("question1", question1);
  console.log("validQuestion1", validQuestion1);
  console.log("question1Focus", question1Focus);

  console.log("question2", question2);
  console.log("validQuestion2", validQuestion2);
  console.log("question2Focus", question2Focus);

  console.log("question3", question3);
  console.log("validQuestion3", validQuestion3);
  console.log("question3Focus", question3Focus);

  console.log("question4", question4);
  console.log("validQuestion4", validQuestion4);
  console.log("question4Focus", question4Focus);

  console.log("formValid", formValid);

  return (
    <>
      <Modal
        id="feedbackForm"
        customClass={"feedback-form__container"}
        slideDirection="right"
      >
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-test__container">
            <div className="form-test__textareas">
              <div className="form-group">
                <label htmlFor="question1" className="form-label">
                  Question 1:
                </label>
                <textarea
                  // ref={intialFocusRef}
                  id="question1"
                  name="question1"
                  rows={textareaRows}
                  value={question1}
                  onChange={(e) => setQuestion1(e.target.value)}
                  // onFocus={() => setQuestion1Focus(true)}
                  // onBlur={() => setQuestion1Focus(false)}
                  onBlur={() => setQuestion1Focus(true)}
                  className="form-textarea"
                />
                {!validQuestion1 && question1Focus && (
                  <span className="error">question 1 error</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="question2" className="form-label">
                  Question 2:
                </label>
                <textarea
                  id="question2"
                  name="question2"
                  rows={textareaRows}
                  value={question2}
                  onChange={(e) => setQuestion2(e.target.value)}
                  // onFocus={() => setQuestion2Focus(true)}
                  // onBlur={() => setQuestion2Focus(false)}
                  onBlur={() => setQuestion2Focus(true)}
                  className="form-textarea"
                />
                {!validQuestion2 && question2Focus && (
                  <span className="error">question 2 error</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="question3" className="form-label">
                  Question 3:
                </label>
                <textarea
                  id="question3"
                  name="question3"
                  rows={textareaRows}
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                  // onFocus={() => setQuestion3Focus(true)}
                  // onBlur={() => setQuestion3Focus(false)}
                  onBlur={() => setQuestion3Focus(true)}
                  className="form-textarea"
                />
                {!validQuestion3 && question3Focus && (
                  <span className="error">question 3 error</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="question4" className="form-label">
                  Question 4:
                </label>
                <textarea
                  id="question4"
                  name="question4"
                  rows={textareaRows}
                  value={question4}
                  onChange={(e) => setQuestion4(e.target.value)}
                  // onFocus={() => setQuestion4Focus(true)}
                  // onBlur={() => setQuestion4Focus(false)}
                  onBlur={() => setQuestion4Focus(true)}
                  className="form-textarea"
                />
                {!validQuestion4 && question4Focus && (
                  <span className="error">question 4 error</span>
                )}
              </div>
            </div>

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
                type={"submit"}
                disabled={!formValid}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Removed code */}

          {/* Desktop Button Group */}
          {/* {!isMobile && (
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
          )} */}
        </form>
      </Modal>
    </>
  );
};

export default FeedbackForm;
