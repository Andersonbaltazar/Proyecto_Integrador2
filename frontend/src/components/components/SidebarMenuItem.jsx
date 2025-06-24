import PropTypes from 'prop-types';

const iconos = {
  Inicio: <ion-icon name="home-sharp"></ion-icon>,
  Cultivos: <ion-icon name="reader"></ion-icon>,
  Calendario: <ion-icon name="calendar"></ion-icon>,
  Configuración: <ion-icon name="settings-sharp"></ion-icon>,
  "AI Chat": <ion-icon name="chatbubbles"></ion-icon>,
  "Cerrar Sesión": <ion-icon name="log-out-outline"></ion-icon>,
};

const SidebarMenuItem = ({ provider }) => {

  return (
    <div className="d-flex gap-2 align-center">
        <span className='icon d-flex align-center'>{iconos[provider]}</span>
        <span className='text-menu-item fw-500'>{provider}</span>
    </div>
  );
};

SidebarMenuItem.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default SidebarMenuItem;