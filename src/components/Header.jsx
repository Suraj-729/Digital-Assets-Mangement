import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  return (
    <>
      {/* Header */}
      <header
        className="bg-white shadow-sm position-relative"
        style={{ minHeight: "80px" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center position-relative py-2">
          <a
            href="https://odisha.nic.in"
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center text-dark text-decoration-none"
          >
            <img
              src="images/emblem.png"
              alt="State Emblem"
              className="me-3"
              style={{ height: "45px" }}
              loading="lazy"
            />
            <div>
              <h6
                className="fw-bold mb-0 text-primary"
                style={{ fontSize: "0.9rem" }}
              >
                National Informatics Centre
              </h6>
              <h1
                className="h6 mb-0"
                style={{ fontSize: "0.85rem", fontWeight: "600" }}
              >
                Odisha State Centre
              </h1>
            </div>
          </a>

          <div
            className="position-absolute top-50 start-50 translate-middle text-center"
            style={{ pointerEvents: "none", maxWidth: "280px", width: "50%" }}
          >
            <img
              src="/images/logo.png"
              alt="AssetsIQ Logo"
              className="img-fluid"
              style={{ maxHeight: "60px" }}
              loading="lazy"
            />
          </div>

          <a
            href="https://www.nic.in/"
            target="_blank"
            rel="noreferrer"
            className="d-flex align-items-center"
          >
            <img
              src="https://odisha.nic.in/wp-content/themes/sdo-theme/images/nic.png"
              alt="NIC Logo"
              style={{ height: "38px" }}
              loading="lazy"
            />
          </a>
        </div>
      </header>

      {/* Dignitaries */}
      <section className="bg-white py-3 shadow-sm">
        <div className="container-fluid d-flex justify-content-center">
          <div
            className="d-flex align-items-center justify-content-center text-start flex-wrap"
            style={{ gap: "2rem" }}
          >
            {[
              {
                img: "images/DG-NIC.jpg",
                name: "Shri Abhishek Singh",
                title: "Director General",
                desc: "National Informatics Centre",
                size: 95,
              },
              {
                img: "images/SC-Odisha.jpg",
                name: "Shri Timothy Dkhar",
                title: "DDG & State Coordinator",
                desc: "NIC, Odisha",
                size: 95,
              },
              {
                img: "images/SIO-Odisha.jpg",
                name: "Dr. Ashok Kumar Hota",
                title: "DDG & State Informatics Officer",
                desc: "NIC, Odisha",
                size: 95,
              },
            ].map((person, index) => (
              <div
                key={index}
                className="d-flex align-items-center"
                style={{ minWidth: "210px" }}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="rounded-circle me-2"
                  loading="lazy"
                  style={{
                    width: `${person.size}px`,
                    height: `${person.size}px`,
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    padding: "2px",
                  }}
                />
                <div>
                  <p
                    className="fw-semibold mb-1"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {person.name}
                  </p>
                  <small className="text-muted">
                    {person.title}
                    <br />
                    {person.desc}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue HR */}
      <hr style={{ border: "2px solid #0b5ed7", margin: 0 }} />
    </>
  );
};

export default Header;
