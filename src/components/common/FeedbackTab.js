import React from "react";
import Button from "../common/Button";
import { openModal } from "../../actions/ModalActions";
import { useDispatch } from "react-redux";

const FeedbackTab = () => {
  const dispatch = useDispatch();
  return (
    <Button
      buttonClass={"feedback-tab green"}
      buttonAction={() => dispatch(openModal("feedbackForm"))}
      // buttonAction={() => dispatch(openModal("feedbackPopUp"))}
      type={"button"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 17.874 16.109"
        className="feedback-icon"
      >
        <g transform="matrix(0.946, -0.326, 0.326, 0.946, 0, 4.472)">
          <path
            id="Path_18"
            data-name="Path 18"
            d="M.808,0,0,.8A2.85,2.85,0,0,1,.836,2.818,2.85,2.85,0,0,1,0,4.832l.808.808A3.98,3.98,0,0,0,1.976,2.822,3.989,3.989,0,0,0,.808,0Z"
            transform="translate(11.434 2.217)"
          />
          <path
            id="Path_19"
            data-name="Path 19"
            d="M.794,0,0,.794A5.05,5.05,0,0,1,1.479,4.371,5.048,5.048,0,0,1,0,7.948l.794.794A6.19,6.19,0,0,0,2.6,4.371,6.175,6.175,0,0,0,.794,0Z"
            transform="translate(13.059 0.664)"
          />
          <path
            id="Path_20"
            data-name="Path 20"
            d="M10.07,3.64V0H8.951L5.594,2.8H1.119L0,3.357V7.273l1.119.559,2.8,4.476H5.594L4.545,7.832H5.594L8.951,10.07H10.07V6.43a1.325,1.325,0,0,0,1.119-1.4A1.325,1.325,0,0,0,10.07,3.64Z"
          />
        </g>
      </svg>
      <span className="feedback-text">Feedback</span>
    </Button>
  );
};

export default FeedbackTab;
