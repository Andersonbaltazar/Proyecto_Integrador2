import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

function LogoutButton() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      className="menu-item d-flex gap-2 align-center"
      onClick={handleLogout}
    >
      <span className="icon d-flex align-center">
        <ion-icon name="log-out-outline"></ion-icon>
      </span>
      <span className="text-menu-item">Cerrar Sesión</span>
    </button>
  );
}

export default LogoutButton;
