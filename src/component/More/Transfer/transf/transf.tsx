
// import { Button, Box, Typography, Modal, Snackbar } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../../../../firebase/firebase";
// import { doc, getDoc, runTransaction } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const style = {
//     position: "absolute" as "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 300,
//     bgcolor: "white",
//     border: "1px solid rgb(141, 130, 114)",
//     boxShadow: 24,
//     p: 3,
//     color: "black", // Text color set to black
//     borderRadius: "8px", // Border radius set to 8px
//   };

// export default function Transf(){
//      const [isOnline, setIsOnline] = useState(false);
// const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [UserId, setUserId] = useState<string | null>(null);
// const [receiverId, setReceiverId] = useState<string | null>(null);
//     const [errorMessage, setErrorMessage] = useState<string>("");
//     const [open, setOpen] = useState(false);
//     const [congratulationOpen, setCongratulationOpen] = useState(false); // New state for congratulatory modal
//     const [transferTimestamp, setTransferTimestamp] = useState<string>("");
//     const [inputValue, setInputValue] = useState<number>(0);
//     const [success, setSuccess] = useState<boolean>(false);
   
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//           if (user) {
//             setIsOnline(true);
//             try {
//               const userRef = doc(db, "users", user.uid);
//               const snapshot = await getDoc(userRef);
    
//               if (snapshot.exists()) {
//                 const userData = snapshot.data();
//                 setUserId(user.uid);
//                   setOkuseCoin(userData.Okuse);
                
//                 } else {
//                 console.error("No data available for this user.");
//               }
//             } catch (error) {
//               console.error("Error fetching user data:", error);
//             }
//           } else {
//             setIsOnline(false);
//           }
//         });
    
//         return () => unsubscribe();
//       }, []);

//       const isClickable = inputValue > 0 && (okuseCoin !== null && inputValue <= okuseCoin);

//       const handleMax = () => {
//         if (okuseCoin !== null) {
//           setInputValue(okuseCoin);
//         }
//       };
      

      
//       const handleReceiverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setReceiverId(e.target.value);
//       };
      
//       const handleOpen = async () => {
//         if (okuseCoin === null || inputValue > okuseCoin) {
//             setErrorMessage("Please enter a valid amount.");
//             return;
//         }
    
//         if (!receiverId || typeof receiverId !== "string") {
//             setErrorMessage("Please enter a valid receiver ID.");
//             return;
//         }
    
//         if (!UserId || typeof UserId !== "string") {
//             setErrorMessage("User ID is invalid.");
//             return;
//         }
    
//         // Check if the sender's ID is the same as the receiver's ID
//         if (receiverId === UserId) {
//             setErrorMessage("You cannot transfer Okuse to your own account.");
//             return;
//         }
    
//         try {
//             const receiverRef = doc(db, "users", receiverId);
//             const senderRef = doc(db, "users", UserId);
    
//             await runTransaction(db, async (transaction) => {
//                 const receiverDoc = await transaction.get(receiverRef);
//                 if (!receiverDoc.exists()) {
//                     setErrorMessage("Receiver ID does not exist.");
//                     throw new Error("Receiver ID does not exist.");
//                 }
    
//                 setErrorMessage("");
//                 setOpen(true);
//             });
//         } catch (error) {
//             console.error("Transaction failed:", error);
//             setErrorMessage("An error occurred. Please try again.");
//         }
//     };
    
    

//       const ConfirmTransfer = async () => {
//         if (!UserId || !receiverId || inputValue <= 0) return;
    
//         try {
//             const senderRef = doc(db, "users", UserId);
//             const receiverRef = doc(db, "users", receiverId);
    
//             await runTransaction(db, async (transaction) => {
//                 const senderDoc = await transaction.get(senderRef);
//                 const receiverDoc = await transaction.get(receiverRef);
    
//                 if (!senderDoc.exists() || !receiverDoc.exists()) {
//                     throw new Error("Invalid sender or receiver ID.");
//                 }
    
//                 const senderData = senderDoc.data();
//                 const receiverData = receiverDoc.data();
    
//                 if (senderData.Okuse < inputValue) {
//                     throw new Error("Insufficient Okuse balance.");
//                 }
    
//                 // Deduct from sender
//                 transaction.update(senderRef, {
//                     Okuse: senderData.Okuse - inputValue
//                 });
    
//                 // Add to receiver
//                 transaction.update(receiverRef, {
//                     Okuse: (receiverData.Okuse || 0) + inputValue
//                 });
//             });
    
//             // Capture transfer timestamp
//             const currentDate = new Date();
//             const formattedDate = `${currentDate.getUTCFullYear()}/${
//                 currentDate.getUTCMonth() + 1
//             }/${currentDate.getUTCDate()} UTC:${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;
//             setTransferTimestamp(formattedDate);
    
//             setSuccess(true);
//             setOpen(false);
//             setCongratulationOpen(true);
    
//             // Reset input fields
//             setInputValue(0);
//             setReceiverId(null);
//             setErrorMessage("");
//         } catch (error) {
//             console.error("Transfer failed:", error);
//             setErrorMessage("Transfer failed. Please try again.");
//         }
//     };
    
      
//       const handleClose = () => setOpen(false);
//       const handleCongratulationClose = () => setCongratulationOpen(false);

//     return(
        
//         <div className="transfer">
//         <div className="tokenbalance">
//           <h3>{okuseCoin}</h3>
//         </div>
//           <form onSubmit={(e) => e.preventDefault()} className="transferForm">
//             <h5>Enter Receiver ID</h5>
//             <input
//   type="text"
//   className="receiverId"
//   value={receiverId || ""}
//   onChange={handleReceiverIdChange} // Add this line
//   placeholder="Enter Receiver ID"
//   required
// />
//             <h5>Enter Tokens Amount</h5>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <input
//                 type="number"
//                 className="sendTokens"
//                 min="0"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(Number(e.target.value))}
//                 placeholder="Enter Token Amount"
//                 required
//               />
//               <button
//                 className={`exin2 ${isClickable ? "clickable" : "unclickable"}`}
//                 onClick={handleMax}
//               >
//                 Max
//               </button>
//             </div>
  
//             <button type="button" className="transferbutton" onClick={handleOpen}>
//               Send
//             </button>
//           </form>
       
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               <h3>Confirm Transfer</h3>
//               <hr />
//             </Typography>
//             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <h5>Sender: {UserId}</h5>
//                 <h5>Receiver: {receiverId}</h5>
//                 <h5>Amount: {inputValue}</h5>
//                 <p>Are you sure you want to send?</p>
//               </div>
//               <hr />
//             </Typography>
//             <Button onClick={ConfirmTransfer} color="success">
//               Confirm
//             </Button>
//             <Button onClick={handleClose} color="error">
//               Cancel
//             </Button>
//           </Box>
//         </Modal>
  
//         {/* New Congratulatory Modal */}
//         {/* New Congratulatory Modal */}
//         <Modal
//           open={congratulationOpen}
//           onClose={handleCongratulationClose}
//           aria-labelledby="congratulation-modal-title"
//           aria-describedby="congratulation-modal-description"
//         >
//           <Box sx={style}>
//             <Typography
//               id="congratulation-modal-title"
//               variant="h6"
//               component="h2"
//             >
//               <h3>Success!</h3>
//               <hr />
//             </Typography>
//             <Typography id="congratulation-modal-description" sx={{ mt: 2 }}>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <h5>Sender: {UserId}</h5>
//                 <h5>Receiver: {receiverId}</h5>
//                 <h5>Amount: {inputValue}</h5>
//                 <p>{transferTimestamp}</p>
//                 <p>Status: Success</p>
//               </div>
//               <hr />
//             </Typography>
//             <Button onClick={handleCongratulationClose} color="success">
//               Exit
//             </Button>
//           </Box>
//         </Modal>
//       </div>
//     )
// }







// import { Button, Box, Typography, Modal } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../../../../firebase/firebase";
// import { doc, getDoc, runTransaction } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "white",
//   border: "1px solid rgb(141, 130, 114)",
//   boxShadow: 24,
//   p: 3,
//   color: "black",
//   borderRadius: "8px",
// };

// export default function Transf() {
//   const [isOnline, setIsOnline] = useState(false);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [receiverId, setReceiverId] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [open, setOpen] = useState(false);
//   const [congratulationOpen, setCongratulationOpen] = useState(false);
//   const [transferTimestamp, setTransferTimestamp] = useState<string>("");
//   const [inputValue, setInputValue] = useState<number>(0);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setUserId(user.uid);
//             setOkuseCoin(userData.Okuse);
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

//   const isClickable = inputValue > 0 && okuseCoin !== null && inputValue <= okuseCoin;

//   const handleMax = () => {
//     if (okuseCoin !== null) {
//       setInputValue(okuseCoin);
//     }
//   };

//   const handleReceiverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setReceiverId(e.target.value);
//   };

//   const handleOpen = async () => {
//     if (okuseCoin === null || inputValue > okuseCoin) {
//       setErrorMessage("Please enter a valid amount.");
//       return;
//     }

//     if (!receiverId || typeof receiverId !== "string") {
//       setErrorMessage("Please enter a valid receiver ID.");
//       return;
//     }

//     if (!userId || typeof userId !== "string") {
//       setErrorMessage("User ID is invalid.");
//       return;
//     }

//     if (receiverId === userId) {
//       setErrorMessage("You cannot transfer Okuse to your own account.");
//       return;
//     }

//     try {
//       const receiverRef = doc(db, "users", receiverId);
//       const receiverDoc = await getDoc(receiverRef);

//       if (!receiverDoc.exists()) {
//         setErrorMessage("Receiver ID does not exist.");
//         return;
//       }

//       setErrorMessage("");
//       setOpen(true);
//     } catch (error) {
//       console.error("Error checking receiver ID:", error);
//       setErrorMessage("An error occurred. Please try again.");
//     }
//   };

//   const ConfirmTransfer = async () => {
//     if (!userId || !receiverId || inputValue <= 0) return;

//     setLoading(true);

//     try {
//       const senderRef = doc(db, "users", userId);
//       const receiverRef = doc(db, "users", receiverId);

//       await runTransaction(db, async (transaction) => {
//         const senderDoc = await transaction.get(senderRef);
//         const receiverDoc = await transaction.get(receiverRef);

//         if (!senderDoc.exists() || !receiverDoc.exists()) {
//           throw new Error("Invalid sender or receiver ID.");
//         }

//         const senderData = senderDoc.data();
//         const receiverData = receiverDoc.data();

//         if (senderData.Okuse < inputValue) {
//           throw new Error("Insufficient Okuse balance.");
//         }

//         // Deduct from sender
//         transaction.update(senderRef, {
//           Okuse: senderData.Okuse - inputValue,
//         });

//         // Add to receiver
//         transaction.update(receiverRef, {
//           Okuse: (receiverData.Okuse || 0) + inputValue,
//         });
//       });

//       // Capture transfer timestamp
//       const currentDate = new Date();
//       const formattedDate = `${currentDate.getUTCFullYear()}/${
//         currentDate.getUTCMonth() + 1
//       }/${currentDate.getUTCDate()} UTC:${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;
//       setTransferTimestamp(formattedDate);

//       setSuccess(true);
//       setOpen(false);
//       setCongratulationOpen(true);

//       // Reset input fields
//       setInputValue(0);
//       setReceiverId("");
//       setErrorMessage("");
//     } catch (error) {
//       console.error("Transfer failed:", error);
//       setErrorMessage("Transfer failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => setOpen(false);
//   const handleCongratulationClose = () => setCongratulationOpen(false);

//   return (
//     <div className="transfer">
//       <div className="tokenbalance">
//         <h3>{okuseCoin}</h3>
//       </div>
//       <form onSubmit={(e) => e.preventDefault()} className="transferForm">
//         <h5>Enter Receiver ID</h5>
//         <input
//           type="text"
//           className="receiverId"
//           value={receiverId || ""}
//           onChange={handleReceiverIdChange}
//           placeholder="Enter Receiver ID"
//           required
//         />
//         <h5>Enter Tokens Amount</h5>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <input
//             type="number"
//             className="sendTokens"
//             min="0"
//             value={inputValue}
//             onChange={(e) => setInputValue(Number(e.target.value))}
//             placeholder="Enter Token Amount"
//             required
//           />
//           <button
//             className={`exin2 ${isClickable ? "clickable" : "unclickable"}`}
//             onClick={handleMax}
//           >
//             Max
//           </button>
//         </div>

//         <button type="button" className="transferbutton" onClick={handleOpen} disabled={loading}>
//           {loading ? "Processing..." : "Send"}
//         </button>
//       </form>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography variant="h6" component="h2">
//             <h3>Confirm Transfer</h3>
//             <hr />
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//               <h5>Sender: {userId}</h5>
//               <h5>Receiver: {receiverId}</h5>
//               <h5>Amount: {inputValue}</h5>
//               <p>Are you sure you want to send?</p>
//             </div>
//             <hr />
//           </Typography>
//           <Button onClick={ConfirmTransfer} color="success" disabled={loading}>
//             {loading ? "Processing..." : "Confirm"}
//           </Button>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       <Modal open={congratulationOpen} onClose={handleCongratulationClose}>
//         <Box sx={style}>
//           <Typography variant="h6" component="h2">
//             <h3>Success!</h3>
//             <hr />
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//               <h5>Sender: {userId}</h5>
//               <h5>Receiver: {receiverId}</h5>
//               <h5>Amount: {inputValue}</h5>
//               <p>{transferTimestamp}</p>
//               <p>Status: Success</p>
//             </div>
//             <hr />
//           </Typography>
//           <Button onClick={handleCongratulationClose} color="success">
//             Exit
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }






// import { Button, Box, Typography, Modal } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { auth, db } from "../../../../firebase/firebase";
// import { doc, getDoc, runTransaction } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import "./transf.css";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 300,
//   bgcolor: "white",
//   border: "1px solid rgb(141, 130, 114)",
//   boxShadow: 24,
//   p: 3,
//   color: "black",
//   borderRadius: "8px",
// };

// export default function Transf() {
//   const [isOnline, setIsOnline] = useState(false);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [receiverId, setReceiverId] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [open, setOpen] = useState(false);
//   const [congratulationOpen, setCongratulationOpen] = useState(false);
//   const [transferTimestamp, setTransferTimestamp] = useState<string>("");
//   const [inputValue, setInputValue] = useState<number>(0);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setUserId(user.uid);
//             setOkuseCoin(userData.Okuse);
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

//   const isClickable = inputValue > 0 && okuseCoin !== null && inputValue <= okuseCoin;

//   const handleMax = () => {
//     if (okuseCoin !== null) {
//       setInputValue(okuseCoin);
//     }
//   };

//   const handleReceiverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setReceiverId(e.target.value);
//   };

//   const handleOpen = async () => {
//     if (okuseCoin === null || inputValue > okuseCoin) {
//       setErrorMessage("Please enter a valid amount.");
//       return;
//     }

//     if (!receiverId || typeof receiverId !== "string") {
//       setErrorMessage("Please enter a valid receiver ID.");
//       return;
//     }

//     if (!userId || typeof userId !== "string") {
//       setErrorMessage("User ID is invalid.");
//       return;
//     }

//     if (receiverId === userId) {
//       setErrorMessage("You cannot transfer Okuse to your own account.");
//       return;
//     }

//     try {
//       const receiverRef = doc(db, "users", receiverId);
//       const receiverDoc = await getDoc(receiverRef);

//       if (!receiverDoc.exists()) {
//         setErrorMessage("Receiver ID does not exist.");
//         return;
//       }

//       setErrorMessage("");
//       setOpen(true);
//     } catch (error) {
//       console.error("Error checking receiver ID:", error);
//       setErrorMessage("An error occurred. Please try again.");
//     }
//   };

//   const ConfirmTransfer = async () => {
//     if (!userId || !receiverId || inputValue <= 0) return;

//     setLoading(true);

//     try {
//       const senderRef = doc(db, "users", userId);
//       const receiverRef = doc(db, "users", receiverId);

//       await runTransaction(db, async (transaction) => {
//         const senderDoc = await transaction.get(senderRef);
//         const receiverDoc = await transaction.get(receiverRef);

//         if (!senderDoc.exists() || !receiverDoc.exists()) {
//           throw new Error("Invalid sender or receiver ID.");
//         }

//         const senderData = senderDoc.data();
//         const receiverData = receiverDoc.data();

//         if (senderData.Okuse < inputValue) {
//           throw new Error("Insufficient Okuse balance.");
//         }

//         // Deduct from sender
//         transaction.update(senderRef, {
//           Okuse: senderData.Okuse - inputValue,
//         });

//         // Add to receiver
//         transaction.update(receiverRef, {
//           Okuse: (receiverData.Okuse || 0) + inputValue,
//         });
//       });

//       // Capture transfer timestamp
//       const currentDate = new Date();
//       const formattedDate = `${currentDate.getUTCFullYear()}/${
//         currentDate.getUTCMonth() + 1
//       }/${currentDate.getUTCDate()} UTC:${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;
//       setTransferTimestamp(formattedDate);

//       setSuccess(true);
//       setOpen(false);
//       setCongratulationOpen(true); // Open the congratulatory modal
//     } catch (error) {
//       console.error("Transfer failed:", error);
//       setErrorMessage("Transfer failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => setOpen(false);
//   const handleCongratulationClose = () => {
//     setCongratulationOpen(false); // Close the congratulatory modal
//     setInputValue(0); // Reset input value
//     setReceiverId(""); // Reset receiver ID
//     setErrorMessage(""); // Clear any error messages
//   };

//   return (
//     <div className="transfer">
//       <div className="tokenbalance">
//         <h3>{okuseCoin}</h3>
//       </div>
//       <form onSubmit={(e) => e.preventDefault()} className="transferForm">
// <div className="transfer_from_to">
//   <div><p>From</p><h5>{userId}gggggggggggggggg</h5></div>
//   <span><p>To</p> <input
//           type="text"
//           className="receiverId"
//           value={receiverId || ""}
//           onChange={handleReceiverIdChange}
//           placeholder="Enter Receiver ID"
//           required
//         /></span>
  
// </div>

//         {/* <h5>Enter Receiver ID</h5>
//         <input
//           type="text"
//           className="receiverId"
//           value={receiverId || ""}
//           onChange={handleReceiverIdChange}
//           placeholder="Enter Receiver ID"
//           required
//         /> */}
//         <h5>Enter Tokens Amount</h5>
//         <div 
//         // style={{ display: "flex", justifyContent: "center" }}
//         >
//           <input
//             type="number"
//             className="sendTokens"
//             min="0"
//             value={inputValue}
//             onChange={(e) => setInputValue(Number(e.target.value))}
//             placeholder="Enter Token Amount"
//             required
//           />
//           <button
//             className={`exin2 ${isClickable ? "clickable" : "unclickable"}`}
//             onClick={handleMax}
//           >
//             Max
//           </button>
//         </div>

//         <button type="button" className="transferbutton" onClick={handleOpen} disabled={loading}>
//           {loading ? "Processing..." : "Send"}
//         </button>
//       </form>

//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography variant="h6" component="h2">
//             <h3>Confirm Transfer</h3>
//             <hr />
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//               <h5>Sender: {userId}</h5>
//               <h5>Receiver: {receiverId}</h5>
//               <h5>Amount: {inputValue}</h5>
//               <p>Are you sure you want to send?</p>
//             </div>
//             <hr />
//           </Typography>
//           <Button onClick={ConfirmTransfer} color="success" disabled={loading}>
//             {loading ? "Processing..." : "Confirm"}
//           </Button>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       <Modal open={congratulationOpen} onClose={handleCongratulationClose}>
//         <Box sx={style}>
//           <Typography variant="h6" component="h2">
//             <h3>Success!</h3>
//             <hr />
//           </Typography>
//           <Typography sx={{ mt: 2 }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//               <h5>Sender: {userId}</h5>
//               <h5>Receiver: {receiverId}</h5>
//               <h5>Amount: {inputValue}</h5>
//               <p>{transferTimestamp}</p>
//               <p>Status: Success</p>
//             </div>
//             <hr />
//           </Typography>
//           <Button onClick={handleCongratulationClose} color="success">
//             Exit
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }






import { Button, Box, Typography, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
// import { doc, getDoc, runTransaction,collection } from "firebase/firestore";
import { collection,getDoc, doc, getDocs, orderBy, query, runTransaction, setDoc, deleteDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import "./transf.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 310,
  bgcolor: "white",
  border: "1px solid rgb(141, 130, 114)",
  boxShadow: 24,
  p: 3,
  color: "black",
  borderRadius: "8px",
};

export default function Transf() {
  const [isOnline, setIsOnline] = useState(false);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [congratulationOpen, setCongratulationOpen] = useState(false);
  const [transferTimestamp, setTransferTimestamp] = useState<string>("");
  const [inputValue, setInputValue] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsOnline(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUserId(user.uid);
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

  const isClickable = inputValue > 0 && okuseCoin !== null && inputValue <= okuseCoin;

  const handleMax = () => {
    if (okuseCoin !== null) {
      setInputValue(okuseCoin);
    }
  };

  const handleReceiverIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverId(e.target.value);
  };

  const handleOpen = async () => {
    if (okuseCoin === null || inputValue > okuseCoin) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (!receiverId || typeof receiverId !== "string") {
      setErrorMessage("⚠️Please enter valid receiver ID.");
      return;
    }

    if (!userId || typeof userId !== "string") {
      setErrorMessage("⚠️User ID is invalid.");
      return;
    }

    if (receiverId === userId) {
      setErrorMessage("⚠️You Can't transfer Okuse to your own account.");
      return;
    }

    try {
      const receiverRef = doc(db, "users", receiverId);
      const receiverDoc = await getDoc(receiverRef);

      if (!receiverDoc.exists()) {
        setErrorMessage("⚠️Receiver ID doesn't exist.");
        return;
      }

      setErrorMessage("");
      setOpen(true);
    } catch (error) {
      console.error("Error checking receiver ID:", error);
      setErrorMessage("⚠️An error occurred.Please try again.");
    }
  };

  // const ConfirmTransfer = async () => {
  //   if (!userId || !receiverId || inputValue <= 0) return;

  //   setLoading(true);

  //   try {
  //     const senderRef = doc(db, "users", userId);
  //     const receiverRef = doc(db, "users", receiverId);

  //     await runTransaction(db, async (transaction) => {
  //       const senderDoc = await transaction.get(senderRef);
  //       const receiverDoc = await transaction.get(receiverRef);

  //       if (!senderDoc.exists() || !receiverDoc.exists()) {
  //         throw new Error("Invalid sender or receiver ID.");
  //       }

  //       const senderData = senderDoc.data();
  //       const receiverData = receiverDoc.data();

  //       if (senderData.Okuse < inputValue) {
  //         throw new Error("Insufficient Okuse balance.");
  //       }

  //       // Deduct from sender
  //       transaction.update(senderRef, {
  //         Okuse: senderData.Okuse - inputValue,
  //       });

  //       // Add to receiver
  //       transaction.update(receiverRef, {
  //         Okuse: (receiverData.Okuse || 0) + inputValue,
  //       });
  //     });

  //     // Capture transfer timestamp
  //     const currentDate = new Date();
  //     const formattedDate = `${currentDate.getUTCFullYear()}/${
  //       currentDate.getUTCMonth() + 1
  //     }/${currentDate.getUTCDate()} UTC:${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;
  //     setTransferTimestamp(formattedDate);

  //     setSuccess(true);
  //     setOpen(false);
  //     setCongratulationOpen(true); // Open the congratulatory modal
  //   } catch (error) {
  //     console.error("Transfer failed:", error);
  //     setErrorMessage("Transfer failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


//   const ConfirmTransfer = async () => { 
//     if (!userId || !receiverId || inputValue <= 0) return;

//     setLoading(true);

//     try {
//         const senderRef = doc(db, "users", userId);
//         const receiverRef = doc(db, "users", receiverId);
//         const senderHistoryRef = collection(db, "users", userId, "Transaction_history"); // Sender's transaction history
//         const receiverHistoryRef = collection(db, "users", receiverId, "Transaction_history"); // Receiver's transaction history

//         await runTransaction(db, async (transaction) => {
//             const senderDoc = await transaction.get(senderRef);
//             const receiverDoc = await transaction.get(receiverRef);

//             if (!senderDoc.exists() || !receiverDoc.exists()) {
//                 throw new Error("Invalid sender or receiver ID.");
//             }

//             const senderData = senderDoc.data();
//             const receiverData = receiverDoc.data();

//             if (senderData.Okuse < inputValue) {
//                 throw new Error("Insufficient Okuse balance.");
//             }

//             // Deduct from sender
//             transaction.update(senderRef, {
//                 Okuse: senderData.Okuse - inputValue,
//             });

//             // Add to receiver
//             transaction.update(receiverRef, {
//                 Okuse: (receiverData.Okuse || 0) + inputValue,
//             });

//             // Capture transfer timestamp
//             const currentDate = new Date();
//             const formattedDate = `${currentDate.getUTCFullYear()}/${
//                 currentDate.getUTCMonth() + 1
//             }/${currentDate.getUTCDate()} UTC:${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}`;

//             // Log transaction for sender
//             transaction.set(doc(senderHistoryRef), {
//                 type: "sent",
//                 amount: inputValue,
//                 to: receiverId,
//                 timestamp: formattedDate,
//             });

//             // Log transaction for receiver
//             transaction.set(doc(receiverHistoryRef), {
//                 type: "received",
//                 amount: inputValue,
//                 from: userId,
//                 timestamp: formattedDate,
//             });

//             setTransferTimestamp(formattedDate);
//         });

//         setSuccess(true);
//         setOpen(false);
//         setCongratulationOpen(true); // Open the congratulatory modal
//     } catch (error) {
//         console.error("Transfer failed:", error);
//         setErrorMessage("Transfer failed. Please try again.");
//     } finally {
//         setLoading(false);
//     }

    
// };

const ConfirmTransfer = async () => { 
  if (!userId || !receiverId || inputValue <= 0) return;

  setLoading(true);

  try {
      const senderRef = doc(db, "users", userId);
      const receiverRef = doc(db, "users", receiverId);
      const senderHistoryRef = collection(db, "users", userId, "Transaction_history");
      const receiverHistoryRef = collection(db, "users", receiverId, "Transaction_history");

      await runTransaction(db, async (transaction) => {
          const senderDoc = await transaction.get(senderRef);
          const receiverDoc = await transaction.get(receiverRef);

          if (!senderDoc.exists() || !receiverDoc.exists()) {
              throw new Error("Invalid sender or receiver ID.");
          }

          const senderData = senderDoc.data();
          const receiverData = receiverDoc.data();

          if (senderData.Okuse < inputValue) {
              throw new Error("Insufficient Okuse balance.");
          }

          // Deduct from sender
          transaction.update(senderRef, {
              Okuse: senderData.Okuse - inputValue,
          });

          // Add to receiver
          transaction.update(receiverRef, {
              Okuse: (receiverData.Okuse || 0) + inputValue,
          });

          // Capture transfer timestamp
          const timestamp = Date.now();;

          // Create transaction entry
          const newTransactionSender = {
              type: "sent",
              amount: inputValue,
              to: receiverId,
              timestamp,
          };

          const newTransactionReceiver = {
              type: "received",
              amount: inputValue,
              from: userId,
              timestamp,
          };

          // Add transaction to sender's history
          const senderNewDocRef = doc(senderHistoryRef);
          transaction.set(senderNewDocRef, newTransactionSender);

          // Add transaction to receiver's history
          const receiverNewDocRef = doc(receiverHistoryRef);
          transaction.set(receiverNewDocRef, newTransactionReceiver);
      });

      // **Ensure only the latest 10 transactions are kept**
      await cleanUpOldTransactions(userId);
      await cleanUpOldTransactions(receiverId);

      setSuccess(true);
      setOpen(false);
      setCongratulationOpen(true);
  } catch (error) {
      console.error("Transfer failed:", error);
      setErrorMessage("Transfer failed. Please try again.");
  } finally {
      setLoading(false);
  }
};

// Function to keep only the latest 10 transactions
const cleanUpOldTransactions = async (userId: string) => {
  const userTransactionRef = collection(db, "users", userId, "Transaction_history");

  // Query transactions ordered by timestamp (newest first)
  const q = query(userTransactionRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  if (snapshot.docs.length > 10) {
      // Get extra transactions that need to be deleted
      const extraTransactions = snapshot.docs.slice(10);

      // Delete the oldest transactions
      for (const doc of extraTransactions) {
          await deleteDoc(doc.ref);
      }
  }
};

  const handleClose = () => setOpen(false);
  const handleCongratulationClose = () => {
    setCongratulationOpen(false); // Close the congratulatory modal
    setInputValue(0); // Reset input value
    setReceiverId(""); // Reset receiver ID
    setErrorMessage(""); // Clear any error messages
  };

  return (
    <div className="transfer">
      <form onSubmit={(e) => e.preventDefault()} className="transferForm">
<div className="transfer_from_to">
  <div><p>From</p><h5>{userId ?? "Online or Login"}</h5></div>
  <div><p>To</p> <input
          type="text"
          maxLength={28}
          className="receiverId"
          value={receiverId || ""}
          onChange={handleReceiverIdChange}
          placeholder="Enter Receiver ID"
          required
        /></div>
  
</div>

<div className="tokenbalance">
  <span>Points</span>
  <div>
 <p> <i className="bi bi-coin"></i></p><h4>{okuseCoin ?? "0"}</h4>  
  </div>
</div>
<div className="tokenbalance">
<span>Amounts</span>
        <div>
          <input
            type="number"
            className="sendOkuse"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            placeholder="Enter Token Amount"
            required
          />
          <button
            className={`exin2 ${isClickable ? "clickable" : "unclickable"}`}
            onClick={handleMax}
          >
            Max
          </button>
        </div>
        </div>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="button" className="transferbutton" onClick={handleOpen} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>


               <Modal open={open} onClose={handleClose}>
         <Box sx={style}>
           <Typography variant="h6" component="h2">
             <h3>Confirm Transfer</h3>
             <hr />
           </Typography>
           <Typography sx={{ mt: 2 }}>
             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
               <h5>From <br /></h5>
               <p>{userId}</p>
               <h5>To </h5>
               <p className="Confrim_transfer">{receiverId}</p>
               <h5>Amount</h5>
                 <h4 className="Confrim_transfer">{inputValue}</h4>
               <p>Are you sure you want to send?</p>
              </div>
             <hr />
           </Typography>
           <Button onClick={ConfirmTransfer} color="success" disabled={loading}>
             {loading ? "Processing..." : "Confirm"}
           </Button>
           <Button onClick={handleClose} color="error">
             Cancel
           </Button>
         </Box>
       </Modal>

       <Modal open={congratulationOpen} onClose={handleCongratulationClose}>
         <Box sx={style}>
           <Typography variant="h6" component="h2">
             <h3 color="success">Success!</h3>
            <hr />
           </Typography>
          <Typography sx={{ mt: 2 }}>             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h5>From <br /></h5>
               <p>{userId}</p>
               <h5>To </h5>
               <p className="Confrim_transfer">{receiverId}</p>
               <h5>Amount</h5>
                <h4 className="Confrim_transfer">{inputValue}</h4>
               <p>Time:{transferTimestamp}</p>
             </div>
             <hr />
           </Typography>
          <Button onClick={handleCongratulationClose} color="success">
             Exit
           </Button>
         </Box>
       </Modal>
      </form>   
    </div>
  );
}