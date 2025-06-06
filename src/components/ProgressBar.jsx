import React from "react";

const ProgressBar = ({ steps, currentStep }) => (
  <ul id="progressbar" className="list-unstyled d-flex justify-content-between">
    {steps.map((step, idx) => (
      <li key={step} className={idx === currentStep ? "active" : ""}>{step}</li>
    ))}
  </ul>
);

export default ProgressBar;