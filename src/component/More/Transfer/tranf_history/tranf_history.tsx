// import React, { useState, useEffect } from "react";
// import { Route, Routes, NavLink, Navigate } from "react-router-dom";
// import "./transf_history.css"


// export default function Transf_History() {

//   return (
//     <>
//         <div className="Mother_transferHistory_box">
//             <div className="Transfer_back_box"> 
//               <NavLink
//                       to="/Transfer_Main/transfer"
//                       className="Transfer_backspace">
//                     <i className="bi bi-arrow-left"></i>
//                     </NavLink> 
//                     <h4>History</h4>
//                     <h5>
//                     <NavLink 
//                   to="/transfer_history"
//                   className={({ isActive }) => isActive ? "Transfer_link Transfer_link_active" : "Transfer_link"}
//                 >
//                     <i className="bi bi-clock-history"></i> 
//                     </NavLink>
//                     </h5>  
//             </div>

//             <div className="container">
//               <ul>
//                 <li>
//                   {/* for sent */}
//                 <div className="transf_hist_li"><p><i className="bi bi-arrow-up-right"></i> Sent</p> <span>UTC:</span></div>
//                 <hr />
//                 <div className="transf_hist_li"><p>To:userid</p><span>-5</span> </div>
//                 </li>
//                 {/* for received */}
//                 <li>
//                 <div className="transf_hist_li"><p><i className="bi bi-arrow-down-right"></i> Received</p> <span>UTC:</span></div>
//                 <hr />
//                 <div className="transf_hist_li"><p>From:userid</p><span>+10</span> </div>
//                 </li>
//               </ul>
//             </div>
//         </div>
      
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { auth, db } from "../../../../firebase/firebase";
// import { collection,getDoc, doc, getDocs, orderBy, query } from "firebase/firestore"; 
// import { onAuthStateChanged } from "firebase/auth";
// import "./transf_history.css";

// export default function Transf_History({  }) {
//   const [transactions, setTransactions] = useState([]);
//    const [isOnline, setIsOnline] = useState(false);
//  const [userId, setUserId] = useState<string | null>(null);

//  useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       setIsOnline(true);
//       try {
//         const userRef = doc(db, "users", user.uid);
//         const snapshot = await getDoc(userRef);

//         if (snapshot.exists()) {
//           const userData = snapshot.data();
//           setUserId(user.uid);
//         } else {
//           console.error("No data available for this user.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     } else {
//       setIsOnline(false);
//     }
//   });

//   return () => unsubscribe();
// }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchTransactions = async () => {
//       try {
//         const userTransactionRef = collection(db, "users", userId, "Transaction_history");

//         // Fetch transactions ordered by timestamp (newest first)
//         const q = query(userTransactionRef, orderBy("timestamp", "desc"));
//         const querySnapshot = await getDocs(q);

//         const history = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setTransactions(history);
//       } catch (error) {
//         console.error("Error fetching transaction history:", error);
//       }
//     };

//     fetchTransactions();
//   }, [userId]);

//   return (
//     <>
//       <div className="Mother_transferHistory_box">
//         <div className="Transfer_back_box">
//           <NavLink to="/Transfer_Main/transfer" className="Transfer_backspace">
//             <i className="bi bi-arrow-left"></i>
//           </NavLink>
//           <h4>History</h4>
//           <h5>
//             <NavLink
//               to="/transfer_history"
//               className={({ isActive }) => (isActive ? "Transfer_link Transfer_link_active" : "Transfer_link")}
//             >
//               <i className="bi bi-clock-history"></i>
//             </NavLink>
//           </h5>
//         </div>

//         <div className="container">
//           <ul>
//             {transactions.map((transaction) => (
//               <li key={transaction.id}>
//                 <div className="transf_hist_li">
//                   <p>
//                     {transaction.type === "sent" ? (
//                       <i className="bi bi-arrow-up-right"></i>
//                     ) : (
//                       <i className="bi bi-arrow-down-right"></i>
//                     )}{" "}
//                     {transaction.type === "sent" ? "Sent" : "Received"}
//                   </p>
//                   <span>UTC: {new Date(transaction.timestamp).toLocaleString()}</span>
//                 </div>
//                 <hr />
//                 <div className="transf_hist_li">
//                   <p>{transaction.type === "sent" ? `To: ${transaction.to}` : `From: ${transaction.from}`}</p>
//                   <span>{transaction.type === "sent" ? `-${transaction.amount}` : `+${transaction.amount}`}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { auth, db } from "../../../../firebase/firebase";
// import { collection, getDoc, doc, getDocs, orderBy, query, limit } from "firebase/firestore"; 
// import { onAuthStateChanged } from "firebase/auth";
// import { Button, Box, Typography, Modal } from "@mui/material";
// import "./transf_history.css";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 310,
//   bgcolor: "white",
//   border: "1px solid rgb(141, 130, 114)",
//   boxShadow: 24,
//   p: 3,
//   color: "black",
//   borderRadius: "8px",
// };

// // Define transaction type
// interface Transaction {
//   id: string;
//   type: "sent" | "received"; // Sent or received
//   amount: number;
//   timestamp: number; // Ensure Firestore stores this as a number
//   from?: string;
//   to?: string;
// }

// export default function Transf_History() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isOnline, setIsOnline] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setIsOnline(true);
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             setUserId(user.uid);
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
//     if (!userId) return;

//     const fetchTransactions = async () => {
//       try {
//         const userTransactionRef = collection(db, "users", userId, "Transaction_history");

//         // Fetch only the latest 10 transactions, ordered by timestamp
//         const q = query(userTransactionRef, orderBy("timestamp", "desc"), limit(10));
//         const querySnapshot = await getDocs(q);

//         const history: Transaction[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Transaction[];

//         setTransactions(history);
//       } catch (error) {
//         console.error("Error fetching transaction history:", error);
//       }
//     };

//     fetchTransactions();
//   }, [userId]);
  
//   const shortenUid = (address: any) => {
//     return `${address.slice(0, 5)}...${address.slice(-5)}`;
//   };

//   return (
//     <>
//       <div className="Mother_transferHistory_box">
//         <div className="Transfer_back_box">
//           <NavLink to="/Transfer_Main/transfer" className="Transfer_backspace">
//             <i className="bi bi-arrow-left"></i>
//           </NavLink>
//           <h4>History</h4>
//           <h5>
//             <NavLink
//               to="/transfer_history"
//               className={({ isActive }) => (isActive ? "Transfer_link Transfer_link_active" : "Transfer_link")}
//             >
//               <i className="bi bi-clock-history"></i>
//             </NavLink>
//           </h5>
//         </div>

//         <div className="container">
//           <ul>
//             {transactions.map((transaction) => (
//               <li key={transaction.id}>
//                 <div className="transf_hist_li">
//                   <p>
//                     {transaction.type === "sent" ? (
//                       <i className="bi bi-arrow-up-right"></i>
//                     ) : (
//                       <i className="bi bi-arrow-down-right"></i>
//                     )}{" "}
//                     {transaction.type === "sent" ? "Sent" : "Received"}
//                   </p>
//                   <span>
//                     {" "}
//                     {new Date(transaction.timestamp).toLocaleDateString("en-GB")}{" "}
//                     {new Date(transaction.timestamp).toLocaleTimeString("en-GB", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                       hour12: false, // Ensures 24-hour format
//                     })}
//                   </span>
//                 </div>
//                 <hr />
//                 <div className="transf_hist_li">
//                   <p>{transaction.type === "sent" ? `To: ${shortenUid(transaction.to)}` : `From: ${transaction.from}`}</p>
//                   <span>{transaction.type === "sent" ? `-${transaction.amount}` : `+${transaction.amount}`}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>


//         <Modal open={transferdetailsOpen} onClose={transferdetailsClose}>
//          <Box sx={style}>
//            <Typography variant="h6" component="h2">
//              <h3 color="success">Success!</h3>
//             <hr />
//            </Typography>
//           <Typography sx={{ mt: 2 }}>             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
//           <h5>From <br /></h5>
//                <p>{userId}</p>
//                <h5>To or From </h5>
//                <p className="Confrim_transfer"></p>
//                <h5>Amount</h5>
//                 <h4 className="Confrim_transfer"></h4>
//                <p>Time:</p>
//              </div>
//              <hr />
//            </Typography>
//           <Button onClick={transferdetailsClose} color="fail">
//              Close
//            </Button>
//          </Box>
//        </Modal>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../../../../firebase/firebase";
import { collection, getDoc, doc, getDocs, orderBy, query, limit } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { Button, Box, Typography, Modal } from "@mui/material";
import "./transf_history.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 310,
  bgcolor: "var(--bg-color)",
  border: "1px solid rgb(141, 130, 114)",
  boxShadow: 24,
  p: 3,
  color: "var(--text-color)",
  borderRadius: "8px",
};

// Define transaction type
interface Transaction {
  id: string;
  type: "sent" | "received"; // Sent or received
  amount: number;
  timestamp: number; // Ensure Firestore stores this as a number
  from?: string;
  to?: string;
}

export default function Transf_History() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsOnline(true);
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            setUserId(user.uid);
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

  // useEffect(() => {
  //   if (!userId) return;

  //   const fetchTransactions = async () => {
  //     try {
  //       const userTransactionRef = collection(db, "users", userId, "Transaction_history");

  //       // Fetch only the latest 10 transactions, ordered by timestamp
  //       const q = query(userTransactionRef, orderBy("timestamp", "desc"), limit(10));
  //       const querySnapshot = await getDocs(q);

  //       const history: Transaction[] = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       })) as Transaction[];

  //       setTransactions(history);
  //     } catch (error) {
  //       console.error("Error fetching transaction history:", error);
  //     }
  //   };

  //   fetchTransactions();
  // }, [userId]);

  useEffect(() => {
    if (!userId) return; // Ensures fetching only happens when userId is available
  
    console.log("Fetching transactions for user:", userId); // Debugging log
  
    const fetchTransactions = async () => {
      try {
        const userTransactionRef = collection(db, "users", userId, "Transaction_history");
        const q = query(userTransactionRef, orderBy("timestamp", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
  
        const history: Transaction[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Transaction[];
  
        setTransactions(history);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
      }
    };
  
    fetchTransactions();
  }, [userId]); // Runs when userId changes
  
  

  const shortenUid = (address: string) => {
    return `${address.slice(0, 5)}...${address.slice(-5)}`;
  };

  // Open modal and set transaction details
  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="Mother_transferHistory_box">
        <div className="Transfer_back_box">
          <NavLink to="/Transfer_Main/transfer" className="Transfer_backspace">
            <i className="bi bi-arrow-left"></i>
          </NavLink>
          <h4>History</h4>
          <h5>
            <NavLink
              to="/transfer_history"
              className={({ isActive }) => (isActive ? "Transfer_link Transfer_link_active" : "Transfer_link")}
            >
              <i className="bi bi-clock-history"></i>
            </NavLink>
          </h5>
        </div>

        <div className="container">
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} onClick={() => handleOpenModal(transaction)} style={{ cursor: "pointer" }}>
                <div className="transf_hist_li">
                  <p>
                    {transaction.type === "sent" ? (
                      <i className="bi bi-arrow-up-right">Sent</i>
                    ) : (
                      <i className="bi bi-arrow-down-right">Received</i>
                    )}{" "}
                    {/* {transaction.type === "sent" ? "Sent" : "Received"} */}
                  </p>
                  <span>
                    {" "}
                    {new Date(transaction.timestamp).toLocaleDateString("en-GB")}{" "}
                    {new Date(transaction.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false, // Ensures 24-hour format
                    })}
                  </span>
                </div>
                <hr />
                <div className="transf_hist_li">
                  <p>{transaction.type === "sent" ? `To: ${shortenUid(transaction.to ?? "")}` : `From: ${transaction.from}`}</p>
                  <span className={transaction.type === "sent" ? `minus` : `plus}`}>
                    {transaction.type === "sent" ? `- ${transaction.amount}` : `+ ${transaction.amount}`}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal for transaction details */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              <h3>Transaction Details</h3>
              <hr />
            </Typography>
            {selectedTransaction && (
              <Typography sx={{ mt: 2 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <h5>From:</h5>
                  <p className={selectedTransaction.from ? "tansactionfrom" : ""} >
                    {selectedTransaction.from ?? userId}</p>
                  <h5>To:</h5>
                  <p className={selectedTransaction.to ? "tansactionto" : ""} >
                    {selectedTransaction.to ?? userId}</p>
                  <h5>Amount:</h5>
                  <h4 className={selectedTransaction.type === "sent" ? `minus` : `plus}`}>
                    {selectedTransaction.type === "sent" ? `- ${selectedTransaction.amount}` : `+ ${selectedTransaction.amount}`}</h4>
                  <h5>Time:</h5>
                  <p>
                    {new Date(selectedTransaction.timestamp).toLocaleDateString("en-GB")}{" "}
                    {new Date(selectedTransaction.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </p>
                </div>
                <hr />
              </Typography>
            )}
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
