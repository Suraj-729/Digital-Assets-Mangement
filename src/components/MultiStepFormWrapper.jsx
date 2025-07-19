import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MultiStepForm from "./MultiStepForm";
import api from "../Api";
import { toast } from "react-toastify";

const MultiStepFormWrapper = () => {
  const { projectName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(!!projectName);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectName) return; // Add mode
    const fetchProject = async () => {
      try {
        const res = await api.get(`/dashboard/projectDetails/${encodeURIComponent(projectName)}`);
        setEditData(res.data);
      } catch (err) {
        setError("Unable to load project for edit.");
        toast.error("Unable to load project for edit.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [projectName]);

  if (loading) return <div className="p-4">Loading project…</div>;
  if (error) return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <MultiStepForm
      editData={editData}
      onEditComplete={() => navigate("/dashboard")}
    />
  );
};

export default MultiStepFormWrapper;
