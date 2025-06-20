import PropTypes from 'prop-types';

const FormLabel = ({ label, name, type, placeholder }) => {
  return (
    <div className="form-group d-flex justify-between align-center">
        <label className="form-label text-left">{label}:</label>
        <input type={type} className="form-input" name={name} placeholder={placeholder} required />
    </div>
  );
};

FormLabel.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormLabel;