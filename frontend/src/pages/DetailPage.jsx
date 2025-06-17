import { useState } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import Timeline from '../components/modules/Timeline';
import LineChart from '../components/modules/LinearChart';
import Button from '../components/widgets/Button';

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
  const [Graph, setGraph] = useState('Timeline');

  const showGraph = () =>{
    switch (Graph){
      case 'Timeline':
        return <Timeline />
      case 'Comercio':
        return <LineChart />
    }
  }

  // Extracted the ternary operation into a variable
  let graphTitle = '';
  if (Graph === 'Timeline') {
    graphTitle = 'Línea de Tiempo de la Cosecha';
  } else if (Graph === 'Comercio') {
    graphTitle = 'Gráfico de Comercio de la Cosecha';
  }

  return (
    <main className="dashboard-layout d-flex">
        <Sidebar />
        <div className="dashboard-content-container d-flex">
            <article className='d-flex flex-column w-full h-full'>
                <header className="header-dashboard-container d-flex flex-column">
                    <h1 className="title-header-dashboard">Detalles del Sembrío</h1>
                </header>
                <section className="details-container d-flex mt-3 w-full h-full">
                    <div className="w-full h-full d-flex gap-2 flex-column justify-around">
                        <article className="card d-flex w-full h-full justify-between flex-wrap">
                            <div className="h-full w-35">
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
                            </div>
                            <div className="w-60 h-full d-flex flex-column">
                              <h2 className='text-center'>
                                {graphTitle}
                              </h2>
                                {showGraph()}
                                <div className="w-full d-flex gap-4 justify-center">
                                    <Button label='Linea de Progreso' onClick={() => setGraph('Timeline')} />
                                    <Button label='Linea de Comercio' onClick={() => setGraph('Comercio')} />
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </article>
        </div>
    </main>
  );
};

export default DetailPage;