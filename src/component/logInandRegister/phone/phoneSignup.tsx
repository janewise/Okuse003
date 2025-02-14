// declare global {
//     interface Window {
//       recaptchaVerifier: RecaptchaVerifier;
//     }
//   }
  
// import React, { useState } from 'react';
// import PhoneInput from 'react-phone-input-2'
// import OtpInput from "react-otp-input";
// import 'react-phone-input-2/lib/bootstrap.css'
// import "./phoneSignup.css"


// export function PhoneSignUp(){
//     const [otp, setOtp] = useState("");
    
//     return<> 
//     <div className='phonenum_inputbox'>

// <form className="phsignup-form">
// <PhoneInput
//  country={'us'}
//   inputProps={{
//     name: 'phone',
//     required: true,
//     autoFocus: true
//   }}
// />

// <br />
//         <div className="phUp-form-group">
//           <input
//             type="text"
//             id="username_id"
//             className="Up-form-control"
//             placeholder="Username"
//             required
//           />
//         </div>
//         <div className="phUp-form-group">
//           <input
//             type="password"
//             id="password"
//             className="Up-form-control"
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn signupbtn"
//         >
      
//         </button>
//       </form>

// {/* after successfully submit ph number ,username and password otp will send to the submit ph num */}
// <div className="optinpt_box">
//               <OtpInput
//                 value={otp}
//                 onChange={setOtp}
//                 numInputs={6}
//                 renderSeparator={<span></span>}
//                 renderInput={(props) => <input {...props} />}
//               />
              
//                 <span>Verify OTP</span>

//               </div>
    
//     </div>
//   </>
// }


// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import OtpInput from "react-otp-input";
// import "react-phone-input-2/lib/bootstrap.css";
// import "./phoneSignup.css";
// import { getAuth, RecaptchaVerifier,signInWithPhoneNumber, PhoneAuthProvider} from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export function PhoneSignUp() {
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [verificationId, setVerificationId] = useState(null);
//   const navigate = useNavigate();
//   const auth = getAuth();


  
//   // Initialize Recaptcha
//   const initializeRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log("Recaptcha verified");
//           },
//         },
//         auth // Ensure auth is correctly initialized
//       );
//     }
//   };
  

//   const handlePhoneSubmit = async (e:any) => {
//     e.preventDefault();
//     if (!phone || !username || !password) {
//       alert("Please fill in all the fields");
//       return;
//     }

//     initializeRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmationResult = await signInWithPhoneNumber(auth, `+${phone}`, appVerifier);
//       setVerificationId(confirmationResult.verificationId);
//       setIsOtpSent(true);
//     } catch (error) {
//       console.error("Error sending OTP:");
//       alert("Failed to send OTP. Please try again.");
//     }
//   };

//   const handleOtpSubmit = async (e:any) => {
//     e.preventDefault();
//     if (!otp) {
//       alert("Please enter the OTP");
//       return;
//     }
  
//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await auth.signInWithCredential(credential);
//       console.log("User verified and logged in successfully");
//       navigate("/Login");
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//       alert("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div id="recaptcha-container"></div>
//       <div className="phonenum_inputbox">
//         {!isOtpSent ? (
//           <form className="phsignup-form" onSubmit={handlePhoneSubmit}>
//             <PhoneInput
//               country={"us"}
//               value={phone}
//               onChange={setPhone}
//               inputProps={{
//                 name: "phone",
//                 required: true,
//                 autoFocus: true,
//               }}
//             />
//             <br />
//             <div className="phUp-form-group">
//               <input
//                 type="text"
//                 id="username_id"
//                 className="Up-form-control"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="phUp-form-group">
//               <input
//                 type="password"
//                 id="password"
//                 className="Up-form-control"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit" className="btn signupbtn">
//               Send OTP
//             </button>
//           </form>
//         ) : (
//           <form className="otp-verification-form" onSubmit={handleOtpSubmit}>
//             <div className="optinpt_box">
//               <OtpInput
//                 value={otp}
//                 onChange={setOtp}
//                 numInputs={6}
//                 renderSeparator={<span></span>}
//                 renderInput={(props) => <input {...props} />}
//               />
//               <button type="submit" className="btn verifybtn">
//                 Verify OTP
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </>
//   );
// }



// import OtpInput from "react-otp-input";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { auth } from "../../../firebase/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import "./phoneSignup.css";

// export function PhoneSignUp() {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log("Captcha verified");
//           },
//           "expired-callback": () => {
//             toast.error("Recaptcha expired. Please try again.");
//           },
//         },
//         auth
//       );
//     }
//   }

//   const onSignup = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + ph;
//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//         toast.error("Failed to send OTP. Try again.");
//       });
//   };

//   const onOTPVerify = () => {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then((res) => {
//         setUser(res.user);
//         setLoading(false);
//         toast.success("OTP verified successfully!");
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//         toast.error("Invalid OTP. Try again.");
//       });
//   };

//   return (
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>

//         <div className="phonenum_inputbox">
//           {showOTP ? (
//             <>
             
//               <label
//                 htmlFor="otp"
//                 className="font-bold text-xl text-white text-center"
//               >
//                 Enter your OTP
//               </label>
// <div className="optinpt_box">
//               <OtpInput
//                 value={otp}
//                 onChange={setOtp}
//                 numInputs={6}
//                 renderSeparator={<span></span>}
//                 renderInput={(props) => <input {...props} />}
//               />
//               <button
//                 onClick={onOTPVerify}
//                 className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//               >
//                 {loading && (
//                 "Verify..."
//                 )}
//                 <span>Verify OTP</span>
//               </button>
//               </div>
//             </>
            
//           ) : (
//             <>

//               <form className="phsignup-form" onSubmit={onSignup}>
//                 <PhoneInput
//                   country={"us"}
//                   value={ph}
//                   onChange={setPh}
//                   inputProps={{
//                     name: "phone",
//                     required: true,
//                     autoFocus: true,
//                   }}
//                 />

//                 <br />
//                 <div className="phUp-form-group">
//                   <input
//                     type="text"
//                     id="username_id"
//                     className="Up-form-control"
//                     placeholder="Username"
//                     required
//                   />
//                 </div>
//                 <div className="phUp-form-group">
//                   <input
//                     type="password"
//                     id="password"
//                     className="Up-form-control"
//                     placeholder="Password"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn signupbtn"
//                   disabled={loading}
//                 >
//                   {loading && (
//                "Sending..."
//                   )}
//                   <span>Send code via SMS</span>
//                 </button>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//   );
// }


// PhoneSignUp.tsx for both password and user v2 latest
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/bootstrap.css";
import "./phoneSignup.css";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export function PhoneSignUp() {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  // // Initialize Recaptcha
  // const initializeRecaptcha = () => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container", // Container ID
  //       {
  //         size: "invisible",
  //         callback: () => {
  //           console.log("Recaptcha verified");
  //         },
  //       },
  //       auth // Ensure the correct `auth` instance is passed here
  //     );
  //   }
  // };

  // const handlePhoneSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!phone || !username || !password) {
  //     alert("Please fill in all the fields");
  //     return;
  //   }

  //   initializeRecaptcha();
  //   const appVerifier = window.recaptchaVerifier;

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       `+${phone}`,
  //       appVerifier
  //     );
  //     setVerificationId(confirmationResult.verificationId);
  //     setIsOtpSent(true);
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     alert("Failed to send OTP. Please try again.");
  //   }
  // };

  // const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (!otp) {
  //     alert("Please enter the OTP");
  //     return;
  //   }

  //   if (!verificationId) {
  //     alert("Verification ID is missing. Please request a new OTP.");
  //     return;
  //   }

  //   try {
  //     const credential = PhoneAuthProvider.credential(verificationId, otp);
  //     await signInWithCredential(auth, credential);
  //     console.log("User verified and logged in successfully");
  //     navigate("/Login");
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     alert("Invalid OTP. Please try again.");
  //   }
  // };

  return (
    <>
      <div id="recaptcha-container"></div>
      <div className="phonenum_inputbox">
        {!isOtpSent ? (
          //  <form className="phsignup-form" onSubmit={handlePhoneSubmit}>
               <form className="phsignup-form"> 
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
            <br />
            <div className="phUp-form-group">
              <input
                type="text"
                id="username_id"
                className="Up-form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="phUp-form-group">
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
            <button type="submit" className="btn signupbtn">
              Send OTP
            </button>
          </form>
        ) : (
          //  <form className="otp-verification-form" onSubmit={handleOtpSubmit}>
             <form className="otp-verification-form" > 
            <div className="optinpt_box">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              />
              <button type="submit" className="btn verifybtn">
                Verify OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}





// import OtpInput from "react-otp-input";
// import { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/bootstrap.css";
// import { auth } from "../../../firebase/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber, User } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";

// // Global declaration for recaptchaVerifier and confirmationResult
// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//     confirmationResult: any;
//   }
// }

// export function PhoneSignUp()  {
//   const [otp, setOtp] = useState<string>(""); // OTP state
//   const [ph, setPh] = useState<string>(""); // Phone number state
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const [showOTP, setShowOTP] = useState<boolean>(false); // OTP visibility
//   const [user, setUser] = useState<User | null>(null); // Firebase User

//   // Initialize Recaptcha
//   const onCaptchVerify = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response: any) => {
//             onSignup();
//           },
//           "expired-callback": () => {
//             toast.error("Recaptcha expired. Please try again.");
//           },
//         },
//         auth
//       );
//     }
//   };

//   // Handle Phone Signup
//   const onSignup = () => {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;
//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sent successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Failed to send OTP. Please try again.");
//         setLoading(false);
//       });
//   };

//   // Handle OTP Verification
//   const onOTPVerify = () => {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then((res: any) => {
//         setUser(res.user);
//         setLoading(false);
//         toast.success("Login successful!");
//       })
//       .catch((err: any) => {
//         console.error(err);
//         toast.error("Invalid OTP. Please try again.");
//         setLoading(false);
//       });
//   };

//   return (
//     <section className="bg-emerald-500 flex items-center justify-center h-screen">
//       <div>
//         <Toaster toastOptions={{ duration: 4000 }} />
//         <div id="recaptcha-container"></div>
//         {user ? (
//           <h2 className="text-center text-white font-medium text-2xl">
//             👍 Login Success
//           </h2>
//         ) : (
//           <div className="w-80 flex flex-col gap-4 rounded-lg p-4">

//             {showOTP ? (
//               <>
//                 <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
             
//                 </div>
//                 <label
//                   htmlFor="otp"
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Enter your OTP
//                 </label>
//                 <OtpInput
//                  value={otp}
//                  onChange={setOtp}
//                  numInputs={6}
//                  renderSeparator={<span></span>}
//                renderInput={(props) => <input {...props} />}
//               />
//                 <button
//                   onClick={onOTPVerify}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
                
//                   <span>Verify OTP</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <label
//                   htmlFor="phone"
//                   className="font-bold text-xl text-white text-center"
//                 >
//                   Verify your phone number
//                 </label>
//                 <PhoneInput
//                   country={"in"}
//                   value={ph}
//                   onChange={setPh}
//                   inputStyle={{ width: "100%" }}
//                 />
//                 <button
//                   onClick={onSignup}
//                   className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                 >
          
//                   <span>Send code via SMS</span>
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

