
import React from "react";
import GameWaiting from "../GameWaiting/Game_waiting";

const  Quiz_levels = [
  {
    id: 1,
    difficulty: "Normal",
    cost: 10,
    time: "30 seconds",
    quests:"3",
    reward:  "12 Coins",
    image: "/Game/common/description_panel2.png",
    selector:"/Game/common/normalSelect.png",
    enter:"/Game/common/small_panel.png",
    insufficent:"/Game/common/insufficentNormal.png",
  },
  {
    id: 2,
    difficulty: "Hard",
    cost: 15,
    time: "50 seconds",
    quests:"6",
    reward: "20 Coins",
    image: "/Game/common/description_panel2.png",
    selector:"/Game/common/hardSelect.png",
    enter:"/Game/common/small_panel.png",
    insufficent:"/Game/common/insufficentHard.png",
  },
  {
    id: 3,
    difficulty: "Hell",
    cost: 30,
    time: "60 seconds",
    quests:"8",
    reward: "1 Ticket",
    image: "/Game/common/description_panel2.png",
    selector:"/Game/common/hellSelect.png",
    enter:"/Game/common/small_panel.png",
    insufficent:"/Game/common/insufficentHard.png",
  },
];

export default function Match_card() {
  const handleLevelEnter = (level: typeof Quiz_levels[0], userId: string) => {
    console.log(`User ${userId} entered level ${level.difficulty}`);
  };

  return (
    <>
      <GameWaiting
        levels={Quiz_levels}
        onLevelEnter={handleLevelEnter}
        gameName="quiz_game"
      />
    </>
  );
}

