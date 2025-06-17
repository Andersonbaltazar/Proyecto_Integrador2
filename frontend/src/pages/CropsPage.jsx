import { useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import CropsList from '../components/modules/CropsList';
import SearchBar from '../components/widgets/SearchBar';
import Button from '../components/widgets/Button';
import CultivoModal from '../components/CultivoModal';

import mangoImg from '../assets/images/mango.jpeg';
import pearImg from '../assets/images/pear.jpg';
import avocadoImg from '../assets/images/avocado.jpg';
import carrotImg from '../assets/images/carrot.jpg';


const CropsPage = () => {
  const [fruits] = useState([
    { id: 1, title: "Mango", growth: 48, image: mangoImg },
    { id: 2, title: "Pear", growth: 65, image: pearImg },
    { id: 3, title: "Avocado", growth: 94, image: avocadoImg },
    { id: 4, title: "Carrot", growth: 82, image: carrotImg },
  ]);

  const hasFruits = fruits.length > 0;
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <article className="dashboard-content-container d-flex flex-column">
        <header className="header-dashboard-container d-flex flex-column gap-4">
          <h1 className="title-header-dashboard">Sembríos</h1>
          {hasFruits && (
            <div className="dashboard-search-controls d-flex justify-between align-center gap-2">
              <SearchBar placeholder="Buscar sembríos..." />
              <div className="control-buttons d-flex gap-4">
                <Button className='button--secondary' onClick={toggleModal}>
                  <ion-icon name="add"></ion-icon>
                </Button>
                <Button className='button--secondary'>
                  <ion-icon name="filter"></ion-icon>
                </Button>
              </div>
            </div>
          )}
        </header>

        <section className="progress-container gap-2">
          <CropsList fruits={fruits} />
        </section>
      </article>
    </div>
    <CultivoModal show={showModal} toggle={toggleModal} />
    </>
  );
};

export default CropsPage;