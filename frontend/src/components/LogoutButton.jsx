import React from "react";

function LogoutButton({ setIsAuthenticated }) {
  const handleLogout = () => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(false);
          window.location.href = "/login";
        } else {
          console.error("Error al cerrar sesión, status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <button className="menu-item-active d-flex gap-2 align-center" onClick={handleLogout}>
      <span className="icon d-flex align-center">
        <ion-icon name="log-out-outline"></ion-icon>
      </span>
      <span className="text-menu-item">Cerrar Sesión</span>
    </button>
  );
}

export default LogoutButton