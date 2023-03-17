import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedIn } from "slices/userSlice";
function RequireAuth({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) return;

    dispatch(checkLoggedIn());
  }, []);

  // TODO: I want to make sure users who leave the tab open and try to create something don't lose their information. It's not a huge issue right now, but definitely something to consider down the line
  // I can probably just use this later: https://www.npmjs.com/package/localstorage-slim and set an expiry on the token
  return user || localStorage.getItem("lnt") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RequireAuth;