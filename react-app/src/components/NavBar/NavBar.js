import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";
import HomeIcon from "@material-ui/icons/Home";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import image1 from "./doggo.png";
import PersonIcon from "@material-ui/icons/Person";

const NavBar = ({ setAuthenticated, loggedInUser, authenticated }) => {
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
          {/* <img src={image1} className="beau-logo" alt="tinder" /> */}
          <h1 className="beau-logo hvr-bounce-in ">Beau</h1>
        </NavLink>
        <NavLink
          to={`/users/${loggedInUser.id}`}
          exact={true}
          activeClassName="active"
        >
          {authenticated ? (
            <h1 className="beau-logo hvr-bounce-in ">Profile</h1>
          ) : (
            ""
          )}
        </NavLink>
        {authenticated ? (
          <LogoutButton setAuthenticated={setAuthenticated} />
        ) : (
          ""
        )}
      </div>
      {/* <NavLink
        to="/sign-up"
        className="logout"
        exact={true}
        activeClassName="active"
      >
        Sign Up
      </NavLink> */}
    </nav>
  );
};

export default NavBar;
