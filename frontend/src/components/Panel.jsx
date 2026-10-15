import React from 'react';

export const Panel = ({ icon, top_text,bottom_text }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-dark p-3 rounded text-white text-center w-100 h-100">
      <img 
        src={icon ? `../../public/assets/icons/${icon}` : "..."} 
        alt={'icon'} 
        className="img-fluid mw-100 mh-100"
      />
<small className='wrap text-secondary'>{top_text}</small>
<span className="mt-2 text-truncate w-100 fs-6">
        {bottom_text}
      </span>
    </div>
  );
};

export default Panel;
