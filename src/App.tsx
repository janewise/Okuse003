import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Nav } from "./component/Nav/Nav";
import { AuthProvider } from "./firebase/auth";
// Pages
import { Home } from "./component/Home/Home";
import { Shop } from "./component/Shop/Shop";
import { TopUp } from "./component/TopUp/topup";
import { WhishList } from "./component/Wishlist/wishlist";
import { More } from "./component/More/More";
import { Homelink } from "./component/Nav/homelink/homelink";
// Login and register
import Userprofile from "./component/logInandRegister/user/userprofile";
import { LogIn } from "./component/logInandRegister/Login";
import { SignUp } from "./component/logInandRegister/Signup";
import { Resetpass } from "./component/logInandRegister/resetpassword";
import  Transfer  from "./component/More/Transfer/Transfer";
// loading
import { LoadingScreen } from "./component/Game/Loading_screen/loadingscreen";
import "./App.css";
import Match_card from "./component/Game/match_card_game/Match_card";
import Quiznormal from "./component/Game/quiz_game/Normal_quiz/quizNormal";
import Quizhard from "./component/Game/quiz_game/Hard_quiz/quizHard";
import Quizhell from "./component/Game/quiz_game/Hell_quiz/quizHell";
import N_matchCard from "./component/Game/match_card_game/Normal_matchCard/Normal_matchCard";
import Hard_MatchCard from "./component/Game/match_card_game/Hard_matchCard/Hard_matchCard"
import Hell_MatchCard from "./component/Game/match_card_game/Hell_matchCard/Hell_matchCard"
import MatchCandy from "./component/Game/MatchCandy/MatchCandy";
import MatchCandylvl from "./component/Game/MatchCandy/matchcandylevel/matchcandylevel";
import Transf_History from "./component/More/Transfer/tranf_history/tranf_history";
import WackMole from "./component/Game/WackMole/WackMole";
import WackMole_lvl from "./component/Game/WackMole/wackamolelvl/wackmole_lvl";

// Lazy load Quizgame
const Quizgame = lazy(() => import("./component/Game/quiz_game/quiz_game"));
// CSS


function App() {
  const location = useLocation();
  const isAuthPage = ["/signin", "/signup", "/resetpass","/Transfer_Main/transfer","/transfer_history",
    "/shop",
    "/quiz_game","/quiz_game_level_normal","/quiz_game_level_hard","/quiz_game_level_hell",
    //for match the card
    "/match_card","/match_card_level_normal","/match_card_level_hard","/match_card_level_hell",
  "/matchcandy","/matchcandylvl","/wack_a_mole","/wackmole_lvl"].includes(location.pathname);
    const isAuthPagetwo = ["/signin", "/signup", "/resetpass","/profile",
      "/more","/Transfer_Main/transfer","/transfer_history",
      "/quiz_game","/quiz_game_level_normal","/quiz_game_level_hard","/quiz_game_level_hell",
       "/match_card","/match_card_level_normal","/match_card_level_hard","/match_card_level_hell",
      "/matchcandy","/matchcandylvl","/wack_a_mole","/wackmole_lvl"].includes(location.pathname);

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app ${theme}`}>
      {!isAuthPage && <Nav />}
      {!isAuthPagetwo && <Homelink />}
      <Routes>
        {/* user */}
        <Route path="/profile" element={<Userprofile />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpass" element={<Resetpass />} />
        {/* Nav */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/wishlist" element={<WhishList />} />
        <Route path="/more" element={<More />} />
        <Route path="/Transfer_Main/*" element={<Transfer/>}/>
        <Route path="/transfer_history" element={<Transf_History/>}/>
        {/* games */}
        <Route path="/quiz_game/*" element={<Suspense fallback={<LoadingScreen />}><Quizgame /></Suspense> }/>
        <Route path="/quiz_game_level_normal" element={<Suspense fallback={<LoadingScreen />}><Quiznormal /></Suspense> }/>
        <Route path="/quiz_game_level_hard" element={<Suspense fallback={<LoadingScreen />}><Quizhard /></Suspense> }/>
        <Route path="/quiz_game_level_hell" element={<Suspense fallback={<LoadingScreen />}><Quizhell /></Suspense> }/>
        <Route path="/match_card/*" element={<Suspense fallback={<LoadingScreen />}><Match_card /></Suspense> }/>
        <Route path="/match_card_level_normal" element={<Suspense fallback={<LoadingScreen />}><N_matchCard /></Suspense> }/>
        <Route path="/match_card_level_hard" element={<Suspense fallback={<LoadingScreen />}><Hard_MatchCard/></Suspense> }/>
        <Route path="/match_card_level_hell" element={<Suspense fallback={<LoadingScreen />}><Hell_MatchCard/></Suspense> }/> 
        <Route path="/matchcandy" element={<Suspense fallback={<LoadingScreen />}><MatchCandy/></Suspense> }/>
        <Route path="/matchcandylvl" element={<Suspense fallback={<LoadingScreen />}><MatchCandylvl/></Suspense> }/>
        <Route path="/wack_a_mole" element={<Suspense fallback={<LoadingScreen />}><WackMole/></Suspense> }/>
        <Route path="/wackmole_lvl" element={<Suspense fallback={<LoadingScreen />}><WackMole_lvl/></Suspense> }/>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
