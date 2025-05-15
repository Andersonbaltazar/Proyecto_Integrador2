import React from "react";
import AuthProviderButton from "./AuthProviderButton";
import AuthFooter from "./AuthFooter";
import HeroImage from "./HeroImage";

const AuthLayout = () => {
  return (
    <div className="d-flex flex-column auth-layout">
      <div className="d-flex flex-column auth-layout-container">
        <header className="d-flex flex-column auth-layout-header">
            <h1 className="title-auth-layout">¡Bienvenido!</h1>
            <p className="gretting-auth-layout">
                Bienvenido a <strong>Nombre</strong>. Ingresa a nuestra aplicación
                usando una de las opciones.
            </p>
        </header>
        <section className="list-auth-buttons gap-2 d-flex flex-column">
          <AuthProviderButton provider="Google" />
          <AuthProviderButton provider="Facebook" />
          <AuthProviderButton provider="X" />
          <AuthProviderButton provider="Microsoft" />
        </section>
        <section className="info-text-auth-layout">
            <p className="">
                Al ingresar mediante un proveedor, solo accederemos a la información
                básica de tu perfil...
                <br />
                Se aplica nuestra{" "}
                <a href="#" className="underline">
                Política de Privacidad
                </a>{" "}
                y{" "}
                <a href="#" className="underline">
                Términos de Servicio
                </a>
                .
            </p>
        </section>
        <AuthFooter />
      </div>
      <HeroImage />
    </div>
  );
};

export default AuthLayout;
