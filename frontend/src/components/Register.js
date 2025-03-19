import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; // Add this import statement
import "../Css/Register.css"; // Import the updated CSS file for styling

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState(""); // New state for role validation
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    // Validate username
    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Validate role
    if (!role) {
      setRoleError("Please select a role");
      isValid = false;
    } else {
      setRoleError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8081/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, role })
        });
        
        const data = await response.text();

        if (response.ok) {
          setMessage("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMessage(data || "Registration failed. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <div className="form signup">
          <header>Register</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => validate()}
              />
            </div>
            {usernameError && <p className="error">{usernameError}</p>}

            <div className="field">
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
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onBlur={() => validate()}
              >
                <option value="">Select a role</option>
                <option value="donor">Donor</option>
                <option value="recipient">Recipient</option>
              </select>
            </div>
            {roleError && <p className="error">{roleError}</p>}

            <div className="field">
              <button type="submit">Register</button>
            </div>

            {message && <p className="success-message">{message}</p>}
          </form>

          <div className="form-link">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
