import React,{useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Ticketpng from "../nav_img/Ticket.png"
// import ticketpng from "./nav_img/Ticket";

export function Homelink(){

    const [ticketCard, setTicketCard] = useState<number | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(userRef);
  
            if (snapshot.exists()) {
              const userData = snapshot.data();
              // setOkuseCoin(parseInt(userData.Okuse, 10)); // Assuming Okuse is a string in Firestore
              setTicketCard(userData.Ticket);
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
  


    return(
        <>
       <div className="ticketpng">
        <img src={Ticketpng} alt="" />
        <span> {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}</span>
       </div>
         <ul className="homenav-bar">
      <li className="homenav-item">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "linkactive homenav-link" : "homenav-link"
          }
        >
          <i className="bi bi-house-fill"></i>
        </NavLink>
        <p>House</p>
      </li>
      <li className="homenav-item">
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "linkactive homenav-link" : "homenav-link"
          }
        >
          <i className="bi bi-cart3"></i>
        </NavLink>
        <p>Shop</p>
      </li>
      <li className="homenav-item">
        <NavLink
          to="/topup"
          className={({ isActive }) =>
            isActive ? "linkactive homenav-link" : "homenav-link"
          }
        >
          <i className="bi bi-cash"></i>
        </NavLink>
        <p>Top Up</p>
      </li>
      <li className="homenav-item">
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "linkactive homenav-link" : "homenav-link"
          }
        >
          <i className="bi bi-card-checklist"></i>
        </NavLink>
        <p>Wishlist</p>
      </li>
      <li className="homenav-item">
        <NavLink
          to="/more"
          className="homenav-link">
        <i className="bi bi-ui-checks-grid"></i>
        </NavLink>
        <p>More</p>
      </li>
    </ul>
    </>
    )
}