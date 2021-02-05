import React from "react";
import { logout } from "../../services/auth";
import "./logout.css";
const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return (
    <button className="log-out" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
