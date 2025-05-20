import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import FeaturedCard from './FeaturedCard';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    <aside className="sidebar-layout d-flex flex-column">
        <header className="header-sidebar d-flex justify-center align-center">
            <h1 className="title-sidebar">AgroTechAI</h1>
        </header>
        <section className="menu d-flex justify-center">
            <nav className="menu-item-list d-flex flex-column gap-3">
                <SidebarMenuItem provider="Inicio" customClass="menu-item-active" />
                <SidebarMenuItem provider="Cultivos" customClass="menu-item" />
                <SidebarMenuItem provider="Calendario" customClass="menu-item" />
                <SidebarMenuItem provider="Configuración" customClass="menu-item" />
                <LogoutButton />
            </nav>
        </section>
        <footer className="footer-sidebar d-flex justify-center">
            <FeaturedCard />
        </footer>
    </aside>
  );
};

export default Sidebar;