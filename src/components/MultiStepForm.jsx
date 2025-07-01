import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import StepBasicProfile from "./StepBasicProfile";
import StepSecurityAudit from "./StepSecurityAudit";
import StepTechnologyStack from "./StepTechnologyStack";
import StepInfrastructure from "./StepInfrastructure";
import api from "../Api";
import "../css/mvpStyle.css";

// ✅ Added: Import motion and AnimatePresence
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Basic Profile", "Security Audit", "Technology Stack", "Infrastructure"];

const MultiStepForm = ({ editData, onEditComplete }) => {
  const [formData, setFormData] = useState({});
  const [gitUrls, setGitUrls] = useState([]);
  const [vaRecords, setVaRecords] = useState([]);
  const [auditRecords, setAuditRecords] = useState([]);

  const [usedTech, setUsedTech] = useState([]);
  const [usedDb, setUsedDb] = useState([]);
  const [usedOs, setUsedOs] = useState([]);
  const [usedOsVersion, setUsedOsVersion] = useState([]);
  const [usedRepo, setUsedRepo] = useState([]);

  // Add this line to fix the currentStep/setCurrentStep errors
  const [currentStep, setCurrentStep] = useState(0);

  // ...rest of




  const [formState, setFormState] = useState(editData || {});

  // useEffect(() => {
  //   if (editData) {
  //     const bp = editData.BP || editData;
  //     const nodalNIC = bp.nodalofficerNIC || bp.nodalOfficerNIC || {};
  //     const nodalDept = bp.nodalofficerDept || bp.nodalOfficerDept || {};

  //     setFormData({
  //       // Basic Profile
  //       assetsId: editData.assetsId || bp.assetsId || "",
  //       projectName: editData.projectName || bp.name || "",
  //       prismId: bp.prismid || bp.prismId || "",
  //       departmentName: bp.deptName || bp.departmentName || "",
  //       url: bp.url || "",
  //       publicIp: bp.publicIp || bp.public_ip || "",
  //       HOD: bp.HOD || "",
  //       // Nodal Officer from NIC
  //       nicOfficerName: nodalNIC.name || "",
  //       nicOfficerEmpCode: nodalNIC.empCode || "",
  //       nicOfficerMob: nodalNIC.mobile || "",
  //       nicOfficerEmail: nodalNIC.email || "",
  //       // Nodal Officer from Department
  //       deptOfficerName: nodalDept.name || "",
  //       deptOfficerDesignation: nodalDept.designation || "",
  //       deptOfficerMob: nodalDept.mobile || "",
  //       deptOfficerEmail: nodalDept.email || "",
  //       // Security Audit (single fields if any)
  //       certificate: editData.SA?.securityAudit?.[0]?.certificate || "",
  //       // Technology Stack
  //       framework: editData.TS?.framework || "",
  //       // Infrastructure
  //       typeOfServer: editData.Infra?.typeOfServer || "",
  //       dataCentre: editData.Infra?.dataCentre || "",
  //       deployment: editData.Infra?.deployment || "",
  //       location: editData.Infra?.location || "",
  //       // VA fields (for adding new VA record)
  //       ipAddress: "",
  //       purposeOfUse: "",
  //       vaScore: "",
  //       dateOfVA: "",
  //       vaReport: null,
  //       // Git URL (for adding new git url)
  //       gitUrl: "",
  //     });
  //     setUsedTech(editData.TS?.frontEnd || []);
  //     setUsedDb(editData.TS?.database || []);
  //     setUsedOs(editData.TS?.os || []);
  //     setUsedOsVersion(editData.TS?.osVersion || []);
  //     setUsedRepo(editData.TS?.repoUrls || []);
  //     setGitUrls(editData.Infra?.gitUrls || []);
  //     setVaRecords(editData.Infra?.vaRecords || []);
  //     setAuditRecords(editData.SA?.securityAudit || []);
  //   }
  // }, [editData]);

  useEffect(() => {
    if (editData) {
      const bp = editData.BP || editData;
      const nodalNIC = bp.nodalofficerNIC || bp.nodalOfficerNIC || {};
const nodalDept = bp.nodalofficerDept || bp.nodalOfficerDept || {};
      const firstAudit = editData.SA?.securityAudit?.[0] || {};

      setFormData({
        // Basic Profile
        assetsId: editData.assetsId || bp.assetsId || "",
        projectName: editData.projectName || bp.name || "",
        prismId: bp.prismid || bp.prismId || "",
        departmentName: bp.deptName || bp.departmentName || "",
        url: bp.url || "",
        publicIp: bp.publicIp || bp.public_ip || "",
        HOD: bp.HOD || "",
        // Nodal Officer from NIC
        nicOfficerName: nodalNIC.name || "",
        nicOfficerEmpCode: nodalNIC.empCode || "",
        nicOfficerMob: nodalNIC.mobile || "",
        nicOfficerEmail: nodalNIC.email || "",
        // Nodal Officer from Department
        deptOfficerName: nodalDept.name || "",
        deptOfficerDesignation: nodalDept.designation || "",
        deptOfficerMob: nodalDept.mobile || "",
        deptOfficerEmail: nodalDept.email || "",
        // Security Audit (first record fields)
        typeOfAudit: firstAudit.typeOfAudit || "",
        auditingAgency: firstAudit.auditingAgency || "",
        auditDate: firstAudit.auditDate
          ? firstAudit.auditDate.slice(0, 10)
          : "",
        expireDate: firstAudit.expireDate
          ? firstAudit.expireDate.slice(0, 10)
          : "",
        tlsNextExpiry: firstAudit.tlsNextExpiry
          ? firstAudit.tlsNextExpiry.slice(0, 10)
          : "",
        sslLabScore: firstAudit.sslLabScore || "",
        certificate: firstAudit.certificate || "",
        // Technology Stack
        framework: editData.TS?.framework || "",
        // Infrastructure
        typeOfServer: editData.Infra?.typeOfServer || "",
        dataCentre: editData.Infra?.dataCentre || "",
        deployment: editData.Infra?.deployment || "",
        location: editData.Infra?.location || "",
        // VA fields (for adding new VA record)
        ipAddress: "",
        purposeOfUse: "",
        vaScore: "",
        dateOfVA: "",
        vaReport: null,
        // Git URL (for adding new git url)
        gitUrl: "",
      });
      setUsedTech(editData.TS?.frontend ?? editData.TS?.frontEnd ?? []);
      setUsedDb(editData.TS?.database || []);
      setUsedOs(editData.TS?.os || []);
      setUsedOsVersion(editData.TS?.osVersion || []);
      setUsedRepo(editData.TS?.repoUrls || []);
      setGitUrls(editData.Infra?.gitUrls || []);
      setVaRecords(editData.Infra?.vaRecords || []);
      setAuditRecords(editData.SA?.securityAudit || []);
    }
  }, [editData]);
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
  const handleStepClick = (stepIndex) => setCurrentStep(stepIndex);

  const onAddGitUrl = () => {
    if (formData.gitUrl) {
      setGitUrls([...gitUrls, formData.gitUrl]);
      setFormData((prev) => ({ ...prev, gitUrl: "" }));
    }
  };

  const onDeleteGitUrl = (idx) => setGitUrls(gitUrls.filter((_, i) => i !== idx));

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

    setFormData((prev) => ({
      ...prev,
      ipAddress: "",
      vaScore: "",
      dateOfVA: "",
      vaReport: null,
    }));
  };

  const onDeleteVa = (idx) => setVaRecords(vaRecords.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      const employeeId = localStorage.getItem("employeeId");
      // Build sectioned data
      const BP = {
        assetsId: formData.assetsId,
        name: formData.projectName,
        prismId: formData.prismId,
        employeeId, // <-- Add this line
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
          tlsNextExpiry: record.nextExpireDate
            ? new Date(record.nextExpireDate)
            : null,
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

      if (editData && editData.projectName) {
        // EDIT: update by project name
        await api.put(
          `/assets/update/by-project-name/${encodeURIComponent(
            editData.projectName
          )}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Asset successfully updated!");
      } else {
        // CREATE: new asset
        await api.post("/assets/createAsset", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Asset successfully created!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting asset. Check console for details.");
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
    <div className="form-container ">
      <form id="msform" onSubmit={handleSubmit}>
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        {/* ✅ Added: AnimatePresence and motion.div for pop-in animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
};

export default MultiStepForm;
