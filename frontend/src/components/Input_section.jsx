import React from 'react';

export const Input_section = ({ name, type, text, value, onChange, disabled }) => {
  return (
    <div className="d-flex flex-column input-group container m-1">
      <label className="text-white text-end">{text}</label>
      <input 
        className="bg-dark text-white rounded" 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input_section;
