import React from "react";
import { Col, Modal, Row, Spin, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleAccountModal } from "slices/userSlice";

const MyAccountModal = () => {
  const { accountModalIsOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleAccountModal());
  };

  return (
    <Modal open={accountModalIsOpen} onCancel={handleClose} okText="Exit">
      Billing Tab
    </Modal>
  );
};

export default MyAccountModal;
