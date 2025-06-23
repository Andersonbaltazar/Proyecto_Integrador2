import PropTypes from 'prop-types';

const CropsListItem = ({ item, customClass }) => {

  const { nombre_sembrio, cultivo, fecha_sembrio } = item;

  return (
    <button className={`button ${customClass} d-flex flex-column gap-2 justify-center`}>
      <h2 className="title-progress-card text-center">{nombre_sembrio}</h2>
      <p className="paragraph-progress-card text-center">{cultivo}</p>
      <p className="paragraph-progress-card text-center">{fecha_sembrio}</p>
    </button>
  );
};

CropsListItem.propTypes = {
  item: PropTypes.array.isRequired,
  customClass: PropTypes.string
};

export default CropsListItem;