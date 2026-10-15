import React from 'react';
import { PanelsBoard } from '../PanelsBoard'
import  { Orange_button } from '../Orange_button'
import { icon } from '@fortawesome/fontawesome-svg-core';
export const Services_page = () => {
let servises=[
{bottom_text:"טיפול תקופתי", icon:"calen.png"},
{bottom_text:"טיפול חורף", icon:"wint.png"},
{bottom_text:"טיפול קיץ", icon:"sumer.png"},
{bottom_text:"פחחות", icon:"brush.png"},
{bottom_text:"התקנת אביזרים", icon:"wheel.png"},
{bottom_text:"הכנה לטקסט", icon:"v.png"},
{bottom_text:"טיפול אחרי תאונה", icon:"exed.png"},
{bottom_text:"ריקול לרחב", icon:"recall.png"},
]
 return (
<>
<div className='container'  >
    <div className='container row-6'>
     <PanelsBoard  data={servises} title={"באיזה שירות אתם מעונינים"} isGrid={true}/>

    </div>
<div className='container row-6 d-flex mt-2 justify-content-center'><Orange_button /></div>
</div>
</>
  );
};

export default Services_page;
