import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <DashboardContent />
    </div>
  );
};

export default DashboardLayout;