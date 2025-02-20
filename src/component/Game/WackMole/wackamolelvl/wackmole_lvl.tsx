
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
import moleSprite from "../wackamole_img/wackmole_sprites.png";
import wackbg from "../wackamole_img/whack-a-mole.jpeg";
import leftwoodarr from "../wackamole_img/leftarrowwood.png";
import wackreplay from "../wackamole_img/woodreplay.png"

import "./wackmole_lvl.css";

const NUM_HOLES = 9;

interface Mole {
  id: number;
  position: number | null;
  frame: number;
  isHit: boolean;
}

export default function WackMole_lvl() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [moles, setMoles] = useState<Mole[]>([]);
  const [score, setScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(20);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [hereTicket, setHereTicket] = useState(0);
const [hereCoin, setHereCoin] = useState(0);
const wackmolesound = new Audio("/Game/Sound/wackmole.mp3");

// const [gameOver, setGameOver] = useState(() => {
//   const savedGameOver = localStorage.getItem("gameOver");
//   const savedhereTicket = localStorage.getItem("hereTicket");
//   const savedhereCoin = localStorage.getItem("hereCoin");
//   const savedscore = localStorage.getItem("score");
//   const savedcountdown = localStorage.getItem("countdown");
//   return savedGameOver ? JSON.parse(savedGameOver) : false;
// });

// useEffect(() => {
//   localStorage.setItem("gameOver", JSON.stringify(gameOver));
//   localStorage.setItem("hereTicket",JSON.stringify(hereTicket));
//   localStorage.setItem("hereCoin",JSON.stringify(hereCoin));
//   localStorage.setItem("score",JSON.stringify(score));
//   localStorage.setItem("countdown",JSON.stringify(countdown));
// }, [gameOver]);

// useEffect(() => {
//   const storedGameOver = localStorage.getItem("gameOver");
//   if (storedGameOver) {
//     setGameOver(JSON.parse(storedGameOver));
//   }
// }, []);
const [gameOver, setGameOver] = useState(() => {
  const savedGameOver = localStorage.getItem("gameOver");
  return savedGameOver ? JSON.parse(savedGameOver) : false;
});

useEffect(() => {
  localStorage.setItem("gameOver", JSON.stringify(gameOver));
}, [gameOver]);

useEffect(() => {
  const storedGameOver = localStorage.getItem("gameOver");
  if (storedGameOver) {
    setGameOver(JSON.parse(storedGameOver));
  }
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsOnline(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.data();
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timerInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else {
      setGameOver(true); // Game over when timer reaches 0
    }
  }, [countdown]);

  useEffect(() => {
    localStorage.setItem("gameOver", JSON.stringify(gameOver));
  }, [gameOver, okuseCoin]);
  

  useEffect(() => {
    if (gameOver) return;

    const spawnMole = () => {
      const newPosition = Math.floor(Math.random() * NUM_HOLES);
      const moleId = Date.now();
      setMoles((prevMoles) => [
        ...prevMoles,
        { id: moleId, position: newPosition, frame: 1, isHit: false },
      ]);

      let frameIndex = 1;
      const appearInterval = setInterval(() => {
        setMoles((prevMoles) =>
          prevMoles.map((mole) =>
            mole.id === moleId && frameIndex < 5 ? { ...mole, frame: frameIndex++ } : mole
          )
        );
        if (frameIndex === 5) clearInterval(appearInterval);
      }, 180);

      setTimeout(() => {
        let disappearIndex = 4;
        const disappearInterval = setInterval(() => {
          setMoles((prevMoles) =>
            prevMoles.map((mole) =>
              mole.id === moleId && disappearIndex > 1 ? { ...mole, frame: mole.frame - 1 } : mole
            )
          );
          disappearIndex--;
          if (disappearIndex === 1) {
            clearInterval(disappearInterval);
            setMoles((prevMoles) => prevMoles.filter((m) => m.id !== moleId));
          }
        }, 180);
      }, 600);
    };

    const interval = setInterval(spawnMole, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const storedGameOver = localStorage.getItem("gameOver");
    const storedOkuseCoin = localStorage.getItem("okuseCoin");
  
    if (storedGameOver !== null) {
      setGameOver(JSON.parse(storedGameOver));
    }
  }, []);
  
  // const whackMole = (index: number) => {
  //   setMoles((prevMoles) =>
  //     prevMoles.map((mole) => {
  //       if (mole.position === index && !mole.isHit) {
  //         setScore((prevScore) => prevScore + 1);
  //         wackmolesound.play().catch((err) => {
  //           console.error("Failed to play wackmolesound:", err);
  //         });
  //         mole.isHit = true;

  //         let hitFrames = [43, 44, 45];
  //         let hitIndex = 0;

  //         const hitInterval = setInterval(() => {
  //           if (hitIndex < hitFrames.length) {
  //             setMoles((prevMoles) =>
  //               prevMoles.map((m) =>
  //                 m.id === mole.id ? { ...m, frame: hitFrames[hitIndex++] } : m
  //               )
  //             );
  //           } else {
  //             clearInterval(hitInterval);

  //             let dizzyFrames = [37, 38, 39, 38, 37];
  //             let dizzyIndex = 0;

  //             const dizzyInterval = setInterval(() => {
  //               if (dizzyIndex < dizzyFrames.length) {
  //                 setMoles((prevMoles) =>
  //                   prevMoles.map((m) =>
  //                     m.id === mole.id ? { ...m, frame: dizzyFrames[dizzyIndex++] } : m
  //                   )
  //                 );
  //               } else {
  //                 clearInterval(dizzyInterval);
  //                 setTimeout(() => {
  //                   setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
  //                 }, 100);
  //               }
  //             }, 160);
  //           }
  //         }, 170);
  //       }
  //       return mole;
  //     })
  //   );
  // };

  const whackMole = (index: number) => {
    setMoles((prevMoles) =>
      prevMoles.map((mole) => {
        if (mole.position === index && !mole.isHit) {
          setScore((prevScore) => prevScore + 1);
          wackmolesound.play().catch((err) => {
            console.error("Failed to play wackmolesound:", err);
          });
  
          // Mark the mole as hit to prevent further hits
          mole.isHit = true;
  
          // Set the mole's position to null
          setMoles((prevMoles) =>
            prevMoles.map((m) => (m.id === mole.id ? { ...m, position: null } : m))
          );
  
          // Delay before removing the mole
          setTimeout(() => {
            setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
          }, 100); // Adjust the timing as necessary
        }
        return mole; // Return the original mole for others
      })
    );
  };
  
  
  useEffect(() => {
    if (gameOver) {
      let earnedTickets = Math.floor(score / 10); // 1 ticket for every 10 points
      let earnedCoins = score % 10; // Remaining points become Okuse
  
      setHereTicket(earnedTickets);
      setHereCoin(earnedCoins);
  
      if (isOnline && auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(userRef, {
          Ticket: (ticketCard ?? 0) + earnedTickets,
          Okuse: (okuseCoin ?? 0) + earnedCoins,
        })
        .then(() => {
          setTicketCard((prev) => (prev !== null ? prev + earnedTickets : earnedTickets));
          setOkuseCoin((prev) => (prev !== null ? prev + earnedCoins : earnedCoins));
        })
        .catch((error) => {
          console.error("Error updating rewards:", error);
        });
      }
    }
  }, [gameOver]);
  

  const handleReplay = async () => {
    if (okuseCoin !== null && okuseCoin >= 20) {
      try {
        const userRef = doc(db, "users", auth.currentUser!.uid);
        await updateDoc(userRef, {
          Okuse: okuseCoin - 20,
        });
  
        setOkuseCoin((prev) => (prev !== null ? prev - 20 : null));
        setErrorMessage(null);
  
        // Reset game state
        setGameOver(false);
        setCountdown(20); // Reset timer
        setScore(0); // Reset score
        setMoles([]); // Clear existing moles
  
      } catch (error) {
        console.error("Error deducting coins:", error);
      }
    } else {
      setErrorMessage("Insufficient Okuse coins to replay!");
    }
  };
  

  if (isLoading)
    return (
      <div>
        <img src={wackbg} alt="" className="candybg" />
      </div>
    );

  return (
    <div>
      <img src={wackbg2} alt="" className="candybg" />
      <div className="wackgamewaiting_box1 container">
        <NavLink to="/" className="wackmole_backspace">
          <img src={leftwoodarr} alt="" width={"60"} />
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

      {/* Timer and Score */}
      <div className="wacktimerscore">
        <div>
          <p>Timer: {countdown}s</p>
          <p>Score: {score}</p>
        </div>
      </div>

      {/* Wack Game */}
      {!gameOver ? (
        <div className="wackgame-container">
          <div className="mole-grid">
            {Array.from({ length: NUM_HOLES }).map((_, index) => {
              const mole = moles.find((m) => m.position === index);
              return (
                <div key={index} className="mole-hole" onClick={() => whackMole(index)}>
                  <div
                    className="mole"
                    style={{
                      backgroundImage: `url(${moleSprite})`,
                      backgroundPosition: mole ? `-${(mole.frame - 1) * 100}px 0px` : "0px 0px",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="wackgame_replay">
          <h2>Rewards</h2>
          <p>{hereTicket} Ticket  , {hereCoin} Coins</p>
          <div><img src={wackreplay} alt="" width={60} onClick={handleReplay} />
          <NavLink to="/wack_a_mole"><img src={wackreplay} alt="" width={60}/></NavLink></div>
      </div>      
      )}
    </div>
  );
}






//00002
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc,updateDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
// import moleSprite from "../wackamole_img/wackmole_sprites.png";
// import wackbg from "../wackamole_img/whack-a-mole.jpeg";
// import leftwoodarr from "../wackamole_img/leftarrowwood.png";
// import wackreplay from "../wackamole_img/woodreplay.png"

// import "./wackmole_lvl.css";

// const NUM_HOLES = 9;

// interface Mole {
//   id: number;
//   position: number | null;
//   frame: number;
//   isHit: boolean;
// }

// export default function WackMole_lvl() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [isOnline, setIsOnline] = useState(false);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [moles, setMoles] = useState<Mole[]>([]);
//   const [score, setScore] = useState<number>(0);
//   const [countdown, setCountdown] = useState<number>(25);
//   const [gameOver, setGameOver] = useState<boolean>(false);
//    const [errorMessage, setErrorMessage] = useState<string | null>(null);
//    const [hereTicket, setHereTicket] = useState(0);
// const [hereCoin, setHereCoin] = useState(0);
// const wackmolesound = new Audio("/Game/Sound/wackmole.mp3");

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(userData.Okuse);
//             setTicketCard(userData.Ticket);
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
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (countdown > 0) {
//       const timerInterval = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timerInterval);
//     } else {
//       setGameOver(true); // Game over when timer reaches 0
//     }
//   }, [countdown]);

//   useEffect(() => {
//     localStorage.setItem("gameOver", JSON.stringify(gameOver));
//   }, [gameOver, okuseCoin]);
  

//   useEffect(() => {
//     if (gameOver) return;

//     const spawnMole = () => {
//       const newPosition = Math.floor(Math.random() * NUM_HOLES);
//       const moleId = Date.now();
//       setMoles((prevMoles) => [
//         ...prevMoles,
//         { id: moleId, position: newPosition, frame: 1, isHit: false },
//       ]);

//       let frameIndex = 1;
//       const appearInterval = setInterval(() => {
//         setMoles((prevMoles) =>
//           prevMoles.map((mole) =>
//             mole.id === moleId && frameIndex < 5 ? { ...mole, frame: frameIndex++ } : mole
//           )
//         );
//         if (frameIndex === 5) clearInterval(appearInterval);
//       }, 180);

//       setTimeout(() => {
//         let disappearIndex = 4;
//         const disappearInterval = setInterval(() => {
//           setMoles((prevMoles) =>
//             prevMoles.map((mole) =>
//               mole.id === moleId && disappearIndex > 1 ? { ...mole, frame: mole.frame - 1 } : mole
//             )
//           );
//           disappearIndex--;
//           if (disappearIndex === 1) {
//             clearInterval(disappearInterval);
//             setMoles((prevMoles) => prevMoles.filter((m) => m.id !== moleId));
//           }
//         }, 180);
//       }, 800);
//     };

//     const interval = setInterval(spawnMole, 1100);
//     return () => clearInterval(interval);
//   }, [gameOver]);

//   useEffect(() => {
//     const storedGameOver = localStorage.getItem("gameOver");
//     const storedOkuseCoin = localStorage.getItem("okuseCoin");
  
//     if (storedGameOver !== null) {
//       setGameOver(JSON.parse(storedGameOver));
//     }
//   }, []);
  
//   // const whackMole = (index: number) => {
//   //   setMoles((prevMoles) =>
//   //     prevMoles.map((mole) => {
//   //       if (mole.position === index && !mole.isHit) {
//   //         setScore((prevScore) => prevScore + 1);
//   //         wackmolesound.play().catch((err) => {
//   //           console.error("Failed to play wackmolesound:", err);
//   //         });
//   //         mole.isHit = true;

//   //         let hitFrames = [43, 44, 45];
//   //         let hitIndex = 0;

//   //         const hitInterval = setInterval(() => {
//   //           if (hitIndex < hitFrames.length) {
//   //             setMoles((prevMoles) =>
//   //               prevMoles.map((m) =>
//   //                 m.id === mole.id ? { ...m, frame: hitFrames[hitIndex++] } : m
//   //               )
//   //             );
//   //           } else {
//   //             clearInterval(hitInterval);

//   //             let dizzyFrames = [37, 38, 39, 38, 37];
//   //             let dizzyIndex = 0;

//   //             const dizzyInterval = setInterval(() => {
//   //               if (dizzyIndex < dizzyFrames.length) {
//   //                 setMoles((prevMoles) =>
//   //                   prevMoles.map((m) =>
//   //                     m.id === mole.id ? { ...m, frame: dizzyFrames[dizzyIndex++] } : m
//   //                   )
//   //                 );
//   //               } else {
//   //                 clearInterval(dizzyInterval);
//   //                 setTimeout(() => {
//   //                   setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
//   //                 }, 100);
//   //               }
//   //             }, 160);
//   //           }
//   //         }, 170);
//   //       }
//   //       return mole;
//   //     })
//   //   );
//   // };

//   const whackMole = (index: number) => {
//     setMoles((prevMoles) =>
//       prevMoles.map((mole) => {
//         if (mole.position === index && !mole.isHit) {
//           setScore((prevScore) => prevScore + 1);
//           wackmolesound.play().catch((err) => {
//             console.error("Failed to play wackmolesound:", err);
//           });
  
//           // Mark the mole as hit to prevent further hits
//           mole.isHit = true;
  
//           // Set the mole's position to null
//           setMoles((prevMoles) =>
//             prevMoles.map((m) => (m.id === mole.id ? { ...m, position: null } : m))
//           );
  
//           // Delay before removing the mole
//           setTimeout(() => {
//             setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
//           }, 100); // Adjust the timing as necessary
//         }
//         return mole; // Return the original mole for others
//       })
//     );
//   };
  
  
//   useEffect(() => {
//     if (gameOver) {
//       let earnedTickets = Math.floor(score / 10); // 1 ticket for every 10 points
//       let earnedCoins = score % 10; // Remaining points become Okuse
  
//       setHereTicket(earnedTickets);
//       setHereCoin(earnedCoins);
  
//       if (isOnline && auth.currentUser) {
//         const userRef = doc(db, "users", auth.currentUser.uid);
//         updateDoc(userRef, {
//           Ticket: (ticketCard ?? 0) + earnedTickets,
//           Okuse: (okuseCoin ?? 0) + earnedCoins,
//         })
//         .then(() => {
//           setTicketCard((prev) => (prev !== null ? prev + earnedTickets : earnedTickets));
//           setOkuseCoin((prev) => (prev !== null ? prev + earnedCoins : earnedCoins));
//         })
//         .catch((error) => {
//           console.error("Error updating rewards:", error);
//         });
//       }
//     }
//   }, [gameOver]);
  

//   const handleReplay = async () => {
//     if (okuseCoin !== null && okuseCoin >= 20) {
//       try {
//         const userRef = doc(db, "users", auth.currentUser!.uid);
//         await updateDoc(userRef, {
//           Okuse: okuseCoin - 20,
//         });
  
//         setOkuseCoin((prev) => (prev !== null ? prev - 20 : null));
//         setErrorMessage(null);
  
//         // Reset game state
//         setGameOver(false);
//         setCountdown(25); // Reset timer
//         setScore(0); // Reset score
//         setMoles([]); // Clear existing moles
  
//       } catch (error) {
//         console.error("Error deducting coins:", error);
//       }
//     } else {
//       setErrorMessage("Insufficient Okuse coins to replay!");
//     }
//   };
  

//   if (isLoading)
//     return (
//       <div>
//         <img src={wackbg} alt="" className="candybg" />
//       </div>
//     );

//   return (
//     <div>
//       <img src={wackbg2} alt="" className="candybg" />
//       <div className="wackgamewaiting_box1 container">
//         <NavLink to="/" className="wackmole_backspace">
//           <img src={leftwoodarr} alt="" width={"60"} />
//         </NavLink>
//         <div className="candyokuseshowDiv">
//           <span className="wackmoleokuseshow">
//             <div>
//               {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//               <i className="bi bi-ticket-perforated"></i>
//             </div>
//           </span>
//           <span className="wackmoleokuseshow">
//             <div>
//               {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//               <i className="bi bi-coin"></i>
//             </div>
//           </span>
//         </div>
//       </div>

//       {/* Timer and Score */}
//       <div className="wacktimerscore">
//         <div>
//           <p>Timer: {countdown}s</p>
//           <p>Score: {score}</p>
//         </div>
//       </div>

//       {/* Wack Game */}
//       {!gameOver ? (
//         <div className="wackgame-container">
//           <div className="mole-grid">
//             {Array.from({ length: NUM_HOLES }).map((_, index) => {
//               const mole = moles.find((m) => m.position === index);
//               return (
//                 <div key={index} className="mole-hole" onClick={() => whackMole(index)}>
//                   <div
//                     className="mole"
//                     style={{
//                       backgroundImage: `url(${moleSprite})`,
//                       backgroundPosition: mole ? `-${(mole.frame - 1) * 100}px 0px` : "0px 0px",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         <div className="wackgame_replay">
//           <h2>Rewards</h2>
//           <p>{hereTicket} Ticket  , {hereCoin} Coins</p>
//           <div><img src={wackreplay} alt="" width={60} onClick={handleReplay} />
//           <NavLink to="/wack_a_mole"><img src={wackreplay} alt="" width={60}/></NavLink></div>
//       </div>      
//       )}
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
// import moleSprite from "../wackamole_img/wackmole_sprites.png";
// import wackbg from "../wackamole_img/whack-a-mole.jpeg";
// import leftwoodarr from "../wackamole_img/leftarrowwood.png";


// import "./wackmole_lvl.css";

// const NUM_HOLES = 9;

// interface Mole {
//   id: number;
//   position: number;
//   frame: number;
//   isHit: boolean; // Track if the mole has been hit
// }

// export default function WackMole_lvl() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [isOnline, setIsOnline] = useState(false);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [moles, setMoles] = useState<Mole[]>([]);
//   const [score, setScore] = useState<number>(0);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(userData.Okuse);
//             setTicketCard(userData.Ticket);
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
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const spawnMole = () => {
//       const newPosition = Math.floor(Math.random() * NUM_HOLES);
//       const moleId = Date.now();
//      // console.log(`Spawning mole at position ${newPosition}, ID: ${moleId}`);
  
//       setMoles((prevMoles) => [...prevMoles, { id: moleId, position: newPosition, frame: 1, isHit: false }]);
  
//       let frameIndex = 1;
//       const appearInterval = setInterval(() => {
//        // console.log(`Mole ${moleId} appearance frame: ${frameIndex}`);
//         setMoles((prevMoles) =>
//           prevMoles.map((mole) =>
//             mole.id === moleId && frameIndex < 5 ? { ...mole, frame: frameIndex++ } : mole
//           )
//         );
//         if (frameIndex === 5) clearInterval(appearInterval);
//       }, 180);
  
//       setTimeout(() => {
//         let disappearIndex = 4;
//         console.log(`Mole ${moleId} starting disappearance`);
//         const disappearInterval = setInterval(() => {
//       //    console.log(`Mole ${moleId} disappearing frame: ${disappearIndex}`);
//           setMoles((prevMoles) =>
//             prevMoles.map((mole) =>
//               mole.id === moleId && disappearIndex > 1 ? { ...mole, frame: mole.frame - 1 } : mole
//             )
//           );
//           disappearIndex--;
//           if (disappearIndex === 1) {
//             clearInterval(disappearInterval);
//             setMoles((prevMoles) => prevMoles.filter((m) => m.id !== moleId));
//           }
//         }, 180);
//       }, 2000);
//     };
  
//     const interval = setInterval(spawnMole, 4000);
//     return () => clearInterval(interval);
//   }, []);
  
//   const whackMole = (index: number) => {
//     console.log(`Whack attempt at position: ${index}`);
  
//     setMoles((prevMoles) =>
//       prevMoles.map((mole) => {
//         if (mole.position === index && !mole.isHit) {
//           console.log(`Mole ${mole.id} hit!`);
//           setScore((prevScore) => prevScore + 1);
//           mole.isHit = true; // Mark as hit
  
//           let hitFrames = [43, 44, 45];
//           let hitIndex = 0;
//           console.log(`Starting hit animation for Mole ${mole.id}`);
  
//           const hitInterval = setInterval(() => {
//             if (hitIndex < hitFrames.length) {
//               console.log(`Mole ${mole.id} hit frame: ${hitFrames[hitIndex]}`);
//               setMoles((prevMoles) =>
//                 prevMoles.map((m) =>
//                   m.id === mole.id ? { ...m, frame: hitFrames[hitIndex++] } : m
//                 )
//               );
//             } else {
//               clearInterval(hitInterval);
  
//               let dizzyFrames = [37, 38, 39, 38, 37];
//               let dizzyIndex = 0;
//               console.log(`Starting dizzy animation for Mole ${mole.id}`);
  
//               const dizzyInterval = setInterval(() => {
//                 if (dizzyIndex < dizzyFrames.length) {
//                   console.log(`Mole ${mole.id} dizzy frame: ${dizzyFrames[dizzyIndex]}`);
//                   setMoles((prevMoles) =>
//                     prevMoles.map((m) =>
//                       m.id === mole.id ? { ...m, frame: dizzyFrames[dizzyIndex++] } : m
//                     )
//                   );
//                 } else {
//                   clearInterval(dizzyInterval);
//                   console.log(`Removing Mole ${mole.id} after dizzy animation`);
  
//                   setTimeout(() => {
//                     setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
//                   }, 100); // Short delay to avoid race conditions
//                 }
//               }, 160);
//             }
//           }, 170);
//         }
//         return mole;
//       })
//     );
//   };
  
  

//   if (isLoading)
//     return (
//       <div>
//         <img src={wackbg} alt="" className="candybg" />
//       </div>
//     );

//   return (
//     <div>
//       <img src={wackbg2} alt="" className="candybg" />
//       <div className="wackgamewaiting_box1 container">
//         <NavLink to="/" className="wackmole_backspace">
//           <img src={leftwoodarr} alt="" width={"60"} />
//         </NavLink>
//         <div className="candyokuseshowDiv">
//           <span className="wackmoleokuseshow">
//           <div>
//           {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//           <i className="bi bi-ticket-perforated"></i>
//           </div>
//           </span>
//           <span className="wackmoleokuseshow">
//             <div>
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//             </div>
//           </span>
//           </div>
//       </div>

//       {/* Timer and Score */}
//       <div className="wacktimerscore">
//         <div>
//           <p>Timer:</p>
//           <p>Score:{score}</p>
//         </div>
//       </div>

//       {/* Wack Game */}
//       <div className="wackgame-container">
//         <div className="mole-grid">
//           {Array.from({ length: NUM_HOLES }).map((_, index) => {
//             const mole = moles.find((m) => m.position === index);
//             return (
//               <div
//                 key={index}
//                 className="mole-hole"
//                 onClick={() => whackMole(index)}
//               >
//                 <div
//                   className="mole"
//                   style={{
//                     backgroundImage: `url(${moleSprite})`,
//                     backgroundPosition: mole
//                       ? `-${(mole.frame - 1) * 100}px 0px`
//                       : "0px 0px",
//                     opacity: mole ? 1 : 1, // Show mole hole
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* game finish and replay */}
//       <div className="wackgame_replay">
//         <div>
//           <h4>Rewards</h4>
//           <p>1Ticket,2coins</p>
//           <hr />
//           <button>
//             replay
//           </button>
//           <button>Home</button>
//         </div>
//       </div>
//     </div>
//   );
// }



//0002
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
// import moleSprite from "../wackamole_img/wackmole_sprites.png";
// import wackbg from "../wackamole_img/whack-a-mole.jpeg";
// import leftwoodarr from "../wackamole_img/leftarrowwood.png";


// import "./wackmole_lvl.css";

// const NUM_HOLES = 9;

// interface Mole {
//   id: number;
//   position: number;
//   frame: number;
//   isHit: boolean; // Track if the mole has been hit
// }

// export default function WackMole_lvl() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [isOnline, setIsOnline] = useState(false);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [moles, setMoles] = useState<Mole[]>([]);
//   const [score, setScore] = useState<number>(0);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(userData.Okuse);
//             setTicketCard(userData.Ticket);
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
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const spawnMole = () => {
//       const newPosition = Math.floor(Math.random() * NUM_HOLES);
//       const moleId = Date.now();

//       // Add a new mole to the state
//       setMoles((prevMoles) => [
//         ...prevMoles,
//         { id: moleId, position: newPosition, frame: 1, isHit: false },
//       ]);

//       // Mole appear animation
//       let frameIndex = 1;
//       const appearInterval = setInterval(() => {
//         setMoles((prevMoles) =>
//           prevMoles.map((mole) =>
//             mole.id === moleId && frameIndex < 5
//               ? { ...mole, frame: frameIndex++ }
//               : mole
//           )
//         );
//         if (frameIndex === 5) clearInterval(appearInterval);
//       }, 180); // Total appearance duration

//       // Stay at frame 4 for 2s before disappearing
//       // setTimeout(() => {
//       //   if (!moles.some(mole => mole.id === moleId && mole.isHit)) {
//       //     setMoles((prevMoles) => 
//       //       prevMoles.filter((m) => m.id !== moleId)
//       //     );
//       //   }
//       // }, 2000);
//       setTimeout(() => {
//         let disappearIndex = 4;
//         const disappearInterval = setInterval(() => {
//           setMoles((prevMoles) =>
//             prevMoles.map((mole) =>
//               mole.id === moleId && disappearIndex > 1
//                 ? { ...mole, frame: mole.frame - 1 }
//                 : mole
//             )
//           );
//           disappearIndex--;
//           if (disappearIndex === 1) {
//             clearInterval(disappearInterval);
//             setMoles((prevMoles) => prevMoles.filter((m) => m.id !== moleId));
//           }
//         }, 180);
//       }, 2000);
//     };

//     const interval = setInterval(spawnMole, 2000); // Spawn every 2 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const whackMole = (index: number) => {
//     setMoles((prevMoles) =>
//       prevMoles.map((mole) => {
//         if (mole.position === index && !mole.isHit) {
//           setScore((prevScore) => prevScore + 1);
  
//           // Mark the mole as hit
//           mole.isHit = true;
  
//           // Play hit animation (frame indices for hit animation)
//           let hitFrames = [43, 44, 45]; // Indices for hit frames
//           let hitIndex = 0;
  
//           const hitInterval = setInterval(() => {
//             setMoles((prevMoles) =>
//               prevMoles.map((m) =>
//                 m.id === mole.id && hitIndex < hitFrames.length
//                   ? { ...m, frame: hitFrames[hitIndex++] }
//                   : m
//               )
//             );
  
//             if (hitIndex === hitFrames.length) {
//               clearInterval(hitInterval);
  
//               // Start dizzy animation after hit animation finishes
//               let dizzyFrames = [37, 38, 39, 38, 37]; // Indices for dizzy frames
//               let dizzyIndex = 0;
  
//               const dizzyInterval = setInterval(() => {
//                 setMoles((prevMoles) =>
//                   prevMoles.map((m) =>
//                     m.id === mole.id
//                       ? { ...m, frame: dizzyFrames[dizzyIndex++] }
//                       : m
//                   )
//                 );
  
//                 if (dizzyIndex === dizzyFrames.length) {
//                   clearInterval(dizzyInterval);
//                   // Remove mole after dizzy animation
//                   setMoles((prevMoles) =>
//                     prevMoles.filter((m) => m.id !== mole.id)
//                   );
//                 }
//               }, 160); // Adjust dizzy animation timing if necessary
//             }
//           }, 170); // Adjust hit animation timing if necessary
//         }
//         return mole;
//       })
//     );
//   };
  

//   if (isLoading)
//     return (
//       <div>
//         <img src={wackbg} alt="" className="candybg" />
//       </div>
//     );

//   return (
//     <div>
//       <img src={wackbg2} alt="" className="candybg" />
//       <div className="wackgamewaiting_box1 container">
//         <NavLink to="/" className="wackmole_backspace">
//           <img src={leftwoodarr} alt="" width={"60"} />
//         </NavLink>
//         <div className="candyokuseshowDiv">
//           <span className="wackmoleokuseshow">
//           <div>
//           {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//           <i className="bi bi-ticket-perforated"></i>
//           </div>
//           </span>
//           <span className="wackmoleokuseshow">
//             <div>
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//             </div>
//           </span>
//           </div>
//       </div>

//       {/* Timer and Score */}
//       <div className="wacktimerscore">
//         <h2>Timer</h2>
//         <h2>Score: {score}</h2>
//       </div>

//       {/* Wack Game */}
//       <div className="game-container">
//         <div className="mole-grid">
//           {Array.from({ length: NUM_HOLES }).map((_, index) => {
//             const mole = moles.find((m) => m.position === index);
//             return (
//               <div
//                 key={index}
//                 className="mole-hole"
//                 onClick={() => whackMole(index)}
//               >
//                 <div
//                   className="mole"
//                   style={{
//                     backgroundImage: `url(${moleSprite})`,
//                     backgroundPosition: mole
//                       ? `-${(mole.frame - 1) * 100}px 0px`
//                       : "0px 0px",
//                     opacity: mole ? 1 : 1, // Show only if mole is there
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



//002

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
// import moleSprite from "../wackamole_img/wackmole_sprites.png";
// import wackbg from "../wackamole_img/whack-a-mole.jpeg";
// import leftwoodarr from "../wackamole_img/leftarrowwood.png";

// import "./wackmole_lvl.css";

// const NUM_HOLES = 9;

// interface Mole {
//   id: number;
//   position: number;
//   frame: number;
// }

// export default function WackMole_lvl() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [isOnline, setIsOnline] = useState(false);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [moles, setMoles] = useState<Mole[]>([]);
//   const [score, setScore] = useState<number>(0);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(userData.Okuse);
//             setTicketCard(userData.Ticket);
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
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const spawnMole = () => {
//       const newPosition = Math.floor(Math.random() * NUM_HOLES);
//       const moleId = Date.now();

//       // Add a new mole to the state
//       setMoles((prevMoles) => [
//         ...prevMoles,
//         { id: moleId, position: newPosition, frame: 1 },
//       ]);

//       let frameIndex = 1;
//       const appearInterval = setInterval(() => {
//         setMoles((prevMoles) =>
//           prevMoles.map((mole) =>
//             mole.id === moleId && frameIndex < 5
//               ? { ...mole, frame: mole.frame + 1 }
//               : mole
//           )
//         );
//         frameIndex++;
//         if (frameIndex === 4) clearInterval(appearInterval);
//       }, 160); // 0.64s total

//       // Stay at frame 4 for 2s before disappearing
//       setTimeout(() => {
//         let disappearIndex = 4;
//         const disappearInterval = setInterval(() => {
//           setMoles((prevMoles) =>
//             prevMoles.map((mole) =>
//               mole.id === moleId && disappearIndex > 1
//                 ? { ...mole, frame: mole.frame - 1 }
//                 : mole
//             )
//           );
//           disappearIndex--;
//           if (disappearIndex === 1) {
//             clearInterval(disappearInterval);
//             setMoles((prevMoles) => prevMoles.filter((m) => m.id !== moleId));
//           }
//         }, 160);
//       }, 2000);
//     };

//     const interval = setInterval(spawnMole, 2000); // Spawn every 2s

//     return () => clearInterval(interval);
//   }, []);

//   const whackMole = (index: number) => {
//     setMoles((prevMoles) =>
//       prevMoles.map((mole) => {
//         if (mole.position === index) {
//           setScore((prevScore) => prevScore + 1);
  
//           // Play hit animation (43 → 44 → 45)
//           let hitIndex = 43;
//           const hitInterval = setInterval(() => {
//             setMoles((prevMoles) =>
//               prevMoles.map((m) =>
//                 m.id === mole.id && hitIndex <= 45 ? { ...m, frame: hitIndex++ } : m
//               )
//             );
//             if (hitIndex > 45) {
//               clearInterval(hitInterval);
  
//               // Start dizzy animation after hit animation finishes
//               let dizzyFrames = [37, 38, 39, 38, 37];
//               let dizzyIndex = 0;
//               const dizzyInterval = setInterval(() => {
//                 setMoles((prevMoles) =>
//                   prevMoles.map((m) =>
//                     m.id === mole.id ? { ...m, frame: dizzyFrames[dizzyIndex++] } : m
//                   )
//                 );
//                 if (dizzyIndex === dizzyFrames.length) {
//                   clearInterval(dizzyInterval);
  
//                   // Remove mole after dizzy animation
//                   setMoles((prevMoles) => prevMoles.filter((m) => m.id !== mole.id));
//                 }
//               }, 160);
//             }
//           }, 170);
//         }
//         return mole;
//       })
//     );
//   };
  

//   if (isLoading)
//     return (
//       <div>
//         <img src={wackbg} alt="" className="candybg" />
//       </div>
//     );

//   return (
//     <div>
//       <img src={wackbg2} alt="" className="candybg" />

//       <div className="wackgamewaiting_box1 container">
//         <NavLink to="/" className="wackmole_backspace">
//           <img src={leftwoodarr} alt="" width={"60"} />
//         </NavLink>
//         <div className="candyokuseshowDiv">
//           <span className="wackmoleokuseshow">
//             {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//             <i className="bi bi-ticket-perforated"></i>
//           </span>
//           <span className="wackmoleokuseshow">
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//           </span>
//         </div>
//       </div>

//       {/* Timer and Score */}
//       <div className="wacktimerscore">
//         <h2>Timer</h2>
//         <h2>Score: {score}</h2>
//       </div>

//       {/* Wack Game */}
//       <div className="game-container">
//         <div className="mole-grid">
//           {Array.from({ length: NUM_HOLES }).map((_, index) => {
//             const mole = moles.find((m) => m.position === index);
//             return (
//               <div
//                 key={index}
//                 className="mole-hole"
//                 onClick={() => whackMole(index)}
//               >
//                 <div
//                   className="mole"
//                   style={{
//                     backgroundImage: `url(${moleSprite})`,
//                     backgroundPosition: mole
//                       ? `-${(mole.frame - 1) * 100}px 0px`
//                       : "0px 0px",
//                     opacity: mole ? 1 : 1, // Show only if mole is there
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }









// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { LoadingScreen } from "../../Loading_screen/loadingscreen";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png"
// import "./wackmole_lvl.css";
// import { hexToRgb } from "@mui/material";

// export default function WackMole_lvl(){
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//    const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//  const [isOnline, setIsOnline] = useState(false);
// const [ticketCard, setTicketCard] = useState<number | null>(null);


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
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   const canPlay = 
//    isOnline &&
//    okuseCoin !== null &&
//    okuseCoin >= 10;


//       if (isLoading) return <LoadingScreen />;
//     return(
        // <div>
        // <img src={wackbg2 } alt="" className="candybg"/>
        //   <div className="candycontainer container">
        //   <div className="gamewaiting_box1">
        //   <NavLink to="/" className="wackmole_backspace">
        //     <i className="bi bi-arrow-left-square"></i>
        //   </NavLink>
        //   <div className="candyokuseshowDiv">
        //   <span className="wackmoleokuseshow">
        //   {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
        //   <i className="bi bi-ticket-perforated"></i>
        //   </span>
        //   <span className="wackmoleokuseshow">
        //     {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
        //     <i className="bi bi-coin"></i>
        //   </span>
        //   </div>
        // </div> 

        // <div className="wackgamecontainer">
        //     {/* score and game here */}
        //     score
        //   </div>
        //   </div>
        // </div>
       
//     )
// }

//02

// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import wackbg2 from "../wackamole_img/wack_mole_bg2.png";
// import moleSprite from "../wackamole_img/wackmole_sprites.png"; 
// import wackbg from "../wackamole_img/whack-a-mole.jpeg";
// import leftwoodarr from "../wackamole_img/leftarrowwood.png"

// import "./wackmole_lvl.css";

// const NUM_HOLES = 9;

// export default function WackMole_lvl() {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [isOnline, setIsOnline] = useState(false);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [molePosition, setMolePosition] = useState<number | null>(null);
//   const [moleFrame, setMoleFrame] = useState<number>(1);
//   const [score, setScore] = useState<number>(0);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);
//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setOkuseCoin(userData.Okuse);
//             setTicketCard(userData.Ticket);
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
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);


  // useEffect(() => {
  //   const spawnMole = () => {
  //     let newPosition = Math.floor(Math.random() * NUM_HOLES);
  //     setMolePosition(newPosition);
  //     setMoleFrame(1);
  
  //     let frameIndex = 1;
  //     const appearInterval = setInterval(() => {
  //       if (frameIndex < 4) {
  //         setMoleFrame((prev) => prev + 1);
  //       }
  //       frameIndex++;
  //       if (frameIndex === 4) clearInterval(appearInterval); // Stop at frame 4
  //     }, 160); // Appear process takes 0.64s (160ms per frame)
  
  //     // Make mole stay at frame 4 for 4 seconds
  //     setTimeout(() => {
  //       let disappearIndex = 4;
  //       const disappearInterval = setInterval(() => {
  //         if (disappearIndex > 1) {
  //           setMoleFrame((prev) => prev - 1);
  //         }
  //         disappearIndex--;
  //         if (disappearIndex === 1) {
  //           clearInterval(disappearInterval);
  //           setMolePosition(null);
  //         }
  //       }, 160); // Disappear process takes 0.64s (160ms per frame)
  //     }, 2000); // Stay at frame 2 for 4s before disappearing
  //   };
  
//   //   const interval = setInterval(spawnMole, 1000); // Spawn every 3.3s (2s stay + 0.64s appear + 0.64s disappear)
  
//   //   return () => clearInterval(interval);
//   // }, []);

//   useEffect(() => {
//     const [moles, setMoles] = useState([]); // Store multiple moles
  
//     const spawnMole = () => {
//       let newPosition = Math.floor(Math.random() * NUM_HOLES);
  
//       // Add a new mole with animation states
//       setMoles((prevMoles) => [
//         ...prevMoles,
//         {
//           id: Date.now(), // Unique ID for tracking
//           position: newPosition,
//           frame: 1,
//         },
//       ]);
  
//       // Automatically remove mole after its full animation cycle (2.88s)
//       setTimeout(() => {
//         setMoles((prevMoles) => prevMoles.filter((m) => m.id !== newPosition));
//       }, 2880); // (0.64s appear + 2s stay + 0.64s disappear)
//     };
  
//     const interval = setInterval(spawnMole, 1000); // Spawn every 1s
  
//     return () => clearInterval(interval);
//   }, []);
  
  
  // const whackMole = (index: number) => {
  //   if (index === molePosition) {
  //     setScore(score + 1);
  //     setMolePosition(null);
  //   }
  // };



  

//   if (isLoading) return <div><img src={wackbg} alt="" className="candybg"/>
//   </div>;

//   return (
//     <div>
//       <img src={wackbg2} alt="" className="candybg" />
     
//         {/*  */}
//       <div className="wackgamewaiting_box1 container">
//           <NavLink to="/" className="wackmole_backspace">
//           <img src={leftwoodarr} alt="" width={"60"}/>
//           </NavLink>
//           <div className="candyokuseshowDiv">
//           <span className="wackmoleokuseshow">
//           {ticketCard !== null ? ticketCard.toLocaleString() : "0"}{" "}
//           <i className="bi bi-ticket-perforated"></i>
//           </span>
//           <span className="wackmoleokuseshow">
//             {okuseCoin !== null ? okuseCoin.toLocaleString() : "0"}{" "}
//             <i className="bi bi-coin"></i>
//           </span>
//           </div>
//         </div> 
//         {/* timer and score */}
// <div className="wacktimerscore">
//   <h2>Timer</h2><h2>Score:{score}</h2>
// </div>
// {/* wack game */}
//         <div className="game-container">
       
//         <div className="mole-grid">
//   {Array.from({ length: NUM_HOLES }).map((_, index) => (
//     <div key={index} className="mole-hole" onClick={() => whackMole(index)}>
//       <div
//         className="mole"
//         style={{
//           backgroundImage: `url(${moleSprite})`,
//           backgroundPosition: index === molePosition ? `-${(moleFrame - 1) * 100}px 0px` : "0px 0px",
//           opacity: index === molePosition ? 1 : 1, // Dim inactive moles slightly
//         }}
//       />
//     </div>
//   ))}
// </div>

//       </div>
//       {/*  */}
     
//     </div>
//   );
// }











  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let newPosition = Math.floor(Math.random() * NUM_HOLES);
  //     setMolePosition(newPosition);
  //     setMoleFrame(1);

  //     let frameIndex = 1;
  //     const frameInterval = setInterval(() => {
  //       if (frameIndex < 4) {
  //         setMoleFrame((prev) => prev + 1);
  //       } else {
  //         // setMoleFrame((prev) => (prev > 1 ? prev - 1 : null));
  //         setMoleFrame((prev) => (prev > 1 ? prev - 1 : 1)); 
  //         if (frameIndex === 7) clearInterval(frameInterval);
  //       }
  //       frameIndex++;
  //     }, 150);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);



   {/* <div className="mole-grid">
          {Array.from({ length: NUM_HOLES }).map((_, index) => (
            <div
              key={index}
              className="mole-hole"
              onClick={() => whackMole(index)}
            >
              {index === molePosition && (
                <div
                  className="mole"
                  style={{
                    backgroundImage: `url(${moleSprite})`,
                    backgroundPosition: `-${(moleFrame - 1) * 100}px 0px`,
                  }}
                />
              )}
            </div>
          ))}
        </div> */}










  // useEffect(() => {
  //   const spawnMole = () => {
  //     let newPosition = Math.floor(Math.random() * NUM_HOLES);
  //     setMolePosition(newPosition);
  //     setMoleFrame(1); // Start at frame 1
  
  //     // Mole Appearing Animation (1 → 2 → 3 → 4)
  //     let frameIndex = 1;
  //     const appearInterval = setInterval(() => {
  //       if (frameIndex < 4) {
  //         setMoleFrame((prev) => prev + 1);
  //       }
  //       frameIndex++;
  //       if (frameIndex === 4) clearInterval(appearInterval); // Stop at frame 4
  //     }, 180);
  
  //     // Stay at frame 4 for 0.8s (800ms) before disappearing
  //     setTimeout(() => {
  //       let disappearIndex = 4;
  //       const disappearInterval = setInterval(() => {
  //         if (disappearIndex > 1) {
  //           setMoleFrame((prev) => prev - 1);
  //         }
  //         disappearIndex--;
  //         if (disappearIndex === 1) {
  //           clearInterval(disappearInterval);
  //           setMolePosition(null);
  //         }
  //       }, 180);
  //     }, 2000);
  //   };
  
  //   // Set interval to spawn moles every 1.5s
  //   const interval = setInterval(spawnMole, 4500);
  
  //   return () => clearInterval(interval);
  // }, []);
  
  
  // const whackMole = (index: number) => {
  //   if (index === molePosition) {
  //     setScore((prev) => prev + 1);
  //     console.log("Mole hit! Starting dizzy animation...");
  
  //     // **Do NOT immediately set molePosition to null**
  //     // Start Dizzy Animation (37 → 38 → 39)
  //     setMoleFrame(37);
  //     console.log("Frame 37 - Dizzy start");
  
  //     setTimeout(() => {
  //       setMoleFrame(38);
  //       console.log("Frame 38 - Dizzy in progress");
  
  //       setTimeout(() => {
  //         setMoleFrame(39);
  //         console.log("Frame 39 - Dizzy end");
  
  //         // **After dizzy, start Hitten Animation (43 → 44 → 45)**
  //         console.log("Starting hitten animation...");
  //         setTimeout(() => {
  //           setMoleFrame(43);
  //           console.log("Frame 43 - Hitten start");
  
  //           setTimeout(() => {
  //             setMoleFrame(44);
  //             console.log("Frame 44 - Hitten in progress");
  
  //             setTimeout(() => {
  //               setMoleFrame(45);
  //               console.log("Frame 45 - Hitten end");
  
  //               setTimeout(() => {
  //                 setMoleFrame(1); // Reset mole frame to idle
  //                 setMolePosition(null); // **Move this here so animations can finish**
  //                 console.log("Mole idle frame reset.");
  //               }, 200);
  
  //             }, 200);
  //           }, 200);
  //         }, 1000); // 1s for dizziness
  
  //       }, 200);
  //     }, 200);
  //   }
  // };








