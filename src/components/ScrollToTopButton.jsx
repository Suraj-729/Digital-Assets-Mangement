import React, { useState, useEffect } from "react";

const buttonStyle = {
  position: "fixed",
  bottom: "24px",
  right: "24px",
  zIndex: 1000,
  background: "#4153f2",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  transition: "opacity 0.3s ease-in-out",
  opacity: 1,
};

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 0); // 👈 show on any scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        ...buttonStyle,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none", // 👈 prevent clicking when hidden
      }}
      onClick={scrollToTop}
      type="button"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}