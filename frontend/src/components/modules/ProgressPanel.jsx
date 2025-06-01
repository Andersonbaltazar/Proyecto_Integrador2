import React from 'react';
import ProgressPanelItem from '../components/ProgressPanelItem';
import CultivoModal from '../CultivoModal';
import mangoImg from '../../assets/images/mango.jpeg';
import pearImg from '../../assets/images/pear.jpg';
import avocadoImg from '../../assets/images/avocado.jpg';
import carrotImg from '../../assets/images/carrot.jpg';
import { Link } from 'react-router-dom';

const fruits = [
  // Descomenta esto si quieres probar la tarjeta vacía
  // (deja el arreglo vacío)
  // 
  // Ejemplo:
  {id:1, title: "Mango", growth: 48, image: mangoImg },
  {id:2, title: "Pear", growth: 65, image: pearImg },
  {id:3, title: "Avocado", growth: 94, image: avocadoImg },
  {id:4, title: "Carrot", growth: 82, image: carrotImg },
];

const ProgressPanel = () => {
  return (
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {fruits.length === 0 ? (
        <div className="progress-card-empty d-flex flex-column text-center gap-2">
          <h3 className='title-progress-card-empty'>No hay sembríos registrados</h3>
          <p className='paragraph-progress-card-empty'>Agrega tu primer sembrío para comenzar a ver su progreso 📈</p>
          <CultivoModal />
        </div>
      ) : (
        fruits.map((fruit, index) => {
          const bgClass = index % 2 === 0 ? "progress-card-1" : "progress-card-2";
          return (
            <Link to={`/crops/${fruit.id}`} key={fruit.id}>            
              <ProgressPanelItem
                title={fruit.title}
                growth={fruit.growth}
                image={fruit.image}
                customClass={bgClass}
              /> 
           </Link>
          );
        })
      )}
    </div>
  );
};

export default ProgressPanel;
