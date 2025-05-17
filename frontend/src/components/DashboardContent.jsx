import React from 'react';
import ProgressPanel from './ProgressPanel';

const DashboardContent = () => {
  return (
    <article className="dashboard-content-section d-flex flex-column">
        <header className="header-dashboard-content d-flex flex-column">
            <h1 className="title-header-dashboard">Tu progreso</h1>
            <ProgressPanel />
        </header>
    </article>
  );
};

export default DashboardContent;