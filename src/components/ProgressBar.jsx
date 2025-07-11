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