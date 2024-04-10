import { useState, useEffect } from "react";

const useStringToClassName = (inputString) => {
  const [formattedString, setFormattedString] = useState("");

  useEffect(() => {
    const formattedClassName = inputString
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s]/gi, "-") // Remove special characters except for underscores
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[-]+/g, "-") // Replace consecutive hyphens with a single hyphen
      // .replace(/[\/\\]+/g, "-") // Replace slashes with hyphens
      .trim(); // Trim leading and trailing spaces

    setFormattedString(formattedClassName);
  }, [inputString]);

  return formattedString;
};

export default useStringToClassName;
