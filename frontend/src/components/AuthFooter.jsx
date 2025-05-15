import React from 'react';

const AuthFooter = () => {
  return (
    <footer className="d-flex auth-footer" aria-label="Enlaces de pie de página">
        <nav className='d-flex gap-2 auth-footer-nav'>
            <ul className="d-flex gap-2 list-unstyled m-0 p-0">
            <li><a className="auth-footer-link" href="#">Privacy</a></li>
            <li><a className="auth-footer-link" href="#">Terms</a></li>
            <li><a className="auth-footer-link" href="#">Nombre</a></li>
            <li><a className="auth-footer-link" href="#">X</a></li>
            <li><a className="auth-footer-link" href="#">GitHub</a></li>
            </ul>
        </nav>
    </footer>
  );
};

export default AuthFooter;  