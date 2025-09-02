import React from "react";

const Footer = () => {
  return (
   <footer
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontSize: "20px",
    color: "#000",
    position: "relative",   // 👈 sticks relative to viewport
    bottom: "20px",      // distance from bottom
    left: "50%",
    transform: "translateX(-50%)", // center horizontally
  }}
>
  <img
    src="/images/niclogo.png"
    alt="Footer Logo"
    style={{ height: "45px" }}
  />
  <span>© 2025 All Rights Reserved.</span>
</footer>
  );
};

export default Footer;
