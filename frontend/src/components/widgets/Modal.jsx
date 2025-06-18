import PropTypes from 'prop-types';

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

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Modal;