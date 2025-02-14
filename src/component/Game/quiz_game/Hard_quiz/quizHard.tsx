import React from "react";
import QuizReuse from "../ReuseQuiz/quiz_Reuse";
import {Hard_quizQ } from "./quizHard_data";

export default function Quiznormal() {

  return (
    <>
      <QuizReuse
       questions={Hard_quizQ}
       timerStart={50}
       winOkuse={20}
       winTicket={0}
       replayCost={15}
       quizlength={6}
      />
    </>
  );
}
