import { useParams } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import AiChat from '../components/components/AiChat';

const DetailPage = () => {

  const { id } = useParams();
  return (
    <main className="dashboard-layout d-flex">
        <Sidebar />
        <div className="dashboard-content-container d-flex">
            <article className='d-flex flex-column'>
                <header className="header-dashboard-container d-flex flex-column">
                    <h1 className="title-header-dashboard">Detalles del Sembrío</h1>
                </header>
                <section className="details-container d-flex mt-5 justify-around">
                    <div className="details-section d-flex flex-column gap-2">
                        <div className="detail-card background-secondary">
                            <h2>Detalles del Sembrío {id}</h2>
                            <p>Cultivo: Zanahoria</p>
                            <p>Fecha de la Siembra: 2000-01-01</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio, ipsum architecto commodi et asperiores! Provident fuga iure autem quisquam cum non, magnam eius esse, repellat facilis alias, quam a.</p>
                        </div>
                        <div className="detail-card background-secondary">
                            <h2>Progreso del Sembrío</h2>
                            <p>Estado: En crecimiento</p>
                            <p>Progreso: 75%</p>
                            <p>Fecha estimada de cosecha: 2023-12-31</p>
                        </div>
                    </div>
                    <AiChat />
                </section>
            </article>

        </div>
    </main>
  );
};

export default DetailPage;