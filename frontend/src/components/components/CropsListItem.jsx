import PropTypes from 'prop-types';

const CropsListItem = ({ item, customClass }) => {

  const { nombre, tipoTerreno, fechaSiembra } = item;

  return (
    <button className={`button ${customClass} d-flex flex-column gap-2 justify-center`}>
      <h2 className="title-progress-card text-center">{nombre}</h2>
      <p className="paragraph-progress-card text-center">{tipoTerreno.nombre}</p>
      <p className="paragraph-progress-card text-center">{fechaSiembra}</p>
    </button>
  );
};

CropsListItem.propTypes = {
  item: PropTypes.array.isRequired,
  customClass: PropTypes.string
};

export default CropsListItem;