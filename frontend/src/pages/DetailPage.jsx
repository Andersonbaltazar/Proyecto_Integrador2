import { useParams } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';
import { Chrono } from "react-chrono";
import AiChat from '../components/components/AiChat';
import Timeline from '../components/modules/Timeline';

const items = [
    {
      title: 'May 1940',
      cardTitle: 'Dunkirk',
      url: 'http://www.history.com',
      cardSubtitle:
        'Men of the British Expeditionary Force (BEF) wade out to a destroyer...',
      cardDetailedText:
        'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
      media: {
        type: 'IMAGE',
        source: {
          url: 'http://someurl/image.jpg',
        },
      },
    },
    // ... more items
];

const DetailPage = () => {

  const { id } = useParams();
  return (
    <main className="dashboard-layout d-flex">
        <Sidebar />
        <div className="dashboard-content-container d-flex">
            <article className='d-flex flex-column w-full h-full'>
                <header className="header-dashboard-container d-flex flex-column">
                    <h1 className="title-header-dashboard">Detalles del Sembrío</h1>
                </header>
                <section className="details-container d-flex mt-3">
                    <div className="w-full h-full d-flex gap-2 flex-column justify-around">
                        <article className="card w-30 h-20">
                            <p className="card-item">
                                <span className="card-label">Cultivo: </span>
                                <span className="card-value">Zanahoria</span>
                            </p>
                            <p className="card-item">
                                <span className="card-label">Fecha de la Siembra: </span>
                                <span className="card-value">2000-01-01</span>
                            </p>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                        </article>
                        <div className="card w-full h-80 d-flex">
                            <article className="h-full w-35">
                                <h2 className="card-title">Progreso del Sembrío</h2>
                                <p className="card-item">
                                    <span className="card-label">Estado: </span> 
                                    <span className="card-value status-text">En crecimiento</span>
                                </p>
                                <p className="card-item">
                                    <span className="card-label">Progreso: </span> 
                                    <span className="card-value">75%</span>
                                </p>
                                <p className="card-item">
                                    <span className="card-label">Fecha estimada de cosecha: </span> 
                                    <span className="card-value">2023-12-31</span>
                                </p>
                            </article>
                            <Timeline />
                        </div>
                    </div>
                </section>
            </article>
        </div>
    </main>
  );
};

export default DetailPage;