// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// const CandyCrushGame = () => {
//     const [board, setBoard] = useState([]);
//     const [score, setScore] = useState(0);
//     const [currTile, setCurrTile] = useState(null);
//     const [otherTile, setOtherTile] = useState(null);

//     const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//     const rows = 9;
//     const columns = 9;

//     useEffect(() => {
//         startGame();
//         const interval = setInterval(() => {
//             crushCandy();
//             slideCandy();
//             generateCandy();
//         }, 100);
//         return () => clearInterval(interval);
//     }, []);

//     const randomCandy = () => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = () => {
//         const newBoard = [];
//         for (let r = 0; r < rows; r++) {
//             let row = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = () => {
//         crushFive();
//         crushFour();
//         crushThree();
//     };

//     const crushFive = () => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 4; c++) {
//                 let candies = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3], board[r][c + 4]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 50);
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 4; r++) {
//                 let candies = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c], board[r + 4][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 50);
//                 }
//             }
//         }
//     };

//     const crushFour = () => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 3; c++) {
//                 let candies = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 40);
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 3; r++) {
//                 let candies = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 40);
//                 }
//             }
//         }
//     };

//     const crushThree = () => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 let candies = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 let candies = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };

//     const slideCandy = () => {
//         const newBoard = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = () => {
//         const newBoard = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = () => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const swapTile = (direction) => {
//         const currCoords = currTile.id.split("-");
//         let r = parseInt(currCoords[0]);
//         let c = parseInt(currCoords[1]);

//         let newR = r, newC = c;

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         const newBoard = [...board];
//         const tempSrc = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         setBoard(newBoard);

//         if (!checkValid()) {
//             // Swap back if not valid
//             newBoard[r][c].src = tempSrc;
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             setBoard(newBoard);
//         }
//     };

//     const dragStart = (e, tile) => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e) => {
//         e.preventDefault();
//     };

//     const dragEnter = (e) => {
//         e.preventDefault();
//     };

//     const dragLeave = () => {};

//     const dragDrop = (e, tile) => {
//         setOtherTile(tile);
//     };

//     const dragEnd = () => {
//         if (!currTile || !otherTile) return;

//         const currCoords = currTile.id.split("-");
//         const otherCoords = otherTile.id.split("-");

//         const r = parseInt(currCoords[0]);
//         const c = parseInt(currCoords[1]);
//         const r2 = parseInt(otherCoords[0]);
//         const c2 = parseInt(otherCoords[1]);

//         const isAdjacent =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard = [...board];
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e, tile) => {
//         setCurrTile(tile);
//     };

//     const touchMove = (e) => {
//         e.preventDefault();
//     };

//     const touchEnd = () => {
//         if (!currTile || !otherTile) return;

//         const currCoords = currTile.id.split("-");
//         const otherCoords = otherTile.id.split("-");

//         const r = parseInt(currCoords[0]);
//         const c = parseInt(currCoords[1]);
//         const r2 = parseInt(otherCoords[0]);
//         const c2 = parseInt(otherCoords[1]);

//         const isAdjacent =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard = [...board];
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     return (
//         <div id="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)}
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)}
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div id="score">Score: {score}</div>
//         </div>
//     );
// };

// export default CandyCrushGame;




// deekseek version 1 rrun from jsx

// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//         const interval = setInterval(() => {
//             crushCandy();
//             slideCandy();
//             generateCandy();
//         }, 100);
//         return () => clearInterval(interval);
//     }, []);

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };


//     const crushThree = (): void => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };

//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const swapTile = (direction: string): void => {
//         if (!currTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         let r: number = parseInt(currCoords[0]);
//         let c: number = parseInt(currCoords[1]);

//         let newR: number = r, newC: number = c;

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         const newBoard: Tile[][] = [...board];
//         const tempSrc: string = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         setBoard(newBoard);

//         if (!checkValid()) {
//             // Swap back if not valid
//             newBoard[r][c].src = tempSrc;
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             setBoard(newBoard);
//         }
//     };

//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (): void => {};

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//      const touchEnd = (): void => {
//          if (!currTile || !otherTile) return;

//     const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };




//         return (
//                     <div className="board">
//                         {board.map((row, r) => (
//                             <div key={r} className="row">
//                                 {row.map((tile, c) => (
//                                     <img
//                                         key={tile.id}
//                                         id={tile.id}
//                                         src={tile.src}
//                                         draggable
//                                         onDragStart={(e) => dragStart(e, tile)}
//                                         onDragOver={(e) => dragOver(e)}
//                                         onDragEnter={(e) => dragEnter(e)}
//                                         onDragLeave={(e) => dragLeave(e)}
//                                         onDrop={(e) => dragDrop(e, tile)}
//                                         onDragEnd={(e) => dragEnd(e)}
//                                         onTouchStart={(e) => touchStart(e, tile)}
//                                         onTouchMove={(e) => touchMove(e)}
//                                         onTouchEnd={(e) => touchEnd(e)}
//                                         alt="candy"
//                                     />
//                                 ))}
//                             </div>
//                         ))}
//                         <div id="score">Score: {score}</div>
//                     </div>
//                 );
//             };
            
//             export default CandyCrushGame;

// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//         const interval = setInterval(() => {
//             crushCandy();
//             slideCandy();
//             generateCandy();
//         }, 100);
//         return () => clearInterval(interval);
//     }, []);

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };

//     // const crushThree = (): void => {
//     //     for (let r = 0; r < rows; r++) {
//     //         for (let c = 0; c < columns - 2; c++) {
//     //             let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//     //             if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//     //                 candies.forEach(candy => candy.src = "./images/blank.png");
//     //                 setScore(prevScore => prevScore + 30);
//     //             }
//     //         }
//     //     }
//     //     for (let c = 0; c < columns; c++) {
//     //         for (let r = 0; r < rows - 2; r++) {
//     //             let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//     //             if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//     //                 candies.forEach(candy => candy.src = "./images/blank.png");
//     //                 setScore(prevScore => prevScore + 30);
//     //             }
//     //         }
//     //     }
//     // };

//     const crushThree = (): void => {
//         if (board.length === 0) return; // Prevent errors if board is empty
    
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check
    
//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
    
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check
    
//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };
    
  
//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const swapTile = (direction: string): void => {
//         if (!currTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         let r: number = parseInt(currCoords[0]);
//         let c: number = parseInt(currCoords[1]);

//         let newR: number = r, newC: number = c;

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         const newBoard: Tile[][] = [...board];
//         const tempSrc: string = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         setBoard(newBoard);

//         if (!checkValid()) {
//             // Swap back if not valid
//             newBoard[r][c].src = tempSrc;
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             setBoard(newBoard);
//         }
//     };

//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
//         // You can add logic here if needed
//     };

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)} /* Fixed: Now passes the event */
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)} /* Fixed: Now passes the event */
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div id="score">Score: {score}</div>
//         </div>
//     );
// };

// export default CandyCrushGame;
            

// gpt version 2 rrun from tsx



// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//     }, []);
    
//     useEffect(() => {
//         if (board.length > 0) {
//             const interval = setInterval(() => {
//                 crushCandy();
//                 slideCandy();
//                 generateCandy();
//             }, 100);
//             return () => clearInterval(interval);
//         }
//     }, [board]);
    

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };

//     const crushThree = (): void => {
    
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check
    
//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
    
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check
    
//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };
    
  
//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     // const swapTile = (direction: string): void => {
//     //     if (!currTile) return;

//     //     const currCoords: string[] = currTile.id.split("-");
//     //     let r: number = parseInt(currCoords[0]);
//     //     let c: number = parseInt(currCoords[1]);

//     //     let newR: number = r, newC: number = c;

//     //     if (direction === "left" && c > 0) newC -= 1;
//     //     if (direction === "right" && c < columns - 1) newC += 1;
//     //     if (direction === "up" && r > 0) newR -= 1;
//     //     if (direction === "down" && r < rows - 1) newR += 1;

//     //     const newBoard: Tile[][] = [...board];
//     //     const tempSrc: string = newBoard[r][c].src;
//     //     newBoard[r][c].src = newBoard[newR][newC].src;
//     //     newBoard[newR][newC].src = tempSrc;

//     //     setBoard(newBoard);

//     //     if (!checkValid()) {
//     //         // Swap back if not valid
//     //         newBoard[r][c].src = tempSrc;
//     //         newBoard[newR][newC].src = newBoard[r][c].src;
//     //         setBoard(newBoard);
//     //     }
//     // };
//     const swapTile = (direction: string): void => {
//         if (!currTile) return;
    
//         const currCoords = currTile.id.split("-").map(Number);
//         let [r, c] = currCoords;
//         let [newR, newC] = [r, c];
    
//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;
    
//         const newBoard = [...board];
//         const tempSrc = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;
    
//         setBoard(newBoard);
    
//         setTimeout(() => {
//             if (!checkValid()) {
//                 // Revert swap if no match
//                 newBoard[newR][newC].src = newBoard[r][c].src;
//                 newBoard[r][c].src = tempSrc;
//                 setBoard(newBoard);
//             }
//         }, 200);
//     };
    
//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
//         // You can add logic here if needed
//     };

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             const newBoard: Tile[][] = [...board];
//             const tempSrc: string = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             setBoard(newBoard);

//             if (!checkValid()) {
//                 // Swap back if not valid
//                 newBoard[r][c].src = tempSrc;
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 setBoard(newBoard);
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)} /* Fixed: Now passes the event */
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)} /* Fixed: Now passes the event */
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div id="score">Score: {score}</div>
//         </div>
//     );
// };

// export default CandyCrushGame;

// 
// 
// 


// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple","Choco",];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//     }, []);

//     useEffect(() => {
//         if (board.length > 0) {
//             const interval = setInterval(() => {
//                 crushCandy();
//                 slideCandy();
//                 generateCandy();
//             }, 100);
//             return () => clearInterval(interval);
//         }
//     }, [board]);

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };

//     const crushThree = (): void => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }

//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };

//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const checkValidAfterSwap = (board: Tile[][]): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const swapTile = (direction: string): void => {
//         if (!currTile) return;

//         const currCoords = currTile.id.split("-").map(Number);
//         let [r, c] = currCoords;
//         let [newR, newC] = [r, c];

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         // Create a deep copy of the board
//         const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//         // Perform the swap on the temporary board
//         const tempSrc = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         // Check if the swap results in a valid match
//         const isValid = checkValidAfterSwap(newBoard);

//         if (isValid) {
//             // If valid, update the state with the new board
//             setBoard(newBoard);
//         } else {
//             // If invalid, revert the swap on the temporary board
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             newBoard[r][c].src = tempSrc;
//             setBoard(newBoard); // Update the state with the reverted board
//         }
//     };

//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
//         // You can add logic here if needed
//     };

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             // Create a deep copy of the board
//             const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//             // Perform the swap on the temporary board
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             // Check if the swap results in a valid match
//             const isValid = checkValidAfterSwap(newBoard);

//             if (isValid) {
//                 // If valid, update the state with the new board
//                 setBoard(newBoard);
//             } else {
//                 // If invalid, revert the swap on the temporary board
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 newBoard[r][c].src = tempSrc;
//                 setBoard(newBoard); // Update the state with the reverted board
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             // Create a deep copy of the board
//             const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//             // Perform the swap on the temporary board
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             // Check if the swap results in a valid match
//             const isValid = checkValidAfterSwap(newBoard);

//             if (isValid) {
//                 // If valid, update the state with the new board
//                 setBoard(newBoard);
//             } else {
//                 // If invalid, revert the swap on the temporary board
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 newBoard[r][c].src = tempSrc;
//                 setBoard(newBoard); // Update the state with the reverted board
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)} /* Fixed: Now passes the event */
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)} /* Fixed: Now passes the event */
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div id="score">Score: {score}</div>
//         </div>
//     );
// };
// export default CandyCrushGame;



// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);
//     const [touchStartX, setTouchStartX] = useState<number>(0);
//     const [touchStartY, setTouchStartY] = useState<number>(0);
//     const [touchEndX, setTouchEndX] = useState<number>(0);
//     const [touchEndY, setTouchEndY] = useState<number>(0);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple", "Choco","Orange-Striped-Horizontal"];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//     }, []);

//     useEffect(() => {
//         if (board.length > 0) {
//             const interval = setInterval(() => {
//                 crushCandy();
//                 slideCandy();
//                 generateCandy();
//             }, 100);
//             return () => clearInterval(interval);
//         }
//     }, [board]);

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };

//     const crushThree = (): void => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }

//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     setScore(prevScore => prevScore + 30);
//                 }
//             }
//         }
//     };


//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const checkValidAfterSwap = (board: Tile[][]): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const swapTile = (direction: string): void => {
//         if (!currTile) return;

//         const currCoords = currTile.id.split("-").map(Number);
//         let [r, c] = currCoords;
//         let [newR, newC] = [r, c];

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         // Create a deep copy of the board
//         const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//         // Perform the swap on the temporary board
//         const tempSrc = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         // Check if the swap results in a valid match
//         const isValid = checkValidAfterSwap(newBoard);

//         if (isValid) {
//             // If valid, update the state with the new board
//             setBoard(newBoard);
//             console.log('this is from swap tile valid')
//         } else {
//             // If invalid, revert the swap on the temporary board
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             newBoard[r][c].src = tempSrc;
//             setBoard(newBoard); // Update the state with the reverted board
//         }
//     };

//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
//         // You can add logic here if needed
//     };

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             // Create a deep copy of the board
//             const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//             // Perform the swap on the temporary board
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             // Check if the swap results in a valid match
//             const isValid = checkValidAfterSwap(newBoard);

//             if (isValid) {
//                 // If valid, update the state with the new board
//                 setBoard(newBoard);
//             } else {
//                 // If invalid, revert the swap on the temporary board
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 newBoard[r][c].src = tempSrc;
//                 setBoard(newBoard); // Update the state with the reverted board
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//         const touch = e.touches[0];
//         setTouchStartX(touch.clientX);
//         setTouchStartY(touch.clientY);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//         const touch = e.touches[0];
//         setTouchEndX(touch.clientX);
//         setTouchEndY(touch.clientY);
//     };

//     const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
//         if (!currTile) return;

//         const deltaX = touchEndX - touchStartX;
//         const deltaY = touchEndY - touchStartY;

//         let direction = "";

//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//             // Horizontal swipe
//             if (deltaX > 0) {
//                 direction = "right";
//             } else {
//                 direction = "left";
//             }
//         } else {
//             // Vertical swipe
//             if (deltaY > 0) {
//                 direction = "down";
//             } else {
//                 direction = "up";
//             }
//         }

//         swapTile(direction);

//         setCurrTile(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)}
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)}
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div className="score">Score: {score}</div>
//         </div>
//     );
// };

// export default CandyCrushGame;

//

// import React, { useState, useEffect } from "react";
// import "./candycrush.css"; // Optional: for styling

// interface Tile {
//     id: string;
//     src: string;
// }

// const CandyCrushGame: React.FC = () => {
//     const [board, setBoard] = useState<Tile[][]>([]);
//     const [score, setScore] = useState<number>(0);
//     const [currTile, setCurrTile] = useState<Tile | null>(null);
//     const [otherTile, setOtherTile] = useState<Tile | null>(null);
//     const [touchStartX, setTouchStartX] = useState<number>(0);
//     const [touchStartY, setTouchStartY] = useState<number>(0);
//     const [touchEndX, setTouchEndX] = useState<number>(0);
//     const [touchEndY, setTouchEndY] = useState<number>(0);
//     const [hasUserMadeMove, setHasUserMadeMove] = useState<boolean>(false);

//     const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple", "Choco","Orange-Striped-Horizontal"];
//     const rows: number = 8;
//     const columns: number = 8;

//     useEffect(() => {
//         startGame();
//     }, []);

//     useEffect(() => {
//         if (board.length > 0 ) {
//             const interval = setInterval(() => {
//                 crushCandy();
//                 slideCandy();
//                 generateCandy();
//             }, 100);
//             return () => clearInterval(interval);
//         }
//     }, [board]);

//     const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

//     const startGame = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const crushCandy = (): void => {
//         crushThree();
//     };

//     const crushThree = (): void => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");         
//                   if(hasUserMadeMove){
//                     setScore(prevScore => prevScore + 30);
//                   }  
//                 }
//             }
//         }

//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check

//                 let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
//                 if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
//                     candies.forEach(candy => candy.src = "./images/blank.png");
//                     if(hasUserMadeMove){
//                         setScore(prevScore => prevScore + 30);
//                       }  
//                 }
//             }
//         }
//     };

//     const slideCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             let ind: number = rows - 1;
//             for (let r = rows - 1; r >= 0; r--) {
//                 if (!newBoard[r][c].src.includes("blank")) {
//                     newBoard[ind][c].src = newBoard[r][c].src;
//                     ind -= 1;
//                 }
//             }
//             for (let r = ind; r >= 0; r--) {
//                 newBoard[r][c].src = "./images/blank.png";
//             }
//         }
//         setBoard(newBoard);
//     };

//     const generateCandy = (): void => {
//         const newBoard: Tile[][] = [...board];
//         for (let c = 0; c < columns; c++) {
//             if (newBoard[0][c].src.includes("blank")) {
//                 newBoard[0][c].src = `./images/${randomCandy()}.png`;
//             }
//         }
//         setBoard(newBoard);
//     };

//     const checkValid = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const checkValidAfterSwap = (board: Tile[][]): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns - 2; c++) {
//                 if (
//                     board[r][c].src === board[r][c + 1].src &&
//                     board[r][c + 1].src === board[r][c + 2].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         for (let c = 0; c < columns; c++) {
//             for (let r = 0; r < rows - 2; r++) {
//                 if (
//                     board[r][c].src === board[r + 1][c].src &&
//                     board[r + 1][c].src === board[r + 2][c].src &&
//                     !board[r][c].src.includes("blank")
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     const hasValidMoves = (): boolean => {
//         for (let r = 0; r < rows; r++) {
//             for (let c = 0; c < columns; c++) {
//                 // Check right swap
//                 if (c < columns - 1) {
//                     const newBoard = board.map(row => row.map(tile => ({ ...tile })));
//                     const tempSrc = newBoard[r][c].src;
//                     newBoard[r][c].src = newBoard[r][c + 1].src;
//                     newBoard[r][c + 1].src = tempSrc;
//                     if (checkValidAfterSwap(newBoard)) {
//                         return true;
//                         console.log('check valid right swap')
//                     }
//                 }
//                 // Check down swap
//                 if (r < rows - 1) {
//                     const newBoard = board.map(row => row.map(tile => ({ ...tile })));
//                     const tempSrc = newBoard[r][c].src;
//                     newBoard[r][c].src = newBoard[r + 1][c].src;
//                     newBoard[r + 1][c].src = tempSrc;
//                     if (checkValidAfterSwap(newBoard)) {
//                         return true;
//                         console.log('check valid down swap')
//                     }
//                 }
//             }
//         }
//         return false;
//         console.log('check valid none remain')
//     };

//     const reshuffleBoard = (): void => {
//         const newBoard: Tile[][] = [];
//         for (let r = 0; r < rows; r++) {
//             let row: Tile[] = [];
//             for (let c = 0; c < columns; c++) {
//                 let tile: Tile = {
//                     id: `${r}-${c}`,
//                     src: `./images/${randomCandy()}.png`
//                 };
//                 row.push(tile);
//             }
//             newBoard.push(row);
//         }
//         setBoard(newBoard);
//     };

//     const swapTile = (direction: string): void => {
//         if (!currTile) return;

//         const currCoords = currTile.id.split("-").map(Number);
//         let [r, c] = currCoords;
//         let [newR, newC] = [r, c];

//         if (direction === "left" && c > 0) newC -= 1;
//         if (direction === "right" && c < columns - 1) newC += 1;
//         if (direction === "up" && r > 0) newR -= 1;
//         if (direction === "down" && r < rows - 1) newR += 1;

//         // Create a deep copy of the board
//         const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//         // Perform the swap on the temporary board
//         const tempSrc = newBoard[r][c].src;
//         newBoard[r][c].src = newBoard[newR][newC].src;
//         newBoard[newR][newC].src = tempSrc;

//         // Check if the swap results in a valid match
//         const isValid = checkValidAfterSwap(newBoard);

//         if (isValid) {
//             // If valid, update the state with the new board
//             setBoard(newBoard);
//             setHasUserMadeMove(true); // User has made their first move
//             console.log('this is from swap tile valid')
//         } else {
//             // If invalid, revert the swap on the temporary board
//             newBoard[newR][newC].src = newBoard[r][c].src;
//             newBoard[r][c].src = tempSrc;
//             setBoard(newBoard); // Update the state with the reverted board
//         }
//     };

//     const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//     };

//     const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//     };

//     const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
//         // You can add logic here if needed
//     };

//     const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
//         setOtherTile(tile);
//     };

//     const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
//         if (!currTile || !otherTile) return;

//         const currCoords: string[] = currTile.id.split("-");
//         const otherCoords: string[] = otherTile.id.split("-");

//         const r: number = parseInt(currCoords[0]);
//         const c: number = parseInt(currCoords[1]);
//         const r2: number = parseInt(otherCoords[0]);
//         const c2: number = parseInt(otherCoords[1]);

//         const isAdjacent: boolean =
//             (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

//         if (isAdjacent) {
//             // Create a deep copy of the board
//             const newBoard = board.map(row => row.map(tile => ({ ...tile })));

//             // Perform the swap on the temporary board
//             const tempSrc = newBoard[r][c].src;
//             newBoard[r][c].src = newBoard[r2][c2].src;
//             newBoard[r2][c2].src = tempSrc;

//             // Check if the swap results in a valid match
//             const isValid = checkValidAfterSwap(newBoard);

//             if (isValid) {
//                 // If valid, update the state with the new board
//                 setBoard(newBoard);
//                 setHasUserMadeMove(true); // User has made their first move
//             } else {
//                 // If invalid, revert the swap on the temporary board
//                 newBoard[r2][c2].src = newBoard[r][c].src;
//                 newBoard[r][c].src = tempSrc;
//                 setBoard(newBoard); // Update the state with the reverted board
//             }
//         }

//         setCurrTile(null);
//         setOtherTile(null);
//     };

//     const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
//         setCurrTile(tile);
//         const touch = e.touches[0];
//         setTouchStartX(touch.clientX);
//         setTouchStartY(touch.clientY);
//     };

//     const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
//         e.preventDefault();
//         const touch = e.touches[0];
//         setTouchEndX(touch.clientX);
//         setTouchEndY(touch.clientY);
//     };

//     const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
//         if (!currTile) return;

//         const deltaX = touchEndX - touchStartX;
//         const deltaY = touchEndY - touchStartY;

//         let direction = "";

//         if (Math.abs(deltaX) > Math.abs(deltaY)) {
//             // Horizontal swipe
//             if (deltaX > 0) {
//                 direction = "right";
//             } else {
//                 direction = "left";
//             }
//         } else {
//             // Vertical swipe
//             if (deltaY > 0) {
//                 direction = "down";
//             } else {
//                 direction = "up";
//             }
//         }

//         swapTile(direction);

//         setCurrTile(null);
//     };

//     return (
//         <div className="board">
//             {board.map((row, r) => (
//                 <div key={r} className="row">
//                     {row.map((tile, c) => (
//                         <img
//                             key={tile.id}
//                             id={tile.id}
//                             src={tile.src}
//                             draggable
//                             onDragStart={(e) => dragStart(e, tile)}
//                             onDragOver={(e) => dragOver(e)}
//                             onDragEnter={(e) => dragEnter(e)}
//                             onDragLeave={(e) => dragLeave(e)}
//                             onDrop={(e) => dragDrop(e, tile)}
//                             onDragEnd={(e) => dragEnd(e)}
//                             onTouchStart={(e) => touchStart(e, tile)}
//                             onTouchMove={(e) => touchMove(e)}
//                             onTouchEnd={(e) => touchEnd(e)}
//                             alt="candy"
//                         />
//                     ))}
//                 </div>
//             ))}
//             <div className="score">Score: {score}</div>
//         </div>
//     );
// };

// export default CandyCrushGame;



import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebase";
import candy_pink_bg from "../candy_img/candy-crush-pink-bg.png";
import { onAuthStateChanged } from "firebase/auth";
import "./candycrush.css"; // Optional: for styling

interface Tile {
    id: string;
    src: string;
}

const CandyCrushGame: React.FC = () => {

     const [okuseCoin, setOkuseCoin] = useState<number | null>(null);
        const [ticketCard, setTicketCard] = useState<number | null>(null);

    const [board, setBoard] = useState<Tile[][]>([]);
    const [score, setScore] = useState<number>(0);
    const [currTile, setCurrTile] = useState<Tile | null>(null);
    const [otherTile, setOtherTile] = useState<Tile | null>(null);
    const [touchStartX, setTouchStartX] = useState<number>(0);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    const [touchEndX, setTouchEndX] = useState<number>(0);
    const [touchEndY, setTouchEndY] = useState<number>(0);
    const [hasUserMadeMove, setHasUserMadeMove] = useState<boolean>(false);
    const [candylandSound, setCandylandSound] = useState<HTMLAudioElement | null>(null);
    const divine = new Audio("/Game/Sound/divine.mp3");
    const colorbomb= new Audio("/Game/Sound/colour-bomb-created.mp3");
   
   
    const candies: string[] = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple", "Choco","Orange-Striped-Horizontal"];
    const rows: number = 8;
    const columns: number = 8;

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
        startGame();
    }, []);
    useEffect(() => {
        if (board.length > 0) {
            const interval = setInterval(() => {
                crushCandy();
                slideCandy();
                generateCandy();
                if (!hasValidMoves()) {
                    reshuffleBoard();
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [board]);

    const canPlay = 
    okuseCoin !== null &&
    okuseCoin >= 10;

    useEffect(() => {
        const candylandaudio = new Audio("/Game/Sound/candy-land.mp3");
        candylandaudio.preload = "auto"; // Preload the audio file
        setCandylandSound(candylandaudio);
    }, []);

    const playCandylandSound = (): void => {
        if (candylandSound) {
            candylandSound.currentTime = 0; // Reset the audio to the start
            candylandSound.play().catch((error) => {
                console.error("Error playing sound:", error);
            });
        }
    };


    const randomCandy = (): string => candies[Math.floor(Math.random() * candies.length)];

    const startGame = (): void => {
        const newBoard: Tile[][] = [];
        for (let r = 0; r < rows; r++) {
            let row: Tile[] = [];
            for (let c = 0; c < columns; c++) {
                let tile: Tile = {
                    id: `${r}-${c}`,
                    src: `./images/${randomCandy()}.png`
                };
                row.push(tile);
            }
            newBoard.push(row);
        }
        setBoard(newBoard);
    };

    const crushCandy = (): void => {
        crushLShape();     
        crushFive();
        crushFour();
        crushThree();
       
    };

   
    const crushThree = async (): Promise<void> => {
       
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 2; c++) {
                if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        playCandylandSound();

                        setScore(prevScore => prevScore + 30);
                        if (auth.currentUser) {
                            if (okuseCoin !== null) {
                                const newOkuse = okuseCoin + 3;
                                setOkuseCoin(newOkuse);
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Okuse: newOkuse });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 2; r++) {
                if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        playCandylandSound();

                        setScore(prevScore => prevScore + 30);
                        if (auth.currentUser) {
                            if (okuseCoin !== null) {
                                const newOkuse = okuseCoin + 3;
                                setOkuseCoin(newOkuse);
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Okuse: newOkuse });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    
    const crushFour = async (): Promise<void> => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2] || !board[r][c + 3]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        colorbomb.play();
                        setScore(prevScore => prevScore + 40);
                        if (auth.currentUser) {
                            if (ticketCard !== null) {
                                const newTicket = ticketCard + 1;
                                setTicketCard( newTicket);
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Ticket: newTicket });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 3; r++) {
                if (!board[r] || !board[r + 1] || !board[r + 2]|| !board[r + 3]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        colorbomb.play();
                        setScore(prevScore => prevScore + 40);
                        if (auth.currentUser) {
                            if (ticketCard !== null) {
                                const newTicket = ticketCard + 1;
                                setTicketCard(newTicket);
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Ticket: newTicket });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    const crushFive = async (): Promise<void> => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 4; c++) {
                if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]|| !board[r][c + 3] || !board[r][c + 4]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3], board[r][c + 4]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        setScore(prevScore => prevScore + 50);
                        divine.play();
                        if (auth.currentUser) {
                            if (okuseCoin !== null && ticketCard !== null) {
                                const newOkuse = okuseCoin + 3;
                                const newTicket=ticketCard +1;
                                setOkuseCoin(newOkuse);
                                setTicketCard(newTicket)
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Okuse: newOkuse });
                                    await updateDoc(userRef,{ Ticket: newTicket });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 4; r++) {
                if (!board[r] || !board[r + 1] || !board[r + 2]|| !board[r + 3] || !board[r + 4]) continue; // Safety check
    
                let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c],board[r + 3][c], board[r + 4][c]];
                if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
                    candies.forEach(candy => candy.src = "./images/blank.png");
                    if (hasUserMadeMove) {
                        setScore(prevScore => prevScore + 50);
                        divine.play();
                        if (auth.currentUser) {
                            if (okuseCoin !== null && ticketCard !==null) {
                                const newOkuse = okuseCoin + 3;
                                const newTicket=ticketCard+1;
                                setOkuseCoin(newOkuse);
                                setTicketCard(newTicket)
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Okuse: newOkuse });
                                    await updateDoc(userRef,{ Ticket: newTicket });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    const crushLShape = async (): Promise<void> => {
        for (let r = 0; r < rows - 2; r++) {
            for (let c = 0; c < columns - 2; c++) {
                if (!board[r] || !board[r + 1] || !board[r + 2] || !board[r][c] || !board[r + 1][c] || !board[r + 2][c]) continue; // Safety check
    
                let centerCandy = board[r][c];
                let isLShape = false;
                let candies: Tile[] = [];
    
                // Check for the four L-shape patterns
                if (
                    board[r][c].src === board[r + 1][c].src &&
                    board[r + 1][c].src === board[r + 2][c].src &&
                    !board[r][c].src.includes("blank")
                ) {
                    // L-Shape: Vertical line with two on the right
                    if (board[r][c + 1]?.src === centerCandy.src && board[r + 1][c + 1]?.src === centerCandy.src) {
                        candies = [board[r][c], board[r + 1][c], board[r + 2][c], board[r][c + 1], board[r + 1][c + 1]];
                        isLShape = true;
                    }
                    // L-Shape: Vertical line with two on the left
                    else if (board[r][c - 1]?.src === centerCandy.src && board[r + 1][c - 1]?.src === centerCandy.src) {
                        candies = [board[r][c], board[r + 1][c], board[r + 2][c], board[r][c - 1], board[r + 1][c - 1]];
                        isLShape = true;
                    }
                }
    
                if (
                    board[r][c].src === board[r][c + 1].src &&
                    board[r][c + 1].src === board[r][c + 2].src &&
                    !board[r][c].src.includes("blank")
                ) {
                    // L-Shape: Horizontal line with two below
                    if (board[r + 1][c]?.src === centerCandy.src && board[r + 2][c]?.src === centerCandy.src) {
                        candies = [board[r][c], board[r][c + 1], board[r][c + 2], board[r + 1][c], board[r + 2][c]];
                        isLShape = true;
                    }
                    // L-Shape: Horizontal line with two above
                    else if (board[r - 1] && board[r - 1][c]?.src === centerCandy.src && board[r - 2] && board[r - 2][c]?.src === centerCandy.src) {
                        candies = [board[r][c], board[r][c + 1], board[r][c + 2], board[r - 1][c], board[r - 2][c]];
                        isLShape = true;
                    }
                }
    
                if (isLShape) {
                    candies.forEach(candy => (candy.src = "./images/blank.png"));
                    if (hasUserMadeMove) {
                        setScore(prevScore => prevScore + 50);
                        divine.play();
                        if (auth.currentUser) {
                            if (okuseCoin !== null && ticketCard !== null) {
                                const newOkuse = okuseCoin + 3;
                                const newTicket = ticketCard + 1;
                                setOkuseCoin(newOkuse);
                                setTicketCard(newTicket);
    
                                try {
                                    const userRef = doc(db, "users", auth.currentUser.uid);
                                    await updateDoc(userRef, { Okuse: newOkuse });
                                    await updateDoc(userRef, { Ticket: newTicket });
                                } catch (error) {
                                    console.error("Error updating Okuse:", error);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    

    const slideCandy = (): void => {
        const newBoard: Tile[][] = [...board];
        for (let c = 0; c < columns; c++) {
            let ind: number = rows - 1;
            for (let r = rows - 1; r >= 0; r--) {
                if (!newBoard[r][c].src.includes("blank")) {
                    newBoard[ind][c].src = newBoard[r][c].src;
                    ind -= 1;
                }
            }
            for (let r = ind; r >= 0; r--) {
                newBoard[r][c].src = "./images/blank.png";
            }
        }
        setBoard(newBoard);
    };

    const generateCandy = (): void => {
        const newBoard: Tile[][] = [...board];
        for (let c = 0; c < columns; c++) {
            if (newBoard[0][c].src.includes("blank")) {
                newBoard[0][c].src = `./images/${randomCandy()}.png`;
            }
        }
        setBoard(newBoard);
    };

    const checkValid = (): boolean => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 2; c++) {
                if (
                    board[r][c].src === board[r][c + 1].src &&
                    board[r][c + 1].src === board[r][c + 2].src &&
                    !board[r][c].src.includes("blank")

                ) {
                    console.log('this is from  check valid after swap row');
                    // if (okuseCoin !== null && okuseCoin > 0) {
                    //     setOkuseCoin(prevOkuse => (prevOkuse !== null ? prevOkuse - 10 : null));
                
                    //     // Update Firebase
                    //     const user = auth.currentUser;
                    //     if (user) {
                    //         const userRef = doc(db, "users", user.uid);
                    //          updateDoc(userRef, { Okuse: okuseCoin - 10 });
                    //     }
                    // }
                    return true;
                }
            }
        }
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 2; r++) {
                if (
                    board[r][c].src === board[r + 1][c].src &&
                    board[r + 1][c].src === board[r + 2][c].src &&
                    !board[r][c].src.includes("blank")
                ) {
                    console.log('this is from  check valid after swap col');
                    // if (okuseCoin !== null && okuseCoin > 0) {
                    //     setOkuseCoin(prevOkuse => (prevOkuse !== null ? prevOkuse - 10 : null));
                
                    //     // Update Firebase
                    //     const user = auth.currentUser;
                    //     if (user) {
                    //         const userRef = doc(db, "users", user.uid);
                    //          updateDoc(userRef, { Okuse: okuseCoin - 10 });
                    //     }
                    // }
                    return true;
                }
            }
        }
        return false;
    };

    // const checkValidAfterSwap = (board: Tile[][]): boolean => {
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < columns - 2; c++) {
    //             if (
    //                 board[r][c].src === board[r][c + 1].src &&
    //                 board[r][c + 1].src === board[r][c + 2].src &&
    //                 !board[r][c].src.includes("blank")
                   
    //             ) {
                  
    //                 return true;
    //                 console.log("jellp");
    //             }
    //         }
    //     }
    //     for (let c = 0; c < columns; c++) {
    //         for (let r = 0; r < rows - 2; r++) {
    //             if (
    //                 board[r][c].src === board[r + 1][c].src &&
    //                 board[r + 1][c].src === board[r + 2][c].src &&
    //                 !board[r][c].src.includes("blank")
    //             ) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // };

    const checkValidAfterSwap = (board: Tile[][]): boolean => { 
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 2; c++) {
                if (
                    board[r][c].src === board[r][c + 1].src &&
                    board[r][c + 1].src === board[r][c + 2].src &&
                    !board[r][c].src.includes("blank")
                ) {
                    return true;
                }
            }
        }
    
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 2; r++) {
                if (
                    board[r][c].src === board[r + 1][c].src &&
                    board[r + 1][c].src === board[r + 2][c].src &&
                    !board[r][c].src.includes("blank")
                ) {
                    return true;
                }
            }
        }
    
        return false;
    };
    

    const hasValidMoves = (): boolean => {
        let validMoves = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                // Check right swap
                if (c < columns - 1) {
                    const newBoard = board.map(row => row.map(tile => ({ ...tile })));
                    const tempSrc = newBoard[r][c].src;
                    newBoard[r][c].src = newBoard[r][c + 1].src;
                    newBoard[r][c + 1].src = tempSrc;
                    if (checkValidAfterSwap(newBoard)) {
                        validMoves++;
                      //  console.log(`Valid move found at (${r}, ${c}) -> right`);
                    }
                }
                // Check down swap
                if (r < rows - 1) {
                    const newBoard = board.map(row => row.map(tile => ({ ...tile })));
                    const tempSrc = newBoard[r][c].src;
                    newBoard[r][c].src = newBoard[r + 1][c].src;
                    newBoard[r + 1][c].src = tempSrc;
                    if (checkValidAfterSwap(newBoard)) {
                        validMoves++;
                        //console.log(`Valid move found at (${r}, ${c}) -> down`);
                    }
                }
            }
        }

        //console.log(`Total valid moves remaining: ${validMoves}`);
        return validMoves > 0;
    };

    const reshuffleBoard = (): void => {
        console.log("No valid moves left. Reshuffling board...");
        const newBoard: Tile[][] = [];
        for (let r = 0; r < rows; r++) {
            let row: Tile[] = [];
            for (let c = 0; c < columns; c++) {
                let tile: Tile = {
                    id: `${r}-${c}`,
                    src: `./images/${randomCandy()}.png`
                };
                row.push(tile);
            }
            newBoard.push(row);
        }
        setBoard(newBoard);
    };

    const swapTile = (direction: string): void => {
        if (!currTile) return;

        const currCoords = currTile.id.split("-").map(Number);
        let [r, c] = currCoords;
        let [newR, newC] = [r, c];

        if (direction === "left" && c > 0) newC -= 1;
        if (direction === "right" && c < columns - 1) newC += 1;
        if (direction === "up" && r > 0) newR -= 1;
        if (direction === "down" && r < rows - 1) newR += 1;

        // Create a deep copy of the board
        const newBoard = board.map(row => row.map(tile => ({ ...tile })));

        // Perform the swap on the temporary board
        const tempSrc = newBoard[r][c].src;
        newBoard[r][c].src = newBoard[newR][newC].src;
        newBoard[newR][newC].src = tempSrc;

        // Check if the swap results in a valid match
        const isValid = checkValidAfterSwap(newBoard);

        if (isValid) {
            // If valid, update the state with the new board
            setBoard(newBoard);
            setHasUserMadeMove(true); // User has made their first move
            console.log('this is from swap tile valid');
            if (okuseCoin !== null && okuseCoin > 0) {
                setOkuseCoin(prevOkuse => (prevOkuse !== null ? prevOkuse - 10 : null));
        
                // Update Firebase
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                     updateDoc(userRef, { Okuse: okuseCoin - 10 });
                }
            }
        } else {
            // If invalid, revert the swap on the temporary board
            newBoard[newR][newC].src = newBoard[r][c].src;
            newBoard[r][c].src = tempSrc;
            setBoard(newBoard); // Update the state with the reverted board
        }
    };

    const dragStart = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
        setCurrTile(tile);
    };

    const dragOver = (e: React.DragEvent<HTMLImageElement>): void => {
        e.preventDefault();
    };

    const dragEnter = (e: React.DragEvent<HTMLImageElement>): void => {
        e.preventDefault();
    };

    const dragLeave = (e: React.DragEvent<HTMLImageElement>): void => {
        // You can add logic here if needed
    };

    const dragDrop = (e: React.DragEvent<HTMLImageElement>, tile: Tile): void => {
        setOtherTile(tile);
    };

    const dragEnd = (e: React.DragEvent<HTMLImageElement>): void => {
        if (!currTile || !otherTile) return;

        const currCoords: string[] = currTile.id.split("-");
        const otherCoords: string[] = otherTile.id.split("-");

        const r: number = parseInt(currCoords[0]);
        const c: number = parseInt(currCoords[1]);
        const r2: number = parseInt(otherCoords[0]);
        const c2: number = parseInt(otherCoords[1]);

        const isAdjacent: boolean =
            (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

        if (isAdjacent) {
            // Create a deep copy of the board
            const newBoard = board.map(row => row.map(tile => ({ ...tile })));

            // Perform the swap on the temporary board
            const tempSrc = newBoard[r][c].src;
            newBoard[r][c].src = newBoard[r2][c2].src;
            newBoard[r2][c2].src = tempSrc;

            // Check if the swap results in a valid match
            const isValid = checkValidAfterSwap(newBoard);
            let validMove = checkValid();

            if (isValid) {
                   if (okuseCoin !== null && okuseCoin > 0) {
                        setOkuseCoin(prevOkuse => (prevOkuse !== null ? prevOkuse - 10 : null));
    
                        // Update Firebase
                        const user = auth.currentUser;
                        if (user) {
                            const userRef = doc(db, "users", user.uid);
                            updateDoc(userRef, { Okuse: okuseCoin - 10 });
                        }
                    }
                // If valid, update the state with the new board
                setBoard(newBoard);
                setHasUserMadeMove(true); // User has made their first move
            } else {
                // If invalid, revert the swap on the temporary board
                newBoard[r2][c2].src = newBoard[r][c].src;
                newBoard[r][c].src = tempSrc;
                setBoard(newBoard); // Update the state with the reverted board
            }
        }

        setCurrTile(null);
        setOtherTile(null);
    };

    const touchStart = (e: React.TouchEvent<HTMLImageElement>, tile: Tile): void => {
        setCurrTile(tile);
        const touch = e.touches[0];
        setTouchStartX(touch.clientX);
        setTouchStartY(touch.clientY);
    };

    const touchMove = (e: React.TouchEvent<HTMLImageElement>): void => {
        e.preventDefault();
        const touch = e.touches[0];
        setTouchEndX(touch.clientX);
        setTouchEndY(touch.clientY);
    };

    const touchEnd = (e: React.TouchEvent<HTMLImageElement>): void => {
        if (!currTile) return;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        let direction = "";

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                direction = "right";
            } else {
                direction = "left";
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                direction = "down";
            } else {
                direction = "up";
            }
        }

        swapTile(direction);

        setCurrTile(null);
    };

    return (
        <>
          {canPlay ? (
             <div className="board">
             {board.map((row, r) => (
                 <div key={r} className="row">
                     {row.map((tile, c) => (
                         <img
                             key={tile.id}
                             id={tile.id}
                             src={tile.src}
                             draggable
                             onDragStart={(e) => dragStart(e, tile)}
                             onDragOver={(e) => dragOver(e)}
                             onDragEnter={(e) => dragEnter(e)}
                             onDragLeave={(e) => dragLeave(e)}
                             onDrop={(e) => dragDrop(e, tile)}
                             onDragEnd={(e) => dragEnd(e)}
                             onTouchStart={(e) => touchStart(e, tile)}
                             onTouchMove={(e) => touchMove(e)}
                             onTouchEnd={(e) => touchEnd(e)}
                             alt="candy"
                         />
                     ))}
                 </div>
             ))}
             <div className="score">Score: {score}</div>
         </div>
            ) : (
                <div className="candywaiting_description_box">
                <img
                  src={candy_pink_bg}
                  className="candylevel_image"
                />
                <div className="candywaiting_description_overlay">
                    <p style={{ color: "red" }}> At least 10 coins to play.</p>
                </div>
              </div>
            )}
        </>
    );
};

export default CandyCrushGame;

 // const crushThree = (): void => {
    //     for (let r = 0; r < rows; r++) {
    //         for (let c = 0; c < columns - 2; c++) {
    //             if (!board[r] || !board[r][c] || !board[r][c + 1] || !board[r][c + 2]) continue; // Safety check

    //             let candies: Tile[] = [board[r][c], board[r][c + 1], board[r][c + 2]];
    //             if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
    //                 candies.forEach(candy => candy.src = "./images/blank.png");
    //                 if (hasUserMadeMove) {
    //                     setScore(prevScore => prevScore + 30);
    //                 }
    //             }
    //         }
    //     }

    //     for (let c = 0; c < columns; c++) {
    //         for (let r = 0; r < rows - 2; r++) {
    //             if (!board[r] || !board[r + 1] || !board[r + 2]) continue; // Safety check

    //             let candies: Tile[] = [board[r][c], board[r + 1][c], board[r + 2][c]];
    //             if (candies.every(candy => candy.src === candies[0].src && !candies[0].src.includes("blank"))) {
    //                 candies.forEach(candy => candy.src = "./images/blank.png");
    //                 if (hasUserMadeMove) {
    //                     setScore(prevScore => prevScore + 30);
    //                 }
    //             }
    //         }
    //     }
    // };
