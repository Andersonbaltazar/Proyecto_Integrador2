import React from 'react';
import ProgressPanel from './ProgressPanel';
import CropLifecycle from './CropLifeCycle';

const DashboardContent = () => {
  return (
    <article className="dashboard-content-section d-flex flex-column">
        <header className="header-dashboard-content d-flex flex-column">
            <h1 className="title-header-dashboard">Inicio</h1>
        </header>
        <section className="progress-container gap-2">
            <ProgressPanel />
        </section>
    </article>
  );
};

export default DashboardContent;