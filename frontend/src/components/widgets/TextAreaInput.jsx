import PropTypes from 'prop-types';

const TextAreaInput = ({ label, name, placeholder = "", rows = 4, required = false }) => {
  return (
    <div className="form-group d-flex justify-between align-center">
      <label htmlFor={name} className="form-label text-left">{label}:</label>
      <textarea id={name} name={name} className="form-input" placeholder={placeholder} rows={rows} required={required}></textarea>
    </div>
  );
};

TextAreaInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
};

export default TextAreaInput;