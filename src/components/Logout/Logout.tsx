import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutRequest } from "../../actions/auth/auth";
import { LogoutRequest } from "../../actions/auth/types";

interface DispatchProps {
  logout: () => LogoutRequest;
}

function mapDispatchToProps() {
  return {
    logout: () => logoutRequest(),
  };
}

class Logout extends Component<DispatchProps> {
  componentDidMount() {
    return this.props.logout();
  }

  render() {
    return <Navigate to="/login" replace />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
