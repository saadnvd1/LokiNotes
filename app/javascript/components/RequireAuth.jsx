import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedIn } from "slices/userSlice";
function RequireAuth({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, []);

  return user ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
