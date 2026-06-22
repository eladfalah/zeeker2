import React from 'react';
import {Panel} from './Panel.jsx'

export const Carousel = ({slides}) => {

let safeSlides = slides || [];
return (
<>
<div id="carouselExampleControls" className="carousel slide container d-flex "  data-bs-interval="false">
<div className="carousel-inner">
{
safeSlides.map((slide, index)=>
        <div key={index} className={`carousel-item ${index==0?'active':''}`}>
{slide}        
</div>
      )}
</div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
</>
);
};

export default Carousel;  
