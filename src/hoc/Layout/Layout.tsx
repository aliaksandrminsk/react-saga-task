import React, { ReactChild, ReactChildren } from "react";
import { useSelector } from "react-redux";
import Menu from "../../components/Menu/Menu";
import { IApplicationState } from "../../reducers";

interface OwnProps {
  children: ReactChild | ReactChildren;
}

const Layout = (props: OwnProps) => {
  const isAuthenticated = useSelector<IApplicationState, boolean>(
    (state) => !!state.auth.token
  );
  const userName = useSelector<IApplicationState, string>(
    (state) => state.auth.userName
  );

  return (
    <>
      <Menu isAuthenticated={isAuthenticated} userName={userName} />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
