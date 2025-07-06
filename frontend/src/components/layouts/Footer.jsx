const Footer = () => (
  <footer className="landing-footer" role="contentinfo">
    <div className="footer-container">
      <div className="footer-brand">
        <h3>AgroTech</h3>
        <p>Soluciones inteligentes para la agricultura moderna.</p>
      </div>
      <div className="footer-links">
        <nav aria-label="Enlaces del pie de página">
          <ul>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#caracteristicas">Características</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="/privacidad">Privacidad</a></li>
            <li><a href="/terminos">Términos</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-contact">
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span>🌐</span></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><span>🐦</span></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span>📸</span></a>
        </div>
        <p>Contacto: info@agrotech.com</p>
        <p>© 2024 AgroTech</p>
      </div>
    </div>
  </footer>
);

export default Footer; 