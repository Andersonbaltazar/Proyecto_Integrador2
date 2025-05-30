import React from 'react';

const SelectInput = ({ label, name, options = [], required = false }) => {
  return (
    <div className="form-group d-flex align-center">
      <label htmlFor={name} className="form-label text-left">{label}:</label>
      <select name={name} id={name} className="form-input" required={required}>
        <option value="">-- Selecciona una opción --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;