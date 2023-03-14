import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useEffect, useState } from "react";
import "./Signup.css";
import axiosI from "axiosInstance";
import { checkLoggedIn, login } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = ({}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, []);

  const handleSubmit = (values) => {
    dispatch(login({ email: values.email, password: values.password }));
    console.log("Success:", values);
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout style={{ height: "100vh" }}>
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
          onFinishFailed={onFinishFailed}
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
export default Login;
