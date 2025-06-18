const AuthFooter = () => {
  return (
    <footer className="d-flex auth-footer justify-center" aria-label="Enlaces de pie de página">
        <nav className='d-flex auth-footer-nav justify-center'>
            <ul className="d-flex auth-footer-list m-0 p-0 justify-between">
              <div className="d-flex gap-4 group-link">
                <li><a className="auth-footer-link" href="#">Privacy</a></li>
                <li><a className="auth-footer-link" href="#">Terms</a></li>
              </div>
              <li><a className="auth-footer-link" href="#">Nombre</a></li>
              <div className="d-flex gap-4 group-link">
                <li><a className="auth-footer-link" href="#">X</a></li>
                <li><a className="auth-footer-link" href="#">GitHub</a></li>
              </div>
            </ul>
        </nav>
    </footer>
  );
};

export default AuthFooter;  