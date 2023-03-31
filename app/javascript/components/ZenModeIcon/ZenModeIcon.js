import React from "react";
import "./ZenModeIcon.css";
import LIcon from "components/LIcon/LIcon";

function ZenModeIcon({ onClick }) {
  return (
    <div className="floating-icon-container" onClick={onClick}>
      <LIcon
        onClick={onClick}
        iconName="moonIcon"
        tooltipText="Toggle Zen Mode"
      />
    </div>
  );
}

export default ZenModeIcon;
