import React from 'react';

const iconos = {
  Home: <ion-icon name="home-sharp"></ion-icon>,
  Configuracion: <ion-icon name="settings-sharp"></ion-icon>,
};

const SidebarMenuItem = ({ provider }) => {

  return (
    <button className='menu-item d-flex gap-2 align-center'>
        <span className='icon d-flex align-center'>{iconos[provider]}</span>
        <span className='text-menu-item'>{provider}</span>
    </button>
  );
};

export default SidebarMenuItem;