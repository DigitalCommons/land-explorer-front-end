import React from "react";
import TopBar from "../top-bar/TopBar";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }) => {
  return (
    <>
      <TopBar limited={true} />
      <div className="error-page">
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
      </div>
    </>
  );
};

export default ErrorFallback;
