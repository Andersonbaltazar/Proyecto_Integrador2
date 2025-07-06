import { Link } from 'react-router-dom';

const Header = () => (
  <header className="landing-header" role="banner">
    <nav className="landing-navbar" aria-label="Navegación principal">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">AgroTech</Link>
        <ul className="navbar-menu">
          <li><a href="#beneficios">Beneficios</a></li>
          <li><a href="#caracteristicas">Características</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><Link to="/login" className="navbar-cta">Iniciar Sesión</Link></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header; 