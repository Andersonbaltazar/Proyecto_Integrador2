import React from 'react';

const AddButton = ({ label, onClick }) => {
  return (
    <div className="add-button-container d-flex align-center justify-center">
      <button className="add-button" onClick={onClick}>
        <span className="text-add-button">{label}</span>
      </button>
    </div>
  );
};

export default AddButton;