import React from 'react';
import SidebarMenuItem from './SidebarMenuItem';
import FeaturedCard from './FeaturedCard';

const Sidebar = () => {
  return (
    <aside className="sidebar-layout d-flex flex-column">
        <header className="header-sidebar d-flex justify-center align-center">
            <h1 className="title-sidebar">Dashboard</h1>
        </header>
        <section className="menu d-flex justify-center">
            <nav className="menu-item-list d-flex flex-column gap-3">
                <SidebarMenuItem provider="Inicio" />
                <SidebarMenuItem provider="Cultivos" />
                <SidebarMenuItem provider="Calendario" />
                <SidebarMenuItem provider="Configuración" />
                <SidebarMenuItem provider="Cerrar Sesión" />
            </nav>
        </section>
        <footer className="footer-sidebar d-flex justify-center">
            <FeaturedCard />
        </footer>
    </aside>
  );
};

export default Sidebar;