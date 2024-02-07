import { useState } from "react";

const useFeedbackForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  // State for tracking which fields have been touched
  const [touchedFields, setTouchedFields] = useState({});
  // State for tracking whether the form has been submitted or attempted submission
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form field changes
  const handleFieldChange = (fieldName, value) => {
    // Update the form data state
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    // Update the touched fields state
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  // Function to handle form field blurs
  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  // Function to check if a field is valid
  const isFieldValid = (fieldName) => {
    // If the field has not been touched or submitted while empty, it is not valid
    return submitted || touchedFields[fieldName]
      ? formData[fieldName].trim() !== ""
      : false;
  };

  // Function to check if the form is valid
  const isFormValid = () => {
    // Check if all fields are valid
    return Object.keys(formData).every((fieldName) => isFieldValid(fieldName));
  };

  // Function to reset the form state
  const resetForm = () => {
    setFormData({
      question1: "",
      question2: "",
      question3: "",
      question4: "",
    });
    setTouchedFields({});
    setSubmitted(false);
  };

  // Function to set the form as submitted
  const setFormSubmitted = () => {
    setSubmitted(true);
  };

  // Return the data and functions for the component to use
  return {
    formData,
    touchedFields,
    handleFieldChange,
    handleFieldBlur,
    isFieldValid,
    isFormValid,
    resetForm,
    setFormSubmitted,
    submitted,
  };
};

export default useFeedbackForm;
