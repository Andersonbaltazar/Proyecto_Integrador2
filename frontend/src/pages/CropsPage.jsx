import React from 'react';
import Sidebar from '../components/layouts/Sidebar';
import ProgressPanel from '../components/modules/ProgressPanel';
import SearchBar from '../components/widgets/SearchBar';
import Button from '../components/widgets/Button';

const CropsPage = () => {
  return (
    <div className="dashboard-layout d-flex">
        <Sidebar />
        <article className="dashboard-content-section d-flex flex-column">
            <header className="header-dashboard-content d-flex flex-column gap-4">
                <h1 className="title-header-dashboard">Sembríos</h1>
                <div className="dashboard-search-controls d-flex align-center gap-2">
                    <SearchBar placeholder="Buscar sembríos..." />
                    <Button>
                        <ion-icon name="add"></ion-icon>
                    </Button>
                    <Button>
                        <ion-icon name="filter"></ion-icon>
                    </Button>
                </div>
            </header>
            <section className="progress-container gap-2">
                <ProgressPanel />
            </section>
        </article>
    </div>
  );
};

export default CropsPage;