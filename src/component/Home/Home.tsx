// import React,{useState,useEffect} from "react";
// import { db } from "../../firebase/firebase"; // Import Firestore instance
// import { collection, getDocs} from "firebase/firestore";
// import { NavLink } from "react-router-dom";
// import "./Home.css"
// import banner from "./loginbg.png"
// import { gameData } from "./games_img";

// interface Item {
//   id: string;
//   name: string;
//   image: string;
//   navigate: string;
// }

// export function Home(){

//   const [searchValue, setSearchValue] = useState("");
//   const [items, setItems] = useState<Item[]>([]);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   // const filteredData = gameData.filter((item) =>
//   //   item.name.toLowerCase().includes(searchValue.toLowerCase())
//   // );
//   const filteredData = gameData.filter((item) =>
//     item.name.toLowerCase().includes(searchValue.trim().toLowerCase())
//   );

//   useEffect(() => {
//     const fetchItems = async () => {
//       const querySnapshot = await getDocs(collection(db, "Home"));
//       const fetchedItems = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Item[];
//       setItems(fetchedItems);
//     };

//     fetchItems();
//   }, []);

//     return(
//       <div className="container">
//         <div className="home_searchbar_box">
//         <i className="bi bi-search"></i>
//         <input
//         className="home_searchbar"
//         placeholder="Search character name or key words"
//         value={searchValue}
//         onChange={handleInputChange} // Update value on typing
//       />
//         </div>
//         {/* home_banner */}
//         <div className="home_banner">
//         <img src={banner} alt="" />
//         </div>
//         {/* home game box */}
//         <div className="home_game_box row">
// <h2>Level Up Your Fun</h2>

//         {/* {filteredData.map((game) => (
//           <div key={game.id} className="col-3 col-md-2 col-lg-2 mb-4 game_card">
//              <NavLink to={game.navigate || "/"}>
//               <img src={game.image} alt={game.name} className="game_card_img" /> 
//               </NavLink>
//           </div>
//         ))} */}
//         {filteredData.length > 0 ? (
//   // filteredData.map((game) => (
//   //   <div key={game.id} className="col-4 col-md-2 col-lg-2 mb-4 game_card">
//   //     <NavLink to={game.navigate || "/"}>
//   //       <img src={game.image} alt={game.name} className="game_card_img" /> 
//   //     </NavLink>
//   //   </div>
//   // ))
//   filteredData.map((item) => (
//     <div key={item.id} className="col-4 col-md-2 col-lg-2 mb-4 game_card">
//       <NavLink to={item.navigate || "/"}>
//         <img src={item.image} alt={item.image} className="game_card_img" /> 
//       </NavLink>
//     </div>
//   ))
// ) : (
//   <p className="no-results">No games found</p>
// )}
//         </div>
//       </div>
//     );
// }








import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase"; // Firestore import
import { collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import "./Home.css";
import banner from "./loginbg.png";

interface Item {
  id: string;
  name: string;
  image: string; // Cloudinary image URL stored in Firestore
  navigate: string;
}

export function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Home"));
        const fetchedItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  // Filter the fetched data
  const filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  return (
    <div className="container">
      <div className="home_searchbar_box">
        <i className="bi bi-search"></i>
        <input
          className="home_searchbar"
          placeholder="Search character name or key words"
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>

      {/* Banner */}
      <div className="home_banner">
        <img src={banner} alt="Banner" />
      </div>

      {/* Game List */}
      <div className="home_game_box row">
        <h2>Level Up Your Fun</h2>

        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="col-4 col-md-2 col-lg-2 mb-4 game_card">
              <NavLink to={item.navigate || "/"}>
                <img src={item.image} alt={item.name} className="game_card_img" />
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
