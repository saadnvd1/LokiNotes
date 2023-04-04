import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Signup from "auth/Signup";
import React from "react";
import RequireAuth from "auth/RequireAuth";
import Login from "auth/Login";

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
    path: "modals/success/:checkoutSessionId",
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
