import React from "react";
import "./ZenModeIcon.css"; // Import your CSS file
import { MoonIcon } from "@heroicons/react/24/solid";

function ZenModeIcon({ onClick }) {
  return (
    <div className="floating-icon-container" onClick={onClick}>
      <button className="floating-icon" style={{ outline: "none" }}>
        <MoonIcon height="20px" />
      </button>
    </div>
  );
}

export default ZenModeIcon;
