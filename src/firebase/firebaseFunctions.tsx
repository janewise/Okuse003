import { db } from "./firebase"; // Import the Firestore instance
import { doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { auth } from "./firebase"; // Import the auth instance
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { Normal_quizQ } from "../component/Game/quiz_game/Normal_quiz/quizNormal_data";

// Sign up function
export async function signUpUser(email: string, password: string, UsernameId: string) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send a verification email
    await sendEmailVerification(user);

    // Save user data to Firestore
    const userRef = doc(db, 'users', user.uid); // Reference to the user document
    await setDoc(userRef, {
      emailOrPh: email,
      UsernameId: UsernameId,
      Okuse: 0,
      Ticket:0,
      createdAt: new Date().toISOString()
    });

    // Return user object upon success
    return {
      user: user,
      message: "Sign-up successful! Verification email sent."
    };
  } catch (error: any) {
    // Handle specific Firebase error codes
    let errorMessage = "Sign-up failed. Please try again.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "This email is already in use.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "Invalid email address.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "Password should be at least 6 characters.";
    }

    throw new Error(errorMessage);
  }
}

// async function uploadQuizData() {
//   const quizData = {
//     Normal_quizQ: [
//       {
//         id: 1,
//         Question: "Q1.What is the name of the fourth Hokage?",
//         choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//         answer: "Minato",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 2,
//         Question: "Q2.What is the family name of Naruto?",
//         choice: ["Uzumaki", "Senju", "Sarada", "Hyuga"],
//         answer: "Uzumaki",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 3,
//         Question: "Q3.Who is referred to as useless?",
//         choice: ["Ino", "Sasuke", "Sakura", "Kiba"],
//         answer: "Sakura",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 4,
//         Question: "Q4.What is the name of the fourth Hokage?",
//         choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//         answer: "Minato",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 5,
//         Question: "Q5.What is the family name of Hinata?",
//         choice: ["1Uzumaki", "Senju", "Sarada", "Hyuga"],
//         answer: "Hyuga",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 6,
//         Question: "Q6.Who has the most Sharigan?",
//         choice: ["Madara", "Naruto", "Itachi", "Danzo"],
//         answer: "Danzo",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 7,
//         Question: "Q7.What is the name of the 6th Hokage?",
//         choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//         answer: "Kakashi",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 8,
//         Question: "Q8.Who kill the most Uchiha in Peace time?",
//         choice: ["Itachi", "Tobiyama", "Mike", "Orochimaru"],
//         answer: "Itachi",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 9,
//         Question: "Q9.Who is high way in Naruto?",
//         choice: ["Ino", "Konan", "Pain", "Sakura"],
//         answer: "Sakura",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 10,
//         Question: "Q10.In Land of Wind which village exist?",
//         choice: ["Stone", "Mist", "Leaf", "Sand"],
//         answer: "Sand",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id:11,
//         Question: "11.how many tails Kuruma have?",
//         choice: ["8", "9", "1", "2"],
//         answer: "9",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 12,
//         Question: "Q12.Who is thr creator of Naruto?",
//         choice: ["Kushimito", "Kushimoto", "Kishimito", "Kishimoto"],
//         answer: "Kishimoto",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 13,
//         Question: "Q13.Nara clan use _?",
//         choice: ["MindControl", "Shadow", "Bugs", "Scroll"],
//         answer: "Shadow",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 14,
//         Question: "Q14.What is the name of 7Ninja SwordsMan Naruto first meet?",
//         choice: ["Kabutowa", "Kisame", "Zabuza", "Raiga"],
//         answer: "Raiga",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 15,
//         Question: "15.how many tails Shukaku have?",
//         choice: ["1", "2", "3", "4"],
//         answer: "1",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 16,
//         Question: "Q16.What Tails Beast 'Yugito Nii' host?",
//         choice: ["Matatabi", "Isobu", "Son Gokū", "Kokuō"],
//         answer: "Matatabi",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 17,
//         Question: "Q17.Which Tails beast have wings?",
//         choice: ["Chōmei", "Saiken", "Gyūki", "Shukaku"],
//         answer: "Chōmei",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 18,
//         Question: "Q18. Cloud Village is located in Land of _?",
//         choice: ["Lighting", "Mist", "Rock", "Leaf"],
//         answer: "Lighting",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 19,
//         Question: "Q19.How many Basic Natural Chakara are there?",
//         choice: ["5", "7", "3", "4"],
//         answer: "5",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 20,
//         Question: "Q20.Which clan use Incest as a weapon?",
//         choice: ["Yamanaka", "Akimichi", "Fuma", "Aburame"],
//         answer: "Aburame",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//       {
//         id: 21,
//         Question: "Q21.Who is the first host of Kuruma?",
//         choice: [" Kushina", "Mito", "Madara", "Kagura"],
//         answer: "Mito",
//         backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//         frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//       },
//     ],
//   };

//   try {
//     // Reference to the Firestore document
//     const docRef = doc(db, "Games_data", "Quiz_data");

//     // Set the data under the 'Easy' field
//     await setDoc(docRef, quizData, { merge: true });

//     console.log("Quiz data uploaded successfully!");
//   } catch (error) {
//     console.error("Error uploading quiz data: ", error);
//   }
// }

// Call the function to upload data
// uploadQuizData();

export {};











// import { db } from "./firebase"; // Import Firestore instance
// import { auth } from "./firebase"; // Import Auth instance
// import { 
//   createUserWithEmailAndPassword, 
//   sendEmailVerification 
// } from "firebase/auth";
// import { 
//   doc, 
//   setDoc, 
//   collection, 
//   writeBatch, 
//   serverTimestamp 
// } from "firebase/firestore"; // Firestore functions

// // TypeScript Interface for Quiz
// interface Quiz {
//   id: number;
//   Question: string;
//   choice: string[];
//   answer: string;
//   backcard: string;
//   frontcard: string;
// }

// // Sign-up function
// export async function signUpUser(email: string, password: string, UsernameId: string) {
//   try {
//     // Create user with email and password
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Send a verification email
//     await sendEmailVerification(user);

//     // Save user data to Firestore
//     const userRef = doc(db, "users", user.uid); // Reference to the user document
//     await setDoc(userRef, {
//       emailOrPh: email,
//       UsernameId: UsernameId,
//       Okuse: 0,
//       Ticket: 0,
//       createdAt: serverTimestamp(),
//     });

//     // Return user object upon success
//     return {
//       user: user,
//       message: "Sign-up successful! Verification email sent.",
//     };
//   } catch (error: any) {
//     // Handle Firebase-specific errors
//     let errorMessage = "Sign-up failed. Please try again.";
//     if (error.code === "auth/email-already-in-use") {
//       errorMessage = "This email is already in use.";
//     } else if (error.code === "auth/invalid-email") {
//       errorMessage = "Invalid email address.";
//     } else if (error.code === "auth/weak-password") {
//       errorMessage = "Password should be at least 6 characters.";
//     }

//     // Throw a more specific error
//     throw new Error(errorMessage);
//   }
// }

// // Function to upload quiz data
// const uploadQuizData = async () => {
//   // Quiz data
//   const Normal_quizQ: Quiz[] = [
//     {
//       id: 1,
//       Question: "Q1.What is the name of the fourth Hokage?",
//       choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//       answer: "Minato",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 2,
//       Question: "Q2.What is the family name of Naruto?",
//       choice: ["Uzumaki", "Senju", "Sarada", "Hyuga"],
//       answer: "Uzumaki",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 3,
//       Question: "Q3.Who is referred to as useless?",
//       choice: ["Ino", "Sasuke", "Sakura", "Kiba"],
//       answer: "Sakura",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 4,
//       Question: "Q4.What is the name of the fourth Hokage?",
//       choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//       answer: "Minato",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 5,
//       Question: "Q5.What is the family name of Hinata?",
//       choice: ["1Uzumaki", "Senju", "Sarada", "Hyuga"],
//       answer: "Hyuga",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 6,
//       Question: "Q6.Who has the most Sharigan?",
//       choice: ["Madara", "Naruto", "Itachi", "Danzo"],
//       answer: "Danzo",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 7,
//       Question: "Q7.What is the name of the 6th Hokage?",
//       choice: ["Minato", "Kakashi", "Naruto", "Tobirama"],
//       answer: "Kakashi",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 8,
//       Question: "Q8.Who kill the most Uchiha in Peace time?",
//       choice: ["Itachi", "Tobiyama", "Mike", "Orochimaru"],
//       answer: "Itachi",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 9,
//       Question: "Q9.Who is high way in Naruto?",
//       choice: ["Ino", "Konan", "Pain", "Sakura"],
//       answer: "Sakura",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 10,
//       Question: "Q10.In Land of Wind which village exist?",
//       choice: ["Stone", "Mist", "Leaf", "Sand"],
//       answer: "Sand",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id:11,
//       Question: "11.how many tails Kuruma have?",
//       choice: ["8", "9", "1", "2"],
//       answer: "9",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 12,
//       Question: "Q12.Who is thr creator of Naruto?",
//       choice: ["Kushimito", "Kushimoto", "Kishimito", "Kishimoto"],
//       answer: "Kishimoto",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 13,
//       Question: "Q13.Nara clan use _?",
//       choice: ["MindControl", "Shadow", "Bugs", "Scroll"],
//       answer: "Shadow",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 14,
//       Question: "Q14.What is the name of 7Ninja SwordsMan Naruto first meet?",
//       choice: ["Kabutowa", "Kisame", "Zabuza", "Raiga"],
//       answer: "Raiga",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 15,
//       Question: "15.how many tails Shukaku have?",
//       choice: ["1", "2", "3", "4"],
//       answer: "1",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 16,
//       Question: "Q16.What Tails Beast 'Yugito Nii' host?",
//       choice: ["Matatabi", "Isobu", "Son Gokū", "Kokuō"],
//       answer: "Matatabi",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 17,
//       Question: "Q17.Which Tails beast have wings?",
//       choice: ["Chōmei", "Saiken", "Gyūki", "Shukaku"],
//       answer: "Chōmei",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 18,
//       Question: "Q18. Cloud Village is located in Land of _?",
//       choice: ["Lighting", "Mist", "Rock", "Leaf"],
//       answer: "Lighting",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 19,
//       Question: "Q19.How many Basic Natural Chakara are there?",
//       choice: ["5", "7", "3", "4"],
//       answer: "5",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 20,
//       Question: "Q20.Which clan use Incest as a weapon?",
//       choice: ["Yamanaka", "Akimichi", "Fuma", "Aburame"],
//       answer: "Aburame",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//     {
//       id: 21,
//       Question: "Q21.Who is the first host of Kuruma?",
//       choice: [" Kushina", "Mito", "Madara", "Kagura"],
//       answer: "Mito",
//       backcard: "/Game/Quiz/quiz_img/quizcard_back.png",
//       frontcard:"/Game/Quiz/quiz_img/quizcard_back.png",
//     },
//   ];

//   try {
//     // Reference to the "Normal_quiz" subcollection
//     const batch = writeBatch(db);
//     const collectionRef = collection(db, "Games_data", "Quiz_data", "Normal_quiz");

//     // Add each quiz question as a document in the subcollection
//     Normal_quizQ.forEach((quiz) => {
//       const docRef = doc(collectionRef); // Automatically generates unique document IDs
//       batch.set(docRef, quiz);
//     });

//     // Commit the batch write
//     await batch.commit();

//     console.log("Quiz data successfully uploaded to Firestore!");
//   } catch (error: any) {
//     console.error("Error uploading quiz data:", error.message, error.code);
//   }
// };

// // Call the function to upload data
// uploadQuizData();

// // Export to avoid isolatedModules error
// export {};
