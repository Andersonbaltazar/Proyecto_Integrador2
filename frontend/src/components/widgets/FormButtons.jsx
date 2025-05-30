import React from 'react';
import Button from './Button';

const FormButtons = ({ label, customclass, toggleModal = () => {} }) => {
  return (
    <div className={`form-group ${customclass} d-flex gap-5 align-center`}>
      <Button
        type="button"
        onClick={toggleModal}
        label="Cancelar"
        className="cancel-button"
      />
        <Button
        type="button"
        label={label}
        className="add-button"
      />
    </div>
  );
};

export default FormButtons;