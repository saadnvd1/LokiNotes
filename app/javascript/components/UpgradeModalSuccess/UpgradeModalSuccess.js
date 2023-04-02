import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Spin,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import {
  createSubscription,
  toggleBillingSuccessModal,
} from "slices/billingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

const UpgradeModalSuccess = () => {
  const { checkoutSessionId } = useParams();
  const navigate = useNavigate();

  const { billingSuccessModalIsOpen } = useSelector((state) => state.billing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkoutSessionId) {
      dispatch(toggleBillingSuccessModal());
      dispatch(createSubscription({ checkoutSessionId })).then(() => {
        navigate("/");
      });
    }
  }, [checkoutSessionId]);

  const handleClose = () => {
    dispatch(toggleBillingSuccessModal());
  };

  return (
    <Modal
      open={billingSuccessModalIsOpen}
      onClose={handleClose}
      onCancel={handleClose}
      footer={
        <Button key="cancel" onClick={handleClose}>
          Close
        </Button>
      }
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>Thank You!</Title>
          <Paragraph style={{ marginTop: 10 }}>
            Thanks so much for upgrading! Here are all the features you've now
            unlocked:
          </Paragraph>
          <b>Pro Features:</b>
          <ul>
            <li>Save Images within Notes</li>
            <li>Multi-Note Panes</li>
            <li>Command Modal</li>
          </ul>
          <Paragraph style={{ marginTop: 10 }}>
            Please let us know if you have any questions or feedback. We're
            always here to help! Contact us directly at help@lokinotes.com
          </Paragraph>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpgradeModalSuccess;
