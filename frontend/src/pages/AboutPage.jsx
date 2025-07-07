import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

const team = [
  { name: "Ana Torres", role: "CEO & Fundadora", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Luis Pérez", role: "CTO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "María López", role: "Agrónoma", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const AboutPage = () => (
  <div>
    <Header />
    <main className="about-main">
      <section className="about-hero">
        <h1>Sobre AgroTech</h1>
        <p>Nuestra misión es revolucionar la agricultura con tecnología inteligente y accesible para todos.</p>
      </section>
      <section className="about-history">
        <h2>Nuestra Historia</h2>
        <p>AgroTech nació en 2022 con el objetivo de ayudar a agricultores a tomar mejores decisiones usando IA y datos. Desde entonces, hemos crecido junto a cientos de productores y expertos del sector.</p>
      </section>
      <section className="about-team">
        <h2>Equipo</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-member" key={i}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-partners">
        <h2>Partners y Reconocimientos</h2>
        <div className="partners-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_UNAL.png" alt="UNAL" style={{height:'40px',marginRight:'1.5rem'}} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Logo_UNAM.png" alt="UNAM" style={{height:'40px',marginRight:'1.5rem'}} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/FAO_logo.svg" alt="FAO" style={{height:'40px'}} />
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutPage; 