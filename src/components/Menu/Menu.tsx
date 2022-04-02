import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Menu.module.css";

interface ILink {
  to: string;
  label: string;
}

interface OwnProps {
  isAuthenticated: boolean;
  userName: string;
}

const Menu: React.FC<OwnProps> = (props) => {
  const links = [];

  if (props.isAuthenticated) {
    links.push({ to: "/list", label: "Notes" });
    links.push({ to: "/logout", label: "Sign out" });
  } else {
    links.push({ to: "/login", label: "Sign in" });
    links.push({ to: "/register", label: "Create account" });
  }

  const renderLinks = (links: Array<ILink>) => {
    return links.map((link, index) => {
      return (
        <li key={index} className="nav-item">
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              "nav-link " + (isActive ? classes.active : classes.inactive)
            }
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className={"container-fluid " + classes.menuPanel}>
      <div className="row align-items-center">
        {props.isAuthenticated && props.userName.length > 0 ? (
          <div
            className="col-12 col-sm-auto py-1 py-sm-0 text-center"
            style={{ wordBreak: "break-word" }}
          >
            {`Hello ${props.userName}`}
          </div>
        ) : null}

        <div className="col d-none d-sm-block">&nbsp;</div>
        <div className="col-12 col-sm-auto px-0">
          <ul className={"nav nav-pills justify-content-center"}>
            {renderLinks(links)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
