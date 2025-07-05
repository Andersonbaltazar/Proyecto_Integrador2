import Sidebar from '../components/layouts/Sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import useCropStore from '../store/useCropStore';
import mangoImg from '../assets/images/mango.jpeg';

const productivityData = [
  { crop: 'Manzana', planned: '400 Tn', actual: '387 Tn', diff: '-3%', perPlant: '0.12 Tn', perArea: '32.2 Tn/Ha' },
  { crop: 'Arándano', planned: '170 Tn', actual: '175 Tn', diff: '+3%', perPlant: '0.08 Tn', perArea: '30.2 Tn/Ha' },
  { crop: 'Cereza', planned: '120 Tn', actual: '110 Tn', diff: '-8%', perPlant: '0.07 Tn', perArea: '28.1 Tn/Ha' },
];

const codeExamples = [
  {
    title: 'Obtener cultivos activos',
    code: `const activos = crops.filter(s => s.estado === 'Activo');`
  },
  {
    title: 'Calcular promedio de antigüedad',
    code: `const avg = crops.filter(s => s.fechaSiembra)
  .map(s => (today - new Date(s.fechaSiembra)) / 86400000)
  .reduce((a, b) => a + b, 0) / crops.length;`
  },
  {
    title: 'Filtrar por tipo',
    code: `const maiz = crops.filter(s => s.cultivo === 'Maíz');`
  }
];

const DashboardPage = () => {
  const crops = useCropStore((state) => state.crops);
  const fetchCrops = useCropStore((state) => state.fetchCrops);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchCrops();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading crops:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchCrops]);

  // Métricas rápidas
  const uniqueTypes = Array.from(new Set(crops.map(s => s.cultivo))).filter(Boolean);
  const uniqueLocations = Array.from(new Set(crops.map(s => s.localidad))).filter(Boolean);
  const sortedByDate = [...crops].filter(s => s.fechaSiembra).sort((a, b) => new Date(a.fechaSiembra) - new Date(b.fechaSiembra));
  const oldest = sortedByDate[0];
  const newest = sortedByDate[sortedByDate.length - 1];

  // Métricas adicionales
  const activeCrops = crops.filter(s => s.estado === 'Activo').length;
  const completedCrops = crops.filter(s => s.estado === 'Completado').length;
  const pendingCrops = crops.filter(s => s.estado === 'Pendiente').length;

  // Promedio de antigüedad de los cultivos (en días)
  const today = new Date();
  const ages = crops
    .filter(s => s.fechaSiembra)
    .map(s => Math.floor((today - new Date(s.fechaSiembra)) / (1000 * 60 * 60 * 24)));
  const avgAge = ages.length > 0 ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;

  return (
    <div className="page-layout d-flex">
      <Sidebar />
      <article className="page-content-container d-flex flex-column">
        <header className="header-dashboard-container d-flex flex-column">
          <h1 className="title-header-dashboard">Inicio</h1>
        </header>
        <section className="enhanced-content">
          {isLoading ? (
            <div className="enhanced-loading">
              <div className="enhanced-loading-spinner"></div>
            </div>
          ) : (
            <>
              {/* Imagen ilustrativa */}
              <div style={{display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem'}}>
                <img src={mangoImg} alt="Ilustración dashboard" style={{width: '180px', borderRadius: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}} />
                <div>
                  <h2 style={{margin: 0}}>¡Bienvenido al panel de productividad!</h2>
                  <p style={{margin: 0}}>Visualiza métricas clave y ejemplos de código para tus cultivos.</p>
                </div>
              </div>

              {/* Resumen rápido */}
              <div className="enhanced-stats-container">
                <div className="enhanced-stats-grid">
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(34, 79, 69, 0.1)', color: 'var(--primary-color)'}}>
                      <ion-icon name="leaf"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{uniqueTypes.length}</h3>
                      <p className="enhanced-stat-label">Tipos de cultivo</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(174, 237, 114, 0.1)', color: 'var(--secondary-color)'}}>
                      <ion-icon name="location"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{uniqueLocations.length}</h3>
                      <p className="enhanced-stat-label">Localidades distintas</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', color: '#28a745'}}>
                      <ion-icon name="trending-up"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{activeCrops}</h3>
                      <p className="enhanced-stat-label">Cultivos activos</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(40, 167, 69, 0.1)', color: '#28a745'}}>
                      <ion-icon name="checkmark-circle"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{completedCrops}</h3>
                      <p className="enhanced-stat-label">Cultivos completados</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#ffc107'}}>
                      <ion-icon name="time"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{pendingCrops}</h3>
                      <p className="enhanced-stat-label">Cultivos pendientes</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(23, 162, 184, 0.1)', color: '#17a2b8'}}>
                      <ion-icon name="calendar"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{oldest ? new Date(oldest.fechaSiembra).toLocaleDateString('es-ES') : '-'}</h3>
                      <p className="enhanced-stat-label">Cultivo más antiguo</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(23, 162, 184, 0.1)', color: '#17a2b8'}}>
                      <ion-icon name="calendar"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{newest ? new Date(newest.fechaSiembra).toLocaleDateString('es-ES') : '-'}</h3>
                      <p className="enhanced-stat-label">Cultivo más reciente</p>
                    </div>
                  </div>
                  <div className="enhanced-stat-card">
                    <div className="enhanced-stat-icon" style={{backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff'}}>
                      <ion-icon name="hourglass"></ion-icon>
                    </div>
                    <div className="enhanced-stat-content">
                      <h3 className="enhanced-stat-value">{avgAge} días</h3>
                      <p className="enhanced-stat-label">Antigüedad promedio</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabla de productividad por cultivo */}
              <div className="enhanced-card" style={{marginBottom: '2rem', padding: '2rem'}}>
                <h3 style={{marginTop: 0}}>Productividad por cultivo</h3>
                <div style={{overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: 'rgba(34, 79, 69, 0.05)'}}>
                        <th style={{padding: '8px'}}>Cultivo</th>
                        <th style={{padding: '8px'}}>Planificado</th>
                        <th style={{padding: '8px'}}>Real</th>
                        <th style={{padding: '8px'}}>Diferencia</th>
                        <th style={{padding: '8px'}}>Por planta</th>
                        <th style={{padding: '8px'}}>Por área</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productivityData.map((row, idx) => (
                        <tr key={idx} style={{textAlign: 'center', borderBottom: '1px solid #eee'}}>
                          <td style={{padding: '8px'}}>{row.crop}</td>
                          <td style={{padding: '8px'}}>{row.planned}</td>
                          <td style={{padding: '8px'}}>{row.actual}</td>
                          <td style={{padding: '8px', color: row.diff.startsWith('+') ? 'green' : row.diff.startsWith('-') ? 'red' : 'inherit'}}>{row.diff}</td>
                          <td style={{padding: '8px'}}>{row.perPlant}</td>
                          <td style={{padding: '8px'}}>{row.perArea}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bloques de código de ejemplo */}
              <div className="enhanced-card" style={{marginBottom: '2rem', padding: '2rem'}}>
                <h3 style={{marginTop: 0}}>Ejemplos de código</h3>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem'}}>
                  {codeExamples.map((ex, idx) => (
                    <div key={idx} style={{flex: 1, minWidth: '220px'}}>
                      <strong>{ex.title}</strong>
                      <pre style={{background: '#f8f9fa', borderRadius: '1rem', padding: '1rem', fontSize: '0.95em', marginTop: '0.5rem', overflowX: 'auto'}}>
                        <code>{ex.code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </article>
    </div>
  );
};

export default DashboardPage;