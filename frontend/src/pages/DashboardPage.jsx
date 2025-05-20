import React from 'react';
import DashboardLayout from "../components/DashboardLayout";

const DashboardPage = ({ setIsAuthenticated }) => {
  return <DashboardLayout setIsAuthenticated={setIsAuthenticated} />;
};

export default DashboardPage;
