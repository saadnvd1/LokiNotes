import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useEffect } from "react";
import "auth/Auth.css";
import { checkLoggedIn, login, register } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import useToast from "hooks/useToast";
import LBox from "components/LBox/LBox";
import Logo from "images/logo.png";

const Auth = ({ type }) => {
  const { toastError } = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const from = state?.from || "/";

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
    return <Navigate to={from} replace />;
  }

  return (
    <Layout style={{ height: "100vh" }} className="Auth">
      <LBox flexRow alignCenter justifyCenter mt4>
        <a href="/">
          <img
            src={Logo}
            style={{
              width: 150,
              marginTop: 0,
              marginBottom: 0,
            }}
          />
        </a>
      </LBox>
      <div className="center-screen signup-form">
        <div>
          <h1 style={{ marginBottom: 0 }}>{`${
            type === "login"
              ? "Welcome Back! 🎉"
              : "Hi, Welcome to Lokinotes 👋"
          }`}</h1>
          {type === "signup" && (
            <p style={{ fontSize: 10, margin: 10, padding: 0 }}>
              <Link to={"/login"}>Already registered? Login Here</Link>
            </p>
          )}
          {type === "login" && (
            <p style={{ fontSize: 10, margin: 10, padding: 0 }}>
              <Link to={"/signup"}>New? Signup Here</Link>
            </p>
          )}
        </div>
        <div>
          <Form
            name="basic"
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
                  message: "Please enter an e-mail",
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
                  message: "Please enter a password",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {type === "login" ? "Sign In" : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
export default Auth;
