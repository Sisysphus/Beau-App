import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login, demo } from "../../services/auth";
import { NavLink } from "react-router-dom";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  const DemoUser = () => {
    demo();
    // window.location.href("/");
  };

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className="container-boi">
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <NavLink
            to="/sign-up"
            className="logout"
            exact={true}
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </div>
      </form>
      <button onClick={DemoUser} type="submit">
        Demo
      </button>
    </>
  );
};

export default LoginForm;
