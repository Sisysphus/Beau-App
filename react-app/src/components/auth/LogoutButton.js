import React from "react";
import { logout } from "../../services/auth";
import { NavLink } from "react-router-dom";
import "./logout.css";
const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    window.location.reload();
  };

  return (
    <button className="log-out" onClick={onLogout}>
      Logout
    </button>
    // <NavLink
    //   to="/sign-up"
    //   className="logout"
    //   exact={true}
    //   activeClassName="active"
    // >
    //   Sign Up
    // </NavLink>
  );
};

export default LogoutButton;
