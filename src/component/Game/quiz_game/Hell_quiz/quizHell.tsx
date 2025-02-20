

import React from "react";
import QuizReuse from "../ReuseQuiz/quiz_Reuse";
import { Hell_quizQ } from "./quizHell_box";

export default function Quizhell() {

  return (
    <>
      <QuizReuse
       questions={Hell_quizQ}
       timerStart={60}
       winOkuse={0}
       winTicket={1}
       replayCost={30}
       quizlength={8}
      />
    </>
  );
}
