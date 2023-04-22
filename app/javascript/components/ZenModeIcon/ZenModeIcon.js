import React from "react";
import "./ZenModeIcon.css";
import LIcon from "components/LIcon/LIcon";

function ZenModeIcon({ onClick, isZenMode }) {
  return (
    <div
      className={`floating-icon-container ${
        isZenMode ? "floating-icon-in-zen-mode" : ""
      }`}
      onClick={onClick}
      role="button"
    >
      <LIcon
        onClick={onClick}
        iconName="moonIcon"
        tooltipText="Toggle Zen Mode"
      />
    </div>
  );
}

export default ZenModeIcon;
