import React from 'react';
import ProgressPanelItem from './ProgressPanelItem';

const ProgressPanel = () => {
  return (
    <section className="progress-panel-section d-flex">
        <ProgressPanelItem />
        <ProgressPanelItem />
        <ProgressPanelItem />
        <ProgressPanelItem />
    </section>
  );
};

export default ProgressPanel;