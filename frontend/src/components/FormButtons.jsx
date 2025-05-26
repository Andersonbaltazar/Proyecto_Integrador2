import React from 'react';

const FormButtons = ({ label, customclass, toggleModal = () => {} }) => {
  return (
    <div className={`form-group ${customclass} d-flex gap-5 align-center`}>
      <button className='cancel-button' type="button" onClick={toggleModal}>Cancelar</button>
      <button className='add-button' type="submit">{label}</button>
    </div>
  );
};

export default FormButtons;