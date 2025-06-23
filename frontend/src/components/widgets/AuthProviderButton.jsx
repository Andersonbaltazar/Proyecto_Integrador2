import googleLogo from '../../assets/logos/google.webp';
import useAuthStore from '../../store/useAuthStore';

const logos = {
  Google: googleLogo,
};

const AuthProviderButton = ({ provider }) => {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const logo = logos[provider];

    const handleLogin = () => {
    if (provider === "Google") {
      loginWithGoogle();
    }
  };

  return (
    <button className="d-flex gap-5 auth-button align-center" onClick={handleLogin}>
      <img className="img-logo-auth-button" src={logo} alt={`${provider} logo`} />
      Continuar con {provider}
    </button>
  );
};

export default AuthProviderButton;  
