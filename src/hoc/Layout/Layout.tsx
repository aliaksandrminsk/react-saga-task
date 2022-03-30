import React, { Component, ReactChild, ReactChildren } from "react";
import { connect } from "react-redux";
import Menu from "../../components/Menu/Menu";
import { IAuthState } from "../../reducers/interfaces/IAuthState";

interface StateProps {
  isAuthenticated: boolean;
  userName: string;
}

interface OwnProps {
  children: ReactChild | ReactChildren;
}

function mapStateToProps({ auth }: { auth: IAuthState }): StateProps {
  return {
    isAuthenticated: !!auth.token,
    userName: auth.userName,
  };
}

class Layout extends Component<StateProps & OwnProps> {
  render() {
    return (
      <>
        <Menu
          isAuthenticated={this.props.isAuthenticated}
          userName={this.props.userName}
        />
        <main>{this.props.children}</main>
      </>
    );
  }
}

export default connect(mapStateToProps)(Layout);