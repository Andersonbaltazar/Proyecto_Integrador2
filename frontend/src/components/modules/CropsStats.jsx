import PropTypes from 'prop-types';

const CropsStats = ({ data, searchTerm }) => {
  const totalCrops = data.length;
  const activeCrops = data.filter(crop => crop.estado === 'Activo').length;
  const completedCrops = data.filter(crop => crop.estado === 'Completado').length;
  const filteredCrops = data.filter(crop => 
    crop.nombre?.toLowerCase().includes(searchTerm?.toLowerCase() || '')
  ).length;

  const stats = [
    {
      label: 'Total Sembríos',
      value: totalCrops,
      icon: 'leaf',
      color: 'var(--primary-color)',
      bgColor: 'rgba(34, 79, 69, 0.1)'
    },
    {
      label: 'Activos',
      value: activeCrops,
      icon: 'trending-up',
      color: 'var(--secondary-color)',
      bgColor: 'rgba(174, 237, 114, 0.1)'
    },
    {
      label: 'Completados',
      value: completedCrops,
      icon: 'checkmark-circle',
      color: '#28a745',
      bgColor: 'rgba(40, 167, 69, 0.1)'
    },
    {
      label: 'Encontrados',
      value: filteredCrops,
      icon: 'search',
      color: '#17a2b8',
      bgColor: 'rgba(23, 162, 184, 0.1)'
    }
  ];

  return (
    <div className="enhanced-stats-container">
      <div className="enhanced-stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className="enhanced-stat-card"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div 
              className="enhanced-stat-icon"
              style={{
                backgroundColor: stat.bgColor,
                color: stat.color
              }}
            >
              <ion-icon name={stat.icon}></ion-icon>
            </div>
            <div className="enhanced-stat-content">
              <h3 className="enhanced-stat-value">{stat.value}</h3>
              <p className="enhanced-stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

CropsStats.propTypes = {
  data: PropTypes.array.isRequired,
  searchTerm: PropTypes.string
};

export default CropsStats; 