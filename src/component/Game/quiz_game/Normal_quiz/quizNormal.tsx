
// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { LoadingScreen } from "../../Loading_screen/loadingscreen";
// import { Normal_quizQ } from "./quizNormal_data";
// import "./quizNormal.css";

// type Normal_Q = {
//   Question: string;
//   choice: string[];
//   answer: string;
//   frontcard: string;
//   backcard: string;
// };

// export default function Quiznormal() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [randomQuestions, setRandomQuestions] = useState<Normal_Q[]>([]); // Explicit type
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
//   const [isCardFlipped, setIsCardFlipped] = useState(false);
//   const [timer, setTimer] = useState(32);
//   const [gameOver, setGameOver] = useState(false);

//   const currentQuestion = randomQuestions[currentQuestionIndex];

//   useEffect(() => {
//     // Initialize random questions
//     const shuffledQuestions = Normal_quizQ.sort(() => Math.random() - 0.5).slice(0, 3);
//     setRandomQuestions(shuffledQuestions); // Update state with type-safe data
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (currentQuestion) {
//       setShuffledChoices([...currentQuestion.choice].sort(() => Math.random() - 0.5));
//     }
//   }, [currentQuestion]);

//   useEffect(() => {
//     if (timer > 0 && !gameOver) {
//       const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(countdown);
//     } else if (timer === 0 || gameOver) {
//       setGameOver(true);
//     }
//   }, [timer, gameOver]);

//   const handleChoiceClick = (choice: string) => {
//     if (choice === currentQuestion.answer) {
//       setIsCardFlipped(true);

//       setTimeout(() => {
//         setIsCardFlipped(false);

//         if (currentQuestionIndex < randomQuestions.length - 1) {
//           setCurrentQuestionIndex((prev) => prev + 1);
//         } else {
//           alert("Quiz completed!");
//         }
//       }, 1000);
//     } else {
//       setGameOver(true);
//     }
//   };

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   if (gameOver) {
//     return (
//       <div className="game-over">
//         <h1>Game Over</h1>
//         <NavLink to="/quiz_game_level_normal" className="retry-button">
//           Retry
//         </NavLink>
//       </div>
//     );
//   }

//   return (
//     <div className="easy_game_Motherbox">
//       <div className="container">
//         <div className="gamewaiting_box1">
//           <NavLink to="/" className="more_backspace">
//             <i className="bi bi-arrow-up-left-circle-fill"></i>
//           </NavLink>
//           <p>{timer - 2}s</p>
//           <p>
//             Q{currentQuestionIndex + 1}/{randomQuestions.length}
//           </p>
//         </div>

//         <div className="quiz-card">
//           <div className={`card ${isCardFlipped ? "flipped" : ""}`}>
//             <div>
//               <img src={currentQuestion.backcard} alt="Quiz Card Back" />
//             </div>
//             <div className="quizIngame_overlay">
//               <p>{currentQuestion.Question}</p>
//             </div>
//             <div className="card-front">
//               <img src={currentQuestion.frontcard} alt="Quiz Card Front" />
//             </div>
//           </div>
//         </div>

//         <div className="choices row">
//           {shuffledChoices.map((choice, index) => (
//             <button
//               key={index}
//               onClick={() => handleChoiceClick(choice)}
//               className="choice-button col-6 col-sm-6 col-md-4"
//             >
//               {choice}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



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
