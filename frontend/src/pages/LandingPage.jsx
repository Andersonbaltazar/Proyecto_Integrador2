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
  <div className="landing-root">
    <Header />
    <main className="landing-main" role="main">
      {/* Hero Section */}
      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <h1 id="hero-title">Bienvenido a AgroTech</h1>
          <p>Impulsa tu agricultura con tecnología inteligente y recomendaciones personalizadas.</p>
          <a href="#beneficios" className="hero-cta">Descubre los beneficios</a>
        </div>
        <div className="hero-img">
          <img src={img1} alt="Campo agrícola" />
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="landing-benefits" aria-labelledby="benefits-title">
        <h2 id="benefits-title">Beneficios de usar AgroTech</h2>
        <div className="benefits-grid">
          <article className="benefit-card">
            <img src={img2} alt="Análisis inteligente" />
            <h3>Análisis Predictivo</h3>
            <p>Obtén predicciones precisas sobre tus cultivos y toma mejores decisiones.</p>
          </article>
          <article className="benefit-card">
            <img src={img3} alt="Asistente IA" />
            <h3>Asistente IA</h3>
            <p>Recibe recomendaciones personalizadas para optimizar tu producción.</p>
          </article>
          <article className="benefit-card">
            <img src={img1} alt="Gestión móvil" />
            <h3>Gestión Móvil</h3>
            <p>Controla y monitorea tus cultivos desde cualquier lugar y dispositivo.</p>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing-faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Preguntas Frecuentes</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="landing-contact" id="contacto" aria-labelledby="contact-title">
        <h2 id="contact-title">¿Tienes dudas? Contáctanos</h2>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          <input type="text" name="name" placeholder="Tu nombre" required />
          <input type="email" name="email" placeholder="Tu correo" required />
          <textarea name="message" placeholder="¿En qué podemos ayudarte?" required></textarea>
          <button type="submit">Enviar mensaje</button>
        </form>
        <p className="contact-alt">O escríbenos a <a href="mailto:info@agrotech.com">info@agrotech.com</a></p>
      </section>

    </main>
    <Footer />
  </div>
);

export default LandingPage; 