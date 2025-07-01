import PropTypes from 'prop-types';

const Form = ({ children, customClass = "", onSubmit }) => {
  return (
    <form className={`${customClass} form-container`} method="POST" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default Form;