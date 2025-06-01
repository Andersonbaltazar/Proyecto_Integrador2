import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layouts/Sidebar';

const DetailPage = () => {
  const { id } = useParams();
  return (
    <div className="dashboard-layout d-flex">
        <Sidebar />
        <article className="dashboard-content-section d-flex flex-column">
            <header className="header-dashboard-content d-flex flex-column">
                <h1 className="title-header-dashboard">Detalles del Sembrío</h1>
            </header>
            <section className="progress-container gap-2">
                <div className="detail-card">
                    <h2>Detalles del Sembrío {id}</h2>
                    <p>Cultivo: Zanahoria</p>
                    <p>Fecha de la Siembra: 2000-01-01</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat optio, ipsum architecto commodi et asperiores! Provident fuga iure autem quisquam cum non, magnam eius esse, repellat facilis alias, quam a.</p>
                </div>
                <div className="progress-card">
                    <h2>Progreso del Sembrío</h2>
                    <p>Estado: En crecimiento</p>
                    <p>Progreso: 75%</p>
                    <p>Fecha estimada de cosecha: 2023-12-31</p>
                </div>
            </section>
            <aside className="ai-chat-container">
                <h2>Asistente AI</h2>
                <p>¿Cómo puedo ayudarte hoy?</p>
                <div className="ai-chat-box">
                    <input type="text" placeholder="Escribe tu mensaje..." />
                    <button>Enviar</button>
                </div>
            </aside>
        </article>
    </div>
  );
};

export default DetailPage;