
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../../firebase/firebaseFunctions";
import "./emailSignup.css";

export function EmailsignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameId, setUsernameId] = useState<string>("");
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{6,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    let errors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(email)) {
      formIsValid = false;
      errors.email = "Please enter a valid email address.";
    }

    if (!validatePassword(password)) {
      formIsValid = false;
      errors.password =
        "Password must be at least 6 characters long, include an uppercase letter, a number, and a special character.";
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);

    if (formIsValid) {
      setIsLoading(true);
      try {
        const user = await signUpUser(email, password, usernameId);
        console.log("User signed up:", user);

        setSuccessMessage(
          "Sign up successful! A verification email has been sent to your inbox."
        );
        setShowModal(true);
        console.log("Modal shown: ", showModal);
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ ...errors, email: "Error: email already in use." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    console.log("Modal canceled. Navigating to signin...");
    setShowModal(false);
    navigate("/signin");
  };

  useEffect(() => {
    if (showModal) {
      console.log("Modal active. Redirecting in 5 seconds...");
      const timer = setTimeout(() => {
        console.log("Redirecting to /signin");
        navigate("/signin");
      }, 5000);
      return () => {
        console.log("Cleanup modal timeout");
        clearTimeout(timer);
      };
    }
  }, [showModal, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="Up-form-group">
          <input
            type="text"
            id="username_id"
            className="Up-form-control"
            placeholder="Username"
            value={usernameId}
            onChange={(e) => setUsernameId(e.target.value)}
            required
          />
        </div>
        <div className="Up-form-group">
          <input
            type="email"
            id="email"
            className="Up-form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="Up-form-group">
          <input
            type="password"
            id="password"
            className="Up-form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="Up-form-group">
          <input
            type="password"
            id="confirmPassword"
            className="Up-form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {errors.email && <p className="error" style={{ color: "red" }}>{errors.email}</p>}
        {errors.password && <p className="error" style={{ color: "red" }}>{errors.password}</p>}
        {errors.confirmPassword && (
          <p className="error" style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}

        {successMessage && <p className="success">{successMessage}</p>}
        <button
          type="submit"
          className="btn signupbtn"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Verification Required</h3>
            <p>
              A verification email has been sent to your inbox. Please verify
              your email before logging in.
            </p>
            <button
              onClick={handleCancel}
              className="btn btn-secondary cancel-btn"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
}
