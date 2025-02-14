import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingScreen } from "../Loading_screen/loadingscreen";
import candybg from "./candy_img/candy_background.png";
import candy_pink_bg from "./candy_img/candy-crush-pink-bg.png";
import candyplay from "./candy_img/playbtn.png"
import "./MatchCandy.css"

export default function MatchCandy(){
  const [isLoading, setIsLoading] = useState<boolean>(true);
   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
 const [isOnline, setIsOnline] = useState(false);
const [ticketCard, setTicketCard] = useState<number | null>(null);


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


      if (isLoading) return <LoadingScreen />;
    return(
        <>
        <div>
        <img src={candybg} alt="" className="candybg"/>
          <div className="candycontainer container">
          <div className="gamewaiting_box1">
          <NavLink to="/" className="candymore_backspace">
            <i className="bi bi-arrow-left-square"></i>
          </NavLink>
          <div className="candyokuseshowDiv">
          <span className="candyokuseshow">
          {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
          <i className="bi bi-ticket-perforated"></i>
          </span>
          <span className="candyokuseshow">
            {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
            <i className="bi bi-coin"></i>
          </span>
          </div>
        </div>
        

        <div className="gamewaiting_box2">
          <div className="candywaiting_description_box">
            <img
              src={candy_pink_bg}
              className="candylevel_image"
            />
            <div className="candywaiting_description_overlay">
              {canPlay ? (
                <>
                 <h5>Rule</h5>           
                  <p>10 coins per every Each move</p>
                  <p>3 candies match get 8 coins</p>
                  <p>4 candies match get 1 Ticket</p>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  {isOnline
                    ? "At least 10 coins to play."
                    : "You must be online to play."}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="candygamewaiting_level_buttons">
         
          {/* Game enter button */}
          <div className="candywaiting_enter">
            {canPlay ? (
              <NavLink to="/matchcandylvl"> <img src={candyplay} alt="" /> </NavLink>
            ) : (
              <img
                src={candyplay}
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