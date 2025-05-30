import React from 'react';
import Sidebar from '../components/layouts/Sidebar';
import DashboardContent from '../components/DashboardContent';

const DashboardPage = () => {
  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default DashboardPage;