import React from 'react';

export const Orange_button = ({ text, action, shape = '', style = {} }) => {
  const handleClick = () => {
    if (typeof action === 'function') {
      action();
    }
  };

  const className = `btn text-white btn-warning d-flex align-items-center justify-content-center text-center p-0 flex-shrink-0 ${shape}`;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default Orange_button;
