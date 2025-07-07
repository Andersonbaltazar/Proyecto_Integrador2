import logo from '../../assets/images/logo.jpg';

const Footer = () => (
  <footer className="landing-footer" role="contentinfo" style={{background: '#fff', borderTop: '1px solid #e0e0e0', marginTop: '4rem', padding: '2.5rem 0 1.2rem'}}>
    <div className="footer-container" style={{maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 1.5rem'}}>
      {/* Brand & Logo */}
      <div className="footer-brand" style={{flex: '1 1 220px', minWidth: 180}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: 8}}>
          <img src={logo} alt="AgroTech logo" style={{height: 38, borderRadius: '0.7rem'}} />
          <h3 style={{fontWeight: 800, fontSize: '1.2rem', color: '#2d5a27', margin: 0}}>AgroTech</h3>
        </div>
        <p style={{color: '#444', fontSize: '1rem', margin: 0}}>Soluciones inteligentes para la agricultura moderna.</p>
      </div>
      {/* Links */}
      <div className="footer-links" style={{flex: '1 1 180px', minWidth: 160}}>
        <nav aria-label="Enlaces del pie de página">
          <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem'}}>
            <li><a href="#beneficios" style={{color: '#2d5a27', textDecoration: 'none', fontWeight: 500}}>Beneficios</a></li>
            <li><a href="#contacto" style={{color: '#2d5a27', textDecoration: 'none', fontWeight: 500}}>Contacto</a></li>
            <li><a href="/about" style={{color: '#2d5a27', textDecoration: 'none', fontWeight: 500}}>Sobre Nosotros</a></li>
            <li><a href="/privacidad" style={{color: '#2d5a27', textDecoration: 'none', fontWeight: 500}}>Privacidad</a></li>
            <li><a href="/terminos" style={{color: '#2d5a27', textDecoration: 'none', fontWeight: 500}}>Términos</a></li>
          </ul>
        </nav>
      </div>
      {/* Newsletter */}
      <div className="footer-newsletter" style={{flex: '2 1 320px', minWidth: 220}}>
        <h4 style={{fontWeight: 700, fontSize: '1.08rem', marginBottom: 8, color: '#2d5a27'}}>Suscríbete a nuestro newsletter</h4>
        <form onSubmit={e => {e.preventDefault(); alert('¡Gracias por suscribirte!')}} style={{display: 'flex', gap: '0.5rem', marginBottom: 8}}>
          <input type="email" placeholder="Tu correo electrónico" required style={{padding: '0.7rem 1rem', borderRadius: '0.7rem', border: '1px solid #cfd8dc', fontSize: '1rem', flex: 1}} />
          <button type="submit" style={{background: '#2d5a27', color: '#fff', fontWeight: 700, border: 'none', borderRadius: '1.2rem', padding: '0.7rem 1.3rem', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s'}}>Suscribirse</button>
        </form>
        <p style={{color: '#888', fontSize: '0.97rem', margin: 0}}>Recibe novedades y consejos para tu campo.</p>
      </div>
      {/* Contact & Social */}
      <div className="footer-contact" style={{flex: '1 1 180px', minWidth: 160}}>
        <div className="footer-social" style={{display: 'flex', gap: '1.1rem', marginBottom: 8}}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{fontSize: 22, color: '#2d5a27'}}>🌐</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{fontSize: 22, color: '#2d5a27'}}>🐦</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{fontSize: 22, color: '#2d5a27'}}>📸</a>
        </div>
        <p style={{color: '#444', fontSize: '1rem', margin: 0}}>Contacto: <a href="mailto:info@agrotech.com" style={{color: '#2d5a27', textDecoration: 'underline'}}>info@agrotech.com</a></p>
        <p style={{color: '#888', fontSize: '0.97rem', margin: 0}}>© {new Date().getFullYear()} AgroTech</p>
      </div>
    </div>
  </footer>
);

export default Footer; 