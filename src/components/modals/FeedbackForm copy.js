import React, { useCallback, useState } from "react";
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

  // const [question1, setQuestion1] = useState("");
  // const [question2, setQuestion2] = useState("");
  // const [question3, setQuestion3] = useState("");
  // const [question4, setQuestion4] = useState("");
  const [isValidationErrorQ1, setIsValidationErrorQ1] = useState(false);
  const [isValidationErrorQ2, setIsValidationErrorQ2] = useState(false);
  const [isValidationErrorQ3, setIsValidationErrorQ3] = useState(false);
  const [isValidationErrorQ4, setIsValidationErrorQ4] = useState(false);

  const [formValues, setFormValues] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  const errorMessage = "This field is required";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      question1: formValues.question1,
      question2: formValues.question2,
      question3: formValues.question3,
      question4: formValues.question4,
    };
    console.log(formData);
    closeModal();
  };

  const handleChange = useCallback ( (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }, [formValues]);

  console.log("form values", formValues);

  const isValid = () => {
    setIsValidationErrorQ1(question1 === "");
    setIsValidationErrorQ2(question2 === "");
    setIsValidationErrorQ3(question3 === "");
    setIsValidationErrorQ4(question4 === "");

    return !(
      question1 === "" ||
      question2 === "" ||
      question3 === "" ||
      question4 === ""
    );
  };

  // const [validationErrors, setValidationErrors] = useState({
  //   question1: false,
  //   question2: false,
  //   question3: false,
  //   question4: false,
  // });

  // const isValid = () => {
  //   const validations = {
  //     question1: question1 !== "",
  //     question2: question2 !== "",
  //     question3: question3 !== "",
  //     question4: question4 !== "",
  //   };

  //   setValidationErrors(validations);

  //   return Object.values(validations).every((isValid) => isValid);
  // };

  // const handleChange = useCallback((e) => {
  //   const { name, value } = e.target;
  //   switch (name) {
  //     case "question1":
  //       setQuestion1(value);
  //       break;
  //     case "question2":
  //       setQuestion2(value);
  //       break;
  //     case "question3":
  //       setQuestion3(value);
  //       break;
  //     case "question4":
  //       setQuestion4(value);
  //       break;
  //     default:
  //       break;
  //   }
  // }, []);

  // const handleSubmit = (e) => {
  //   if (isValid()) {
  //     e.preventDefault();
  //     const formData = {
  //       question1: question1,
  //       question2: question2,
  //       question3: question3,
  //       question4: question4,
  //     };
  //     console.log(formData);

  //     setQuestion1("");
  //     setQuestion2("");
  //     setQuestion3("");
  //     setQuestion4("");

  //     closeModal();
  //   }
  // };

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

  // console.log("mobile", isMobile);
  // console.log("currentPage", currentPage);


  return (
    <>
      <Modal
        id="feedbackForm"
        customClass={"feedback-form__container"}
        slideDirection="right"
      >
        <form className="feedback-form" onSubmit={handleSubmit}>
          <InputTextarea
            name={"question1"}
            label={"What is LandExplorer helping you to do today?"}
            value={formValues.question1}
            onChange={handleChange}
            validation={() => isValid("question1")}
            error={isValidationErrorQ1 && errorMessage}
          />
          <InputTextarea
            name={"question2"}
            label={"What impact can this have for you and your community?"}
            value={formValues.question2}
            onChange={handleChange}
            validation={() => isValid("question2")}
            error={isValidationErrorQ2 && errorMessage}
          />
          <InputTextarea
            name={"question3"}
            label={"Who will benefit from this?"}
            value={formValues.question3}
            onChange={handleChange}
          />
          <InputTextarea
            name={"question4"}
            label={"What would make LandExplorer even better?"}
            value={formValues.question4}
            onChange={handleChange}
          />
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
              buttonAction={() => {}}
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );

  // return (
  //   <>
  //     <Modal
  //       id="feedbackForm"
  //       customClass={"feedback-form__container"}
  //       slideDirection="right"
  //     >
  //       <form className="feedback-form" onSubmit={handleSubmit}>
  //         {!isMobile ? (
  //           // Desktop Feedback Form
  //           <>
  //             <div className="feedback-form__head">
  //               <h1 className="feedback-form__title">
  //                 How are you using LandExplorer?
  //               </h1>
  //               <p className="feedback-form__copy">
  //                 We believe that information about land is powerful, and can
  //                 help people and communities to create real change. By letting
  //                 us know how you are using LandExplorer we can make a stronger
  //                 case from more data to be made public and available for
  //                 everyone.
  //               </p>
  //               <p className="feedback-form__copy">
  //                 We'll use this information to improve LandExplorer, gain
  //                 support for our work and campaign for publicly accessible
  //                 data. We will ensure that you and any groups you refer to
  //                 remain anonymous unless we gain your express permission via
  //                 email.
  //               </p>
  //             </div>
  // <InputTextarea
  //   name={"question1"}
  //   label={"What is LandExplorer helping you to do today?"}
  //   rows={textareaRows}
  //   onChange={handleChange}
  //   value={question1}
  //   error={isValidationErrorQ1 && errorMessage}
  //   validation={() => isValid("question1")}
  //   onBlur={() => setIsValidationErrorQ1(question1 === "")}
  // />
  //             <InputTextarea
  //               name={"question2"}
  //               label={"What impact can this have for you and your community?"}
  //               rows={textareaRows}
  //               onChange={handleChange}
  //               value={question2}
  //               error={isValidationErrorQ2 && errorMessage}
  //               validation={() => isValid("question2")}
  //               onBlur={() => setIsValidationErrorQ2(question2 === "")}
  //             />
  //             <div className="feedback-form__mobile-page">
  //               <InputTextarea
  //                 name={"question3"}
  //                 label={"Who will benefit from this?"}
  //                 rows={textareaRows}
  //                 onChange={handleChange}
  //                 value={question3}
  //                 error={isValidationErrorQ3 && errorMessage}
  //                 validation={() => isValid("question3")}
  //                 onBlur={() => setIsValidationErrorQ3(question3 === "")}
  //               />
  //               <InputTextarea
  //                 name={"question4"}
  //                 label={"What would make LandExplorer even better?"}
  //                 rows={textareaRows}
  //                 onChange={handleChange}
  //                 value={question4}
  //                 error={isValidationErrorQ4 && errorMessage}
  //                 validation={() => isValid("question4")}
  //                 onBlur={() => setIsValidationErrorQ4(question4 === "")}
  //               />
  //             </div>
  //           </>
  //         ) : (
  //           // Mobile Feedback Form
  //           <>
  //             <div className="feedback-form__mobile-page">
  //               {currentPage === 1 && (
  //                 // Mobile Feedback Form Page 1
  //                 <>
  //                   <div className="feedback-form__head">
  //                     <h1 className="feedback-form__title">
  //                       How are you using LandExplorer?
  //                     </h1>
  //                     <p className="feedback-form__copy">
  //                       <input
  //                         type="checkbox"
  //                         id="expandCollapse"
  //                         name="expandCollapse"
  //                       />
  //                       <span>
  //                         We believe that information about land is powerful,
  //                         and can help people and communities to create real
  //                         change. By letting us know how you are using
  //                         LandExplorer we can make a stronger case from more
  //                         data to be made public and available for everyone.
  //                       </span>
  //                       <span className="feedback-form__copy-expanded">
  //                         We'll use this information to improve LandExplorer,
  //                         gain support for our work and campaign for publicly
  //                         accessible data. We will ensure that you and any
  //                         groups you refer to remain anonymous unless we gain
  //                         your express permission via email.
  //                         <label
  //                           for="expandCollapse"
  //                           className="feedback-form__copy-collapse"
  //                         >
  //                           Show Less
  //                         </label>
  //                       </span>
  //                       <label
  //                         for="expandCollapse"
  //                         className="feedback-form__copy-expand"
  //                       >
  //                         Show More
  //                       </label>
  //                     </p>
  //                   </div>
  //                   <InputTextarea
  //                     name={"question1"}
  //                     label={"What is LandExplorer helping you to do today?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question1}
  //                     validation={() => isValid("question1")}
  //                     error={isValidationErrorQ1 && errorMessage}
  //                   />
  //                   <InputTextarea
  //                     name={"question2"}
  //                     label={
  //                       "What impact can this have for you and your community?"
  //                     }
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question2}
  //                     validation={() => isValid("question2")}
  //                     error={isValidationErrorQ2 && errorMessage}
  //                   />
  //                 </>
  //               )}
  //               {currentPage === 2 && (
  //                 // Mobile Feedback Form Page 2
  //                 <>
  //                   <InputTextarea
  //                     name={"question3"}
  //                     label={"Who will benefit from this?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question3}
  //                     validation={() => isValid("question3")}
  //                     error={isValidationErrorQ3 && errorMessage}
  //                   />
  //                   <InputTextarea
  //                     name={"question4"}
  //                     label={"What would make LandExplorer even better?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question4}
  //                     validation={() => isValid("question4")}
  //                     error={isValidationErrorQ4 && errorMessage}
  //                   />
  //                 </>
  //               )}
  //             </div>
  //             {/* Mobile Pagination & Button Group */}

  //             <div className="feedback-form__mobile-page-bottom">
  //               {/* Pagination */}
  //               <ul className="feedback-form__pagingation">
  //                 <li>
  //                   <button
  //                     className={`feedback-form__pagination-button previous ${
  //                       currentPage === 1 ? "disabled" : ""
  //                     }`}
  //                     type="button"
  //                     onClick={previousPage}
  //                   />
  //                 </li>
  //                 <li
  //                   className={`feedback-form__pagination-number ${
  //                     currentPage === 1 ? "selected" : ""
  //                   }`}
  //                 >
  //                   1
  //                 </li>
  //                 <li>|</li>
  //                 <li
  //                   className={`feedback-form__pagination-number ${
  //                     currentPage === 2 ? "selected" : ""
  //                   }`}
  //                 >
  //                   2
  //                 </li>
  //                 <li>
  //                   <button
  //                     className={`feedback-form__pagination-button next ${
  //                       currentPage === 2 ? "disabled" : ""
  //                     }`}
  //                     type="button"
  //                     onClick={nextPage}
  //                   />
  //                 </li>
  //               </ul>
  //               {/* Page 1 Buttons */}
  //               {isMobile && currentPage === 1 && (
  //                 <div className="feedback-form__button-group">
  //                   <Button
  //                     buttonClass={"button-new grey full-width"}
  //                     type={"button"}
  //                     buttonAction={() => closeModal()}
  //                   >
  //                     Cancel
  //                   </Button>
  //                   <Button
  //                     buttonClass={"button-new blue full-width"}
  //                     type={"button"}
  //                     buttonAction={() => nextPage()}
  //                   >
  //                     Next
  //                   </Button>
  //                 </div>
  //               )}
  //               {/* Page 2 Buttons */}
  //               {isMobile && currentPage === 2 && (
  //                 <div className="feedback-form__button-group">
  //                   <Button
  //                     buttonClass={"button-new green full-width"}
  //                     type={"submit"}
  //                     buttonAction={() => {}}
  //                   >
  //                     Submit
  //                   </Button>
  //                 </div>
  //               )}
  //             </div>
  //           </>
  //         )}

  //         {/* Desktop Button Group */}
  //         {!isMobile && (
  // <div className="feedback-form__button-group">
  //   <Button
  //     buttonClass={"button-new grey full-width"}
  //     type={"button"}
  //     buttonAction={() => closeModal()}
  //   >
  //     Cancel
  //   </Button>
  //   <Button
  //     buttonClass={"button-new green full-width"}
  //     type={"submit"}
  //     buttonAction={() => {}}
  //   >
  //     Submit
  //   </Button>
  // </div>
  //         )}
  //       </form>
  //     </Modal>
  //   </>
  // );
  // return (
  //   <>
  //     <Modal
  //       id="feedbackForm"
  //       customClass={"feedback-form__container"}
  //       slideDirection="right"
  //     >
  //       <form className="feedback-form" onSubmit={handleSubmit}>
  //         {!isMobile ? (
  //           // Desktop Feedback Form
  //           <>
  //             <div className="feedback-form__head">
  //               <h1 className="feedback-form__title">
  //                 How are you using LandExplorer?
  //               </h1>
  //               <p className="feedback-form__copy">
  //                 We believe that information about land is powerful, and can
  //                 help people and communities to create real change. By letting
  //                 us know how you are using LandExplorer we can make a stronger
  //                 case from more data to be made public and available for
  //                 everyone.
  //               </p>
  //               <p className="feedback-form__copy">
  //                 We'll use this information to improve LandExplorer, gain
  //                 support for our work and campaign for publicly accessible
  //                 data. We will ensure that you and any groups you refer to
  //                 remain anonymous unless we gain your express permission via
  //                 email.
  //               </p>
  //             </div>
  //             <InputTextarea
  //               name={"question1"}
  //               label={"What is LandExplorer helping you to do today?"}
  //               rows={textareaRows}
  //               onChange={handleChange}
  //               value={question1}
  //               validation={() => isValid(question1)}
  //               error={question1 && errorMessage}
  //               onBlur={() => setValidationErrors({ ...validationErrors, question1: question1 === "" })}
  //             />

  //             <InputTextarea
  //               name={"question2"}
  //               label={"What impact can this have for you and your community?"}
  //               rows={textareaRows}
  //               onChange={handleChange}
  //               value={question2}
  //               validation={() => isValid()}
  //               error={validationErrors.question2 && errorMessage}
  //             />
  //             <div className="feedback-form__mobile-page">
  //               <InputTextarea
  //                 name={"question3"}
  //                 label={"Who will benefit from this?"}
  //                 rows={textareaRows}
  //                 onChange={handleChange}
  //                 value={question3}
  //                 validation={() => isValid()}
  //                 error={validationErrors.question3 && errorMessage}
  //               />
  //               <InputTextarea
  //                 name={"question4"}
  //                 label={"What would make LandExplorer even better?"}
  //                 rows={textareaRows}
  //                 onChange={handleChange}
  //                 value={question4}
  //                 validation={() => isValid()}
  //                 error={validationErrors.question4 && errorMessage}
  //               />
  //             </div>
  //           </>
  //         ) : (
  //           // Mobile Feedback Form
  //           <>
  //             <div className="feedback-form__mobile-page">
  //               {currentPage === 1 && (
  //                 // Mobile Feedback Form Page 1
  //                 <>
  //                   <div className="feedback-form__head">
  //                     <h1 className="feedback-form__title">
  //                       How are you using LandExplorer?
  //                     </h1>
  //                     <p className="feedback-form__copy">
  //                       <input
  //                         type="checkbox"
  //                         id="expandCollapse"
  //                         name="expandCollapse"
  //                       />
  //                       <span>
  //                         We believe that information about land is powerful,
  //                         and can help people and communities to create real
  //                         change. By letting us know how you are using
  //                         LandExplorer we can make a stronger case from more
  //                         data to be made public and available for everyone.
  //                       </span>
  //                       <span className="feedback-form__copy-expanded">
  //                         We'll use this information to improve LandExplorer,
  //                         gain support for our work and campaign for publicly
  //                         accessible data. We will ensure that you and any
  //                         groups you refer to remain anonymous unless we gain
  //                         your express permission via email.
  //                         <label
  //                           for="expandCollapse"
  //                           className="feedback-form__copy-collapse"
  //                         >
  //                           Show Less
  //                         </label>
  //                       </span>
  //                       <label
  //                         for="expandCollapse"
  //                         className="feedback-form__copy-expand"
  //                       >
  //                         Show More
  //                       </label>
  //                     </p>
  //                   </div>
  //                   <InputTextarea
  //                     name={"question1"}
  //                     label={"What is LandExplorer helping you to do today?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question1}
  //                     validation={() => isValid("question1")}
  //                     error={isValidationErrorQ1 && errorMessage}
  //                   />
  //                   <InputTextarea
  //                     name={"question2"}
  //                     label={
  //                       "What impact can this have for you and your community?"
  //                     }
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question2}
  //                     validation={() => isValid("question2")}
  //                     error={isValidationErrorQ2 && errorMessage}
  //                   />
  //                 </>
  //               )}
  //               {currentPage === 2 && (
  //                 // Mobile Feedback Form Page 2
  //                 <>
  //                   <InputTextarea
  //                     name={"question3"}
  //                     label={"Who will benefit from this?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question3}
  //                     validation={() => isValid("question3")}
  //                     error={isValidationErrorQ3 && errorMessage}
  //                   />
  //                   <InputTextarea
  //                     name={"question4"}
  //                     label={"What would make LandExplorer even better?"}
  //                     rows={textareaRows}
  //                     onChange={handleChange}
  //                     value={question4}
  //                     validation={() => isValid("question4")}
  //                     error={isValidationErrorQ4 && errorMessage}
  //                   />
  //                 </>
  //               )}
  //             </div>
  //             {/* Mobile Pagination & Button Group */}

  //             <div className="feedback-form__mobile-page-bottom">
  //               {/* Pagination */}
  //               <ul className="feedback-form__pagingation">
  //                 <li>
  //                   <button
  //                     className={`feedback-form__pagination-button previous ${
  //                       currentPage === 1 ? "disabled" : ""
  //                     }`}
  //                     type="button"
  //                     onClick={previousPage}
  //                   />
  //                 </li>
  //                 <li
  //                   className={`feedback-form__pagination-number ${
  //                     currentPage === 1 ? "selected" : ""
  //                   }`}
  //                 >
  //                   1
  //                 </li>
  //                 <li>|</li>
  //                 <li
  //                   className={`feedback-form__pagination-number ${
  //                     currentPage === 2 ? "selected" : ""
  //                   }`}
  //                 >
  //                   2
  //                 </li>
  //                 <li>
  //                   <button
  //                     className={`feedback-form__pagination-button next ${
  //                       currentPage === 2 ? "disabled" : ""
  //                     }`}
  //                     type="button"
  //                     onClick={nextPage}
  //                   />
  //                 </li>
  //               </ul>
  //               {/* Page 1 Buttons */}
  //               {isMobile && currentPage === 1 && (
  //                 <div className="feedback-form__button-group">
  //                   <Button
  //                     buttonClass={"button-new grey full-width"}
  //                     type={"button"}
  //                     buttonAction={() => closeModal()}
  //                   >
  //                     Cancel
  //                   </Button>
  //                   <Button
  //                     buttonClass={"button-new blue full-width"}
  //                     type={"button"}
  //                     buttonAction={() => nextPage()}
  //                   >
  //                     Next
  //                   </Button>
  //                 </div>
  //               )}
  //               {/* Page 2 Buttons */}
  //               {isMobile && currentPage === 2 && (
  //                 <div className="feedback-form__button-group">
  //                   <Button
  //                     buttonClass={"button-new green full-width"}
  //                     type={"submit"}
  //                     buttonAction={() => {}}
  //                   >
  //                     Submit
  //                   </Button>
  //                 </div>
  //               )}
  //             </div>
  //           </>
  //         )}

  //         {/* Desktop Button Group */}
  //         {!isMobile && (
  //           <div className="feedback-form__button-group">
  //             <Button
  //               buttonClass={"button-new grey full-width"}
  //               type={"button"}
  //               buttonAction={() => closeModal()}
  //             >
  //               Cancel
  //             </Button>
  //             <Button
  //               buttonClass={"button-new green full-width"}
  //               type={"submit"}
  //               buttonAction={() => {}}
  //             >
  //               Submit
  //             </Button>
  //           </div>
  //         )}
  //       </form>
  //     </Modal>
  //   </>
  // );
};

export default FeedbackForm;
