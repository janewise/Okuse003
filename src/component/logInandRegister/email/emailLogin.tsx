
// import React, { useState } from "react";
// import { useNavigate, NavLink } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../../firebase";
// import { ref, get } from "firebase/database";
// import { getDatabase } from "firebase/database";
// import "./emailLogin.css";


// export function EmaillogIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const db = getDatabase();

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       if (!user.emailVerified) {
//         setError("Please verify your email before signing in.");
//         return;
//       }

//       const userRef = ref(db, "users/" + user.uid);
//       const snapshot = await get(userRef);

//       if (snapshot.exists()) {
//         navigate("/");
//       } else {
//         setError("User data not found.");
//       }
//     } catch (error) {
//       setError("Wrong Password or Email");
//     }
//   };

//   return (
    
//         <form onSubmit={handleSubmit}>
//           <div className="In-form-group">
//             <input
//               type="email"
//               id="email"
//               className="In-form-control"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="In-form-group">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="In-form-control"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="show-password">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={showPassword}
//                 onChange={(e) => setShowPassword(e.target.checked)}
//               />{" "}
//              Show Password 
//             </label>
//           </div>
//           {error && <p className="error" style={{ color: "red" }}>{error}</p>}
//           <button type="submit" className="btn  signinbtn">
//             LogIn
//           </button>
//         </form>
        
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase"; // Ensure `db` is your Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import "./emailLogin.css";

export function EmaillogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError("Please verify your email before signing in.");
        return;
      }

      // Firestore: Reference to the user's document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        navigate("/");
      } else {
        setError("User data not found.");
      }
    } catch (error) {
      setError("Wrong Password or Email");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="In-form-group">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="In-form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="show-password">
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />{" "}
          Show Password
        </label>
      </div>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
      <button type="submit" className="btn signinbtn">
        LogIn
      </button>
    </form>
  );
}

