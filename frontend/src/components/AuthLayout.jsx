import React from "react";
import AuthProviderButton from "./AuthProviderButton";
import AuthFooter from "./AuthFooter";
import HeroImage from "./HeroImage";

const AuthLayout = () => {
  return (
    <div className="d-flex auth-layout justify-center flex-wrap">
      <div className="d-flex flex-column auth-layout-container justify-center align-center gap-5">
        <header className="d-flex flex-column auth-layout-header gap-2 align-center">
            <h1 className="title-auth-layout text-center">¡Bienvenido!</h1>
            <p className="gretting-auth-layout text-center">
                Bienvenido a <strong>Nombre</strong>. Ingresa a nuestra aplicación
                usando una de las opciones.
            </p>
        </header>
        <section className="list-auth-buttons gap-2 d-flex flex-column align-center">
          <AuthProviderButton provider="Google" />
          <AuthProviderButton provider="Facebook" />
          <AuthProviderButton provider="X" />
          <AuthProviderButton provider="Microsoft" />
        </section>
        <section className="info-text-auth-layout">
            <p className="paragraph-auth-layout text-center">
                Al ingresar mediante un proveedor, solo accederemos a la información básica de tu perfil (como tu nombre y correo electrónico) para crear tu cuenta y tendras acceso a todos nuestros servicios.
            </p>
        </section>
        <AuthFooter />
      </div>
      <HeroImage />
    </div>
  );
};

export default AuthLayout;
