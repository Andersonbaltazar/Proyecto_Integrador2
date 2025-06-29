import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProgressPanelItem from '../components/CropsListItem';
import CultivoModal from '../CultivoModal';
import EnhancedButton from '../widgets/EnhancedButton';
import PropTypes from 'prop-types';

const CropsList = ({ data }) => {

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {data.length === 0 ? (
        <div className="enhanced-empty-state">
          <h3 className="enhanced-empty-title">No hay sembríos registrados</h3>
          <p className="enhanced-empty-text">Agrega tu primer sembrío para comenzar a ver su progreso 📈</p>
          <div className="button-container d-flex justify-center align-center">
            <EnhancedButton
              onClick={toggleModal}
              variant="success"
              size="large"
              className="enhanced-empty-button"
            >
              <ion-icon name="add" style={{ marginRight: 'calc(var(--size) * 2)' }}></ion-icon>
              Agregar Sembrío
            </EnhancedButton>
          </div>
        </div>
      ) : (
        data.map((item, index) => {
          const bgClass = index % 2 === 0 ? "enhanced-card progress-card-1" : "enhanced-card progress-card-2";
          return (
            <Link to={`/crops/${item.id}`} key={item.id} state={{ item }} style={{ textDecoration: 'none' }}>
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
