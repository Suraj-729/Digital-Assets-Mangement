import React from "react";
import "../css/mvpStyle.css";
import ScrollToTopButton from "./ScrollToTopButton";

const ProgressBar = ({ steps, currentStep, onStepClick }) => (
  <div style={{ position: "relative" }}>
    <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
      {steps.map((step, idx) => (
        <li
          key={step}
          className={idx === currentStep ? "active" : ""}
          onClick={() => onStepClick && onStepClick(idx)}
          style={{ cursor: "pointer" }}
        >
          {step}
        </li>
      ))}
    </ul>
    <ScrollToTopButton />
  </div>
);

export default ProgressBar;
// import React from "react";
// import "../css/mvpStyle.css";
// import ScrollToTopButton from "./ScrollToTopButton";
// import { toast } from "react-toastify";

// const ProgressBar = ({ steps, currentStep, onStepClick, completedSteps = [] }) => {
//   const handleStepClick = (targetIndex) => {
//     if (!onStepClick) return;

//     // Ensure completedSteps has fallback for all indices
//     for (let i = 0; i < targetIndex; i++) {
//       if (!completedSteps[i]) {
//         toast.error("Please complete  THIS  before proceeding.");
//         return;
//       }
//     }

//     onStepClick(targetIndex);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
//         {steps.map((step, idx) => (
//           <li
//             key={step}
//             className={idx === currentStep ? "active" : completedSteps[idx] ? "completed" : ""}
//             onClick={() => handleStepClick(idx)}
//             style={{
//               cursor: completedSteps[idx] || idx <= currentStep ? "pointer" : "not-allowed",
//               opacity: idx > currentStep && !completedSteps[idx] ? 0.6 : 1,
//             }}
//           >
//             {step}
//           </li>
//         ))}
//       </ul>
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default ProgressBar;


// import React from "react";
// import "../css/mvpStyle.css";
// import ScrollToTopButton from "./ScrollToTopButton";
// import { toast } from "react-toastify";

// const ProgressBar = ({ steps, currentStep, onStepClick, completedSteps = [] }) => {
//   const isStepCompleted = (index) => completedSteps.includes(index);

//   const handleStepClick = (targetIndex) => {
//     if (!onStepClick) return;

//     // Allow backward navigation, block only forward if previous incomplete
//     if (targetIndex > currentStep) {
//       for (let i = 0; i < targetIndex; i++) {
//         if (!isStepCompleted(i)) {
//           toast.error(`Please complete Step ${i + 1} before moving to Step ${targetIndex + 1}`);
//           return;
//         }
//       }
//     }

//     onStepClick(targetIndex);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
//         {steps.map((step, idx) => {
//           const isActive = idx === currentStep;
//           const isCompleted = isStepCompleted(idx);
//           const canClick = isCompleted || idx < currentStep || idx === currentStep;

//           return (
//             <li
//               key={step}
//               className={`${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
//               onClick={() => canClick && handleStepClick(idx)}
//               style={{
//                 cursor: canClick ? "pointer" : "not-allowed",
//                 opacity: !canClick ? 0.5 : 1,
//                 transition: "opacity 0.3s",
//               }}
//             >
//               {step}
//             </li>
//           );
//         })}
//       </ul>
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default ProgressBar;


