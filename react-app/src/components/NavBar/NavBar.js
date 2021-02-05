import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import HomeIcon from "@material-ui/icons/Home";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import image1 from "./doggo.png";
const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="top-navbar">
      <div className="header">
        <NavLink
          to="/"
          img={image1}
          exact={true}
          className="home-icon"
          activeClassName="active"
        >
          <img src={image1} className="beau-logo" alt="tinder" />
          
        </NavLink>
        <NavLink to="/users" exact={true} activeClassName="active">
          <QuestionAnswerIcon fontSize="large" />
        </NavLink>
        <LogoutButton setAuthenticated={setAuthenticated} />
      </div>
      <NavLink to="/login" exact={true} activeClassName="active">
        Login
      </NavLink>
      <NavLink to="/sign-up" exact={true} activeClassName="active">
        Sign Up
      </NavLink>
    </nav>
  );
};

export default NavBar;
