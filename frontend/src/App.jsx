import { useState, useEffect  } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import "./css/index.css";
import LoginPage from './pages/LoginPage';
import CropsPage from './pages/CropsPage';
import DetailPage from './pages/DetailPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<DashboardPage />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/crops/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
