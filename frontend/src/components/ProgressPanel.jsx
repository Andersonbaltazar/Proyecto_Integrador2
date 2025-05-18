import React from 'react';
import ProgressPanelItem from './ProgressPanelItem';
import mangoImg from '../assets/images/mango.jpeg';
import pearImg from '../assets/images/pear.jpg';
import avocadoImg from '../assets/images/avocado.jpg';
import carrotImg from '../assets/images/carrot.jpg';

const fruits = [
  { title: "Mango", growth: 48, image: mangoImg },
  { title: "Pear", growth: 65, image: pearImg },
  { title: "Avocado", growth: 94, image: avocadoImg },
  { title: "Carrot", growth: 82, image: carrotImg },
];

const ProgressPanel = () => {
  return (
    <div className="progress-panel-section d-flex gap-5 flex-wrap">
      {fruits.map((fruit, index) => {
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
      })}
    </div>
  );
};

export default ProgressPanel;