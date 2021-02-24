import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../services/auth";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [genderId, setGenderId] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, firstName, genderId);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={onSignUp}>
        <div className="form-group">
          <label className="text-white mb-3">User Name</label>
          <input
            className="form-control mb-3"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-white mb-3">Email</label>
          <input
            className="form-control mb-3"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-white mb-3">Password</label>
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-white mb-3">Repeat Password</label>
          <input
            className="form-control mb-3"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-white mb-3">First Name</label>
          <input
            className="form-control mb-3"
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required={true}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-white mb-3">GenderId</label>
          <input
            min={"0"}
            max={"1"}
            placeholder="0 for male | 1 for female"
            className="form-control mb-3"
            type="number"
            name="gender_id"
            onChange={(e) => setGenderId(Number(e.target.value))}
            value={genderId}
            required={true}
          ></input>
        </div>
        <button className="btn btn-light" type="submit">
          Sign Up
        </button>
        <NavLink
          to="/login"
          className="btn btn-light signupbutton"
          exact={true}
          activeClassName="active"
        >
          Go Back
        </NavLink>
      </form>
      <div className="d-flex justify-content-between mt-5">
        <div className="d-flex">
          <i class="fab fa-linkedin text-light footer-icon"></i>
          <p className="text-light footer-text">LinkedIn</p>
        </div>
        <div className="d-flex">
          <i class="fab fa-github-square text-light footer-icon"></i>
          <p className="text-light footer-text">Github</p>
        </div>
        <div className="d-flex">
          <i class="fas fa-globe-asia text-light footer-icon"></i>
          <p className="text-light footer-text">Portfolio</p>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
