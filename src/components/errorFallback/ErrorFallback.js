import React from "react";
import TopBar from "../top-bar/TopBar";
import Button from "../common/Button";

const ErrorFallback = ({ error }) => {
  console.log("Boundary Error", error);
  return (
    <>
      <TopBar limited={true} />
      <div className="error-page">
        <h1>Oops! Something went wrong...</h1>
        <Button
          buttonClass={"button-new blue"}
          type={"button"}
          buttonAction={() => {
            window.location = "/app";
          }}
        >
          Back to LandExplorer
        </Button>
      </div>
    </>
  );
};

export default ErrorFallback;
