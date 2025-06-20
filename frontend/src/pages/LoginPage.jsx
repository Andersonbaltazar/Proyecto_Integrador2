import React from "react";
import AuthProviderButton from "../components/widgets/AuthProviderButton";
import AuthFooter from "../components/layouts/AuthFooter";
import HeroImage from "../components/modules/HeroImage";

const LoginPage = () => {
  return (
    <div className="d-flex auth-layout justify-center align-center flex-wrap">
      <div className="d-flex flex-column auth-layout-container justify-center align-center gap-5">
        <header className="d-flex flex-column auth-layout-header gap-2 align-center">
            <h1 className="title-auth-layout text-center">AgroTechAI</h1>
            <p className="gretting-auth-layout text-center">
                Bienvenido a <strong>AgroTechAI</strong>. Ingresa a nuestra aplicación
                usando una de las opciones.
            </p>
        </header>
        <section className="list-auth-buttons gap-2 d-flex flex-column align-center">
          <AuthProviderButton provider="Google" url="http://localhost:8080/oauth2/authorization/google" />
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

export default LoginPage;
