import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
    spin
  />
);

const SavingIndicator = () => {
  const isSavingNote = useSelector((state) => state.notes.isSavingNote);

  return (
    <div
      style={{
        visibility: isSavingNote ? "visible" : "hidden",
        zIndex: 9999,
      }}
    >
      <Spin indicator={antIcon} />
    </div>
  );
};

export default SavingIndicator;
