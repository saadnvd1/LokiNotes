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
import { checkSubscriptionStatus } from "slices/billingSlice";
import { toggleModal, MODAL_NAMES } from "slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "hooks/useInterval";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const UpgradeModalSuccess = () => {
  const { billingSuccessModalIsOpen } = useSelector((state) => state.modals);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAndUpdateSubscribed = () => {
    dispatch(checkSubscriptionStatus()).then((res) => {
      if (res.payload.status === "active") {
        setIsSubscribed(true);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (window.location.href.includes("billing/success")) {
      dispatch(toggleModal({ modalName: MODAL_NAMES.BILLING_SUCCESS }));
      checkAndUpdateSubscribed();
    }
  }, []);

  useInterval(() => {
    if (billingSuccessModalIsOpen && !isSubscribed) {
      checkAndUpdateSubscribed();
    }
  }, 1000);

  const handleClose = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.BILLING_SUCCESS }));
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
          {!isSubscribed && (
            <>
              <Title level={3}>Activating LokiNotes Pro!</Title>
              <Paragraph style={{ marginTop: 10 }}>
                Please wait, we're activating all your awesome new Pro features!
                <Spin style={{ marginTop: 10 }} />
              </Paragraph>
            </>
          )}
          {isSubscribed && (
            <>
              <Title level={3}>Thank You!</Title>
              <Paragraph style={{ marginTop: 10 }}>
                // TODO: update the copy of this before releasing Thanks so much
                for upgrading! Here are all the features you've now unlocked:
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
            </>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default UpgradeModalSuccess;
