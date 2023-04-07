import React from "react";
import { Button, Typography } from "antd";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleBillingModal } from "slices/billingSlice";

const BillingTab = () => {
  const dispatch = useDispatch();
  const { subscription } = useSelector((state) => state.billing);

  console.log("subscription", subscription);

  const getPlan = () => {
    if (subscription) {
      return subscription.plan_name;
    }

    return "LokiNotes Free";
  };

  const getPlanPrice = () => {
    if (subscription) {
      return subscription.price_formatted;
    }

    return "Free Forever";
  };

  return (
    <div className="subscription-details">
      <div className="subscription-details__header">
        <h4 className="subscription-details__title">Current Plan:</h4>
        <p className="subscription-details__plan">{getPlan()}</p>
      </div>
      <div className="subscription-details__body">
        <div className="subscription-details__item">
          <h4 className="subscription-details__item-title">Price:</h4>
          <p className="subscription-details__item-value">{getPlanPrice()}</p>
        </div>
        {subscription ? (
          <Button className="subscription-details__button" type="primary" block>
            Manage Subscription
          </Button>
        ) : (
          <Button
            className="subscription-details__button"
            type="primary"
            block
            onClick={() => dispatch(toggleBillingModal())}
          >
            Upgrade to Pro
          </Button>
        )}
      </div>
    </div>
  );
};

export default BillingTab;
