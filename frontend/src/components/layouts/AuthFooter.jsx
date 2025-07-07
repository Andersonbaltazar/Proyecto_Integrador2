import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <footer className="d-flex auth-footer justify-center" aria-label="Enlaces de pie de página">
        <nav className='d-flex auth-footer-nav justify-center'>
            <ul className="d-flex auth-footer-list m-0 p-0 justify-center text-center">
              <Link className="auth-footer-link text-center" to="/">
                  AgroTech
              </Link>
            </ul>
        </nav>
    </footer>
  );
};

export default AuthFooter;  