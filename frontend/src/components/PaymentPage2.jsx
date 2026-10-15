import React from 'react';
import{PaymentPageBar} from './PaymentPageBar'
export const PaymentPage2 = () => {
  return (
<>
<PaymentPageBar page_num={1}/>
    <div className="d-flex flex-column align-items-start ms-auto text-white text-end" dir="rtl">
      <span className="fw-bold text-white">צירוף אישור תשלום</span>
      <small className="text-white">כאן ניתן להעלות את מסמך ההעברה בנקאית</small>
      <small className="text-white">*כאן אפשר להעלות את אישור ההעברה הבנקאית. קובץ אחד בכל ההעלאה בבקשה</small>
    </div>
<div className='p-2'>
           <div className="border border-1 p-2 d-flex justify-content-end" style={{ borderStyle: 'dashed !important'}} >
           <label htmlFor="formFile">צילום רישיון נהיגה</label>
          
<img className="m-2" src='../../public/assets/icons/upload.png' />
<input className="form-control d-none" type="file" id="formFile" accept="image/*,.png, .jpg, .svg" />
            </div>

</div>
        <div className="card bg-secondary text-white w-auto d-inline-block" dir="rtl">
          <ul className="list-group list-group-flush">

            <li className="list-group-item bg-secondary text-white d-flex flex-column gap-2">
              <div className="d-flex justify-content-between align-items-baseline w-100 gap-4">
                <div className="d-flex align-items-baseline gap-1 text-nowrap">
                  <span className="fw-bolder fs-5">עלות הזמנה</span>
                  <small className="text-white-50">(כולל אגרת רישוי)</small>
                </div>
                <span className="fw-bolder fs-5 text-nowrap">₪15,000</span>
              </div>

            </li>

          </ul>
        </div>

</>  
);
};

export default PaymentPage2;
