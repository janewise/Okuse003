import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingScreen } from "../Loading_screen/loadingscreen";
import wackbg from "./wackamole_img/beautifulgreen_hill.jpg";
import wack_pink_bg from "./wackamole_img/wackboard.png";
import wackplay from "./wackamole_img/wackmole_start.png";
import leftwoodarr from "./wackamole_img/leftarrowwood.png"
import woodsignboard from "./wackamole_img/woodboardsign.png"
import "./WackMole.css";
import { hexToRgb } from "@mui/material";

export default function WackMole(){
  const [isLoading, setIsLoading] = useState<boolean>(true);
   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
 const [isOnline, setIsOnline] = useState(false);
const [ticketCard, setTicketCard] = useState<number | null>(null);
 const navigate = useNavigate();

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsOnline(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
              //  setOkuseCoin(userData.Okuse); // Assuming Okuse is a number in Firestore
              setOkuseCoin(userData.Okuse);
              setTicketCard(userData.Ticket);
            } else {
            console.error("No data available for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsOnline(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Simulate a minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const canPlay = 
   isOnline &&
   okuseCoin !== null &&
   okuseCoin >= 10;
 const handleEnterLevel = async () => {
    if (canPlay) {
      try {
        const user = auth.currentUser;
        if (user) {
          const newCoinBalance = okuseCoin! - 20;
          const userRef = doc(db, "users", user.uid);
          // await updateDoc(userRef, { Okuse: newCoinBalance.toString() }); // Update Firebase
          await updateDoc(userRef, { Okuse: newCoinBalance });
          setOkuseCoin(newCoinBalance); // Update local state

          // Notify parent component if needed
         

          // Navigate to the specific level page
          navigate(`/wackmole_lvl`);
        }
      } catch (error) {
        console.error("Error updating coin balance:", error);
      }
    }
  };



      if (isLoading) return <LoadingScreen />;
    return(
        <>
        <div className="motherwack">
        <img src={wackbg} alt="" className="candybg"/>
          <div className="candycontainer container">
          <div className="WackGameNav">
          <NavLink to="/" className="wackmole_backspace">
            <img src={leftwoodarr} alt="" width={"60"}/>
          </NavLink>
          <div className="candyokuseshowDiv">
          <span className="wackmoleokuseshow">
          <div>
          {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
          <i className="bi bi-ticket-perforated"></i>
          </div>
          </span>
          <span className="wackmoleokuseshow">
            <div>
            {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
            <i className="bi bi-coin"></i>
            </div>
          </span>
          </div>
        </div>
        

        <div className="gamewaiting_box2">
          <div className="candywaiting_description_box">       
              {canPlay ? (
              
                <img
                src={wack_pink_bg}
                className="candylevel_image"
              />
              ) : (
                <img
                src={wack_pink_bg}
                className="candylevel_image"
              />
              )}
          
          </div>
        </div>

        <div className="wackmole_level_buttons">
         
          {/* Game enter button */}
          <div className="candywaiting_enter">
            {canPlay ? (
               <img
               src={wackplay}
               alt=""
               onClick={handleEnterLevel}
             />
            ) : (
              <img
                src={wackplay}
                alt=""
                style={{ cursor: "not-allowed" }}
              />
            )}
          </div>
        </div>
          </div>
        </div>
        </>
    )
}