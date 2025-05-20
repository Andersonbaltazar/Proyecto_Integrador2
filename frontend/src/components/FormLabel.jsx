import React from 'react';

const FormLabel = ({ label, name, type, placeholder }) => {
  return (
    <div className="form-group d-flex justify-between align-center">
        <label className="form-label text-left">{label}:</label>
        <input type={type} className="form-input" name={name} placeholder={placeholder} required />
    </div>
  );
};

export default FormLabel;