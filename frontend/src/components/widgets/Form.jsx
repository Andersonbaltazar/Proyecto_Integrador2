import React from 'react';

const Form = ({ action = "#", children, customClass = "", onSumbit="" }) => {
  return (
    <form className={`${customClass} form-container`} method="POST" action={action} onSubmit={onSumbit}>
      {children}
    </form>
  );
};

export default Form;