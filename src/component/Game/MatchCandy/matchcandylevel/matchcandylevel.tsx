// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import canyload from "../candy_img/candyspl.gif"
// import { onAuthStateChanged } from "firebase/auth";
// import CandyCrushGame from "./candycrush"
// import "./matchcandylevel.css"

// export default function MatchCandylvl(){
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//    const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//     const [ticketCard, setTicketCard] = useState<number | null>(null);
   
//  const [isOnline, setIsOnline] = useState(false);

//    useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//               //  setOkuseCoin(userData.Okuse); // Assuming Okuse is a number in Firestore
//               setOkuseCoin(userData.Okuse);
//               setTicketCard(userData.Ticket);
//             } else {
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
//     }, 4000);

//     return () => clearTimeout(timer);
//   }, []);

//   const canPlay =
//   isOnline &&
//   okuseCoin !== null &&
//   okuseCoin >= 10;

// // 



//       if (isLoading) return  <div className="candyload">
//         <img src={canyload} alt="" />
//       </div>;
//     return(
//         <>
//         <div className="Mother_MatchCandy">
//           <div className="container">
//           <div className="gamewaiting_box1">
//           <NavLink to="/" className="candymore_backspace">
//             <i className="bi bi-arrow-left-square"></i>
//           </NavLink>
//           <div className="candyokuseshowDiv">
//           <span className="candyokuseshow">
//           {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//           <i className="bi bi-ticket-perforated"></i>
//           </span>
//           <span className="candyokuseshow">
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//           </span>
//           </div>
          
//         </div>

//       <CandyCrushGame/>
//           </div>
//         </div>
//         </>
//     )
// }


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import canyload from "../candy_img/candyspl.gif";
import { onAuthStateChanged } from "firebase/auth";
import CandyCrushGame from "./candycrush";
import "./matchcandylevel.css";

export default function MatchCandylvl() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsOnline(true);
        setUserId(user.uid);

        const userRef = doc(db, "users", user.uid);

        // **Real-time listener for Firestore updates**
        const unsubscribeSnapshot = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setOkuseCoin(userData.Okuse ?? 0);
            setTicketCard(userData.Ticket ?? 0);
          } else {
            console.error("No data available for this user.");
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setIsOnline(false);
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    // Simulate a minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const canPlay = isOnline && okuseCoin !== null && okuseCoin >= 10;

  if (isLoading)
    return (
      <div className="candyload">
        <img src={canyload} alt="" />
      </div>
    );

  return (
    <>
      <div className="Mother_MatchCandy">
        <div className="container">
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
        </div>
        <CandyCrushGame />
      </div>
    </>
  );
}



// import React, { useState, useEffect } from "react";
// import "./matchcandylevel.css"; // Ensure you have appropriate styles

// const width = 8;
// const candyColors = ["red", "yellow", "green", "blue", "orange", "purple"];

// const MatchCandylvl = () => {
//   const [board, setBoard] = useState([]);
//   const [dragging, setDragging] = useState(null);

//   useEffect(() => {
//     const createBoard = () => {
//       const newBoard = Array.from({ length: width * width }, () =>
//         candyColors[Math.floor(Math.random() * candyColors.length)]
//       );
//       setBoard(newBoard);
//     };
//     createBoard();
//   }, []);

//   const checkForMatches = () => {
//     let updatedBoard = [...board];
//     for (let i = 0; i < width * width; i++) {
//       if (i % width < width - 2 && board[i] === board[i + 1] && board[i] === board[i + 2]) {
//         updatedBoard[i] = "";
//         updatedBoard[i + 1] = "";
//         updatedBoard[i + 2] = "";
//       }
//       if (i < width * (width - 2) && board[i] === board[i + width] && board[i] === board[i + width * 2]) {
//         updatedBoard[i] = "";
//         updatedBoard[i + width] = "";
//         updatedBoard[i + width * 2] = "";
//       }
//     }
//     setBoard(updatedBoard);
//   };

//   const handleDragStart = (index) => setDragging(index);

//   const handleDrop = (index) => {
//     if (dragging === null) return;
//     let newBoard = [...board];
//     [newBoard[dragging], newBoard[index]] = [newBoard[index], newBoard[dragging]];
//     setBoard(newBoard);
//     checkForMatches();
//     setDragging(null);
//   };

//   return (
//     <div className="board">
//       {board.map((candy, index) => (
//         <div
//           key={index}
//           className="candy"
//           style={{ backgroundColor: candy }}
//           draggable
//           onDragStart={() => handleDragStart(index)}
//           onDrop={() => handleDrop(index)}
//           onDragOver={(e) => e.preventDefault()}
//         />
//       ))}
//     </div>
//   );
// };

// export default MatchCandylvl;
