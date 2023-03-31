import React from "react";
import "components/LIcon/LIcon.css";
import {
  MoonIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "antd";

const ICONS = {
  pencilSquareIcon: PencilSquareIcon,
  plusCircleIcon: PlusCircleIcon,
  moonIcon: MoonIcon,
};

function LIcon({
  onClick,
  iconName,
  height,
  containerWidth,
  containerHeight,
  tooltipText,
}) {
  const IconComponent = ICONS[iconName];

  console.log("tooltipText", tooltipText);

  return (
    <Tooltip title={tooltipText} mouseEnterDelay={0.8} style={{ zIndex: 999 }}>
      <button
        className="lokinotes-icon"
        onClick={onClick}
        style={{ width: containerWidth, height: containerHeight }}
      >
        <IconComponent height={height || "20px"} />
      </button>
    </Tooltip>
  );
}

export default LIcon;
