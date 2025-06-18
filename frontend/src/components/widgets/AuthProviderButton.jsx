import React from 'react';
import googleLogo from '../../assets/logos/google.webp';
import facebookLogo from '../../assets/logos/facebook.png';
import xLogo from '../../assets/logos/x.png';
import microsoftLogo from '../../assets/logos/microsoft.png';

const logos = {
  Google: googleLogo,
  Facebook: facebookLogo,
  X: xLogo,
  Microsoft: microsoftLogo,
};

const AuthProviderButton = ({ provider, url }) => {
  const logo = logos[provider];

  return (
    <button className="d-flex gap-5 auth-button align-center">
      <img className="img-logo-auth-button" src={logo} alt={`${provider} logo`} />
      <a className="text-auth-button" href={url}>Continuar con {provider}</a>
    </button>
  );
};

export default AuthProviderButton;  
