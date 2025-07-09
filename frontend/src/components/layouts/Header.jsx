import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import useAuthStore from '../../store/useAuthStore';

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  return (
    <header className="landing-header" role="banner" style={{background: '#fff', boxShadow: '0 2px 12px rgba(34,79,39,0.06)', padding: '0.5rem 0'}}>
      <nav className="landing-navbar" aria-label="Navegación principal" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="navbar-container" style={{width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem'}}>
          <Link to="/" className="navbar-logo" style={{display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none'}}>
            <img src={logo} alt="AgroTech logo" style={{height: 38, borderRadius: '0.7rem'}} />
            <span style={{fontWeight: 800, fontSize: '1.3rem', color: '#2d5a27', letterSpacing: '0.5px'}}>AgroTech</span>
          </Link>
          <ul className="navbar-menu" style={{display: 'flex', alignItems: 'center', gap: '2.2rem', listStyle: 'none', margin: 0, padding: 0}}>
            <li><Link to="/about" style={{color: '#2d5a27', fontWeight: 600, textDecoration: 'none', fontSize: '1.08rem', transition: 'color 0.2s'}}>Sobre Nosotros</Link></li>
            <li>
              {isLoggedIn ? (
                <Link to="/home" className="navbar-cta" style={{background: '#2d5a27', color: '#fff', fontWeight: 700, borderRadius: '1.2rem', padding: '0.6rem 1.5rem', textDecoration: 'none', fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(34,79,39,0.08)', transition: 'background 0.2s'}}>Ir al Dashboard</Link>
              ) : (
                <Link to="/login" className="navbar-cta" style={{background: '#2d5a27', color: '#fff', fontWeight: 700, borderRadius: '1.2rem', padding: '0.6rem 1.5rem', textDecoration: 'none', fontSize: '1.08rem', boxShadow: '0 2px 8px rgba(34,79,39,0.08)', transition: 'background 0.2s'}}>Iniciar Sesión</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header; 