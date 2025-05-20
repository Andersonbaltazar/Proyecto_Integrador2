import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';

const DashboardLayout = ({ setIsAuthenticated }) => {
  return (
    <div className="dashboard-layout d-flex">
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <DashboardContent />
    </div>
  );
};

export default DashboardLayout;