import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProgressPanelItem from '../components/CropsListItem';
import CultivoModal from '../CultivoModal';
import Button from '../widgets/Button';
import PropTypes from 'prop-types';

const CropsList = ({ data }) => {

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {data.length === 0 ? (
        <div className="progress-card-empty d-flex flex-column text-center gap-2">
          <h3 className='title-progress-card-empty'>No hay sembríos registrados</h3>
          <p className='paragraph-progress-card-empty'>Agrega tu primer sembrío para comenzar a ver su progreso 📈</p>
          <div className="button-container d-flex justify-center align-center">
            <Button label="Agregar Sembrío" onClick={toggleModal} className='button add-button' />
          </div>
        </div>
      ) : (
        data.map((item, index) => {
          const bgClass = index % 2 === 0 ? "progress-card-1" : "progress-card-2";
          return (
            <Link to={`/crops/${item.id}`} key={item.id} state={{ item }}>
              <ProgressPanelItem
                item={item}
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
  data: PropTypes.array.isRequired,
};

export default CropsList;
