import React from "react";
import { NavLink } from "react-router-dom";
import "./More.css"

export function More(){
    return(
       <div className=" more_box">
         <NavLink
          to="/"
          className="more_backspace">
        <i className="bi bi-arrow-left-square"></i>
        </NavLink>
        <div className="container more_feature_box">
           <div className="morefeature_row">
              <ul className="homenav-bar">
                  <li className="homenav-item">
                    <NavLink
                      to="/spin"
                      className={({ isActive }) =>
                        isActive ? "linkactive homenav-link" : "homenav-link"
                      }
                    >
                    <i className="bi bi-arrow-repeat"></i>
                    </NavLink>
                    <p>Spin</p>
                  </li>
                  <li className="homenav-item">
                    <NavLink
                      to="/p2p"
                      className={({ isActive }) =>
                        isActive ? "linkactive homenav-link" : "homenav-link"
                      }
                    >
                      <i className="bi bi-people"></i>
                    </NavLink>
                    <p>P2P</p>
                  </li>
                  <li className="homenav-item">
                    <NavLink
                      to="/topup"
                      className={({ isActive }) =>
                        isActive ? "linkactive homenav-link" : "homenav-link"
                      }
                    >
                      <i className="bi bi-cash"></i>
                    </NavLink>
                    <p>Top Up</p>
                  </li>
                  <li className="homenav-item">
                    <NavLink
                      to="/Transfer_Main"
                      className={({ isActive }) =>
                        isActive ? "linkactive homenav-link" : "homenav-link"
                      }
                    >
                     <i className="bi bi-arrow-left-right"></i>
                    </NavLink>
                    <p>Transfer</p>
                  </li>
                </ul>
           </div>
           <div className="morefeature_row"></div>
           <div className="morefeature_row"></div>
        </div>
        </div>
    )
}