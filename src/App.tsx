import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./containers/Auth/LoginForm";
import RegisterForm from "./containers/Auth/RegisterForm";
import Notes from "./containers/Notes/Notes";
import Logout from "./components/Logout/Logout";
import { Navigate } from "react-router-dom";
import { autoLoginRequest } from "./actions/auth/auth";
import { IApplicationState } from "./reducers";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<IApplicationState, boolean>(
    (state) => !!state.auth.token
  );

  useEffect(() => {
    dispatch(autoLoginRequest());
  }, []);

  let routes = (
    <Routes>
      <Route path="register" element={<RegisterForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="list" element={<Notes />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    );
  }

  return <Layout>{routes}</Layout>;
};

export default App;
