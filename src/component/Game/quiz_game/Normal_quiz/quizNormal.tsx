
import React from "react";
import QuizReuse from "../ReuseQuiz/quiz_Reuse";
import {Normal_quizQ } from "./quizNormal_data";

export default function Quiznormal() {

  return (
    <>
      <QuizReuse
       questions={Normal_quizQ}
       timerStart={30}
       winOkuse={12}
       winTicket={0}
       replayCost={10}
       quizlength={3}
      />
    </>
  );
}


// import React, { useEffect, useState } from 'react';
// import QuizReuse from "../ReuseQuiz/quiz_Reuse";
// import { db } from '../../../../firebase/firebase'; // Adjust the path as needed
// import { collection, getDocs } from 'firebase/firestore';

// // Define the structure of your quiz data
// interface QuizQuestion {
//   id: number; // Assuming id is a number, change if necessary
//   Question: string; // Match the property name to the expected type
//   answer: string;
//   choice: string[]; // Change to match the expected type (make sure it's the same as `choices` in your data)
//   frontcard: string; // Ensure the casing matches
//   backcard: string;  // Ensure the casing matches
// }

// const QuizNormal = () => {
//   // Use the defined type for quizData
//   const [quizData, setQuizData] = useState<QuizQuestion[]>([]);

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'Quiz_data/Normal_quizQ'));
//         const data = querySnapshot.docs.map(doc => ({
//           id: doc.data().id,
//           Question: doc.data().Question, // Ensure this matches
//           answer: doc.data().answer,
//           choice: doc.data().choice, // Ensure this matches
//           frontcard: doc.data().frontcard, // Ensure this matches
//           backcard: doc.data().backcard, // Ensure this matches
//         })) as QuizQuestion[]; // Assert the type here

//         setQuizData(data);
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//       }
//     };

//     fetchQuizData();
//   }, []);

//   return (
//     <>
//       <QuizReuse
//         questions={quizData} // This should now match the expected type
//         timerStart={30}
//         winOkuse={12}
//         winTicket={0}
//         replayCost={10}
//         quizlength={3}
//       />
//     </>
//   );
// };

// export default QuizNormal;
