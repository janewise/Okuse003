import React from "react";
import { ReMatchCard } from "../ReuseMatchcard/ReMatchcard";
import card1 from "../matchCard_img/darkness.jpg";
import card2 from "../matchCard_img/double.jpg";
import card3 from "../matchCard_img/fairy.jpg";
import card4 from "../matchCard_img/fighting.jpg";
import card5 from "../matchCard_img/fire.jpg";
import card6 from "../matchCard_img/grass.jpg";
import card7 from "../matchCard_img/lightning.jpg";
import card8 from "../matchCard_img/metal.jpg";
import card9 from "../matchCard_img/psychic.jpg";
import card10 from "../matchCard_img/water.jpg";


const Hard_MatchC = [
    {
      id: 1,
     src:card1,
      uniqueId:1,
    },
    {
      id: 2,
      src:card2,
      uniqueId:2,
    },
    {
      id: 3,
     src:card3,
     uniqueId:3,
    },
    {
        id: 4,
       src:card4,
       uniqueId:4,
      },
      {
        id: 5,
       src:card5,
       uniqueId:5,
      },
      {
        id: 6,
       src:card6,
       uniqueId:6,
      },
      {
        id: 7,
       src:card7,
       uniqueId:7,
      },
      {
        id: 8,
       src:card8,
       uniqueId:8,
      },
      {
        id: 9,
       src:card9,
       uniqueId:9,
      },
      {
        id: 10,
       src:card10,
       uniqueId:10,
      },
  ];


export default function Hard_MatchCard() {

  return (
    <>
      <ReMatchCard
      totalmatch={Hard_MatchC}
       timerStart={60}//timer
       winOkuse={50}//reward coin when user win
       winTicket={0}//reward ticket when user win
       replayCost={40}//replay cost 
       matchcardlength={2}//the number of same card the user has to find like A,A or B,B,B
      // totalcard={4}//the total pairs like A,A B,B or A,A,A B,B,B C,C,C
      />
    </>
  );
}
