
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Login_title from "./regi_img/login.png"
import { EmaillogIn } from "./email/emailLogin";
import {PhonelogIn} from "./phone/phoneLogin"
import "./Login.css";


export function LogIn() {

  const [selectedForm, setSelectedForm] = useState("email");

  return (
    <div className="SignIn-main">
      <div className="signIn-container">
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
        <div className="Login_title"><img src={Login_title} alt="logo" width={150} height={50} /></div>
        
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
       

       {/*  */}
 {/* Conditionally render forms */}
 {selectedForm === "email" && <EmaillogIn />}
        {selectedForm === "phone" && <PhonelogIn />}


        <p className="Signupmalar">
          Don't have an account? <NavLink to="/signup" className={"Signupmar"}>Sign Up</NavLink>
        </p>
        <p className="Signupmalar">
          Forget Password? <NavLink to="/resetpass" className={"Signupmar"}>Reset Password</NavLink>
        </p>
      </div>
    </div>
  );
}

