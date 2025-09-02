import React, { useEffect, useMemo, useState } from "react";
import api from "../Api";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoginPage from "./LoginPage";
import HeaderWithDignitaries from "./Header";
import Footer from "./Footer";
import "../css/HomePage.css";
// import "../css/mvpStyle.css";

// Project stats
// const projectStats = [
//   { title: "Total Projects", value: 128, bg: "#e7f1ff", color: "#0b5ed7" },
//   { title: "Active", value: 95, bg: "#d1e7dd", color: "#0f5132" },
//   { title: "Inactive", value: 33, bg: "#f8d7da", color: "#842029" },
// ];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const HomePage = () => {
  const [chartType, setChartType] = useState("bar");
  const [stats, setStats] = useState([]);


  useEffect(() => {
    document.title = "Digital Asset Management - Home Page";
  }, []);

  // const chartData = useMemo(
  //   () => ({
  //     labels: [
  //       "Health",
  //       "Education",
  //       "Transport",
  //       "Agriculture",
  //       "Finance",
  //       "Energy",
  //       "Urban Dev.",
  //     ],
  //     datasets: [
  //       {
  //         label: "Projects",
  //         data: [20, 35, 15, 25, 10, 18, 12],
  //         backgroundColor: [
  //           "#0b5ed7",
  //           "#0dcaf0",
  //           "#ffc107",
  //           "#198754",
  //           "#dc3545",
  //           "#6610f2",
  //           "#fd7e14",
  //         ],
  //         borderColor: "#0b5ed7",
  //         borderWidth: 2,
  //         borderRadius: 12,
  //         fill: true,
  //         tension: 0.3,
  //       },
  //     ],
  //   }),
  //   []
  // );



  // 👇 Replace useMemo with useState
  const [chartData, setChartData] = useState({
    labels: [
      "Health",
      "Education",
      "Transport",
      "Agriculture",
      "Finance",
      "Energy",
      "Urban Dev.",
    ],
    datasets: [
      {
        label: "Projects",
        data: [20, 35, 15, 25, 10, 18, 12],
        backgroundColor: [
          "#0b5ed7",
          "#0dcaf0",
          "#ffc107",
          "#198754",
          "#dc3545",
          "#6610f2",
          "#fd7e14",
        ],
        borderColor: "#0b5ed7",
        borderWidth: 2,
        borderRadius: 12,
        fill: true,
        tension: 0.3,
      },
    ],
  });

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { font: { size: 12 } },
        },
      },
      scales: {
        x: {
          ticks: { color: "#555", font: { size: 13, weight: "500" } },
          grid: { display: false },
        },
        y: {
          ticks: { color: "#777", font: { size: 12 } },
          grid: { color: "#f0f0f0" },
        },
      },
    }),
    []
  );


  //  useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await api.get("http://localhost:5000/getallprojectstatus");
  //       const data = res.data;

  //       // Map API response into card format
  //       const projectStats = [
  //         { title: "Total Projects", value: data.totalProjects, bg: "#e7f1ff", color: "#0b5ed7" },
  //         { title: "Active", value: data.activeProjects, bg: "#d1e7dd", color: "#0f5132" },
  //         { title: "Inactive", value: data.totalProjects - data.activeProjects, bg: "#f8d7da", color: "#842029" },
  //       ];

  //         // ✅ Department-wise chart data
  //     const labels = data.activeProjectsPerDept.map(d => d.deptName);
  //     const values = data.activeProjectsPerDept.map(d => d.projectCount);

  //       setStats(projectStats);
  //     } catch (error) {
  //       console.error("Error fetching project stats:", error);
  //     }
  //   };

  //   fetchStats();
  // }, []);




  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("http://localhost:5000/getallprojectstatus");
        const data = res.data;

        // 🔹 Stats cards
        const projectStats = [
          { title: "Total Projects", value: data.totalProjects, bg: "#e7f1ff", color: "#0b5ed7" },
          { title: "Active", value: data.activeProjects, bg: "#d1e7dd", color: "#0f5132" },
          { title: "Inactive", value: data.totalProjects - data.activeProjects, bg: "#f8d7da", color: "#842029" },
        ];
        setStats(projectStats);

        // 🔹 Department-wise chart
        const labels = data.activeProjectsPerDept.map(d => d.deptName);
        const values = data.activeProjectsPerDept.map(d => d.projectCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Projects",
              data: values,
              backgroundColor: [
                "#0b5ed7", "#0dcaf0", "#ffc107", "#198754",
                "#dc3545", "#6610f2", "#fd7e14", "#20c997",
                "#6f42c1", "#198754", "#fd7e14" // add more if many depts
              ],
              borderColor: "#0b5ed7",
              borderWidth: 2,
              borderRadius: 12,
              fill: true,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching project stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <HeaderWithDignitaries />

      {/* Info Section */}
      <section className="container-fluid my-3">
        <div
          className="p-3 rounded shadow-sm"
          style={{
            background: "linear-gradient(135deg, #0b5ed7 0%, #4a90e2 100%)",
            color: "#fff",
            fontSize: "0.95rem",
          }}
        >
          The Digital Asset Management (DAM) system is an initiative by NIC,
          Odisha State Centre, designed to streamline the storage, organization,
          and retrieval of government digital assets. It provides a centralized
          and scalable platform with timely alerts for project continuity,
          security audits, and SSL renewals.
        </div>
      </section>
      {/* bs format */}
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <h4
                id="project-dashboard"
                className="mb-3 text-primary fw-bold text-center"
              >
                Project Dashboard
              </h4>

              <div className="d-flex flex-wrap gap-3 mb-4 flex-fill">
                {stats.map((card, idx) => (
                  <div
                    key={idx}
                    className="flex-fill p-3 rounded shadow-sm text-center"
                    style={{ backgroundColor: card.bg, color: card.color }}
                  >
                    <h6 className="fw-semibold">{card.title}</h6>
                    <p className="fs-4 fw-bold">{card.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div
                className="flex-fill bg-white rounded shadow-sm p-3 d-flex flex-column"
                style={{ minHeight: "30vh" }}
                role="img"
                aria-label="Department-wise project distribution chart"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="mb-0 text-primary fw-bold">
                    Department-wise Projects
                  </h5>
                  <div className="btn-group btn-group-sm">
                    {["bar", "line"].map((type) => (
                      <button
                        key={type}
                        className={`btn btn-outline-primary ${chartType === type ? "active" : ""
                          }`}
                        onClick={() => setChartType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  {chartType === "bar" && (
                    <Bar data={chartData} options={chartOptions} />
                  )}
                  {chartType === "line" && (
                    <Line data={chartData} options={chartOptions} />
                  )}

                </div>
              </div>
            </div>
            <div className="col-md-3">
              <aside
                className="flex-fill d-flex flex-column align-items-start rounded shadow-sm p--5 mt-0"
                style={{ maxWidth: "400px", flex: "1 1 0" }}
              >
                <LoginPage />
              </aside>
            </div>
          </div>
        </div>
      </section>
      {/* bs format end */}
      {/* Main Content */}
      {/* <main
        className="container-fluid d-flex flex-wrap gap-4 mb-4 align-items-start"
        style={{ alignItems: "stretch" }}
      > */}
        {/* Project Dashboard */}
        {/* <section
          className="flex-fill d-flex flex-column rounded shadow-sm p-4"
          style={{
            minWidth: "300px",
            flex: "1 1 0",
            background: "linear-gradient(145deg, #ffffff, #e6f0ff)",
          }}
          aria-labelledby="project-dashboard"
        >
          <h4
            id="project-dashboard"
            className="mb-3 text-primary fw-bold text-center"
          >
            Project Dashboard
          </h4>

          <div className="d-flex flex-wrap gap-3 mb-4 flex-fill">
            {stats.map((card, idx) => (
              <div
                key={idx}
                className="flex-fill p-3 rounded shadow-sm text-center"
                style={{ backgroundColor: card.bg, color: card.color }}
              >
                <h6 className="fw-semibold">{card.title}</h6>
                <p className="fs-4 fw-bold">{card.value}</p>
              </div>
            ))}
          </div> */}

          {/* Chart Section */}
          {/* <div
            className="flex-fill bg-white rounded shadow-sm p-3 d-flex flex-column"
            style={{ minHeight: "30vh" }}
            role="img"
            aria-label="Department-wise project distribution chart"
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0 text-primary fw-bold">
                Department-wise Projects
              </h5>
              <div className="btn-group btn-group-sm">
                {["bar", "line"].map((type) => (
                  <button
                    key={type}
                    className={`btn btn-outline-primary ${chartType === type ? "active" : ""
                      }`}
                    onClick={() => setChartType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {chartType === "bar" && (
                <Bar data={chartData} options={chartOptions} />
              )}
              {chartType === "line" && (
                <Line data={chartData} options={chartOptions} />
              )}

            </div>
          </div>
        </section> */}

        {/* Login Form */}
        {/* <aside
          className="flex-fill d-flex flex-column align-items-start rounded shadow-sm p--5 mt-0"
          style={{ maxWidth: "400px", flex: "1 1 0" }}
        >
          <LoginPage />
        </aside>
      </main> */}

      <Footer />
    </div>
  );
};

export default HomePage;
