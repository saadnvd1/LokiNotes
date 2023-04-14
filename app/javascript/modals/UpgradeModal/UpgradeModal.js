import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Spin, Switch, Tooltip, Typography } from "antd";
import { createSessionCheckout } from "slices/billingSlice";
import { toggleModal, MODAL_NAMES } from "slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Paragraph, Text } = Typography;

const UpgradeModal = () => {
  const [monthly, setMonthly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { prices } = useSelector((state) => state.billing);
  const { billingUpgradeModalIsOpen } = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    setIsLoading(true);
    dispatch(createSessionCheckout({ priceId: getPrice().stripe_price_id }))
      .unwrap()
      .then((res) => {
        console.log(res);
        // TODO: before leaving, we shoud save the current note
        window.location.href = res.url;
      });
  };

  const getPriceText = () => {
    const price = getPrice();

    if (!price) return null;

    return `$${price.amount / 100}${monthly ? "/month" : "/year"}`;
  };

  const getPrice = () => {
    return prices.find((price) =>
      monthly ? price.name === "Monthly" : price.name === "Yearly"
    );
  };

  const handleClose = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.BILLING_UPGRADE }));
  };

  if (!prices) return null;

  return (
    <Modal
      open={billingUpgradeModalIsOpen}
      onClose={handleClose}
      onCancel={handleClose}
      okText="Upgrade"
      onOk={handleCheckout}
      okButtonProps={{ disabled: isLoading }}
    >
      {isLoading && <Spin />}
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3}>LokiNotes Pro</Title>
          <Paragraph style={{ marginTop: 10 }}>
            Elevate your LokiNotes experience by upgrading to our Pro plan and
            enjoy a wealth of exclusive features. Your support not only enhances
            your own productivity but also drives the development of our app.
          </Paragraph>
          <b>Discover the benefits of LokiNotes Pro:</b>
          <ul>
            <li>Save Images within Notes</li>
            <li>Multi-Note Panes</li>
            <li>Command Modal</li>
          </ul>
          <Title level={2}>{getPriceText()}</Title>
          <Switch defaultChecked={monthly} onChange={setMonthly} />{" "}
          {monthly ? (
            <span>Monthly</span>
          ) : (
            <>
              <span>Yearly</span>
              <Text style={{ color: "#291E34F" }}>
                <b> (16% Savings)</b>
              </Text>
            </>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default UpgradeModal;
