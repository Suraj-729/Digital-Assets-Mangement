// import React from "react";
// import "../css/mvpStyle.css";
// import ScrollToTopButton from "./ScrollToTopButton";

// const ProgressBar = ({ steps, currentStep, onStepClick }) => (
//   <div style={{ position: "relative" }}>
//     <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
//       {steps.map((step, idx) => (
//         <li
//           key={step}
//           className={idx === currentStep ? "active" : ""}
//           onClick={() => onStepClick && onStepClick(idx)}
//           style={{ cursor: "pointer" }}
//         >
//           {step}
//         </li>
//       ))}
//     </ul>
//     <ScrollToTopButton />
//   </div>
// );

// export default ProgressBar;
import React from "react";
import "../css/mvpStyle.css";
import ScrollToTopButton from "./ScrollToTopButton";
import { toast } from "react-toastify";

const ProgressBar = ({ steps, currentStep, onStepClick, completedSteps = [] }) => {
  const handleStepClick = (targetIndex) => {
    if (!onStepClick) return;

    // Ensure completedSteps has fallback for all indices
    for (let i = 0; i < targetIndex; i++) {
      if (!completedSteps[i]) {
        toast.error("Please complete  THIS  before proceeding.");
        return;
      }
    }

    onStepClick(targetIndex);
  };

  return (
    <div style={{ position: "relative" }}>
      <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
        {steps.map((step, idx) => (
          <li
            key={step}
            className={idx === currentStep ? "active" : completedSteps[idx] ? "completed" : ""}
            onClick={() => handleStepClick(idx)}
            style={{
              cursor: completedSteps[idx] || idx <= currentStep ? "pointer" : "not-allowed",
              opacity: idx > currentStep && !completedSteps[idx] ? 0.6 : 1,
            }}
          >
            {step}
          </li>
        ))}
      </ul>
      <ScrollToTopButton />
    </div>
  );
};

export default ProgressBar;

