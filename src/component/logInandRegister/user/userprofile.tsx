

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase"; // Import the Firebase auth instance
import { onAuthStateChanged } from "firebase/auth"; // Import necessary functions from Firebase Auth
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../firebase/firebase"; // Import your Firestore instance
// import { Snackbar } from "@mui/material";
import "./userprofile.css";

export default function Userprofile() {
  const [email, setEmail] = useState<string | null>(null);
  const [UsernameId, setUsernameId] = useState<string | null>(null);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [Successcopy, setSuccesscopy] = useState<boolean>(false);
  const [UserId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);

        try {
          // Reference to the user's data in Firestore
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsernameId(userData.UsernameId);
            setUserId(user.uid); // Fix: Use user.uid
            setOkuseCoin(userData.Okuse ?? 0);
            setTicketCard(userData.Ticket ?? 0);
          } else {
            console.error("No data available for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // Redirect to sign-in if the user is not logged in
        navigate("/signin");
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Function to copy User ID
  const shortenUid = (address: any) => {
    return `${address.slice(0, 7)}...${address.slice(-5)}`;
  };

  const handleCopy = () => {
    if (UserId) {
      navigator.clipboard.writeText(UserId);
      setSuccesscopy(true);
      setTimeout(() => setSuccesscopy(false), 1000); // Auto-close after 1s
    }
  };

  return (
    <div className="mainProfile">
      <div className="profile-box1">
        <h4>
          <i className="bi bi-person"></i>
        </h4>

        <div className="profile-details">
          <h3>{UsernameId}</h3>
          <h5>
            {/* {UserId}{" "} */}
            {UserId ? shortenUid(UserId) : "Loading..."}
             <span onClick={handleCopy} style={{ cursor: "pointer" }}>
              <span> </span><i className="bi bi-copy"></i>
            </span>
          </h5>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
        <hr />
      </div>

      <div className="profile-box2">
        <h2>Balance</h2>
        <div>
          <h4>
            Okuse: <span>{okuseCoin}</span> <i className="bi bi-coin"></i>
          </h4>
          <h4>
            Ticket: <span>{ticketCard}</span>{" "}
            <i className="bi bi-ticket-perforated"></i>
          </h4>
        </div>
      </div>

      {/* Success Snackbar */}
      {/* <Snackbar
        open={Successcopy}
        autoHideDuration={1000}
        message="Copied Successfully!"
        onClose={() => setSuccesscopy(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          sx: { backgroundColor: "lightgreen", color: "white" },
        }}
      /> */}
    </div>
  );
}
