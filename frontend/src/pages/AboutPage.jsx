import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const AboutPage = () => (
  <div style={{background: '#f8faf5', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <Header />
    <main className="about-main" style={{flex: 1, maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%'}}>
      <section className="about-hero" style={{marginBottom: '2.5rem', textAlign: 'center'}}>
        <h1 style={{fontSize: '2.1rem', fontWeight: 800, color: '#2d5a27', marginBottom: 12}}>Sobre AgroTech</h1>
        <p style={{fontSize: '1.1rem', color: '#444'}}>Nuestra misión es revolucionar la agricultura con tecnología inteligente y accesible para todos.</p>
      </section>
      <section className="about-history" style={{marginBottom: '2.5rem', textAlign: 'center'}}>
        <h2 style={{fontSize: '1.3rem', fontWeight: 700, color: '#2d5a27'}}>Nuestra Historia</h2>
        <p style={{fontSize: '1rem', color: '#444'}}>AgroTech nació en 2022 con el objetivo de ayudar a agricultores a tomar mejores decisiones usando IA y datos. Desde entonces, hemos crecido junto a cientos de productores y expertos del sector.</p>
      </section>
      <section className="about-scope" style={{marginBottom: '2.5rem'}}>
        <h2 style={{fontSize: '1.2rem', fontWeight: 700, color: '#2d5a27'}}>Alcance</h2>
        <p style={{fontSize: '1rem', color: '#444'}}>Agrotech permite a los usuarios registrar sus terrenos agrícolas y cultivos, recibir una estimación automática de tiempo de cosecha, y acceder a recomendaciones personalizadas proporcionadas por inteligencia artificial. El sistema cuenta con una interfaz de administración basada en Django, una interfaz web en React y una aplicación móvil para mayor accesibilidad.</p>
      </section>
      <section className="about-vision-mission" style={{marginBottom: '2.5rem'}}>
        <h2 style={{fontSize: '1.2rem', fontWeight: 700, color: '#2d5a27'}}>Visión</h2>
        <p style={{fontSize: '1rem', color: '#444'}}>AgroTech nace con la intención de digitalizar y automatizar tareas esenciales en el manejo agrícola. Busca mejorar la toma de decisiones de los agricultores al proporcionarles herramientas de predicción y recomendaciones personalizadas, además de facilitar la administración de sus sembríos desde cualquier lugar.</p>
        <h2 className="mt-5" style={{fontSize: '1.2rem', fontWeight: 700, color: '#2d5a27', marginTop: 24}}>Misión</h2>
        <p style={{fontSize: '1rem', color: '#444'}}>Nuestra misión es empoderar a los agricultores mediante tecnología accesible, brindando soluciones inteligentes que optimicen la gestión agrícola, mejoren la productividad y promuevan la sostenibilidad en el sector.</p>
      </section>
    </main>
    <Footer />
    <style>{`
      @media (max-width: 700px) {
        .about-main {
          padding: 1.2rem 0.3rem !important;
        }
        .about-hero h1, .about-history h2, .about-scope h2, .about-vision-mission h2, .about-abbr h2, .about-references h2 {
          font-size: 1.1rem !important;
        }
        .about-hero p, .about-history p, .about-scope p, .about-vision-mission p, .about-abbr ul, .about-references ul {
          font-size: 0.97rem !important;
        }
      }
    `}</style>
  </div>
);

export default AboutPage;
