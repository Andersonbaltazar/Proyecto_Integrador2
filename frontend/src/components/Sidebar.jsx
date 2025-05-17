import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import FeaturedCard from './FeaturedCard';

const Sidebar = () => {
  return (
    <aside className="sidebar-layout">
        <header className="header-sidebar">
            <h1 className="title-sidebar">Dashboard</h1>
        </header>
        <nav className="menu-item-list">
            <SidebarMenuItem provider="Home" />
            <SidebarMenuItem provider="Configuracion" />
        </nav>
        <footer className="footer-sidebar">
            <FeaturedCard />
        </footer>
    </aside>
  );
};

export default Sidebar;