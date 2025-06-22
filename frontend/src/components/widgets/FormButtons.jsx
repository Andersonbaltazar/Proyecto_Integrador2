import PropTypes from 'prop-types';
import Button from './Button';

const FormButtons = ({ label, customclass, toggleModal }) => {
  return (
    <div className={`form-group ${customclass} d-flex gap-5 align-center`}>
      <Button
        type="button"
        onClick={toggleModal}
        label="Cancelar"
        className="button cancel-button"
      />
      <Button
        type="submit"
        label={label}
        className="button add-button"
      />
    </div>
  );
};

FormButtons.propTypes = {
  label: PropTypes.string.isRequired,
  customclass: PropTypes.string,
  toggleModal: PropTypes.func.isRequired,
};

export default FormButtons;