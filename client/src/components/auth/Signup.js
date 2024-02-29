import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth, backendUrl } from "./AuthContext";
import styles from "./authStyles.module.css";

const Signup = () => {
  const { isAuthenticated, setAuthenticated, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("*password must be at least 8 chars");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("*passwords not matching");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 201) {
        setAuthenticated(true);
        setUser(data.user);
        navigate("/");
      } else {
        setErrorMessage("*" + data.message);
      }
    } catch (err) {
      setErrorMessage("*signup failed");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>Create account</h1>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.inputField}
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Email address"
            />
            <br />
            <input
              className={styles.inputField}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            <br />
            <input
              className={styles.inputField}
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm password"
              required
            />
            <br />
            <p className={styles.errorMessage}>{erroMessage}</p>
            <button className={styles.submitButton} type="submit">
              Signup
            </button>
            <p className={styles.accountInfo}>
              already have an account?{" "}
              <Link className={styles.link} to="/auth/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
