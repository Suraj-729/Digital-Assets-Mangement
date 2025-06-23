import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import StepBasicProfile from "./StepBasicProfile";
import StepSecurityAudit from "./StepSecurityAudit";
import StepTechnologyStack from "./StepTechnologyStack";
import StepInfrastructure from "./StepInfrastructure";
import api from "../Api";
import "../css/mvpStyle.css";

const steps = [
  "Basic Profile",
  "Security Audit",
  "Technology Stack",
  "Infrastructure",
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [gitUrls, setGitUrls] = useState([]);
  const [vaRecords, setVaRecords] = useState([]);
  const [auditRecords, setAuditRecords] = useState([]);
  
  // Technology Stack state
  const [usedTech, setUsedTech] = useState([]);
  const [usedDb, setUsedDb] = useState([]);
  const [usedOs, setUsedOs] = useState([]);
  const [usedOsVersion, setUsedOsVersion] = useState([]);
  const [usedRepo, setUsedRepo] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const onAddGitUrl = () => {
    if (formData.gitUrl) {
      setGitUrls([...gitUrls, formData.gitUrl]);
      setFormData((prev) => ({ ...prev, gitUrl: "" }));
    }
  };

  const onDeleteGitUrl = (idx) => {
    setGitUrls(gitUrls.filter((_, i) => i !== idx));
  };

  const onVaFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      vaReport: e.target.files[0],
    }));
  };

  const onAddVa = () => {
    if (!formData.ipAddress) {
      alert("IP Address is required");
      return;
    }

    const newRecord = {
      ipAddress: formData.ipAddress,
      purposeOfUse: formData.purposeOfUse || "Application Server",
      vaScore: formData.vaScore,
      dateOfVA: formData.dateOfVA,
      vaReport: formData.vaReport?.name || null,
    };

    setVaRecords([...vaRecords, newRecord]);

    // Clear fields
    setFormData((prev) => ({
      ...prev,
      ipAddress: "",
      vaScore: "",
      dateOfVA: "",
      vaReport: null,
    }));
  };

  const onDeleteVa = (idx) => {
    setVaRecords(vaRecords.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Build sectioned data
      const BP = {
        name: formData.projectName,
        prismId: formData.prismId,
        deptname: formData.departmentName,
        url: formData.url,
        public_ip: formData.publicIp,
        HOD: formData.HOD,
        nodalofficerNIC: {
          Name: formData.nicOfficerName,
          Emp_code: formData.nicOfficerEmpCode,
          Mob: formData.nicOfficerMob,
          Email: formData.nicOfficerEmail,
        },
        nodalofficerDept: {
          Name: formData.deptOfficerName,
          Designation: formData.deptOfficerDesignation,
          Mob: formData.deptOfficerMob,
          Email: formData.deptOfficerEmail,
        },
      };

      const SA = {
        securityAudit: auditRecords.map((record, idx) => ({
          "Sl no": idx + 1,
          typeOfAudit: record.typeOfAudit,
          auditingAgency: record.auditingAgency,
          auditDate: record.auditDate ? new Date(record.auditDate) : null,
          expireDate: record.expireDate ? new Date(record.expireDate) : null,
          tlsNextExpiry: record.nextExpireDate ? new Date(record.nextExpireDate) : null,
          sslLabScore: record.sslLabScore,
          certificate: record.certificate,
        })),
      };

      const TS = {
        frontEnd: usedTech,
        framework: formData.framework,
        database: usedDb,
        os: usedOs,
        osVersion: usedOsVersion,
        repoUrls: usedRepo,
      };

      const Infra = {
        typeOfServer: formData.typeOfServer,
        dataCentre: formData.dataCentre,
        deployment: formData.deployment,
        location: formData.location,
        gitUrls: gitUrls,
        vaRecords: vaRecords.map((record) => ({
          ipAddress: record.ipAddress,
          purposeOfUse: record.purposeOfUse,
          vaScore: record.vaScore,
          dateOfVA: record.dateOfVA,
          vaReport: record.vaReport,
        })),
      };

      form.append("BP", JSON.stringify(BP));
      form.append("SA", JSON.stringify(SA));
      form.append("TS", JSON.stringify(TS));
      form.append("Infra", JSON.stringify(Infra));

      if (formData.certificate) {
        form.append("certificate", formData.certificate);
      }

      const response = await api.post("/assets/createAsset", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Asset successfully created!");
      console.log(response.data);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error creating asset. Check console for details.");
    }
  };

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
        return (
          <StepSecurityAudit
            formData={formData}
            onChange={handleChange}
            auditRecords={auditRecords}
            setAuditRecords={setAuditRecords}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <StepTechnologyStack
            formData={formData}
            onChange={handleChange}
            onPrevious={handlePrevious}
            onNext={handleNext}
            usedTech={usedTech}
            setUsedTech={setUsedTech}
            usedDb={usedDb}
            setUsedDb={setUsedDb}
            usedOs={usedOs}
            setUsedOs={setUsedOs}
            usedOsVersion={usedOsVersion}
            setUsedOsVersion={setUsedOsVersion}
            usedRepo={usedRepo}
            setUsedRepo={setUsedRepo}
          />
        );
      case 3:
        return (
          <StepInfrastructure
            formData={formData}
            onChange={handleChange}
            onPrevious={handlePrevious}
            onAddGitUrl={onAddGitUrl}
            onDeleteGitUrl={onDeleteGitUrl}
            gitUrls={gitUrls}
            vaRecords={vaRecords}
            onVaFileChange={onVaFileChange}
            onAddVa={onAddVa}
            onDeleteVa={onDeleteVa}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container mt-5">
      <form id="msform" onSubmit={handleSubmit}>
        <ProgressBar steps={steps} currentStep={currentStep} />
        {renderStep()}
      </form>
    </div>
  );
};

export default MultiStepForm;