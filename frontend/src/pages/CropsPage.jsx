import { useState, useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import CropsList from '../components/modules/CropsList';
import SearchBar from '../components/widgets/SearchBar';
import Button from '../components/widgets/Button';
import CultivoModal from '../components/CultivoModal';
import useSownStore from '../store/useSownStore';

const CropsPage = () => {
const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sowns = useSownStore((state) => state.sowns);
  const fetchSowns = useSownStore((state) => state.fetchSowns);

  useEffect(() => {
    fetchSowns();
  }, [fetchSowns]);

  const filteredSowns = sowns.filter((c) =>
    c.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModal = () => setShowModal((prev) => !prev);



  return (
    <>
      <div className="page-layout d-flex">
        <Sidebar />
        <article className="page-content-container d-flex flex-column">
          <header className="header-dashboard-container d-flex flex-column gap-4">
            <h1 className="title-header-dashboard">Sembríos</h1>
            <div className="dashboard-search-controls d-flex justify-between align-center gap-2">
              <SearchBar
                placeholder="Buscar sembríos..."
                onSearch={setSearchTerm}
              />
              <div className="control-buttons d-flex gap-4">
                <Button className='button' onClick={toggleModal}>
                  <ion-icon name="add"></ion-icon>
                </Button>
                <Button className='button'>
                  <ion-icon name="filter"></ion-icon>
                </Button>
              </div>
            </div>
          </header>
          <section className="progress-container gap-2 ">
            <CropsList data={filteredSowns} />
          </section>
        </article>
      </div>
      <CultivoModal show={showModal} toggle={toggleModal} />
    </>
  );
};

export default CropsPage;
