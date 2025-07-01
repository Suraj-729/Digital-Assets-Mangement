
import React from "react";

const ProgressBar = ({ steps, currentStep, onStepClick }) => (
  <div className="progress-bar-container" style={{ display: "flex" }}>
    {steps.map((step, idx) => {
      let bgColor = "#444"; // default
      if (idx < currentStep) bgColor = "#0099cc"; // completed (green)
      else if (idx === currentStep) bgColor = "#0099cc"; // active (blue)

      return (
        <div
          key={step}
          className={`progress-step${idx === currentStep ? " active" : ""}${idx < currentStep ? " completed" : ""}`}
          style={{
            flex: 1,
            textAlign: "center",
            cursor: "pointer",
            background: bgColor,
            color: "#fff",
            padding: "16px 0",
            fontWeight: "bold",
            borderRight: idx < steps.length - 1 ? "2px solid #888" : "none",
            transition: "background 0.2s"
          }}
          onClick={() => typeof onStepClick === "function" && onStepClick(idx)}
        >
          {step}
        </div>
      );
    })}
  </div>
);

export default ProgressBar;