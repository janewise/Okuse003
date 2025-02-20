
import React, { useState, useEffect } from "react";
import { LoadingScreen } from "../../Loading_screen/loadingscreen";
import { NavLink } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import losebanner from "../../Game_img/youLose.png"
import winbanner from "../../Game_img/youwin.png"
import Notibanner from "../../Game_img/description_panel2.png"
import  "./quiz_Reuse.css"

type Question = {
  id: number;
  Question: string;
  choice: string[];
  answer: string;
  frontcard: string;
  backcard: string;
};

type QuizProps = {
  questions: Question[];
  timerStart: number;
  winOkuse: number;
  winTicket: number;
  replayCost: number;
  quizlength:number;
//   onWin?: (updatedOkuse: number, updatedTickets: number) => void;
//   onLose?: () => void;
//   levelName: string;
};

export default function QuizReuse({
  questions,
  timerStart,
  winOkuse,
  winTicket,
  replayCost,
  quizlength,
//   onWin,
//   onLose,
 // levelName,
}: QuizProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [timer, setTimer] = useState(timerStart);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQuestion = randomQuestions[currentQuestionIndex];

  const winSound = new Audio("/Game/Sound/win_sound.mp3");
  const loseSound = new Audio("/Game/Sound/lose_sound.mp3");
  const cardFlipsound = new Audio("/Game/Sound/flipcard.mp3");


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUserData = async (userId: string) => {
      try {
        const userRef = doc(db, "users", userId);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.data();
          setTicketCard(userData.Ticket);
          setOkuseCoin(userData.Okuse);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setRandomQuestions(questions.sort(() => Math.random() - 0.5).slice(0, quizlength));
    }
  }, [questions]);

  const shuffleChoices = (choices: string[]) => {
    return [...choices].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (currentQuestion) {
      setShuffledChoices(shuffleChoices(currentQuestion.choice));
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 || gameOver) {
      setGameOver(true);
    }
    if(gameOver && !isWin){
      loseSound.play();
    }
  }, [timer, gameOver]);

  const handleChoiceClick = async (choice: string) => {
    if (choice === currentQuestion.answer) {
      cardFlipsound.play();
      const storedShownQuestions = JSON.parse(
        localStorage.getItem("shownQuestions") || "[]"
      );
      localStorage.setItem(
        "shownQuestions",
        JSON.stringify([...storedShownQuestions, currentQuestion.id])
      );
      setIsCardFlipped(true);
   

      setTimeout(async () => {
        setIsCardFlipped(false);
  
        if (currentQuestionIndex < randomQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          setIsWin(true);
          setGameOver(true);
  
          // Add 1 Ticket coins to the user balance when the game is won
          if (ticketCard !== null && okuseCoin!== null) {
            try {
              const userRef = doc(db, "users", auth.currentUser!.uid);
              await updateDoc(userRef, {
               Ticket:ticketCard +winTicket,
               Okuse:okuseCoin +winOkuse,
              });
              setTicketCard((prev) => (prev !== null ? prev + winTicket : null)); // Update local state
              setOkuseCoin((prev) => (prev !== null ? prev + winOkuse : null));
            } catch (error) {
              console.error("Error adding Ticket card:", error);
            }
          }
        }
      }, 1000);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (isWin) {
      winSound.play();
    }
  }, [isWin]);

  const handleReplay = async () => {
    if (okuseCoin !== null && okuseCoin >= replayCost) {
      try {
        const userRef = doc(db, "users", auth.currentUser!.uid);
        await updateDoc(userRef, {
          Okuse: okuseCoin - replayCost,
        });
        setOkuseCoin((prev) => (prev !== null ? prev -  replayCost : null));
        setErrorMessage(null);
        // Reset game state
        setCurrentQuestionIndex(0);
        setGameOver(false);
        setIsWin(false);
        setTimer( timerStart);
  
        const storedShownQuestions = JSON.parse(
          localStorage.getItem("shownQuestions") || "[]"
        );
  
        let remainingQuestions =questions.filter(
          (q) => !storedShownQuestions.includes(q.id)
        );
  
        if (remainingQuestions.length < quizlength) {
          remainingQuestions = questions;
          localStorage.removeItem("shownQuestions");
        }
  
        const selectedQuestions = remainingQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0,  quizlength);
  
        setRandomQuestions(selectedQuestions);
      } catch (error) {
        console.error("Error deducting coins:", error);
      }
    } else {
      setErrorMessage("Insufficient Okuse coins to replay!");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="easy_game_Motherbox">
    <div className="container">
      <div className="gamewaiting_box1">
        <NavLink to="/" className="more_backspace">
          <i className="bi bi-arrow-up-left-circle-fill"></i>
        </NavLink>
        <p>{timer}s</p>
        <p>
          Q{currentQuestionIndex + 1}/{randomQuestions.length}
        </p>
      </div>

      {/* Game Section */}
      <div className={`quiz-card ${gameOver ? "stopped" : ""}`}>
        {gameOver && (
          <>
            {/* Game Over Overlay */}
            <h1 className={`game-over-text ${isWin ? "win" : "lose"}`}>
              {isWin ?
              <img src={winbanner} alt="youwin" />
               : 
               <img src={losebanner} alt="youlose" />
               }
            </h1>
  
            <div className="game-over-card Ingamewinlose_box">
            <img src={Notibanner} className="level_image" />              
                <div className="Ingamewinlose_overlay">
                <h4>   {isWin ? "Not bad!" : "Shrimp Brain!"} </h4>
                {errorMessage && <p className="error-message" style={{color:"red"}}>{errorMessage}</p>}
                <div className="regameplay">
                <NavLink to="/quiz_game" className="retry-button">
                <i className="bi bi-house-door"></i>Home
              </NavLink>
            
               <button onClick={handleReplay} className="retry-button">
                    <i className="bi bi-arrow-clockwise"></i>
                    Replay
                  </button>
                </div>
              </div>
                </div>
           
          </>
        )}
        {!gameOver && (
          <div className={`card ${isCardFlipped ? "flipped" : ""}`}>
            <div>
              <img src={currentQuestion.backcard} alt="Quiz Card Back" />
            </div>
            <div className="quizIngame_overlay">
              <p>{currentQuestion.Question}</p>
            </div>
            <div className="card-front">
              <img src={currentQuestion.frontcard} alt="Quiz Card Front" />
            </div>
          </div>
        )}
      </div>

      {/* Choices Section */}
      {!gameOver && (
        <div className="choices row">
          {shuffledChoices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice)}
              className="choice-button col-6 col-sm-6 col-md-4"
            >
              {choice}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
  );
}
