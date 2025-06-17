import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProgressPanelItem from '../components/CropsListItem';
import CultivoModal from '../CultivoModal';
import Button from '../widgets/Button';
import PropTypes from 'prop-types';

const CropsList = ({ fruits }) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {fruits.length === 0 ? (
        <div className="progress-card-empty d-flex flex-column text-center gap-2">
          <h3 className='title-progress-card-empty'>No hay sembríos registrados</h3>
          <p className='paragraph-progress-card-empty'>Agrega tu primer sembrío para comenzar a ver su progreso 📈</p>
          <div className="button-container d-flex justify-center align-center">
            <Button label="Agregar Sembrío" onClick={toggleModal} className='add-button' />
          </div>
        </div>
      ) : (
        fruits.map((fruit, index) => {
          const bgClass = index % 2 === 0 ? "progress-card-1" : "progress-card-2";
          return (
            <Link to={`/crops/${fruit.id}`} key={fruit.id}>
              <ProgressPanelItem
                title={fruit.title}
                growth={fruit.growth}
                image={fruit.image}
                customClass={bgClass}
              />
            </Link>
          );
        })
      )}
    </div>
    <CultivoModal show={showModal} toggle={toggleModal} />
    </>
  );
};

CropsList.propTypes = {
  fruits: PropTypes.array.isRequired,
};

export default CropsList;
