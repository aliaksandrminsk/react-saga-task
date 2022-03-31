import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutRequest } from "../../actions/auth/auth";
import { LogoutRequest } from "../../actions/auth/types";

interface DispatchProps {
  logoutRequest: () => LogoutRequest;
}

// function mapDispatchToProps() {
//   return {
//     logout: () => logoutRequest(),
//   };
// }

class Logout extends Component<DispatchProps> {
  componentDidMount() {
    this.props.logoutRequest();
  }

  render() {
    return <Navigate to="/login" replace />;
  }
}

export default connect(null, { logoutRequest })(Logout);
