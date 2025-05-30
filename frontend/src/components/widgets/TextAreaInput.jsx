import React from 'react';

const TextAreaInput = ({ label, name, placeholder = "", rows = 4, required = false }) => {
  return (
    <div className="form-group d-flex justify-between align-center">
      <label htmlFor={name} className="form-label text-left">{label}:</label>
      <textarea id={name} name={name} className="form-input" placeholder={placeholder} rows={rows} required={required}></textarea>
    </div>
  );
};

export default TextAreaInput;