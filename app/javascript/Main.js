import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "auth/Signup";
import React from "react";
import RequireAuth from "auth/RequireAuth";
import Login from "auth/Login";
import App from "./App";

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
    path: "billing/success",
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

const Main = () => <RouterProvider router={router} />;
export default Main;
