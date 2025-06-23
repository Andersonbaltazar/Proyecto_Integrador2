import Sidebar from '../components/layouts/Sidebar';
import useAuthStore from '../store/useAuthStore';

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="dashboard-layout d-flex">
        <Sidebar />
        <article className="dashboard-content-container d-flex flex-column">
            <header className="header-dashboard-container d-flex flex-column">
                <h1 className="title-header-dashboard">Inicio</h1>
                <p>{user?.name}</p>
            </header>
        </article>
    </div>
  );
};

export default DashboardPage;