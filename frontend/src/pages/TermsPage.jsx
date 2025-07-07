import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';

const TermsPage = () => (
  <div style={{background: '#f8faf5', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <Header />
    <main style={{flex: 1, maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem 2rem 1.5rem', background: '#fff', borderRadius: '1.5rem', boxShadow: '0 2px 12px rgba(34,79,39,0.06)', marginTop: '2.5rem', marginBottom: '2.5rem'}}>
      <h1 style={{fontWeight: 800, fontSize: '2.2rem', color: '#2d5a27', marginBottom: '1.2rem'}}>Términos y Condiciones</h1>
      <p style={{color: '#888', fontSize: '1rem', marginBottom: '2.5rem'}}>Última actualización: 2024-05-01</p>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>1. Aceptación de los Términos</h2>
        <p>Al acceder y utilizar AgroTech, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, por favor no utilices la plataforma.</p>
      </section>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>2. Uso de la Plataforma</h2>
        <p>AgroTech está destinada a brindar soluciones inteligentes para la agricultura. No está permitido el uso indebido, fraudulento o que afecte a otros usuarios.</p>
      </section>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>3. Privacidad y Datos</h2>
        <p>Respetamos tu privacidad. Consulta nuestra Política de Privacidad para conocer cómo tratamos tus datos personales.</p>
      </section>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>4. Modificaciones</h2>
        <p>AgroTech puede modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes a través de la plataforma.</p>
      </section>
      <section style={{marginBottom: '2rem'}}>
        <h2 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>5. Contacto</h2>
        <p>Si tienes dudas sobre estos términos, contáctanos en <a href="mailto:info@agrotech.com" style={{color: '#2d5a27', textDecoration: 'underline'}}>info@agrotech.com</a>.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default TermsPage; 