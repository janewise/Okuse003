import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingScreen } from "../Loading_screen/loadingscreen";
import "./Game_waiting.css";

interface Level {
  id: number;
  difficulty: string;
  cost: number;
  quests:string;
  time: string;
  reward: string;
  image: string;
  selector:string;
  enter: string;
  insufficent:string;
}

interface GameWaitingProps {
  levels: Level[];
  onLevelEnter?: (level: Level, userId: string) => void;
  gameName: string; // Optional game name for dynamic navigation or UI
}

export default function GameWaiting({
  levels,
  onLevelEnter,
  gameName,
}: GameWaitingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState(levels[0]); // Default to the first level
  const [isOnline, setIsOnline] = useState(false);
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  const canPlay =
    isOnline &&
    okuseCoin !== null &&
    okuseCoin >= Number(selectedLevel.cost);

  const handleEnterLevel = async () => {
    if (canPlay) {
      try {
        const user = auth.currentUser;
        if (user) {
          const newCoinBalance = okuseCoin! - Number(selectedLevel.cost);
          const userRef = doc(db, "users", user.uid);
          // await updateDoc(userRef, { Okuse: newCoinBalance.toString() }); // Update Firebase
          await updateDoc(userRef, { Okuse: newCoinBalance });
          setOkuseCoin(newCoinBalance); // Update local state

          // Notify parent component if needed
          if (onLevelEnter) {
            onLevelEnter(selectedLevel, user.uid);
          }

          // Navigate to the specific level page
          navigate(`/${gameName}_level_${selectedLevel.difficulty.toLowerCase()}`);
        }
      } catch (error) {
        console.error("Error updating coin balance:", error);
      }
    }
  };

  return (
    <div className="gamewaiting_MotherBox">
      <div className="container">
        {/* Top section */}
        <div className="gamewaiting_box1">
          <NavLink to="/" className="more_backspace">
            <i className="bi bi-arrow-left-square"></i>
          </NavLink>
          <span className="okuseshow">
            {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
            <i className="bi bi-coin"></i>
          </span>
        </div>

        {/* Level description */}
        {/* <div className="gamewaiting_box2">
          <div className="gamewaiting_description_box">
            <img
              src={selectedLevel.image}
              alt={selectedLevel.difficulty}
              className="level_image"
            />
            <div className="gamewaiting_description_overlay">
              {canPlay ? (
                <>
                  <p>Cost: {selectedLevel.cost} Coins</p>
                  <p>Quests:{selectedLevel.quests}</p>
                  <p>Time: {selectedLevel.time}</p>
                  <p>Reward: {selectedLevel.reward}</p>
                </>
              ) : (
                <p style={{ color: "red" }}>
                  {isOnline
                    ? "Insufficient coins to play this level."
                    : "You must be online to play."}
                </p>
              )}
            </div>
          </div>
        </div> */}
         <div className="gamewaiting_box2">
          <div className="gamewaiting_description_box">
          {canPlay ? (
            <>
            <img
              src={selectedLevel.image}
              alt={selectedLevel.difficulty}
              className="level_image"
            />
            <div className="gamewaiting_description_overlay">
                <>
                  <p>Cost: {selectedLevel.cost} Coins</p>
                  <p>Quests:{selectedLevel.quests}</p>
                  <p>Time: {selectedLevel.time}</p>
                  <p>Reward: {selectedLevel.reward}</p>
                </>
            </div>
            </>
             ) :(  <img
              src={selectedLevel.insufficent}
              alt={selectedLevel.difficulty}
              className="level_image insufficent"
            />)   }
          </div>
        </div>

        {/* Level selection buttons */}
        <div className="gamewaiting_level_buttons">
          {levels.map((level) => (
            // <button
            //   key={level.id}
            //   className={`level_button ${
            //     selectedLevel.id === level.id ? "active" : ""
            //   }`}
            //   onClick={() => setSelectedLevel(level)}
            // >
            //   {level.difficulty}
            // </button>
            <img
              src={level.selector}
              alt={level.difficulty}
              key={level.id}
              className="level_button"
              onClick={() => setSelectedLevel(level)}
            />
          ))}

          {/* Game enter button */}
          <div className="gamewaiting_enter">
            {canPlay ? (
              <img src={selectedLevel.selector} alt="" onClick={handleEnterLevel} />
            ) : (
              <img
                src={selectedLevel.selector}
                alt=""
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
