import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const SavingIndicator = ({ shouldShow, styles }) => (
  <div
    style={{
      visibility: shouldShow ? "visible" : "hidden",
      zIndex: 9999,
      ...styles,
    }}
  >
    <Spin indicator={antIcon} />
  </div>
);

export default SavingIndicator;
