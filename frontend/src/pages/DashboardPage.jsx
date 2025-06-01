import React from 'react';
import Sidebar from '../components/layouts/Sidebar';

const DashboardPage = () => {
  return (
    <div className="dashboard-layout d-flex">
        <Sidebar />
        <article className="dashboard-content-section d-flex flex-column">
            <header className="header-dashboard-content d-flex flex-column">
                <h1 className="title-header-dashboard">Inicio</h1>
            </header>
        </article>
    </div>
  );
};

export default DashboardPage;