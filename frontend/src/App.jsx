import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CropsPage from "./pages/CropsPage";
import DetailPage from "./pages/DetailPage";
import AiChatPage from "./pages/AiChatPage";
import CallbackPage from "./pages/CallbackPage";
import useAuthStore from "./store/useAuthStore";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/components/ProtectedRoute";
import "./css/index.css";
import useCultivoStore from "./store/useCultivoStore";

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchCultivos = useCultivoStore((state) => state.fetchCultivos);
  const cultivos = useCultivoStore((state) => state.cultivos);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredSown = cultivos.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/callback") {
      checkSession();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCultivos();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("Cultivos actualizados:", cultivos);
  }, [cultivos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crops"
          element={
            <ProtectedRoute>
              <CropsPage data={filteredSown} onSearch={setSearchTerm} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crops/:id"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AiChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
