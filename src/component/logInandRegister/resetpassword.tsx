

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";
import "./Login.css";

export function Resetpass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telegramId, setTelegramId] = useState("");
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false); // For password reset confirmation

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError(""); // Clear any previous error
    } catch (error) {
      setError("Failed to send reset email. Please check your email address.");
    }
  };

  return (
    <div className="SignIn-main">
      <div className="signIn-container">
        <h2>Password Reset</h2>
        <form>
          <div className="In-form-group">
            <input
              type="email"
              id="email"
              className="In-form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {resetEmailSent && <p className="success" style={{ color: 'green' }}>Reset email sent! Check your inbox.</p>} {/* Confirmation for reset email */}
        </form>

        <p className="forgot-password" style={{ marginTop: '10px' }}>
          <button onClick={handleResetPassword} className=" reset-password-btn">
            Send Link to Reset Password
          </button>
        </p>

        <p className="Signupmalar">
          Don't have an account? <NavLink to="/signup" className={"Signupmar"}>Sign Up</NavLink>
        </p>
        <p className="Signupmalar">
          Already have an account? <NavLink to="/signin" className={"Signupmar"}>LogIn</NavLink>
        </p>
        
      </div>
    </div>
  );
}

