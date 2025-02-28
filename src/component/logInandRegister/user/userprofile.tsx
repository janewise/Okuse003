

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../firebase/firebase"; // Import the Firebase auth instance
// import { onAuthStateChanged } from "firebase/auth"; // Import necessary functions from Firebase Auth
// import { collection, getDoc, getDocs, updateDoc, doc, deleteDoc  } from "firebase/firestore"; // Import Firestore functions
// import { db } from "../../../firebase/firebase"; // Import your Firestore instance
// // import { Snackbar } from "@mui/material";
// import "./userprofile.css";


// interface ProfileImg {
//   image: string;
// }

// export default function Userprofile() {
//   const [email, setEmail] = useState<string | null>(null);
//   const [UsernameId, setUsernameId] = useState<string | null>(null);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [Successcopy, setSuccesscopy] = useState<boolean>(false);
//   const [UserId, setUserId] = useState<string | null>(null);
//   const [profileimg, setProfileimg] = useState<ProfileImg[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setEmail(user.email);

//         try {
//           // Reference to the user's data in Firestore
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setUsernameId(userData.UsernameId);
//             setUserId(user.uid); // Fix: Use user.uid
//             setOkuseCoin(userData.Okuse ?? 0);
//             setTicketCard(userData.Ticket ?? 0);
//           } else {
//             console.error("No data available for this user.");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         // Redirect to sign-in if the user is not logged in
//         navigate("/signin");
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, [navigate]);

//   // Function to copy User ID
  // const shortenUid = (address: any) => {
  //   return `${address.slice(0, 7)}...${address.slice(-5)}`;
  // };

  // const handleCopy = () => {
  //   if (UserId) {
  //     navigator.clipboard.writeText(UserId);
  //     setSuccesscopy(true);
  //     setTimeout(() => setSuccesscopy(false), 1000); // Auto-close after 1s
  //   }
  // };

//   useEffect(() => {
//     const fetchItems = async () => {
//       const querySnapshot = await getDocs(collection(db,  'users', user.uid));
//       const fetchedItems = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as ProfileImg[];
//       setProfileimg(fetchedItems);
//     };

//     fetchItems();
//   }, []);

//   return (
//     <div className="mainProfile">
//       <div className="profile-box1">
//         <h4>
//           <i className="bi bi-person"></i>
//           <i className="bi bi-pencil"></i>
//         </h4>

//         <div className="profile-details">
//           <h3>{UsernameId}</h3>
//           <h5>
//             {/* {UserId}{" "} */}
//             {UserId ? shortenUid(UserId) : "Loading..."}
//              <span onClick={handleCopy} style={{ cursor: "pointer" }}>
//               <span> </span><i className="bi bi-copy"></i>
//             </span>
//           </h5>
//           <p>
//             <strong>Email:</strong> {email}
//           </p>
//         </div>
//         <hr />
//       </div>

//       <div className="profile-box2">
//         <h2>Balance</h2>
//         <div>
//           <h4>
//             Okuse: <span>{okuseCoin}</span> <i className="bi bi-coin"></i>
//           </h4>
//           <h4>
//             Ticket: <span>{ticketCard}</span>{" "}
//             <i className="bi bi-ticket-perforated"></i>
//           </h4>
//         </div>
//       </div>

//       {/* Success Snackbar */}
//       {/* <Snackbar
//         open={Successcopy}
//         autoHideDuration={1000}
//         message="Copied Successfully!"
//         onClose={() => setSuccesscopy(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         ContentProps={{
//           sx: { backgroundColor: "lightgreen", color: "white" },
//         }}
//       /> */}
//     </div>
//   );
// }


//with cloudniary and npm i axios 
//
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../../../firebase/firebase";
// import axios from "axios"; // Import axios for Cloudinary upload
// import "./userprofile.css";

// export default function Userprofile() {
//   const [email, setEmail] = useState<string | null>(null);
//   const [UsernameId, setUsernameId] = useState<string | null>(null);
//   const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
//   const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [UserId, setUserId] = useState<string | null>(null);
//   const [profileImg, setProfileImg] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setEmail(user.email);
//         setUserId(user.uid);

//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             setUsernameId(userData.UsernameId);
//             setOkuseCoin(userData.Okuse ?? 0);
//             setTicketCard(userData.Ticket ?? 0);
//             setProfileImg(userData.ProfileImg || null); // Fetch profile image URL
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         navigate("/signin");
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   // Function to trigger file input
//   const handleEditClick = () => {
//     document.getElementById("fileInput")?.click();
//   };

//   // Function to handle file selection
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]); // Store the selected file
//       uploadImage(event.target.files[0]); // Upload to Cloudinary
//     }
//   };

//   // Function to upload image to Cloudinary
//   const uploadImage = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_upload_preset"); // Use your Cloudinary upload preset
//     formData.append("cloud_name", "your_cloud_name"); // Your Cloudinary Cloud Name

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
//         formData
//       );

//       const imageUrl = response.data.secure_url;
//       setProfileImg(imageUrl); // Update state

//       if (UserId) {
//         const userRef = doc(db, "users", UserId);
//         await updateDoc(userRef, { ProfileImg: imageUrl }); // Save to Firestore
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div className="mainProfile">
//       <div className="profile-box1">
//         <h4>
//           <i className="bi bi-person"></i>
//           <i className="bi bi-pencil" onClick={handleEditClick} style={{ cursor: "pointer" }}></i>
//         </h4>

//         {/* Hidden File Input */}
//         <input
//           type="file"
//           id="fileInput"
//           accept="image/*"
//           style={{ display: "none" }}
//           onChange={handleFileChange}
//         />

//         {/* Profile Image */}
//         <div className="profile-image">
//           {profileImg ? (
//             <img src={profileImg} alt="Profile" className="profile-img" />
//           ) : (
//             <p>No Profile Image</p>
//           )}
//         </div>

//         <div className="profile-details">
//           <h3>{UsernameId}</h3>
//           <p><strong>Email:</strong> {email}</p>
//         </div>
//       </div>

//       <div className="profile-box2">
//         <h2>Balance</h2>
//         <div>
//           <h4>Okuse: <span>{okuseCoin}</span> <i className="bi bi-coin"></i></h4>
//           <h4>Ticket: <span>{ticketCard}</span> <i className="bi bi-ticket-perforated"></i></h4>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import "./userprofile.css";

export default function Userprofile() {
  const [email, setEmail] = useState<string | null>(null);
    const [UsernameId, setUsernameId] = useState<string | null>(null);
    const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
    const [ticketCard, setTicketCard] = useState<number | null>(null);
    const [Successcopy, setSuccesscopy] = useState<boolean>(false);
    const [UserId, setUserId] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);

        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.data();
            setUsernameId(userData.UsernameId);
            setProfileImg(userData.ProfileImg || "");
            setOkuseCoin(userData.Okuse ?? 0);
            setTicketCard(userData.Ticket ?? 0);
          } else {
            console.error("No data available for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [navigate]);


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
  // Handle File Selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !UserId) return;
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Okuse_01"); // Replace with your Cloudinary preset

      const response = await fetch("https://api.cloudinary.com/v1_1/dz4cybeu1/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        const userRef = doc(db, "users", UserId);
        await updateDoc(userRef, { ProfileImg: data.secure_url });
        setProfileImg(data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Upload Image to Cloudinary & Save URL to Firestore
  // const handleUpload = async () => {
  //   if (!selectedFile || !UserId) return;

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);
  //     formData.append("upload_preset", "Okuse_01"); // Replace with your Cloudinary preset

  //     const response = await fetch("https://api.cloudinary.com/v1_1/dz4cybeu1/image/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.secure_url) {
  //       const userRef = doc(db, "users", UserId);
  //       await updateDoc(userRef, { ProfileImg: data.secure_url });
  //       setProfileImg(data.secure_url);
  //       setSelectedFile(null);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <div className="mainProfile">
      <div className="profile-box1">
        <h4>
        {profileImg ? <img src={profileImg} alt="Profile" width="100" /> :    <i className="bi bi-person"></i>}
       
          <label htmlFor="fileInput">
            <i className="bi bi-pencil" style={{ cursor: "pointer" }}></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
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
     </div>
   );
 }
