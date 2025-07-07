import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setTimeout(() => {
      navigate("/login");
      setIsLoggingOut(false);
    }, 3000); // 3s para mostrar el loader
  };

  if (isLoggingOut) {
    return (
      <div className="d-flex justify-center align-center vh-100">
        <div className="enhanced-loading">
          <div className="enhanced-loading-spinner"></div>
          <h2 style={{ marginTop: '1.5rem', color: '#2d5a27' }}>Cerrando sesión...</h2>
        </div>
      </div>
    );
  }

  return (
    <button
      className="menu-item d-flex gap-2 align-center"
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      <span className="icon d-flex align-center fs-5">
        <ion-icon name="log-out-outline"></ion-icon>
      </span>
      <span className="text-menu-item fw-500">
        Cerrar Sesión
      </span>
    </button>
  );
}

export default LogoutButton;
