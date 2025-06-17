import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ action = "#", children, customClass = "", onSumbit="" }) => {
  return (
    <form className={`${customClass} form-container`} method="POST" action={action} onSubmit={onSumbit}>
      {children}
    </form>
  );
};

Form.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node,
  customClass: PropTypes.string,
  onSumbit: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export default Form;