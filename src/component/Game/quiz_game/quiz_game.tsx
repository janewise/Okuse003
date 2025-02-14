// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { LoadingScreen } from "../Loading_screen/loadingscreen";
// import {levels} from "./quiz_data"
// import "./quiz_game.css"

// export default function Quizgame() {
//   const [isLoading, setIsLoading] = useState(true);

//    const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//    const [selectedLevel, setSelectedLevel] = useState(levels[0]); // Default to the first level

// // 
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       try {
//         const userRef = doc(db, "users", user.uid);
//         const snapshot = await getDoc(userRef);

//         if (snapshot.exists()) {
//           const userData = snapshot.data();
//           setOkuseCoin(parseInt(userData.Okuse, 10)); // Assuming Okuse is a string in Firestore
//         } else {
//           console.error("No data available for this user.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     }
//   });

//   return () => unsubscribe();
// }, []);

//   useEffect(() => {
//     // Simulate a minimum loading time of 2 seconds
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     // Clean up the timer
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return < LoadingScreen/>; // Replace this with your loading screen design
//   }

//   return (
//     <div className=" quiz_game_MotherBox">
//       <div className="container">
//         {/* for upmost two content */}
//         <div className="quiz_game_box1">
//         <NavLink
//           to="/"
//           className="more_backspace">
//         <i className="bi bi-arrow-left-square"></i>
//         </NavLink>
//           <span className="okuseshow">
//           {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//           <i className="bi bi-coin"></i>
//         </span>
//         </div>
//         {/*  */}
//         <div className="quiz_game_box2">
//   <div className="quizgame_description_box">
//     <img
//       src={selectedLevel.image}
//       alt={selectedLevel.difficulty}
//       className="level_image"
//     />
//     <div className="quizgame_description_overlay">
//       {/* <h4>{selectedLevel.difficulty}</h4> */}
//       <p>Cost: {selectedLevel.cost}</p>
//       <p>Time: {selectedLevel.time}</p>
//       <p>Reward: {selectedLevel.reward}</p>
//     </div>
//   </div>
// </div>

//         {/* Level Selection */}
//         <div className="quiz_level_buttons">
//           {levels.map((level) => (
//             <button
//               key={level.id}
//               className={`level_button ${
//                 selectedLevel.id === level.id ? "active" : ""
//               }`}
//               onClick={() => setSelectedLevel(level)}
//             >
//               {level.difficulty}
//             </button>
//           ))}
        
//          {/* game enter */}
//        <div className="quizlevel_enter"> 
//         <NavLink  key={selectedLevel.id}
//           to={`/quizGame_${selectedLevel.difficulty.toLowerCase()}`}> 
//            <img src={selectedLevel.enter} alt=""/></NavLink>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { LoadingScreen } from "../Loading_screen/loadingscreen";
// import { levels } from "./quiz_data";
// import "./quiz_game.css";

// export default function Quizgame() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [selectedLevel, setSelectedLevel] = useState(levels[0]); // Default to the first level
//   const [isOnline, setIsOnline] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
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
//       } else {
//         setIsOnline(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     // Simulate a minimum loading time of 2 seconds
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return <LoadingScreen />; // Replace this with your loading screen design
//   }

//   const canPlay =
//     isOnline &&
//     okuseCoin !== null &&
//     okuseCoin >= Number(selectedLevel.cost);

//   const handleEnterLevel = async () => {
//     if (canPlay) {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const newCoinBalance = okuseCoin! - Number(selectedLevel.cost);
//           const userRef = doc(db, "users", user.uid);
//           await updateDoc(userRef, { Okuse: newCoinBalance.toString() }); // Update Firebase
//           setOkuseCoin(newCoinBalance); // Update local state
//           navigate(`/quizGame_${selectedLevel.difficulty.toLowerCase()}`); // Navigate to the level
//         }
//       } catch (error) {
//         console.error("Error updating coin balance:", error);
//       }
//     }
//   };

//   return (
//     <div className="quiz_game_MotherBox">
//       <div className="container">
//         {/* Top section */}
//         <div className="quiz_game_box1">
//           <NavLink to="/" className="more_backspace">
//             <i className="bi bi-arrow-left-square"></i>
//           </NavLink>
//           <span className="okuseshow">
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//           </span>
//         </div>

//         {/* Level description */}
//         <div className="quiz_game_box2">
//           <div className="quizgame_description_box">
//             <img
//               src={selectedLevel.image}
//               alt={selectedLevel.difficulty}
//               className="level_image"
//             />
//             <div className="quizgame_description_overlay">
//               {canPlay ? (
//                 <>
//                   <p>Cost: {selectedLevel.cost} Coins</p>
//                   <p>Time: {selectedLevel.time}</p>
//                   <p>Reward: {selectedLevel.reward}</p>
//                 </>
//               ) : (
//                 <p style={{ color: "red" }}>
//                   {isOnline
//                     ? "Insufficient coins to play this level."
//                     : "You must be online to play."}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Level selection buttons */}
//         <div className="quiz_level_buttons">
//           {levels.map((level) => (
//             <button
//               key={level.id}
//               className={`level_button ${
//                 selectedLevel.id === level.id ? "active" : ""
//               }`}
//               onClick={() => setSelectedLevel(level)}
//             >
//               {level.difficulty}
//             </button>
//           ))}

//           {/* Game enter button */}
//           <div className="quizlevel_enter">
//             {canPlay ? (
//                 <img src={selectedLevel.enter} alt="" onClick={handleEnterLevel}/>       
//             ) : (
//               <img
//                 src={selectedLevel.enter}
//                 alt=""
//                 style={{ opacity: 0.5, cursor: "not-allowed" }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import GameWaiting from "../GameWaiting/Game_waiting";

const  Quiz_levels = [
  {
    id: 1,
    difficulty: "Normal",
    cost: 10,
    time: "30 seconds",
    quests:"3",
    reward:  "12 Coins",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
  {
    id: 2,
    difficulty: "Hard",
    cost: 15,
    time: "50 seconds",
    quests:"6",
    reward: "20 Coins",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
  {
    id: 3,
    difficulty: "Hell",
    cost: 30,
    time: "60 seconds",
    quests:"8",
    reward: "1 Ticket",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
];

export default function Match_card() {
  const handleLevelEnter = (level: typeof Quiz_levels[0], userId: string) => {
    console.log(`User ${userId} entered level ${level.difficulty}`);
  };

  return (
    <>
      <GameWaiting
        levels={Quiz_levels}
        onLevelEnter={handleLevelEnter}
        gameName="quiz_game"
      />
    </>
  );
}

