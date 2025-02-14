import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"
import banner from "./loginbg.png"
import { gameData } from "./games_img";


export function Home(){

  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // const filteredData = gameData.filter((item) =>
  //   item.name.toLowerCase().includes(searchValue.toLowerCase())
  // );
  const filteredData = gameData.filter((item) =>
    item.name.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

    return(
      <div className="container">
        <div className="home_searchbar_box">
        <i className="bi bi-search"></i>
        <input
        className="home_searchbar"
        placeholder="Search character name or key words"
        value={searchValue}
        onChange={handleInputChange} // Update value on typing
      />
        </div>
        {/* home_banner */}
        <div className="home_banner">
        <img src={banner} alt="" />
        </div>
        {/* home game box */}
        <div className="home_game_box row">
<h2>Level Up Your Fun</h2>

        {/* {filteredData.map((game) => (
          <div key={game.id} className="col-3 col-md-2 col-lg-2 mb-4 game_card">
             <NavLink to={game.navigate || "/"}>
              <img src={game.image} alt={game.name} className="game_card_img" /> 
              </NavLink>
          </div>
        ))} */}
        {filteredData.length > 0 ? (
  filteredData.map((game) => (
    <div key={game.id} className="col-4 col-md-2 col-lg-2 mb-4 game_card">
      <NavLink to={game.navigate || "/"}>
        <img src={game.image} alt={game.name} className="game_card_img" /> 
      </NavLink>
    </div>
  ))
) : (
  <p className="no-results">No games found</p>
)}
        </div>
      </div>
    );
}