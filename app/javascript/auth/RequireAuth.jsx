import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedIn } from "slices/userSlice";
import { Spin } from "antd";

function RequireAuth({ children }) {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    if (user) {
      setLoading(false);
      return;
    }

    dispatch(checkLoggedIn()).then(() => setLoading(false));
  }, [user]);

  // TODO: I want to make sure users who leave the tab open and try to create something don't lose their information. It's not a huge issue right now, but definitely something to consider down the line
  // I can probably just use this later: https://www.npmjs.com/package/localstorage-slim and set an expiry on the token

  if (!user && loading) {
    return <Spin />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
