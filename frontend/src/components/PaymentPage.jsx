import React from 'react';

export const PaymentPageBar = ({ page_num = 0 }) => {
  return (
    <div className="d-flex justify-content-center my-3">
      <div className="d-flex flex-row" style={{ width: 'fit-content' }}>
        {["סיום תהליך", "דיווח העברה", "תשלום"].map((obj, i) => {
          const stepIndex = 2 - i;
          const isPassed = page_num > stepIndex;
          const isCurrent = page_num === stepIndex;
          
          const style = {
            border: 'none',
            borderBottom: `3px solid ${isPassed ? '#ffc107' : '#dee2e6'}`,
            width: '110px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0
          };

          let name = `mx-1 py-2 ${isPassed ? 'text-warning' : 'text-white'} bg-transparent`;
          
          return (
            <div className={name} key={i} style={style}>
              <small>{isCurrent ? obj : (isPassed ? 'v' : ' ')}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentPageBar;
