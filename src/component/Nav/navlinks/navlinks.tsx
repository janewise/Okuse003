// import React from "react";
// import "./navlinks.css"

// export function Navlink() {

//     return(
//         <div className="offcanvas-body">
//           <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//             <li className="nav-item">
//               <a className="nav-link" aria-current="page" href="#">Home</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">topup</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">shop</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#">wishlist</a>
//             </li>

//           </ul>
//           {/*  */}
//         </div>
//     )

// }
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./../../../firebase/firebase"; // Combine imports
import "./navlinks.css";

export function Navlinks() {
  const [usernameId, setUsernameId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Combined onAuthStateChanged to avoid multiple listeners
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsernameId(userData.UsernameId || null);
          } else {
            console.error("User data not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="offcanvas-body">
      <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li>
          {user && (
            <a href="/profile"  className="nav-link-username">
            <button className="profile-icon" aria-label="Profile">
               <i className="bi bi-person-circle"></i>
              <span className="username_show"> {usernameId}</span>
            </button>
            </a>
          )}
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/topup" className="nav-link">
            Top Up
          </a>
        </li>
        <li className="nav-item">
          <a href="/shop" className="nav-link">
            Shop
          </a>
        </li>
        <li className="nav-item">
          <a href="/wishlist" className="nav-link">
            Wishlist
          </a>
        </li>
        <li className="nav-item">
          
        </li>
        <li>
          {user ? (
            <button
              className="btn btn-logout"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/signin">
              <button className="login-btn">Sign In</button>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}
