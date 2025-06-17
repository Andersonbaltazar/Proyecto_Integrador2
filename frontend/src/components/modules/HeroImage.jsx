import authImage from '../../assets/images/authFondo.webp';

const HeroImage = () => {
  return (
    <div className='d-flex auth-hero-image-container'>
        <img 
            src={authImage}
            alt="Imagen de fondo"
            className='auth-hero-image'
        />
    </div>
  );
};

export default HeroImage;  