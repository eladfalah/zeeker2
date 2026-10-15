// Bottom_bar.jsx
import React from 'react';
import { Orange_button } from "./Orange_button";
import { Carousel } from "./Carousel";

export const Bottom_bar = () => {
  const icons = ["paper", "grey_car", "flower", "Icons"];

  return (
    <div className="fixed-bottom w-100">
      <Carousel />

      <div className="position-relative w-100">
        <svg
          viewBox="0 0 375 60"
          className="w-100 d-block"
          preserveAspectRatio="none"
          style={{ height: '65px' }}
        >
          <path
            d="M0,0 
               L140,0 
               C155,0 160,30 187.5,30 
               C215,30 220,0 235,0 
               L375,0 
               L375,60 
               L0,60 
               Z"
            fill="#212529"
          />
        </svg>

        <div className="position-absolute top-0 start-50 translate-middle">
          <Orange_button
            text={"מוקד\n24/7"}
            shape="rounded-circle fw-bold shadow"
            style={{ 
              width: '64px', 
              height: '64px', 
              fontSize: '11px', 
              whiteSpace: 'pre-line',
              lineHeight: '1.2' 
            }}
          />
        </div>

        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-around align-items-center px-3">
          <div className="d-flex justify-content-around align-items-center col-5">
            <img src={`/assets/icons/${icons[0]}.png`} alt={icons[0]} />
            <img src={`/assets/icons/${icons[1]}.png`} alt={icons[1]} />
          </div>

          <div className="col-2"></div>

          <div className="d-flex justify-content-around align-items-center col-5">
            <img src={`/assets/icons/${icons[2]}.png`} alt={icons[2]} />
            
            <div className="btn bg-white p-1 border-0 d-flex flex-row align-items-center text-black">
              <span style={{ fontSize: '10px' }}>ראשי</span>
              <img src={`/assets/icons/${icons[3]}.png`} alt={icons[3]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom_bar;
