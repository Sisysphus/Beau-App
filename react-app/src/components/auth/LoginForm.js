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
        <div>
          <div className="form-group text-white">
            <label htmlFor="email">Email</label>
            <input
              className="form-control text-white"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <div className="d-flex ">
              <div className="form-group">
                <button type="submit" className="btn btn-light mt-4 mr-4">
                  Login
                </button>
              </div>
              <NavLink
                to="/sign-up"
                className="btn btn-light mt-4 signupbutton"
                exact={true}
                activeClassName="active"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </form>
      <button className="btn btn-light mt-4" onClick={DemoUser} type="submit">
        Demo
      </button>
      <div className="d-flex justify-content-between mt-5 ">
        <div className="d-flex">
          <i class="fab fa-linkedin text-light footer-icon"></i>
          <a
            target="blank"
            href="https://www.linkedin.com/in/adam-faidy-bb8784105/"
            className="text-light footer-text"
          >
            LinkedIn
          </a>
        </div>
        <div className="d-flex">
          <i class="fab fa-github-square text-light footer-icon"></i>
          <a
            target="blank"
            href="https://github.com/Sisysphus/Beau-App"
            className="text-light footer-text"
          >
            Github
          </a>
        </div>
        <div className="d-flex">
          <i class="fas fa-globe-asia text-light footer-icon"></i>
          <a href="/" target="blank" className="text-light footer-text">
            Portfolio
          </a>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
