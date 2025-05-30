import React from 'react';

const Modal = ({ title, children }) => {
  return (
    <div className="modal-overlay d-flex align-center justify-center">
        <div className="modal-content">
            <h1 className='modal-title'>{title}</h1>
            {children}
        </div>
    </div>    
  );
};

export default Modal;