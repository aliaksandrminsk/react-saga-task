import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutRequest } from "../../actions/auth/auth";

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutRequest());
  }, []);

  return <Navigate to="/login" replace />;
};

export default Logout;
