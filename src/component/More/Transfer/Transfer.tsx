import React, { useState, useEffect } from "react";
import { Route, Routes, NavLink, Navigate } from "react-router-dom";
import Transf from "./transf/transf";
import "./Transfer.css"

export default function Transfer() {

  return (
    <>
        <div className="Mother_transfer_box">
            <div className="Transfer_back_box"> 
              <NavLink
                      to="/more"
                      className="Transfer_backspace">
                    <i className="bi bi-arrow-left"></i>
                    </NavLink> 
                    <h4>Transfer</h4>
                    <h5>
                    <NavLink 
                  to="/transfer_history"
                  className={({ isActive }) => isActive ? "Transfer_link Transfer_link_active" : "Transfer_link"}
                >
                    <i className="bi bi-clock-history"></i> 
                    </NavLink>
                    </h5>  
            </div>
          <Routes>
           <Route path="/" element={<Navigate to="transfer" />} />
            <Route path="transfer" element={<Transf />} />
          </Routes>
        </div>
      
    </>
  );
}
