import React from "react";

const Footer = () => {
  return (
   <footer
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "35px",
    fontSize: "20px",
    color: "#000",
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
