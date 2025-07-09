import Sidebar from '../components/layouts/Sidebar';
import { useEffect, useState } from 'react';
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
    code: `const avg = crops.filter(s => s.fechaSiembra)\n  .map(s => (today - new Date(s.fechaSiembra)) / 86400000)\n  .reduce((a, b) => a + b, 0) / crops.length;`
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
    <div style={{background: '#f8faf5', minHeight: '100vh', display: 'flex'}}>
      <Sidebar />
      <main style={{flex: 1, padding: '2.5rem 2rem', maxWidth: 1200, margin: '0 auto'}}>
        <header style={{marginBottom: '2.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <div>
              <h1 className='enhanced-title'>¡Bienvenido a tu Dashboard!</h1>
              <p style={{margin: 0, color: '#444'}}>Visualiza métricas clave, productividad y ejemplos de código para tus cultivos.</p>
            </div>
          </div>
        </header>
          {isLoading ? (
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200}}>
              <div className="enhanced-loading-spinner"></div>
            </div>
          ) : (
            <>
            {/* Métricas rápidas */}
            <section style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem', justifyContent: 'center'}}>
              <div style={{background: '#fff', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', minWidth: 180, flex: '1 1 180px', textAlign: 'center'}}>
                <div style={{fontSize: 32, marginBottom: 8, color: '#2d5a27'}}><ion-icon name="leaf"></ion-icon></div>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.3rem'}}>{uniqueTypes.length}</h3>
                <p style={{margin: 0, color: '#888'}}>Tipos de cultivo</p>
              </div>
              <div style={{background: '#fff', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', minWidth: 180, flex: '1 1 180px', textAlign: 'center'}}>
                <div style={{fontSize: 32, marginBottom: 8, color: '#388e3c'}}><ion-icon name="location"></ion-icon></div>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.3rem'}}>{uniqueLocations.length}</h3>
                <p style={{margin: 0, color: '#888'}}>Localidades distintas</p>
              </div>
              <div style={{background: '#fff', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', minWidth: 180, flex: '1 1 180px', textAlign: 'center'}}>
                <div style={{fontSize: 32, marginBottom: 8, color: '#28a745'}}><ion-icon name="trending-up"></ion-icon></div>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.3rem'}}>{activeCrops}</h3>
                <p style={{margin: 0, color: '#888'}}>Cultivos activos</p>
              </div>
              <div style={{background: '#fff', borderRadius: '1.2rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', minWidth: 180, flex: '1 1 180px', textAlign: 'center'}}>
                <div style={{fontSize: 32, marginBottom: 8, color: '#007bff'}}><ion-icon name="calendar"></ion-icon></div>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.3rem'}}>{avgAge} días</h3>
                <p style={{margin: 0, color: '#888'}}>Antigüedad promedio</p>
              </div>
            </section>


            </>
          )}
      </main>
    </div>
  );
};

export default DashboardPage;