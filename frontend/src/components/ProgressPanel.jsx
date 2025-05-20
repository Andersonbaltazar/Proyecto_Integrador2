import React from 'react';
import ProgressPanelItem from './ProgressPanelItem';
import CultivoModal from './CultivoModal';
import mangoImg from '../assets/images/mango.jpeg';
import pearImg from '../assets/images/pear.jpg';
import avocadoImg from '../assets/images/avocado.jpg';
import carrotImg from '../assets/images/carrot.jpg';
import AddButton from './AddButton';

const fruits = [
  // Descomenta esto si quieres probar la tarjeta vacía
  // (deja el arreglo vacío)
  // 
  // Ejemplo:
  // { title: "Mango", growth: 48, image: mangoImg },
  // { title: "Pear", growth: 65, image: pearImg },
  // { title: "Avocado", growth: 94, image: avocadoImg },
  // { title: "Carrot", growth: 82, image: carrotImg },
];

const ProgressPanel = () => {
  return (
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {fruits.length === 0 ? (
        <div className="progress-card-empty d-flex flex-column text-center gap-2">
          <h3 className='title-progress-card-empty'>No hay cultivos registrados</h3>
          <p className='paragraph-progress-card-empty'>Agrega tu primer cultivo para comenzar a ver su progreso 📈</p>
          <CultivoModal />
        </div>
      ) : (
        fruits.map((fruit, index) => {
          const bgClass = index % 2 === 0 ? "progress-card-1" : "progress-card-2";
          return (
            <ProgressPanelItem
              key={fruit.title}
              title={fruit.title}
              growth={fruit.growth}
              image={fruit.image}
              customClass={bgClass}
            />
          );
        })
      )}
    </div>
  );
};

export default ProgressPanel;
