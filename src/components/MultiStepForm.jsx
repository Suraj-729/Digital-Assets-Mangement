import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import StepBasicProfile from "./StepBasicProfile";
import StepSecurityAudit from "./StepSecurityAudit";
import StepTechnologyStack from "./StepTechnologyStack";
import StepInfrastructure from "./StepInfrastructure";
import StepTLSInfo from "./StepTLSInfo";
import DRForm from "./StepDRInfo";
import Header from "./layouts/HeaderDashboard";
import Sidebar from "./layouts/SidebarDashboard";
import { useNavigate } from "react-router-dom";

import api from "../Api";
import "../css/mvpStyle.css";
import { toast } from "react-toastify";

// ✅ Added: Import motion and AnimatePresence
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Basic Profile",
  "Security Audit",
  "TLS Info",
  "Technology Stack",
  "Infrastructure",
  "DR Info",
];

const MultiStepForm = ({ editData, onEditComplete }) => {
  const navigate = useNavigate();

  const [completedSteps, setCompletedSteps] = useState([
    true,
    false,
    false,
    false,
  ]);
  const [formData, setFormData] = useState({});
  const [gitUrls, setGitUrls] = useState([]);
  const [vaRecords, setVaRecords] = useState([]);
  const [auditRecords, setAuditRecords] = useState([]);

  const [usedTech, setUsedTech] = useState([]);
  const [usedDb, setUsedDb] = useState([]);
  const [usedOs, setUsedOs] = useState([]);
  const [usedOsVersion, setUsedOsVersion] = useState([]);
  const [usedRepo, setUsedRepo] = useState([]);
  const [usedFrameworks, setUsedFrameworks] = useState([]);
  // Add this line to fix the currentStep/setCurrentStep errors
  const [currentStep, setCurrentStep] = useState(0);

  // const [currentStep, setCurrentStep] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [formToShow, setFormToShow] = useState(null);
  const [tlsData, setTlsData] = useState([]);
  const [drFormData, setDrFormData] = useState({
    serverType: "",
    dataCentre: "",
    deployment: "",
    location: "",
    vaRecords: [], // Initialize with an empty array
  });
  const [drRecords, setDrRecords] = useState([]);

  useEffect(() => {
    if (editData) {
      const bp = editData.BP || editData;
      const nodalNIC = bp.nodalOfficerNIC || {};
      const nodalDept = bp.nodalOfficerDept || bp.nodalofficerDept || {};
      const audits = editData.SA?.securityAudit || [];

      const vaDataWithId = (editData.Infra?.vaRecords || []).map(
        (record, index) => ({
          ...record,
          _id: record._id || `${index}-${Date.now()}`,
        })
      );

      // Set main form data
      setFormData({
        assetsId: editData.assetsId || bp.assetsId || "",
        projectName: editData.projectName || bp.name || "",
        prismId: bp.prismId || bp.prismid || "",
        departmentName: bp.deptName || bp.departmentName || "",
        url: bp.url || "",
        publicIp: bp.publicIp || bp.public_ip || "",
        HOD: bp.HOD || localStorage.getItem("HOD") || "",
        nicOfficerName: nodalNIC.name || "",
        nicOfficerEmpCode: nodalNIC.empCode || "",
        nicOfficerMob: nodalNIC.mobile || "",
        nicOfficerEmail: nodalNIC.email || "",
        deptOfficerName: nodalDept.name || "",
        deptOfficerDesignation: nodalDept.designation || "",
        deptOfficerMob: nodalDept.mobile || "",
        deptOfficerEmail: nodalDept.email || "",
        typeOfServer: editData.Infra?.typeOfServer || "",
        dataCentre: editData.Infra?.dataCentre || "",
        deployment: editData.Infra?.deployment || "",
        location: editData.Infra?.location || "",
        ipAddress: "",
        dbServerIp:"",
        purposeOfUse: "",
        vaScore: "",
        dateOfVA: "",
        vaReport: null,
        gitUrl: "",
      });

      // Set technology stack
      setUsedTech(editData.TS?.frontend ?? editData.TS?.frontEnd ?? []);
      setUsedFrameworks(
        Array.isArray(editData.TS?.framework)
          ? editData.TS.framework
          : editData.TS?.framework
          ? [editData.TS.framework]
          : []
      );
      setUsedDb(editData.TS?.database || []);
      setUsedOs(editData.TS?.os || []);
      setUsedOsVersion(editData.TS?.osVersion || []);
      setUsedRepo(editData.TS?.repoUrls || []);
      setGitUrls(editData.Infra?.gitUrls || []);
      setVaRecords(vaDataWithId);

       // DR Info
    const dr = editData.DR || {};
    const drVaRecords = (dr.vaRecords || []).map((record) => ({
      ipAddress: record.ipAddress || "",
      dbServerIp: record.dbServerIp || "",
      purpose: record.purpose || "",
      vaScore: record.vaScore || "",
      vaDate: record.vaDate ? record.vaDate.slice(0, 10) : "",
    
      // ✅ Check if vaReport is a string or needs a placeholder
      vaReport: typeof record.vaReport === "string"
        ? record.vaReport
        : record.vaReport?.filename || "", // Fallback if stored as file object
    }));

    setDrFormData({
      serverType: dr.serverType || "",
      dataCentre: dr.dataCentre || "",
      deployment: dr.deployment || "",
      location: dr.location || "",
      vaRecords: drVaRecords,
    });

    console.log("DR Data Set for Editing:", drVaRecords);
    console.log("DRForm received drFormData:", drFormData);
      // Set TLS info
      const tlsInfo = (editData.TLS?.tlsInfo || []).map((record) => {
        const issueDate = record.issueDate
          ? new Date(record.issueDate).toISOString().split("T")[0]
          : "";
        const expiryDate = record.expiryDate
          ? new Date(record.expiryDate).toISOString().split("T")[0]
          : "";
      
        let certStatus = "Valid";
        if (expiryDate && new Date() > new Date(expiryDate)) {
          certStatus = "Expired";
        } else if (expiryDate) {
          const warningPeriod = new Date();
          warningPeriod.setDate(warningPeriod.getDate() + 30);
          if (new Date(expiryDate) < warningPeriod) {
            certStatus = "Expiring Soon";
          }
        }
      
        return {
          procuredFrom: record.procuredFrom || "", //  optional: if you're using this
          score: record.score || "",               //  optional: if you're using this
          issueDate,
          expiryDate,
          certStatus,
        };
      });
      

      // FIX: Use setTlsData instead of tlsInfo()
      setTlsData(tlsInfo);
      console.log("TLS Data Set for Editing:", tlsInfo);


      // Set Security Audits
      const dynamicAuditRecords = audits.map((record) => ({
        typeOfAudit: record.typeOfAudit || "",
        auditingAgency: record.auditingAgency || "",
        auditDate: record.auditDate ? record.auditDate.slice(0, 10) : "",
        expireDate: record.expireDate ? record.expireDate.slice(0, 10) : "",
        // tlsNextExpiry: record.tlsNextExpiry
        //   ? record.tlsNextExpiry.slice(0, 10)
        //   : "",
        // sslLabScore: record.sslLabScore || "",
        certificate: record.certificate || null,
      }));

      setAuditRecords(dynamicAuditRecords);
    } else {
      // Not editing
      setFormData((prev) => ({
        ...prev,
        HOD: localStorage.getItem("HOD") || "",
      }));
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

  // const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleNext = () => {
    const updatedSteps = [...completedSteps];
    updatedSteps[currentStep] = true; // ✅ Mark current step completed
    setCompletedSteps(updatedSteps);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);
  // const handleStepClick = (stepIndex) => setCurrentStep(stepIndex);
  //   const handleStepClick = (stepIndex) => {
  //   // Prevent clicking ahead without completing previous steps
  //   for (let i = 0; i < stepIndex; i++) {
  //     if (!completedSteps[i]) {
  //       toast.error("Please complete previous steps before proceeding.");
  //       return;
  //     }
  //   }
  //   setCurrentStep(stepIndex);
  // };
  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const onAddGitUrl = () => {
    if (formData.gitUrl) {
      setGitUrls([...gitUrls, formData.gitUrl]);
      setFormData((prev) => ({ ...prev, gitUrl: "" }));
    }
  };

  const onDeleteGitUrl = (idx) =>
    setGitUrls(gitUrls.filter((_, i) => i !== idx));

  const onVaFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      vaReport: e.target.files[0],
    }));
  };

  const onAddVa = () => {
    if (!formData.ipAddress) return;

    const isDuplicate = vaRecords.some(
      (record) => record.ipAddress === formData.ipAddress
    );
    if (isDuplicate) {
      toast.error("Duplicate VA record");
      return;
    }

    const newVa = {
      ipAddress: formData.ipAddress,
      dbServerIp:formData.dbServerIp,
      purposeOfUse: formData.purposeOfUse || "Application Server",
      vaScore: formData.vaScore,
      dateOfVA: formData.dateOfVA,
      vaReport: formData.vaReport || null,
      _id: `${Date.now()}`, // ensure unique
    };

    setVaRecords([...vaRecords, newVa]);

    setFormData((prev) => ({
      ...prev,
      ipAddress: "",
      vaScore: "",
      dateOfVA: "",
      vaReport: null,
    }));
  };

  const onDeleteVa = (idx) =>
    setVaRecords(vaRecords.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const form = new FormData();
    //   const employeeId = localStorage.getItem("employeeId");

    try {
      const form = new FormData();
      let employeeId = localStorage.getItem("employeeId");
      const employeeType = localStorage.getItem("employeeType");

      // If PM, fetch HOD employeeId from API
      if (employeeType === "PM") {
        const empCode = formData.nicOfficerEmpCode;
        const response = await api.get(`/project-assignments/${empCode}`);
        // Use employeeId from the first item in the array
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data[0]?.employeeId
        ) {
          employeeId = response.data[0].employeeId;
        }
      }
      // Build sectioned data
      const BP = {
        assetsId: formData.assetsId,
        name: formData.projectName,
        prismId: formData.prismId,
        employeeId, // from localStorage
        deptName: formData.departmentName, // <-- changed to match backend
        url: formData.url,
        publicIp: formData.publicIp,
        HOD: formData.HOD,
        nodalOfficerNIC: {
          name: formData.nicOfficerName,
          empCode: formData.nicOfficerEmpCode,
          mobile: formData.nicOfficerMob,
          email: formData.nicOfficerEmail,
        },
        nodalOfficerDept: {
          name: formData.deptOfficerName,
          designation: formData.deptOfficerDesignation,
          mobile: formData.deptOfficerMob,
          email: formData.deptOfficerEmail,
        },
      };

      const SA = {
        securityAudit: auditRecords.map((record, idx) => {
          const now = new Date();
          const expireDate = record.expireDate
            ? new Date(record.expireDate)
            : null;
          const tlsNextExpiry = record.tlsNextExpiry
            ? new Date(record.tlsNextExpiry)
            : null;

          // Calculate statuses
          let auditStatus = "Completed";
          let sslStatus = "Valid";

          if (expireDate && now > expireDate) {
            auditStatus = "Expired";
          }

          if (tlsNextExpiry && now > tlsNextExpiry) {
            sslStatus = "Expired";
          }

          return {
            "Sl no": idx + 1,
            typeOfAudit: record.typeOfAudit,
            auditingAgency: record.auditingAgency,
            auditDate: record.auditDate ? new Date(record.auditDate) : null,
            expireDate,
            tlsNextExpiry,
            sslLabScore: record.sslLabScore,
            certificate: record.certificate,
            auditStatus,
            sslStatus,
          };
        }),
      };

      const TS = {
        frontend: usedTech,
        framework: usedFrameworks,
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
          dbServerIp:record.dbServerIp,
          purposeOfUse: record.purposeOfUse,
          vaScore: record.vaScore,
          dateOfVA: record.dateOfVA,
          vaReport: record.vaReport,
        })),
      };

      const TLS = {
        tlsInfo: tlsData.map((entry, idx) => ({
          slNo: idx + 1,
          // domainName: entry.domainName || "", // <-- Add this
          // certProvider: entry.certProvider || "", // <-- Add this
          issueDate: entry.issueDate,
          expiryDate: entry.expiryDate,
          score: entry.score,
          procuredFrom: entry.procuredFrom,
        })),
      };

      const DR = {
        serverType: drFormData.serverType || "",
        dataCentre: drFormData.dataCentre || "",
        deployment: drFormData.deployment || "",
        location: drFormData.location || "",
        vaRecords: drRecords.map((record) => ({
          ipAddress: record.ipAddress || "",
          dbServerIp: record.dbServerIp || "",
          purpose: record.purpose || "",
          vaScore: record.vaScore || "",
          vaDate: record.vaDate || "",
          vaReport: record.vaReport || null, // file or base64 or ObjectId depending on backend
        })),
      };

      form.append("BP", JSON.stringify(BP));
      form.append("SA", JSON.stringify(SA));
      form.append("TS", JSON.stringify(TS));
      form.append("TLS", JSON.stringify(TLS));
      form.append("DR", JSON.stringify(DR));
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
        // alert("Asset successfully updated!");
        toast.success("Asset successfully updated!");
        navigate("/dashboard");
        // window.location.reload();// ✅ Redirect to dashboard
      } else {
        // CREATE: new asset
        await api.post("/assets/createAsset", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // alert("Asset successfully created!");
        toast.success("Asset successfully created!");
        navigate("/dashboard");
        // window.location.reload()
      }
    } catch (err) {
      console.error("Submission error:", err);
      // alert("Error submitting asset. Check console for details.");
      // toast.error("Error submitting asset. Check console for details.");
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
            employeeType={localStorage.getItem("employeeType")}
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
          <StepTLSInfo
            tlsData={tlsData}
            setTlsData={setTlsData}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        );
      case 3:
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
            usedFrameworks={usedFrameworks} // ✅ Add this
            setUsedFrameworks={setUsedFrameworks}
          />
        );
      case 4:
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
            onNext={handleNext} // ✅ not onSubmit anymore
          />
        );
      case 5:
        return (
        
          <DRForm
            formData={drFormData}
            setFormData={setDrFormData}
            // gitUrls={drGitUrls}
            // setGitUrls={setDrGitUrls}
            records={drRecords}
            setRecords={setDrRecords}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  {
    /* There is a work of ramsis to do the ui dymaic level  */
  }

  {
    /* There is a work of ramsis to do the ui dymaic level  */
  }

  return (
    <div
      className={`form-container ${
        isSidebarOpen ? "compact-form" : "fullscreen-form"
      }`}
    >
      <Header onSidebarToggle={setSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} setFormToShow={setFormToShow} />

      <div className="form-header">
        <h2
          style={{
            padding: "10px 20px",
            fontWeight: "700",
            fontSize: "1.7rem",
          }}
        >
          {editData ? "Edit Project" : "Add Project"}
        </h2>
      </div>

      {/* There is a work of ramsis to do the ui dymaic level  */}

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
