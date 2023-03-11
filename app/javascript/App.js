import React from "react";
import { Button, DatePicker } from "antd";

const HelloMessage = ({ name }) => (
  <>
    <Button type="primary">Primary Button</Button>
    <DatePicker placeholder="select date" />
  </>
);
export default HelloMessage;
