import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <div className="d-flex justify-center align-center vh-100">
        <h2>Cargando sesión...</h2>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
