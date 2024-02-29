import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth ,backendUrl} from "./AuthContext";
import styles from "./authStyles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated, setUser} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUrl}/auth/login`, {
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
      if (res.ok) {
        setAuthenticated(true);
        setUser(data.user);
        navigate(-1);
      } else {
        setErrorMessage("*" + data.message);
      }
    } catch (error) {
      setErrorMessage("*Login failed");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.header}>Welcome Back</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.inputField}
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
              required
            />
            <br />
            <input
              type="password"
              className={styles.inputField}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
            <br />
            <p className={styles.errorMessage}>{erroMessage}</p>
            <button className={styles.submitButton} type="submit">
              Login
            </button>
            <p className={styles.accountInfo}>
              don't have an account? &nbsp;
              <Link className={styles.link} to="/auth/signup">
                Signup
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
