import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./containers/Auth/LoginForm";
import RegisterForm from "./containers/Auth/RegisterForm";
import Notes from "./containers/Notes/Notes";
import Logout from "./components/Logout/Logout";
import { Navigate } from "react-router-dom";
import { AutoLoginRequest } from "./actions/auth/types";
import { autoLoginRequest } from "./actions/auth/auth";
import { IAuthState } from "./reducers/interfaces/IAuthState";

interface DispatchProps {
  autoLogin: () => AutoLoginRequest;
}

interface StateProps {
  isAuthenticated: boolean;
  email: string;
}

function mapStateToProps({ auth }: { auth: IAuthState }): StateProps {
  return {
    isAuthenticated: !!auth.token,
    email: auth.email,
  };
}

function mapDispatchToProps(): DispatchProps {
  return {
    autoLogin: () => autoLoginRequest(),
  };
}

class App extends Component<DispatchProps & StateProps> {
  componentDidMount() {
    return this.props.autoLogin();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="list" element={<Notes />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
