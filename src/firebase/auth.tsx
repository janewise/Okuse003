// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "./firebase"; // Ensure you have Firebase initialized

// // Create the context for Auth
// const AuthContext = createContext<{ user: User | null }>({ user: null });

// // Custom hook to use the Auth context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // Auth provider component
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "./firebase"; // Ensure you have Firebase initialized

// Create the context for Auth
const AuthContext = createContext<{ user: User | null; userData: any | null }>({ user: null, userData: null });

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null); // State to hold user data from Firestore

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          // Fetch user data from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error);
        }
      } else {
        setUser(null);
        setUserData(null); // Reset user data if user is logged out
      }
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

