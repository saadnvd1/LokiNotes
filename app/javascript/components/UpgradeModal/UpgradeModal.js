import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Spin, Switch, Typography } from "antd";
import { createSessionCheckout } from "slices/billingSlice";
import { useDispatch, useSelector } from "react-redux";

const { Title, Paragraph } = Typography;

const UpgradeModal = ({ isOpen, onClose }) => {
  const [monthly, setMonthly] = useState(true);
  const { prices } = useSelector((state) => state.billing);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(createSessionCheckout({ priceId: getPrice().id }))
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

  if (!prices) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      okText="Upgrade"
      onOk={handleCheckout}
    >
      <Spin />
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
          {monthly ? <span>Monthly</span> : <span>Yearly</span>}
        </Col>
      </Row>
    </Modal>
  );
};

export default UpgradeModal;
