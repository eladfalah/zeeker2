import React from 'react';
import {Input_section} from './Input_section'
import {Orange_button} from './Orange_button'
export const Register_page = () => {
let fields=[
['שם פרטי', 'text'],
['שם משפחה', 'text'],
['תעודת זהות', 'number'],
['תאריך לידה', 'date'],
['מספר טלפון', 'number'],
['כתובת מייל', 'email'],
['עיר מגורים', 'text'],
['רחוב', 'text'],
['מספר בית', 'number'],
] 
let i=-1
return (
      
    <>
<div className='baner container-fluid'>
<div className='row'>
<ul className='list-group'>{fields.map(field=><li key={`${++i}`} className='list-group-item bg-black bg-75-100 text-white border border-black'><Input_section name={`n${i}`} text={`${field[0]}`} type={field[1]}></Input_section></li> )}</ul>    
</div>
</div>
<div className='container bottom'>
<div className='row'>
<h6 className=''>איך לדכן פרטים?</h6>
<span className=''>מייל וכתובת על ידי לחיצה על העיפרון</span>
<span className=''>שם, ת.ז, תאריך לידה וטלפון ע"י צילום רישיון הנהיגה </span>
</div>

<div className='row'>
<div class="input-group">
  <label for="fromFile"></label>

  <input className="form-control " type="file" id="formFile" accept="image/*,.png, .jpg, .svg" />
<Orange_button text="קדימה" />
</div>
</div>
</div>
</>
  );
};

export default Register_page;
