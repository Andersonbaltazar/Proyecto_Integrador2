import googleLogo from '../../assets/logos/google.webp';
import useAuthStore from '../../store/useAuthStore';
import Button from './Button';

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
    <Button className="d-flex gap-5 auth-button align-center p-5" onClick={handleLogin}>
      <img className="img-logo-auth-button" src={logo} alt={`${provider} logo`} />
      <p className='fw-500 fs-4'>Continuar con {provider}</p>
    </Button>
  );
};

export default AuthProviderButton;  
