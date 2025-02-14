import React from "react";
import GameWaiting from "../GameWaiting/Game_waiting";

const Matchcard = [
  {
    id: 1,
    difficulty: "Normal",
    cost: 20,
    time: "35 s",
    quests:"2card-6pairs",
    reward: "25 coins",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
  {
    id: 2,
    difficulty: "Hard",
    cost: 40,
    time: "60 s",
    quests:"2card-10pairs",
    reward: "50 coins",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
  {
    id: 3,
    difficulty: "Hell",
    cost: 100,
    time: "120 s",
    reward: "4 Tickets",
    quests:"3cards-8pairs",
    image: "/Game/common/description_panel2.png",
    enter:"/Game/common/small_panel.png",
  },
];

export default function Match_card() {
  const handleLevelEnter = (level: typeof Matchcard[0], userId: string) => {
    console.log(`User ${userId} entered level ${level.difficulty}`);
  };

  return (
    <>
      <GameWaiting
        levels={Matchcard}
        onLevelEnter={handleLevelEnter}
        gameName="match_card"
      />
    </>
  );
}
