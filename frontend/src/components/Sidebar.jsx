import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = () => {
  return (
    <aside className="sidebar-layout">
        <header className="user-profile-container">
            <UserProfile/>
        </header>
        <nav className="menu-item-list">
            <SidebarMenuItem provider="Home" />
            <SidebarMenuItem provider="Microsoft" />
            <SidebarMenuItem provider="Microsoft" />
            <SidebarMenuItem provider="Configuracion" />
        </nav>
    </aside>
  );
};

export default Sidebar;