import { useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import CropsList from '../components/modules/CropsList';
import SearchBar from '../components/widgets/SearchBar';
import Button from '../components/widgets/Button';
import CultivoModal from '../components/CultivoModal';
import PropTypes from 'prop-types';

const CropsPage = ({ data, onSearch }) => {

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <article className="dashboard-content-container d-flex flex-column">
        <header className="header-dashboard-container d-flex flex-column gap-4">
          <h1 className="title-header-dashboard">Sembríos</h1>
            <div className="dashboard-search-controls d-flex justify-between align-center gap-2">
              <SearchBar placeholder="Buscar sembríos..." onSearch={onSearch} />
              <div className="control-buttons d-flex gap-4">
                <Button className='button--secondary' onClick={toggleModal}>
                  <ion-icon name="add"></ion-icon>
                </Button>
                <Button className='button--secondary'>
                  <ion-icon name="filter"></ion-icon>
                </Button>
              </div>
            </div>
        </header>
        <section className="progress-container gap-2 ">
          <CropsList data={data} />
        </section>
      </article>
    </div>
    <CultivoModal show={showModal} toggle={toggleModal} />
    </>
  );
};

CropsPage.propTypes = {
  data: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default CropsPage;
