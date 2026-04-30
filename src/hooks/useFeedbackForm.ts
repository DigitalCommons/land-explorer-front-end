import { useState } from "react";

type FormData = {
  question_use_case: string;
  question_impact: string;
  question_who_benefits: string;
  question_improvements: string;
};

const useFeedbackForm = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    question_use_case: "",
    question_impact: "",
    question_who_benefits: "",
    question_improvements: "",
  });

  // State for tracking which fields have been touched
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  // State for tracking whether the form has been submitted or attempted submission
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form field changes
  const handleFieldChange = (fieldName: string, value: string) => {
    // Update the form data state
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    // Update the touched fields state
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  // Function to handle form field blurs
  const handleFieldBlur = (fieldName: string) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };

  // Function to check if a field is valid
  const isFieldValid = (fieldName: keyof FormData) => {
    // If the field has not been touched or submitted while empty, it is not valid
    return submitted || touchedFields[fieldName]
      ? formData[fieldName].trim() !== ""
      : false;
  };

  // Function to check if the form is valid
  const isFormValid = () => {
    // Check if all fields are valid
    return (Object.keys(formData) as (keyof FormData)[]).every((fieldName) =>
      isFieldValid(fieldName)
    );
  };

  // Function to reset the form state
  const resetForm = () => {
    setFormData({
      question_use_case: "",
      question_impact: "",
      question_who_benefits: "",
      question_improvements: "",
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
