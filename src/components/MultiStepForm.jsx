import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepBasicProfile from "./StepBasicProfile";
import StepSecurityAudit from "./StepSecurityAudit";
import StepTechnologyStack from "./StepTechnologyStack";
import StepInfrastructure from "./StepInfrastructure";
import "../css/mvpStyle.css";
const steps = [
  "Basic Profile",
  "Security Audit",
  "Technology Stack",
  "Infrastructure"
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrevious = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepBasicProfile
            formData={formData}
            onChange={handleChange}
            onNext={handleNext}
          />
        );
      case 1:
        return <StepSecurityAudit 
            formData={formData}
            onChange={handleChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
         />;
      case 2:
        return <StepTechnologyStack 
           formData={formData}
            onChange={handleChange}
            onPrevious={handlePrevious}
            onNext={handleNext}/>;
      case 3:
        return (
          <StepInfrastructure
            formData={formData}
            onChange={handleChange}
            onPrevious={handlePrevious}
            // ...other props
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container mt-5">
      <form id="msform">
        <ProgressBar steps={steps} currentStep={currentStep} />
        {renderStep()}
        {/* Add navigation buttons here */}
      </form>
    </div>
  );
};

export default MultiStepForm;