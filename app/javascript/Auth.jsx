import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useEffect, useState } from "react";
import "Auth.css";
import { checkLoggedIn, login, register } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useToast from "hooks/useToast";
import { getRedirectUrl } from "helpers/note";
const Auth = ({ type }) => {
  const { toastError } = useToast();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { noteId, categoryId } = state; // Read values passed on state

  useEffect(() => {
    if (user) return;

    dispatch(checkLoggedIn());
  }, []);

  const handleSubmit = (values) => {
    const action = type === "login" ? login : register;
    dispatch(action({ email: values.email, password: values.password }))
      .unwrap()
      .catch(() => {
        toastError("Sorry, that doesn't seem right. Try again.");
      });
  };

  if (user) {
    // TODO: see if there's a better way to do this -- while this might work, I worry that it may complicate things in the future if we want to have other routes

    return <Navigate to={getRedirectUrl(noteId, categoryId)} replace />;
  }

  return (
    <Layout style={{ height: "100vh" }} className="Auth">
      <div className="center-screen signup-form">
        {" "}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Mind entering in an e-mail?",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "A password would be nice too ;)",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};
export default Auth;
