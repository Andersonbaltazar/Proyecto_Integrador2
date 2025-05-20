import React from 'react';

const iconos = {
  Inicio: <ion-icon name="home-sharp"></ion-icon>,
  Cultivos: <ion-icon name="reader"></ion-icon>,
  Calendario: <ion-icon name="calendar"></ion-icon>,
  Configuración: <ion-icon name="settings-sharp"></ion-icon>,
  "Cerrar Sesión": <ion-icon name="log-out-outline"></ion-icon>,
};

const SidebarMenuItem = ({ provider }) => {

  return (
    <button className='menu-item-active d-flex gap-2 align-center'>
        <span className='icon d-flex align-center'>{iconos[provider]}</span>
        <span className='text-menu-item'>{provider}</span>
    </button>
  );
};

export default SidebarMenuItem;