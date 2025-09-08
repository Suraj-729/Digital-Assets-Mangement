import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-4 mt-auto shadow-sm"
      style={{
        background: "linear-gradient(90deg, #0b5ed7, #084298)",
        fontSize: "0.9rem",
        borderTop: "3px solid rgba(255, 255, 255, 0.25)",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    >
      <div className="container text-center text-white footer-text">
        {/* Copyright */}
        <div className="mb-2 fw-light">
          © 2025 NIC State Centre, Odisha. All rights reserved.
        </div>

        {/* Divider */}
        <div
          className="footer-divider"
          style={{
            width: "65%",
            margin: "0.6rem auto 1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        ></div>

        {/* Hosting info with logos */}
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
          <span className="fw-light">
            Site is designed and hosted by{" "}
            <span className="fw-semibold">National Informatics Centre (NIC)</span>
          </span>

          <div className="d-flex align-items-center gap-2">
            <a
              href="https://www.nic.in"
              target="_blank"
              rel="noreferrer"
              className="fw-semibold text-white footer-link d-inline-flex align-items-center"
            >
              <img
                src="images/niclogo.png"
                alt="NIC Logo"
                style={{ height: "28px", marginRight: "6px" }}
              />
              NIC
            </a>
            <span>|</span>
            <a
              href="https://www.meity.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="fw-semibold text-white footer-link d-inline-flex align-items-center"
            >
              MeitY
            </a>, Government of India
          </div>
        </div>
      </div>

      {/* Extra Styling */}
      <style jsx>{`
        .footer-link {
          text-decoration: none;
          transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
        }
        .footer-link:hover {
          color: #ffc107;
          text-shadow: 0 0 6px rgba(255, 193, 7, 0.6);
          transform: translateY(-2px);
        }

        .footer-divider {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .footer-divider:hover {
          border-color: #ffc107;
          box-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          footer {
            font-size: 0.8rem;
            padding: 0.8rem 0;
          }
          .footer-link img {
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          footer {
            font-size: 0.75rem;
            line-height: 1.5;
          }
          .footer-text {
            padding: 0 12px;
          }
          .footer-link img {
            height: 18px;
          }
          .d-flex.flex-md-row {
            flex-direction: column !important;
            gap: 6px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
