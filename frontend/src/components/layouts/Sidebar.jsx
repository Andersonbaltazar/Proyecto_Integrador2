import { Link, useLocation  } from 'react-router-dom';
import SidebarMenuItem from '../components/SidebarMenuItem';
import FeaturedCard from '../components/FeaturedCard';
import LogoutButton from '../widgets/LogoutButton';

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <aside className="sidebar-layout d-flex flex-column" style={{minHeight: '100vh', height: '100vh', position: 'sticky', top: 0, left: 0, background: '#20451f', boxShadow: '2px 0 12px rgba(34,79,39,0.06)'}}>
        <header className="header-sidebar d-flex justify-center align-center">
            <h1 className="title-sidebar">AgroTechAI</h1>
        </header>
        <section className="menu d-flex justify-center" style={{flex: 1}}>
            <nav className="menu-item-list d-flex flex-column gap-3">
            <Link className={currentPath === '/home' ? 'menu-item-active' : 'menu-item'} to="/home">
                <SidebarMenuItem provider="Inicio" />
            </Link>
            <Link className={currentPath.startsWith('/crops') ? 'menu-item-active' : 'menu-item'} to="/crops">
                <SidebarMenuItem provider="Cultivos" />
            </Link>
            <Link className={currentPath === '/settings' ? 'menu-item-active' : 'menu-item'} to="/settings">
                <SidebarMenuItem provider="Configuración" />
            </Link>           
            <LogoutButton />
            </nav>
        </section>
        <footer className="footer-sidebar d-flex justify-center" style={{marginTop: 'auto'}}>
            <FeaturedCard />
        </footer>
    </aside>
  );
};

export default Sidebar;