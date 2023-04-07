import React, { useEffect } from "react";
import { Button, Col, Modal, Row, Spin, Switch, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleAccountModal } from "slices/userSlice";
import { getSubscription } from "slices/billingSlice";
import BillingTab from "modals/MyAccountModal/BillingTab";

const MyAccountModal = () => {
  const { accountModalIsOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscription());
  }, []);

  const handleClose = () => {
    dispatch(toggleAccountModal());
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: `General`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Billing`,
      children: <BillingTab />,
    },
  ];

  return (
    <Modal open={accountModalIsOpen} onCancel={handleClose} footer={null}>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Modal>
  );
};

export default MyAccountModal;
