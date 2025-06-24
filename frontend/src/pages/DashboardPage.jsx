import Sidebar from '../components/layouts/Sidebar';

const DashboardPage = () => {

  return (
    <div className="page-layout d-flex">
        <Sidebar />
        <article className="page-content-container d-flex flex-column">
            <header className="header-dashboard-container d-flex flex-column">
                <h1 className="title-header-dashboard">Inicio</h1>
            </header>
        </article>
    </div>
  );
};

export default DashboardPage;