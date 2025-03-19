import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Register.css"; // Import CSS for styling
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8081/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage("Login successful!");
          localStorage.setItem("token", data.token); // Store the JWT token
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setMessage(data.message || "Login failed!");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form login">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
            <p>Email</p>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validate()}
              />
            </div>
            {emailError && <p className="error">{emailError}</p>}

            <div className="field">
              <p>Password</p>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validate()}
              />
            </div>
            {passwordError && <p className="error">{passwordError}</p>}

            <div className="field">
              <button type="submit">Login</button>
            </div>

            {message && <p className="success-message">{message}</p>}
          </form>

          <div className="form-link">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;