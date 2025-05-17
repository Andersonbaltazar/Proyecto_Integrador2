import React from 'react';

const iconos = {
  Home: <ion-icon name="home-sharp"></ion-icon>,
  Crear: facebookLogo,
  X: xLogo,
  Configuracion: <ion-icon name="settings-sharp"></ion-icon>,
};

const SidebarMenuItem = ({ provider }) => {

  return (
    <button className='menu-item'>
        {iconos[provider]} 
        <span className='text-menu-item'>{provider}</span>
    </button>
  );
};

export default SidebarMenuItem;