import PropTypes from 'prop-types';

const Modal = ({ title, children }) => {
  return (
    <div className="modal-overlay d-flex align-center justify-center">
        <div className="modal-content">
            <h1 className='modal-title' style={{fontFamily: 'system-ui, sans-serif', marginTop: 0, marginBottom: '2.5rem', fontWeight: 700, fontSize: '1.5rem', color: '#2d5a27', textAlign: 'center'}}>{title}</h1>
            {children}
        </div>
    </div>    
  );
};

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;