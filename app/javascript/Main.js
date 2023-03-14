import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "components/Signup";
import React from "react";
import RequireAuth from "components/RequireAuth";
import Login from "components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth redirect="/">
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const Main = ({}) => {
  return <RouterProvider router={router} />;
};
export default Main;
