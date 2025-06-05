import React from 'react';

const CropsListItem = ({ title, growth, image, customClass }) => {
  return (
    <button className={`${customClass} d-flex flex-column gap-2 justify-center`}>
      <div className="img-container-progress-card d-flex justify-center">
          <img src={image} alt={`Imagen de ${title}`} className="img-progress-card" />
      </div>
      <h2 className="title-progress-card text-center">{title}</h2>
      <p className="paragraph-progress-card text-center">{growth}% Crecimiento</p>
    </button>
  );
};

export default CropsListItem;