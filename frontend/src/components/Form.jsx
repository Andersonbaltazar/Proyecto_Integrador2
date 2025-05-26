import React from 'react';

const Form = ({ action = "#", children, customClass = "" }) => {
  return (
    <form className={`${customClass} form-container`} method="POST" action={action}>
      {children}
    </form>
  );
};

export default Form;