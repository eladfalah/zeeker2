import React from 'react';
import {PaymentPageBar} from "./PaymentPageBar"
export const PaymentPage1 = () => {
  return (
    <>
      <div className='container pb-5'>
<PaymentPageBar page_num={0} />        
<div className='container m-2 col-6 d-flex flex-row'>
          <img src='../../public/assets/carandphone.png' />
        </div>
        <div className="card bg-secondary text-white w-auto d-inline-block" dir="rtl">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-secondary border-bottom border-light">
              <h5 className="mb-0 text-white text-nowrap">סיכום ההזמנה שלך</h5>
            </li>

            <li className="list-group-item bg-secondary text-white d-flex flex-column gap-2">
              <div className="d-flex justify-content-between align-items-baseline w-100 gap-4">
                <div className="d-flex align-items-baseline gap-1 text-nowrap">
                  <span className="fw-bolder fs-5">עלות הזמנה</span>
                  <small className="text-white-50">(כולל אגרת רישוי)</small>
                </div>
                <span className="fw-bolder fs-5 text-nowrap">₪15,000</span>
              </div>

              <div className="d-flex justify-content-between align-items-center w-100 gap-4">
                <div className="text-nowrap">
                  <span>הנחת מבצע</span>
                </div>
                <span className="fw-bold text-danger text-nowrap">-₪15,000</span>
              </div>
            </li>

            <li className="list-group-item bg-secondary text-white text-nowrap">
              <div className="d-flex justify-content-between align-items-baseline w-100 gap-4">
                <div className="d-flex align-items-baseline gap-1 text-nowrap">
                  <span className="fw-bolder fs-5">סה"כ שולם</span>
                </div>
                <span className="fw-bolder fs-5 text-nowrap">₪15,000</span>
              </div>

              <div className="d-flex justify-content-between align-items-center w-100 gap-6">
                <div className="text-nowrap">
                  <small>❶ עד ארבעה ימי עסקים</small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
<div className='d-flex justify-content-start'>
<span>
דניאל אביב, נציג/ת המכירות שלך מקבל עדכונים על כל מה שנעשה כאן, כמובן שתוכל לפנות אליו בכל עת.
</span>
</div>
      <div className='footer bg-secondary position-fixed bottom-0 start-0 w-100 p-3 text-center text-white'>
       <div>
<div className='d-flex justify-content-between'>

<h4>9600</h4>
<h4>יתרת תשלום</h4>

</div>

<div className='d-flex justify-content-center'>

<div className='btn bg-warning m-1 p-2 w-50'>העברה בנקית</div>
<div className='btn bg-warning m-1 p-2 w-50'>אפשרויות מימון</div>

</div>
</div> 
      </div>
    </> 
  );
};

export default PaymentPage1;
