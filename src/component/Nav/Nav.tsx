// import React from "react";
// import logo from "./okuse_Logo.png";
// import { Navlink } from "./navlinks/navlinks";
// import "./Nav.css"


// export function Nav() {
//   return (
//     <nav className="navbar fixed-top">
//     <div className="container">
//       <a className="navbar-brand" href="#">
//       <img src={logo} alt="logo" width={70} height={40}/>
//       </a>


// <ul className="homenav-bar">
// <li className="homenav-item">  <a className="homenav-link" href="#">Home</a></li>
// <li className="homenav-item">  <a className="homenav-link" href="#">Shop</a></li>
// <li className="homenav-item">  <a className="homenav-link" href="#">Top Up</a></li>
// <li className="homenav-item">  <a className="homenav-link" href="#">Wishlist</a></li>
// <li className="homenav-item"> </li>
// </ul>


//       <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="offcanvas offcanvas-end " tab-Index="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
//         <div className="offcanvas-header">
//         <img src={logo} alt="logo" width={60} height={30}/>
//           <button type="button" className="btn-close btn-close-red" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//         </div>
//         {/*offcanvas navlinks */}
//         <Navlink />
//       </div>
//     </div>
//   </nav>
//   );
// }


// import React from "react";
// import { NavLink } from "react-router-dom"; // Use NavLink for active state
// import logo from "./okuse_Logo.png";
// import { Navlink } from "./navlinks/navlinks";
// import "./Nav.css";

// export function Nav() {
//   return (
//     <header className="navbar">
//       <div className="container">
//         <NavLink to="/" className="navbar-brand">
//           <img src={logo} alt="logo" width={70} height={40} />
//         </NavLink>

//         <ul className="homenav-bar">
//           <li className="homenav-item">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? "linkactive homenav-link" : "homenav-link"
//               }
//             >
//               Home
//             </NavLink>
//           </li>
//           <li className="homenav-item">
//             <NavLink to="/shop"   className={({ isActive }) =>
//                 isActive ? "linkactive homenav-link" : "homenav-link"
//               }>
//               Shop
//             </NavLink>
//           </li>
//           <li className="homenav-item">
//             <NavLink to="/topup"   className={({ isActive }) =>
//                 isActive ? "linkactive homenav-link" : "homenav-link"
//               }>
//               Top Up
//             </NavLink>
//           </li>
//           <li className="homenav-item">
//             <NavLink to="/wishlist"   className={({ isActive }) =>
//                 isActive ? "linkactive homenav-link" : "homenav-link"
//               }>
//               Wishlist
//             </NavLink>
//           </li>
//         </ul>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="offcanvas"
//           data-bs-target="#offcanvasDarkNavbar"
//           aria-controls="offcanvasDarkNavbar"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div
//           className="offcanvas offcanvas-end"
//           tab-Index="-1"
//           id="offcanvasDarkNavbar"
//           aria-labelledby="offcanvasDarkNavbarLabel"
//         >
//           <div className="offcanvas-header">
//             <img src={logo} alt="logo" width={60} height={30} />
//             <button
//               type="button"
//               className="btn-close btn-close-red"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//             ></button>
//           </div>
//           {/* Offcanvas navlinks */}
//           <Navlink />
//         </div>
//       </div>
//     </header>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom"; // Use NavLink for active state
// import logo from "./okuse_Logo.png";
// import { Navlink } from "./navlinks/navlinks";
// import { auth, db } from "../../firebase/firebase"; // Ensure proper Firebase import
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import "./Nav.css";

// interface NavProps {
//   theme: "light" | "dark";
//   toggleTheme: () => void;
// }

// export function Nav({ theme, toggleTheme }) {
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(parseInt(userData.Okuse, 10)); // Assuming Okuse is a string in Firestore
//           } else {
//             console.error("No data available for this user.");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <header className="navbar">
//       <div className="container">
//         <NavLink to="/" className="navbar-brand">
//           <img src={logo} alt="logo" width={70} height={40} />
//         </NavLink>
//         <button onClick={toggleTheme}>
//         {theme === "light" ? "Dark Mode" : "Light Mode"}
//       </button>
//         <div>
//           {/* Display Okuse Coin with commas */}
//      <span className="okuseshow">{okuseCoin !== null ? okuseCoin.toLocaleString() : "..."} <i className="bi bi-coin"></i></span>  

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasDarkNavbar"
//             aria-controls="offcanvasDarkNavbar"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//         </div>

//         <div
//           className="offcanvas offcanvas-end"
//           tab-Index="-1"
//           id="offcanvasDarkNavbar"
//           aria-labelledby="offcanvasDarkNavbarLabel"
//         >
//           <div className="offcanvas-header">
//             <img src={logo} alt="logo" width={60} height={30} />
//             <button
//               type="button"
//               className="btn-close btn-close-red"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//             ></button>
//           </div>

//           {/* Offcanvas navlinks */}
//           <Navlink />
//         </div>
//       </div>
//       <ul className="homenav-bar">
//         <li className="homenav-item">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "linkactive homenav-link" : "homenav-link"
//             }
//           >
//              <i className="bi bi-house-fill"></i>
//           </NavLink>
//           <p>House</p>
//         </li>
//         <li className="homenav-item">
//           <NavLink
//             to="/shop"
//             className={({ isActive }) =>
//               isActive ? "linkactive homenav-link" : "homenav-link"
//             }
//           >
//             <i className="bi bi-cart3"></i>
//           </NavLink>
//         <p> shop</p> 
//         </li>
//         <li className="homenav-item">
//           <NavLink
//             to="/topup"
//             className={({ isActive }) =>
//               isActive ? "linkactive homenav-link" : "homenav-link"
//             }
//           >
//           <i className="bi bi-cash"></i>
//           </NavLink>
//           <p>Top Up</p>
//         </li>
//         <li className="homenav-item">
//           <NavLink
//             to="/wishlist"
//             className={({ isActive }) =>
//               isActive ? "linkactive homenav-link" : "homenav-link"
//             }
//           >
//        <i className="bi bi-card-checklist"></i>
//           </NavLink>
//           <p>Wishlist</p>
//         </li>
//       </ul>
//     </header>
//   );
// }

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./nav_img/okuse_Logo.png";
import { Navlinks } from "./navlinks/navlinks";
import { auth, db } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Nav.css";

export function Nav() {
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Toggle theme and update body class
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            // setOkuseCoin(parseInt(userData.Okuse, 10)); // Assuming Okuse is a string in Firestore
            setOkuseCoin(userData.Okuse);
          } else {
            console.error("No data available for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="navbar">
    <div className="container-fluid">
      <NavLink to="/" className="navbar-brand">
        <img src={logo} alt="logo" width={70} height={40} />
      </NavLink>
      <div>
        {/* Display Okuse Coin with commas */}
        <span className="okuseshow">
          {okuseCoin !== null ? okuseCoin.toLocaleString() : "0,000"}{" "}
          <i className="bi bi-coin"></i>
        </span>

        {/* Theme toggle button */}
       {/* Theme toggle button */}
<button onClick={toggleTheme} className="theme-toggle-btn">
{theme === "light" ? (
  <i className="bi bi-brightness-high"></i>
) : (
  <i className="bi bi-moon-stars"></i>
)}
</button>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tab-Index="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <img src={logo} alt="logo" width={60} height={30} />
          <button
            type="button"
            className="btn-close btn-close-red"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        {/* Offcanvas navlinks */}
        <Navlinks />
      </div>
    </div>
  </header> 
  );
}
