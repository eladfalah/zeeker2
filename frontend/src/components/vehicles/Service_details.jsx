import React from 'react';
import { InfoPanel } from './../InfoPanel';

import { PanelsBoard } from './../PanelsBoard';
export const Service_details = () => {
  const buttonsList =  [
    <button
      type="button"
      className="btn text-white btn-warning d-flex align-items-center justify-content-center text-center p-0 flex-shrink-0"
      
    
    >
      "המסמכים שלך"
    </button>
 
] ;
let details=[
{top_text:"מועד עלייה לכביש", bottom_text:"ינואר 2020",icon:"rouad.png"},
{top_text:"הנעה", bottom_text:"חשמלית",icon:"but.png"},
{top_text:"רמת גימור", bottom_text:"PRO 460",icon:"v.png"},
{top_text:"מרווח טיפולים", bottom_text:"שנה",icon:"wheel.png"},
{top_text:"קיבולת סוללה", bottom_text:"53 קוטש",icon:"but.png"},
{top_text:"טווח סוללה", bottom_text:"PRO 460",icon:"tander.png"},
{top_text:"סוג חיבור AC", bottom_text:"A",icon:"elct.png"},
{top_text:"סוג חיבור DC", bottom_text:"B",icon:"elct.png"},
{top_text:"הספק טעינה מקסימאלי", bottom_text:"AC 70kW",icon:"tander.png"},
{top_text:"הספק טעינה מקסימאלי", bottom_text:"DC 70kW",icon:"tander.png"},
{top_text:"לחץ אוויר קדידמי", bottom_text:"PSI 36",icon:"wheel.png"},
{top_text:"לחץ אוויר אחורי", bottom_text:"PSI 36",icon:"wheel.png"},
{top_text:"תאוצה מ-0 ל-100", bottom_text:"7.7 שניות",icon:"car.png"},
{top_text:"הספק מירבי", bottom_text:"204 כ''ס",icon:"arrow.png"},
]

return (
      
    <div>
             <div className="container mt-5 mb-5">
          <InfoPanel 
            title={ 'טוען פרטי רכב...'} 
            text={'fyktuffy'}
buttons={buttonsList}         
imgUrl={"https://purepng.com/public/uploads/large/mercedes-car-eqc-300kw-edition-ytq.png"}

/>
        </div>
   <div className='container row-6'>
     <PanelsBoard  data={details} title={"באיזה שירות אתם מעונינים"} isGrid={false}/>

    </div>

    </div>
  );
};

export default Service_details;
