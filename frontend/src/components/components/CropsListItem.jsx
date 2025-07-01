import PropTypes from 'prop-types';

const CropsListItem = ({ item, customClass }) => {
  if (!item) return null;

  const { nombre, cultivo, fechaSiembra,  estado, localidad } = item;

  
  // Determinar el estado del cultivo
  const getStatusClass = () => {
    if (estado === 'completado') return 'completed';
    if (estado === 'activo') return 'active';
    return 'pending';
  };

  const getStatusText = () => {
    if (estado === 'completado') return 'Completado';
    if (estado === 'activo') return 'Activo';
    return 'Pendiente';
  };

  // Formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`progress-card-content ${customClass}`}>
      {/* Header con título y estado */}
      <div className="progress-card-header">
        <h3 className="progress-card-title">{nombre}</h3>
        <span className={`progress-card-status ${getStatusClass()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Imagen del cultivo (placeholder) */}
      <div className="progress-card-image-container">
        <div 
          className="progress-card-image-placeholder"
          style={{
            display: 'none',
            width: '100%',
            height: 'calc(var(--size) * 20)',
            background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--third-color) 100%)',
            borderRadius: 'calc(var(--size) * 2)',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 'calc(var(--size) * 6)'
          }}
        >
          <ion-icon name="leaf"></ion-icon>
        </div>
      </div>

      {/* Detalles del cultivo */}
      <div className="progress-card-details">
        <div className="progress-card-detail">
          <ion-icon name="nutrition"></ion-icon>
          <span>{cultivo}</span>
        </div>
        <div className="progress-card-detail">
          <ion-icon name="location"></ion-icon>
          <span>{localidad || 'Sin localidad de terreno'}</span>
        </div>
        <div className="progress-card-detail">
          <ion-icon name="calendar"></ion-icon>
          <span>{formatDate(fechaSiembra)}</span>
        </div>
        <div className="progress-card-detail">
          <ion-icon name="trending-up"></ion-icon>
          <span>Progreso del cultivo: {estado}</span>
        </div>
      </div>
    </div>
  );
};

CropsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  customClass: PropTypes.string,
};

export default CropsListItem;
