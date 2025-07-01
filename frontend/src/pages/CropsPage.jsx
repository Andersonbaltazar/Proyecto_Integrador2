import { useState, useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import CropsList from '../components/modules/CropsList';
import CropsStats from '../components/modules/CropsStats';
import EnhancedSearchBar from '../components/widgets/EnhancedSearchBar';
import EnhancedButton from '../components/widgets/EnhancedButton';
import CultivoModal from '../components/CultivoModal';
import useSownStore from '../store/useSownStore';

const CropsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);

  const sowns = useSownStore((state) => state.sowns);
  const fetchSowns = useSownStore((state) => state.fetchSowns);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchSowns();
      } catch (error) {
        console.error('Error loading crops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchSowns]);

  const filteredSowns = sowns.filter((c) =>
    c.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleFilter = () => setFilterActive((prev) => !prev);

  const handleAddCrop = () => {
    toggleModal();
  };

  const handleFilterClick = () => {
    toggleFilter();
  };

  return (
    <div className="enhanced-page-container">
      <div className="page-layout d-flex">
        <Sidebar />
        <article className="page-content-container d-flex flex-column">
          {/* Enhanced Header */}
          <header className="enhanced-header">
            <h1 className="enhanced-title">Sembríos</h1>
            <div className="enhanced-controls">
              <EnhancedSearchBar
                placeholder="Buscar sembríos..."
                onSearch={setSearchTerm}
              />
              <div className="enhanced-buttons">
                <EnhancedButton
                  onClick={handleAddCrop}
                  icon="add"
                  variant="success"
                  size="medium"
                >
                  Agregar
                </EnhancedButton>
                <EnhancedButton
                  onClick={handleFilterClick}
                  icon="filter"
                  variant={filterActive ? "primary" : "secondary"}
                  size="medium"
                  className={filterActive ? "enhanced-filter-button active" : "enhanced-filter-button"}
                >
                  Filtros
                </EnhancedButton>
              </div>
            </div>
          </header>

          {/* Enhanced Content */}
          <section className="enhanced-content">
            {isLoading ? (
              <div className="enhanced-loading">
                <div className="enhanced-loading-spinner"></div>
              </div>
            ) : (
              <>
                {/* Stats Section */}
                {sowns.length > 0 && (
                  <CropsStats data={sowns} searchTerm={searchTerm} />
                )}
                
                {/* List Section */}
                <div className="enhanced-list-container">
                  {filteredSowns.length === 0 ? (
                    <div className="enhanced-empty-state">
                      <h3 className="enhanced-empty-title">
                        {searchTerm ? 'No se encontraron sembríos' : 'No hay sembríos registrados'}
                      </h3>
                      <p className="enhanced-empty-text">
                        {searchTerm 
                          ? 'Intenta con otros términos de búsqueda 🔍'
                          : 'Agrega tu primer sembrío para comenzar a ver su progreso 📈'
                        }
                      </p>
                      {!searchTerm && (
                        <EnhancedButton
                          onClick={handleAddCrop}
                          variant="success"
                          size="large"
                          className="enhanced-empty-button"
                        >
                          <ion-icon name="add" style={{ marginRight: 'calc(var(--size) * 2)' }}></ion-icon>
                          Agregar Sembrío
                        </EnhancedButton>
                      )}
                    </div>
                  ) : (
                    <CropsList data={filteredSowns} />
                  )}
                </div>
              </>
            )}
          </section>
        </article>
      </div>
      
      {/* Enhanced Modal */}
      <CultivoModal show={showModal} toggle={toggleModal} />
    </div>
  );
};

export default CropsPage;
