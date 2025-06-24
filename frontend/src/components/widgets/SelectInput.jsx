import PropTypes from 'prop-types';

const SelectInput = ({ label, name, options = [], required = false, onChange }) => {
  return (
    <div className="form-group d-flex align-center">
      <label htmlFor={name} className="form-label text-left">{label}:</label>
      <select name={name} id={name} className="form-input" required={required} onChange={onChange} >
        <option value="">-- Selecciona una opción --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  required: PropTypes.bool,
};

export default SelectInput;