import React from 'react';
import googleLogo from '../assets/logos/google.webp';
import facebookLogo from '../assets/logos/facebook.png';
import xLogo from '../assets/logos/x.png';
import microsoftLogo from '../assets/logos/microsoft.png';

const logos = {
  Google: googleLogo,
  Facebook: facebookLogo,
  X: xLogo,
  Microsoft: microsoftLogo,
};

const AuthProviderButton = ({ provider }) => {
  const logo = logos[provider];

  return (
    <button className="d-flex gap-2 auth-button">
      <img className="img-logo-auth-button" src={logo} alt={`${provider} logo`} />
      <span className="text-auth-button">Continuar con {provider}</span>
    </button>
  );
};

export default AuthProviderButton;  
