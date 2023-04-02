import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "Signup";
import React from "react";
import RequireAuth from "RequireAuth";
import Login from "Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "notebooks/:notebookId/notes?/:noteId?",
    element: (
      <RequireAuth>
        <App />
      </RequireAuth>
    ),
  },
  {
    path: "billing/success/:checkoutSessionId",
    element: (
      <RequireAuth>
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
