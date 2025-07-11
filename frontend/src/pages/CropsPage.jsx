import { useState, useEffect } from 'react';

import Sidebar from '../components/layouts/Sidebar';
import CropsList from '../components/modules/CropsList';
import CropsStats from '../components/modules/CropsStats';
import EnhancedSearchBar from '../components/widgets/EnhancedSearchBar';
import EnhancedButton from '../components/widgets/EnhancedButton';
import CultivoModal from '../components/CultivoModal';
import useCropStore from '../store/useCropStore';

const FILTERS = [
  { label: 'Todos', value: 'all' },
  { label: 'Activos', value: 'activo' },
  { label: 'Completados', value: 'completado' },
];

const CropsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const crops = useCropStore((state) => state.crops);
  const fetchCrops = useCropStore((state) => state.fetchCrops);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchCrops();
      } catch (error) {
        console.error('Error loading crops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchCrops]);

  // Filtrado por estado y búsqueda
  const filteredCrops = crops.filter((c) => {
    const matchesSearch =
      c.cultivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'activo' && c.estado === 'Activo') ||
      (statusFilter === 'completado' && c.estado === 'Completado');
    return matchesSearch && matchesStatus;
  });

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleFilter = () => setFilterActive((prev) => !prev);

  const handleAddCrop = () => {
    toggleModal();
  };

  const handleFilterClick = () => {
    toggleFilter();
  };

  return (
    <div className="crops-page-root">
        <div className="enhanced-page-container">
        <div className="page-layout d-flex">
          <Sidebar />
          <article className="page-content-container d-flex flex-column">
            {/* Enhanced Header */}
            <header className="enhanced-header">
              <h1 className="enhanced-title">Cultivos</h1>
              <div className="enhanced-controls">
                <EnhancedSearchBar
                  placeholder="Buscar cultivos..."
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
                </div>
              </div>
              {/* Filtros por estado */}
              <div className="crop-status-filters" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                {FILTERS.map(f => (
                  <button
                    key={f.value}
                    className={`crop-status-btn${statusFilter === f.value ? ' active' : ''}`}
                    onClick={() => setStatusFilter(f.value)}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: statusFilter === f.value ? '#2d5a27' : '#fff',
                      color: statusFilter === f.value ? '#fff' : '#2d5a27',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
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
                  {crops.length > 0 && (
                    <CropsStats data={crops} searchTerm={searchTerm} />
                  )}
                  
                  {/* List Section */}
                  <div className="enhanced-list-container">
                    {filteredCrops.length === 0 ? (
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
                      <CropsList data={filteredCrops} />
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
    </div>
  );
};

export default CropsPage;
