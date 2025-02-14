// import React, { useState } from "react";
// import { NavLink,useNavigate } from "react-router-dom";
// import { signUpUser } from "../../firebaseFunctions";
// import Signup_title from "./imguser/signup.png"
// import "./Signup.css";

// export function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
// const [showPassword, setShowPassword] = useState(false);
//   const [UsernameId, setUsernameId] = useState("");
//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [showModal, setShowModal] = useState(false); // State to manage modal visibility

//   const navigate = useNavigate();

//   const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     let formIsValid = true;
//     let errors = {
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };

//     if (!validateEmail(email)) {
//       formIsValid = false;
//       errors.email = "Please enter a valid email address.";
//     }

//     if (password.length < 6) {
//       formIsValid = false;
//       errors.password = "Password must be at least 6 characters long.";
//     }

//     if (password !== confirmPassword) {
//       formIsValid = false;
//       errors.confirmPassword = "Passwords do not match.";
//     }

//     setErrors(errors);

//     if (formIsValid) {
//       try {
//         const user = await signUpUser(email, password, UsernameId);
//         console.log("User signed up:", user);

//         // Set success message and show modal
//         setSuccessMessage("Sign up successful! A verification email has been sent to your inbox.");
//         setShowModal(true); // Show the modal after successful sign up

//       } catch (error) {
//         if (error instanceof Error) {
//           setErrors({ ...errors, email: "Error: email already in use" });
//         } else {
//           setErrors({ ...errors, email: "An unknown error occurred." });
//         }
//       }
//     }
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     navigate("/signin");
//   };

//   return (
//     <div className="SignUp-main">
//       <div className="signUp-container">
//       <a href="/" className="cancel">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             fill="currentColor"
//             className="bi bi-x-lg"
//             viewBox="0 0 16 16"
//           >
//             <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
//           </svg>
//         </a>

//       <div className="Login_title"><img src={Signup_title} alt="logo" width={150} height={50} /></div>
//         <form onSubmit={handleSubmit}>
//           <div className="Up-form-group">
//             <input
//               type="text"
//               id="username_id"
//               className="Up-form-control"
//               placeholder="UserName"
//               value={UsernameId}
//               onChange={(e) => setUsernameId(e.target.value)}
//               required
//             />
//           </div>
//           <div className="Up-form-group">
//             <input
//               type="email"
//               id="email"
//               className="Up-form-control"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="Up-form-group">
//             <input
//              type={showPassword ? "text" : "password"}
//               id="password"
//               className="Up-form-control"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="Up-form-group">
//             <input
//              type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               className="Up-form-control"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />


//             {errors.password && <p className="error" style={{ color: "red" }}>{errors.password}</p>}
//             {errors.email && <p className="error" style={{ color: 'red' }}>{errors.email}</p>}
//             {errors.confirmPassword && (
//               <p className="error" style={{ color: 'red' }}>{errors.confirmPassword}</p>
//             )}
//           </div>
//           {successMessage && <p className="success" style={{ color: "green" }}>{successMessage}</p>}
//           <button type="submit" className="btn signupbtn">
//             Sign Up
//           </button>
//         </form>
//         <p className="Signupmalar">
//           Already have an account? <NavLink to="/signin" className={"Signupmar"}>Log In</NavLink>
//         </p>
//       </div>

//       {/* Modal for verification message */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Verification Required</h3>
//             <p>A verification email has been sent to your inbox. Please verify your email before logging in.</p>
//             <button onClick={handleCancel} className="btn btn-secondary">Yes</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React from "react";
// import { NavLink} from "react-router-dom";
// import Signup_title from "./imguser/signup.png"
// import { EmailsignUp } from "./email/emailSignup";
// import "./Signup.css";
// import { PhoneSignUp } from "./phone/phoneSignup";

// export function SignUp() {

//   return (
//     <div className="SignUp-main">
//       <div className="signUp-container">

// <ul>
//   <li><a href="./phonesignup"></a>Phone</li>
//   <li><a href="./emailsignup">Emial</a></li>
// </ul>

//       <a href="/" className="cancel">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             fill="currentColor"
//             className="bi bi-x-lg"
//             viewBox="0 0 16 16"
//           >
//             <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
//           </svg>
//         </a>

//       <div className="Login_title"><img src={Signup_title} alt="logo" width={150} height={50} /></div>
//       {/*  */}
//       <EmailsignUp />
//       <PhoneSignUp/>

//         <p className="Signupmalar">
//           Already have an account? <NavLink to="/signin" className={"Signupmar"}>Log In</NavLink>
//         </p>
//       </div>
     
//     </div>
//   );
// }


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Signup_title from "./regi_img/signup.png";
import { EmailsignUp } from "./email/emailSignup";
import { PhoneSignUp } from "./phone/phoneSignup";
import "./Signup.css";

export function SignUp() {
  const [selectedForm, setSelectedForm] = useState("email"); // Default form is "email"

  return (
    <div className="SignUp-main">
      <div className="signUp-container">

       
        {/* Cancel button */}
        <a href="/" className="cancel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </a>

        {/* Signup title */}
        <div className="Login_title">
          <img src={Signup_title} alt="logo" width={150} height={50} />
        </div>

 {/* Navigation for switching forms */}
 <div className="form-toggle">
 <ul>
 <li
            className={selectedForm === "email" ? "gp_active" : ""}
            onClick={() => setSelectedForm("email")}
          >
            Email
          </li>
          <li
            className={selectedForm === "phone" ? "gp_active" : ""}
            onClick={() => setSelectedForm("phone")}
          >
            Phone
          </li>
        </ul></div>


        {/* Conditionally render forms */}
        {selectedForm === "email" && <EmailsignUp />}
        {selectedForm === "phone" && <PhoneSignUp />}

        {/* Link to login */}
        <p className="Signupmalar">
          Already have an account?{" "}
          <NavLink to="/signin" className={"Signupmar"}>
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
