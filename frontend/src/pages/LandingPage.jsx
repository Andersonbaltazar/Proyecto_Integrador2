import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import img1 from '../assets/images/img1.avif';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.avif';

const faqs = [
  {
    q: '¿Cómo me registro en AgroTech?',
    a: 'Haz clic en "Comienza ahora" y sigue los pasos para crear tu cuenta con Google o correo electrónico.'
  },
  {
    q: '¿Puedo usar AgroTech desde el móvil?',
    a: 'Sí, nuestra plataforma es 100% responsive y también contamos con app móvil.'
  },
  {
    q: '¿Qué costo tiene el servicio?',
    a: 'Puedes empezar gratis. Luego, elige el plan que mejor se adapte a tus necesidades.'
  }
];

const LandingPage = () => (
  <div style={{background: '#f8faf5', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <Header />
    <main style={{flex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 3.5rem 1.5rem'}}>
      {/* Hero Section */}
      <section style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '4rem 0 2rem', minHeight: '60vh', gap: '2rem'}}>
        <div style={{maxWidth: 520}}>
          <h1 style={{fontSize: '2.7rem', fontWeight: 800, marginBottom: '1.2rem', color: '#2d5a27'}}>Bienvenido a AgroTech</h1>
          <p style={{fontSize: '1.2rem', marginBottom: '2rem', color: '#444'}}>Impulsa tu agricultura con tecnología inteligente y recomendaciones personalizadas.</p>
          <a href="#beneficios" style={{background: '#2d5a27', color: '#fff', fontWeight: 700, padding: '0.9rem 2.2rem', borderRadius: '2rem', fontSize: '1.1rem', boxShadow: '0 2px 8px rgba(34,79,39,0.08)', textDecoration: 'none', transition: 'background 0.2s'}}>Descubre los beneficios</a>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <img src={img1} alt="Campo agrícola" style={{width: '340px', borderRadius: '2rem', boxShadow: '0 8px 32px rgba(34,79,39,0.10)'}} />
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" style={{padding: '3rem 0 2rem'}}>
        <h2 style={{textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '2.5rem', color: '#2d5a27'}}>Beneficios de usar AgroTech</h2>
        <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <article style={{background: '#fff', borderRadius: '1.5rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', maxWidth: 320, textAlign: 'center', transition: 'transform 0.2s', flex: '1 1 260px'}}>
            <img src={img2} alt="Análisis inteligente" style={{width: '80px', marginBottom: '1rem', borderRadius: '1rem'}} />
            <h3 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>Análisis Predictivo</h3>
            <p style={{color: '#444'}}>Obtén predicciones precisas sobre tus cultivos y toma mejores decisiones.</p>
          </article>
          <article style={{background: '#fff', borderRadius: '1.5rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', maxWidth: 320, textAlign: 'center', transition: 'transform 0.2s', flex: '1 1 260px'}}>
            <img src={img3} alt="Asistente IA" style={{width: '80px', marginBottom: '1rem', borderRadius: '1rem'}} />
            <h3 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>Asistente IA</h3>
            <p style={{color: '#444'}}>Recibe recomendaciones personalizadas para optimizar tu producción.</p>
          </article>
          <article style={{background: '#fff', borderRadius: '1.5rem', boxShadow: '0 2px 16px rgba(34,79,39,0.07)', padding: '2rem 1.5rem', maxWidth: 320, textAlign: 'center', transition: 'transform 0.2s', flex: '1 1 260px'}}>
            <img src={img1} alt="Gestión móvil" style={{width: '80px', marginBottom: '1rem', borderRadius: '1rem'}} />
            <h3 style={{fontWeight: 700, fontSize: '1.2rem', color: '#2d5a27'}}>Gestión Móvil</h3>
            <p style={{color: '#444'}}>Controla y monitorea tus cultivos desde cualquier lugar y dispositivo.</p>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{padding: '2rem 0', background: '#fff', borderRadius: '2rem', margin: '2rem 0', boxShadow: '0 2px 12px rgba(34,79,39,0.06)'}}>
        <h2 style={{textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '2rem', color: '#2d5a27'}}>Preguntas Frecuentes</h2>
        <div style={{maxWidth: 700, margin: '0 auto'}}>
          {faqs.map((faq, i) => (
            <details key={i} style={{marginBottom: '1.2rem', background: '#f8faf5', borderRadius: '1rem', boxShadow: '0 1px 6px rgba(34,79,39,0.04)', padding: '1rem 1.5rem'}}>
              <summary style={{fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', color: '#2d5a27', outline: 'none', transition: 'color 0.2s'}}>{faq.q}</summary>
              <p style={{marginTop: '0.7rem', color: '#444'}}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" style={{padding: '2.5rem 0 3rem'}}>
        <h2 style={{textAlign: 'center', fontWeight: 800, fontSize: '2rem', marginBottom: '1.5rem', color: '#2d5a27'}}>¿Tienes dudas? Contáctanos</h2>
        <form onSubmit={e => {e.preventDefault(); alert('¡Mensaje enviado!');}} style={{maxWidth: 420, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#fff', borderRadius: '1.5rem', boxShadow: '0 2px 12px rgba(34,79,39,0.06)', padding: '2rem'}}>
          <input type="text" name="name" placeholder="Tu nombre" required style={{padding: '0.8rem 1rem', borderRadius: '0.7rem', border: '1px solid #cfd8dc', fontSize: '1rem'}} />
          <input type="email" name="email" placeholder="Tu correo" required style={{padding: '0.8rem 1rem', borderRadius: '0.7rem', border: '1px solid #cfd8dc', fontSize: '1rem'}} />
          <textarea name="message" placeholder="¿En qué podemos ayudarte?" required style={{padding: '0.8rem 1rem', borderRadius: '0.7rem', border: '1px solid #cfd8dc', fontSize: '1rem', minHeight: 80}}></textarea>
          <button type="submit" style={{background: '#2d5a27', color: '#fff', fontWeight: 700, border: 'none', borderRadius: '2rem', padding: '0.9rem 0', fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.2s'}}>Enviar mensaje</button>
        </form>
        <p style={{textAlign: 'center', marginTop: '1.2rem', color: '#2d5a27'}}>O escríbenos a <a href="mailto:info@agrotech.com" style={{color: '#388e3c', textDecoration: 'underline'}}>info@agrotech.com</a></p>
      </section>
    </main>
    <Footer />
  </div>
);

export default LandingPage; 