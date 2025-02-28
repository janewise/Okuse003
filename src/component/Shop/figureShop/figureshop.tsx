
// import React, { useState, useEffect } from "react";

// interface Figure {
//     id: number;
//   image: string;
//   MC: string;
//   Anime: string;
//   Height: string;
//   Instock: boolean;
//   StockNum: number;
//   Outstock: number;
//   price: number;
//   Figurenotes:string;
//   timestamp: number;
//   }

// export function Figureshop({ figure }: { figure: Figure }) {
//   return (
//     <>
//       <div className="col-6 col-sm-4 col-md-3" key={figure.id}>
//           <div className="card figure_card shadow-sm">
//           <img src={figure.image} alt={figure.MC} />
//             <div className="card-body figure_card_body">
//               <p className="card-text">MC:{figure.MC}</p>
//               <p className="card-text">Height:{figure.Height}</p>
//               <p className="card-text">Stock: {figure.Instock ? "Yes" : "No"}</p>
//               <p className="card-text">Price: ${figure.price}</p>
//               <hr />
//             </div>
//             <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//               <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-heart-pulse"></i></button>
//               <button type="button" className="btn btn-sm btn-outline-secondary">Reedem</button>
//               <button type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-list-task"></i></button>
//               </div>
//           </div>
//         </div>

//         </>
//   );
// }





// import React, { useState } from "react";
// import "./figureshop.css"

// interface Figure {
//   id: number;
//   image: string;
//   MC: string;
//   Anime: string;
//   Height: string;
//   Instock: boolean;
//   StockNum: number;
//   Outstock: number;
//   price: number;
//   Figurenotes: string;
//   timestamp: number;
// }

// export function Figureshop({ figure }: { figure: Figure }) {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <div className="col-6 col-sm-4 col-md-3">
//         <div className="card figure_card shadow-sm">
//           <img src={figure.image} alt={figure.MC} />
//           <div className="card-body figure_card_body">
//             <p className="card-text">MC: {figure.MC}</p>
//             <p className="card-text">Height: {figure.Height}</p>
//             <p className="card-text">Stock: {figure.Instock ? "Yes" : "No"}</p>
//             <p className="card-text">Price: {figure.price}</p>
//             <hr />
//           </div>
//           <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//             <button type="button" className="btn btn-sm btn-outline-secondary">
//               <i className="bi bi-heart-pulse"></i>
//             </button>
//             <button type="button" className="btn btn-sm btn-outline-secondary redeem">
//               Redeem
//             </button>
//             <button
//               type="button"
//               className="btn btn-sm btn-outline-secondary"
//               onClick={() => setShowModal(true)} // Open modal on click
//             >
//               <i className="bi bi-list-task"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Full-Screen Modal */}
//       {showModal && (
//         <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.7)",margin:0,padding:0}}>
//           <div className="modal-dialog modal-fullscreen">
//             <div className="modal-content" style={{ background:"var(--bg-color)"}}>
//               <div className="modal-header" style={{padding:"18px 30px"}}>
//                 <h5 className="modal-title">{figure.MC} - Figure Details</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6 text-center">
//                     <img src={figure.image} alt={figure.MC} className="img-fluid" />
//                   </div>
//                   <div className="col-md-6">
//                     <h3>{figure.MC}</h3>
//                     <p><strong>Anime:</strong> {figure.Anime}</p>
//                     <p><strong>Height:</strong> {figure.Height}</p>
//                     <p><strong>Stock:</strong> {figure.Instock ? "Yes" : "No"}</p>
//                     <p><strong>Price:</strong> {figure.price}</p>
//                     <p><strong>ID:</strong> {figure.Figurenotes}</p>
//                     <hr />
//                     <div className="col-md-12">
//                         <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//                             <button type="button" className="btn btn-sm btn-outline-secondary">
//                             <i className="bi bi-heart-pulse"></i>
//                             </button>
//                             <button type="button" className="btn btn-sm btn-outline-secondary redeem">
//                               Redeem
//                             </button>
                            
//                         </div>
//                     </div>
//                   </div>
                  
//                 </div>
//               </div>
//               {/* <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                   Close
//                 </button>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }







// import React, { useEffect, useState } from "react";
// import "./figureshop.css"
// import { auth, db } from "../../../firebase/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";

// interface Figure {
//   id: number;
//   image: string;
//   MC: string;
//   Anime: string;
//   Height: string;
//   Instock: boolean;
//   StockNum: number;
//   Outstock: number;
//   price: number;
//   Figurenotes: string;
//   timestamp: number;
// }

// export function Figureshop({ figure }: { figure: Figure }) {

//    const [ticketCard, setTicketCard] = useState<number | null>(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           const userRef = doc(db, "users", user.uid);
//           const snapshot = await getDoc(userRef);

//           if (snapshot.exists()) {
//             const userData = snapshot.data();
//             // setOkuseCoin(parseInt(userData.Okuse, 10)); // Assuming Okuse is a string in Firestore
//             setTicketCard(userData.Ticket);
//           } else {
//             console.error("No data available for this user.");
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <div className="col-6 col-sm-4 col-md-3">
//         <div className="card figure_card shadow-sm">
//           <img src={figure.image} alt={figure.MC} />
//           <div className="card-body figure_card_body">
//             <p className="card-text">MC: {figure.MC}</p>
//             <p className="card-text">Height: {figure.Height}</p>
//             <p className="card-text">Stock: {figure.Instock ? "Yes" : "No"}</p>
//             <p className="card-text">Price: {figure.price}</p>
//             <hr />
//           </div>
//           <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//             <button type="button" className="btn btn-sm btn-outline-secondary">
//               <i className="bi bi-heart-pulse"></i>
//             </button>
//             <button type="button" className="btn btn-sm btn-outline-secondary redeem">
//               Redeem
//             </button>
//             <button
//               type="button"
//               className="btn btn-sm btn-outline-secondary"
//               onClick={() => setShowModal(true)} // Open modal on click
//             >
//               <i className="bi bi-list-task"></i>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Full-Screen Modal */}
//       {showModal && (
//         <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.7)",margin:0,padding:0}}>
//           <div className="modal-dialog modal-fullscreen">
//             <div className="modal-content" style={{ background:"var(--bg-color)"}}>
//               <div className="modal-header" style={{padding:"18px 30px"}}>
//                 <h5 className="modal-title">{figure.MC} - Figure Details</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-6 text-center">
//                     <img src={figure.image} alt={figure.MC} className="img-fluid" />
//                   </div>
//                   <div className="col-md-6">
//                     <h3>{figure.MC}</h3>
//                     <p><strong>Anime:</strong> {figure.Anime}</p>
//                     <p><strong>Height:</strong> {figure.Height}</p>
//                     <p><strong>Stock:</strong> {figure.Instock ? "Yes" : "No"}</p>
//                     <p><strong>Price:</strong> {figure.price}</p>
//                     <p><strong>ID:</strong> {figure.Figurenotes}</p>
//                     <hr />
//                     <div className="col-md-12">
//                         <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
//                             <button type="button" className="btn btn-sm btn-outline-secondary">
//                             <i className="bi bi-heart-pulse"></i>
//                             </button>
//                             <button type="button" className="btn btn-sm btn-outline-secondary redeem">
//                               Redeem
//                             </button>
                            
//                         </div>
//                     </div>
//                   </div>
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






import React, { useEffect, useState } from "react";
import "./figureshop.css";
import { auth, db } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface Figure {
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
  Shipment:String;
  Figurenotes: string;
  timestamp: number;
}

export function Figureshop({ figure }: { figure: Figure }) {
  const [ticketCard, setTicketCard] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.data();
            setTicketCard(userData.Ticket); // Assuming Ticket is stored as a number
          } else {
            console.error("No data available for this user.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const handleRedeemConfirm = () => {
    setShowRedeemModal(false); // Close redeem modal
    setShowSuccessModal(true); // Open success modal
  };

  return (
    <>
      <div className="col-6 col-sm-4 col-md-3">
        <div className="card figure_card shadow-sm">
          <img src={figure.image} alt={figure.MC} />
          <div className="card-body figure_card_body">
            <p className="card-text">MC: {figure.MC}</p>
            <p className="card-text">Height: {figure.Height}</p>
            <p className="card-text">Stock: {figure.Instock ? "Yes" : "No"}</p>
            <p className="card-text">Price: {figure.price}</p>
            <hr />
          </div>
          <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-heart-pulse"></i>
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary redeem"
              disabled={ticketCard !== null && ticketCard < figure.price}
              onClick={() => setShowRedeemModal(true)}
            >
              Redeem
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-list-task"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Product Details Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.7)", margin: 0, padding: 0 }}>
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content" style={{ background: "var(--bg-color)" }}>
              <div className="modal-header" style={{ padding: "18px 30px" }}>
                <h5 className="modal-title">{figure.MC} - Figure Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img src={figure.image} alt={figure.MC} className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <h3>{figure.MC}</h3>
                    <p><strong>Anime:</strong> {figure.Anime}</p>
                    <p><strong>Type:</strong> {figure.type}</p>
                    <p><strong>Height:</strong> {figure.Height}</p>
                    <p><strong>Stock:</strong> {figure.Instock ? "Yes" : "No"}</p>
                    <p><strong>Price:</strong> {figure.price}</p>
                    <p><strong>ID:</strong> {figure.Figurenotes}</p>
                    <p><strong>Shipment:</strong> {figure.Instock ? "3 days" : figure.Shipment} </p>
                   
                    <hr />
                    <div className="col-md-12">
                      <div className="d-flex justify-content-evenly align-items-center figure_btn_box">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-heart-pulse"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary redeem"
                          disabled={ticketCard !== null && ticketCard < figure.price}
                          onClick={() => setShowRedeemModal(true)}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Redeem Modal */}
      {showRedeemModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Redeem</h5>
                <button type="button" className="btn-close" onClick={() => setShowRedeemModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to redeem?</p>
                <p><strong>Figure ID:</strong>{figure.Figurenotes}</p>
                <p><strong>Price:</strong> {figure.price} Tickets</p>
                <p><strong>Your Tickets:</strong> {ticketCard}</p>
                <p><strong>Shipment:</strong> {figure.Instock ? "3 days" : figure.Shipment} </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowRedeemModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleRedeemConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Congratulations!</h5>
              </div>
              <div className="modal-body">
                <p>🎉 You have successfully redeemed <strong>{figure.MC}</strong>!</p>
                <p>Your shipment will arrive in <strong>{figure.Instock ? "3 days" : figure.Shipment}</strong>.</p>
                <p>Thank you for your purchase!</p>
              </div>
              <p className="alert alert-warning"><strong>Note</strong>:May delayed based on national regulations.</p>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
