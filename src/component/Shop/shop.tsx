// import React, { useState, useEffect } from "react";
// import "./Shop.css"
// import { FiguresData } from "./shop_data";


// interface Figuredetail{
//     id: number,
//         image:string,
//         MC:String,
//         Anime:String,
//         Height:String,
//         Instock:boolean,
//        StockNum:number,
//        Outstock:number,
//         price:number,
//   }

// export  function Shop(){

//  const [searchValue, setSearchValue] = useState("");
//  const [items, setItems] = useState<Figuredetail[]>([]);

//  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };
//     const filteredData = items.filter((item) =>
//         item.MC.toLowerCase().includes(searchValue.trim().toLowerCase()),
//       );


//     return(
//         <>
//             <hr />
//             <div >
//                 <div className="home_searchbar_box figure_search">
//                 <i className="bi bi-search"></i>
//                 <input
//                 className="home_searchbar "
//                 placeholder="Search character or Anime"
//                 value={searchValue}
//                 onChange={handleInputChange} />
//                 </div>

//                 {/* here will be filter by drop box with price/time/instock */}
//                  <div className="filterbox">
//                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//            Filter
//           </a>
//           <ul className="">
//             <li><a className="dropdown-item" href="#">Price</a></li>
//             <li><a className="dropdown-item" href="#">Time</a></li>
//             <li><a className="dropdown-item" href="#">Stock</a></li>
//           </ul>
//  {/* here will be arrow up and down for desending or acseonding order */}
//  UP
//                  </div>
                
//            </div>
       
//         </>
//     );
// }





// import React, { useState, useEffect } from "react";
// import "./Shop.css";
// import { FiguresData } from "./shop_data";

// interface Figuredetail {
//   id: number;
//   image: string;
//   MC: string;
//   Anime: string;
//   Height: string;
//   Instock: boolean;
//   StockNum: number;
//   Outstock: number;
//   price: number;
//   Figurenotes:string;
//   timestamp: number; // For sorting by time
// }

// export function Shop() {
//   const [searchValue, setSearchValue] = useState("");
//   const [items, setItems] = useState<Figuredetail[]>([]);
//   const [filterType, setFilterType] = useState<string>("Time"); // Default filter: Time
//   const [isAscending, setIsAscending] = useState<boolean>(false); // Default: Descending (newest first)

//   useEffect(() => {
//     // Default sort: Time Descending (newest first)
//     const sortedByTime = [...FiguresData].sort((a, b) => b.timestamp - a.timestamp);
//     setItems(sortedByTime);
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleFilterChange = (type: string) => {
//     setFilterType(type);
//     applySorting(type, isAscending);
//   };

//   const toggleSortOrder = () => {
//     setIsAscending(!isAscending);
//     applySorting(filterType, !isAscending);
//   };

//   const applySorting = (type: string, ascending: boolean) => {
//     let sortedItems = [...items];

//     if (type === "Price") {
//       sortedItems.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
//     } else if (type === "Stock") {
//       sortedItems.sort((a, b) => (ascending ? a.StockNum - b.StockNum : b.StockNum - a.StockNum));
//     } else if (type === "Time") {
//       sortedItems.sort((a, b) => (ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp));
//     }

//     setItems(sortedItems);
//   };

//   const filteredData = items.filter((item) =>
//     item.MC.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
//     item.Anime.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
//     item.Figurenotes.toLowerCase().includes(searchValue.trim().toLowerCase())
//   );
  

//   return (
//     <>
//       <hr />
//       <div>
//         {/* Search Bar */}
//         <div className="home_searchbar_box figure_search">
//           <i className="bi bi-search"></i>
//           <input
//             className="home_searchbar"
//             placeholder="Search character or Anime"
//             value={searchValue}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Filter and Sorting Controls */}
//         <div className="filterbox">
//           <span>Filter</span>

//           {/* Filter Type Dropdown */}
//           <div className="dropdown d-inline">
//             <button
//               className="btn btn-secondary dropdown-toggle filterbox_btn"
//               type="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               {filterType}
//             </button>
//             <ul className="dropdown-menu">
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Price")}>
//                   Price
//                 </button>
//               </li>
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Stock")}>
//                   Stock
//                 </button>
//               </li>
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Time")}>
//                   Time
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Toggle Sort Order Button */}
//           <button className="btn btn-outline-primary ms-2 filterbox_btn" onClick={toggleSortOrder}>
//             {isAscending ? "Asc ↑" : "Des ↓"}
//           </button>
//         </div>

     
//       </div>
//       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{margin:0}}>
//       {filteredData.map((figure) => (
//       <div className="col-6 col-sm-4 col-md-3" key={figure.id}>
//           <div className="card figure_card shadow-sm">
//           <img src={figure.image} alt={figure.MC} />
//             <div className="card-body figure_card_body">
//               <p className="card-text">MC:{figure.MC}</p>
//               <p className="card-text">Height:{figure.Height}</p>
//               <p className="card-text">Stock:{figure.Instock}</p>
//               <p className="card-text">Price: ${figure.price}</p>
//               <hr />
//             </div>
//             <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//               <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
//               <button type="button" className="btn btn-sm btn-outline-secondary">Reedem</button>
//               <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
//               </div>
//           </div>
//         </div>
//        ))}
       
//     </div>

// {/*  */}
//     <div>
//       <br />
//       <br />
//       <span>jjjj</span>
//     </div>
//     </>
//   );
// }





// import React, { useState, useEffect } from "react";
// import "./Shop.css";
// import { Figureshop } from "./figureShop/figureshop";
// import { FiguresData } from "./shop_data";

// interface Figuredetail {
//   id: number;
//   image: string;
//   MC: string;
//   Anime: string;
//   Height: string;
//   Instock: boolean;
//   StockNum: number;
//   Outstock: number;
//   price: number;
//   Figurenotes:string;
//   timestamp: number; // For sorting by time
// }

// export function Shop() {
//   const [searchValue, setSearchValue] = useState("");
//   const [items, setItems] = useState<Figuredetail[]>([]);
//   const [filterType, setFilterType] = useState<string>("Time"); // Default filter: Time
//   const [isAscending, setIsAscending] = useState<boolean>(false); // Default: Descending (newest first)

//   useEffect(() => {
//     // Default sort: Time Descending (newest first)
//     const sortedByTime = [...FiguresData].sort((a, b) => b.timestamp - a.timestamp);
//     setItems(sortedByTime);
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleFilterChange = (type: string) => {
//     setFilterType(type);
//     applySorting(type, isAscending);
//   };

//   const toggleSortOrder = () => {
//     setIsAscending(!isAscending);
//     applySorting(filterType, !isAscending);
//   };

//   const applySorting = (type: string, ascending: boolean) => {
//     let sortedItems = [...items];

//     if (type === "Price") {
//       sortedItems.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
//     } else if (type === "Stock") {
//       sortedItems.sort((a, b) => (ascending ? a.StockNum - b.StockNum : b.StockNum - a.StockNum));
//     } else if (type === "Time") {
//       sortedItems.sort((a, b) => (ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp));
//     }

//     setItems(sortedItems);
//   };
 
//     const filteredData = items.filter((item) =>
//     item.MC.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
//     item.Anime.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
//     item.Figurenotes.toLowerCase().includes(searchValue.trim().toLowerCase())
//   );

//   return (
//     <>
//       <hr />
//       <div>
//         {/* Search Bar */}
//         <div className="home_searchbar_box figure_search">
//           <i className="bi bi-search"></i>
//           <input
//             className="home_searchbar"
//             placeholder="Search character or Anime"
//             value={searchValue}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Filter and Sorting Controls */}
//         <div className="filterbox">
//           <span>Filter</span>

//           {/* Filter Type Dropdown */}
//           <div className="dropdown d-inline">
//             <button
//               className="btn btn-secondary dropdown-toggle filterbox_btn"
//               type="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               {filterType}
//             </button>
//             <ul className="dropdown-menu">
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Price")}>
//                   Price
//                 </button>
//               </li>
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Stock")}>
//                   Stock
//                 </button>
//               </li>
//               <li>
//                 <button className="dropdown-item" onClick={() => handleFilterChange("Time")}>
//                   Time
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Toggle Sort Order Button */}
//           <button className="btn btn-outline-primary ms-2 filterbox_btn" onClick={toggleSortOrder}>
//             {isAscending ? "Asc ↑" : "Des ↓"}
//           </button>
//         </div>
//       </div>
//       {/*  */}
//       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{ margin: 0 }}>
//   {filteredData.map((figure) => (
//     <Figureshop key={figure.id} figure={figure} />
//   ))}
// </div>

// {/*  */}
//     <div>
//     in here pagination
//     </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import "./Shop.css";
import { Figureshop } from "./figureShop/figureshop";
import { FiguresData } from "./shop_data";

interface Figuredetail {
  id: number;
  image: string;
  MC: string;
  type:string;
  Anime: string;
  Height: string;
  Instock: boolean;
  StockNum: number;
  Outstock: number;
  price: number;
  Figurenotes: string;
  Shipment:String;
  timestamp: number; // For sorting by time
}

const ITEMS_PER_PAGE = 4; // Number of items per page

export function Shop() {
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Figuredetail[]>([]);
  const [filterType, setFilterType] = useState<string>("Time"); // Default filter: Time
  const [isAscending, setIsAscending] = useState<boolean>(false); // Default: Descending (newest first)
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Default sort: Time Descending (newest first)
    const sortedByTime = [...FiguresData].sort((a, b) => b.timestamp - a.timestamp);
    setItems(sortedByTime);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleFilterChange = (type: string) => {
    setFilterType(type);
    applySorting(type, isAscending);
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
    applySorting(filterType, !isAscending);
  };

  const applySorting = (type: string, ascending: boolean) => {
    let sortedItems = [...items];

    if (type === "Price") {
      sortedItems.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
    } else if (type === "Stock") {
      sortedItems.sort((a, b) => (ascending ? a.StockNum - b.StockNum : b.StockNum - a.StockNum));
    } else if (type === "Time") {
      sortedItems.sort((a, b) => (ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp));
    }

    setItems(sortedItems);
  };

  const filteredData = items.filter((item) =>
    item.MC.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
    item.Anime.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
    item.Figurenotes.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
  
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
  
    // Ensure we always display exactly 3 page numbers
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        {/* <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        {pages}
        <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={() => changePage(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button> */}
         <button onClick={() => changePage(1)} >
          First
        </button>
        <button onClick={() => changePage(currentPage - 1)} >
          Prev
        </button>
        {pages}
        <button onClick={() => changePage(currentPage + 1)} >
          Next
        </button>
        <button onClick={() => changePage(totalPages)} >
          Last
        </button>
      </div>
    );
  };

  return (
    <>
      <hr />
      <div>
        {/* Search Bar */}
        <div className="home_searchbar_box figure_search">
          <i className="bi bi-search"></i>
          <input
            className="home_searchbar"
            placeholder="Search character or Anime"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>

        {/* Filter and Sorting Controls */}
        <div className="filterbox">
          <span>Filter</span>

          {/* Filter Type Dropdown */}
          <div className="dropdown d-inline">
            <button
              className="btn btn-secondary dropdown-toggle filterbox_btn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {filterType}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" onClick={() => handleFilterChange("Price")}>
                  Price
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleFilterChange("Stock")}>
                  Stock
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleFilterChange("Time")}>
                  Time
                </button>
              </li>
            </ul>
          </div>

          {/* Toggle Sort Order Button */}
          <button className="btn btn-outline-primary ms-2 filterbox_btn" onClick={toggleSortOrder}>
            {isAscending ? "Asc ↑" : "Des ↓"}
          </button>
        </div>
      </div>

      {/* Figures List */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{ margin: 0 }}>
        {paginatedData.map((figure) => (
          <Figureshop key={figure.id} figure={figure} />
        ))}
      </div>

<br />
<br />
      {/* Pagination Controls */}
      <div>{renderPagination()}</div>
      <br />
<br />
    </>
  );
}
