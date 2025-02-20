import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { LoadingScreen } from "../../Loading_screen/loadingscreen";
 import cardBack from "../matchCard_img/back.jpg";
 import losebanner from "../../Game_img/youLose.png"
import winbanner from "../../Game_img/youwin.png"
import Notibanner from "../../Game_img/description_panel2.png"
import "./ReMatchcard.css";


// Define types for the card and state
interface Card {
  id: number;
  src: string;
  uniqueId: number;
}

type  Matchtotalcard = {
    id: number;
  src: string;
  uniqueId: number;
  };

type ReMatchCardProps = {
    totalmatch: Matchtotalcard[];
    timerStart: number;
    winOkuse: number;
    winTicket: number;
    replayCost: number;
    matchcardlength:number;
  };

export function ReMatchCard({
    totalmatch,
    timerStart,
    winOkuse,
    winTicket,
    replayCost,
    matchcardlength,
  }: ReMatchCardProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(timerStart);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [rewardGiven, setRewardGiven] = useState<boolean>(false); // Prevent duplicate rewards
  const winSound = new Audio("/Game/Sound/win_sound.mp3");
  const loseSound = new Audio("/Game/Sound/lose_sound.mp3");
  const cardFlipsound = new Audio("/Game/Sound/flipcard.mp3");

useEffect(() => {
    const shuffledCards = totalmatch
      .flatMap((card) =>
        Array.from({ length: matchcardlength }, (_, i) => ({
          ...card,
          uniqueId: card.id * 100 + i, // Generate a numeric uniqueId
        }))
      )
      .sort(() => Math.random() - 0.5);
  
    setCards(shuffledCards);
    setIsLoading(false);
  }, [totalmatch, matchcardlength]);
  
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
    if (cards.length === 0 || gameOver) return;

    const gameTimer = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setIsWin(false);
          clearInterval(gameTimer);
          loseSound.play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(gameTimer);
  }, [cards, gameOver]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      if (!rewardGiven) {
        setIsWin(true);
        setGameOver(true);
        setRewardGiven(true); // Prevent multiple reward updates

        // Update rewards in Firebase
        const updateRewards = async () => {
          if (ticketCard !== null && okuseCoin !== null) {
            try {
              const userRef = doc(db, "users", auth.currentUser!.uid);
              await updateDoc(userRef, {
                Ticket: ticketCard + winTicket,
                Okuse: okuseCoin + winOkuse,
              });

              setTicketCard((prev) => (prev !== null ? prev + winTicket : null));
              setOkuseCoin((prev) => (prev !== null ? prev + winOkuse : null));
            } catch (error) {
              console.error("Error updating rewards in Firebase:", error);
            }
          }
        };

        updateRewards();
      }
    }
  }, [matchedCards, cards.length, rewardGiven, ticketCard, okuseCoin]);

  const handleCardClick = (card: Card) => {
    // Ignore clicks on already matched or flipped cards, or when the flipped cards are full
    if (
      matchedCards.includes(card.uniqueId) ||
      flippedCards.some((c) => c.uniqueId === card.uniqueId) ||
      flippedCards.length === matchcardlength
    ) {
      return;
    }
  
    // Play flip sound
    cardFlipsound.play().catch((err) => {
      console.error("Failed to play flip sound:", err);
    });
  
    // Add the clicked card to flipped cards
    const updatedFlippedCards = [...flippedCards, card];
    setFlippedCards(updatedFlippedCards);
  
    // Check for a match when the required number of cards are flipped
    if (updatedFlippedCards.length === matchcardlength) {
      const allSame = updatedFlippedCards.every((c) => c.id === card.id);
  
      if (allSame) {
        setMatchedCards((prev) => [
          ...prev,
          ...updatedFlippedCards.map((c) => c.uniqueId),
        ]);
      }
  
      // Reset flipped cards after a short delay
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };
  

  useEffect(() => {
    if (isWin) {
      winSound.play();
    }
  }, [isWin]);


  const handleReplay = async () => {
    if (okuseCoin !== null && okuseCoin >=  replayCost) {
      try {
        const userRef = doc(db, "users", auth.currentUser!.uid);
        await updateDoc(userRef, {
          Okuse: okuseCoin -  replayCost,
        });
        setOkuseCoin((prev) => (prev !== null ? prev -  replayCost : null));
        setGameOver(false);
        setIsWin(false);
        setRewardGiven(false); // Reset reward flag for a new game
        setMatchedCards([]);
        setFlippedCards([]);
        setErrorMessage(null);
        setTimer(timerStart);
        // const shuffledCards = [...allCards, ...allCards]
        //   .sort(() => Math.random() - 0.5)
        //   .map((card, index) => ({ ...card, uniqueId: index }));
        // setCards(shuffledCards);
        const reshuffledCards = totalmatch
      .flatMap((card) =>
        Array.from({ length: matchcardlength }, (_, i) => ({
          ...card,
          uniqueId: card.id * 100 + i
        }))
      )
      .sort(() => Math.random() - 0.5);
    setCards(reshuffledCards);
      } catch (error) {
        console.error("Error deducting coins:", error);
      }
    } else {
      setErrorMessage("Insufficient Okuse coins to replay!");
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="matchcard_Motherbox">
      <div className="container">
        <div className="gamewaiting_box1">
          <NavLink to="/" className="more_backspace">
            <i className="bi bi-arrow-up-left-circle-fill"></i>
          </NavLink>
          <p>Time Remaining: {timer}s</p>
        </div>

        {gameOver ? (
          <>
            <h1 className={`game-over-text ${isWin ? "win" : "lose"}`}>
              {isWin ? (
                <img src={winbanner} alt="youwin" />
              ) : (
                <img src={losebanner} alt="youlose" />
              )}
            </h1>

            <div className="game-over-card Ingamewinlose_box">
              <img src={Notibanner} className="level_image" />
              <div className="Ingamewinlose_overlay">
                <h4>{isWin ? "Not bad!" : "Shrimp Brain!"}</h4>
                {errorMessage && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errorMessage}
                  </p>
                )}
                <div className="regameplay">
                  <NavLink to="/match_card" className="retry-button">
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
        ) : (
          <div className="matchcards-grid">
            {cards.map((card) => (
              <div
                key={card.uniqueId}
                className={`matchcard ${
                  flippedCards.some((c) => c.uniqueId === card.uniqueId) ||
                  matchedCards.includes(card.uniqueId)
                    ? "flipped"
                    : ""
                }`}
                
                onClick={() => handleCardClick(card)}
              >
                <div className="matchcard-inner">
                  <img
                    className="matchcardfront"
                    src={card.src}
                    alt="card"
                  />
                  <img
                    className="matchcardback"
                    src={cardBack}
                    alt="card back"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

