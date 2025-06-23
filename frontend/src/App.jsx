import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CropsPage from "./pages/CropsPage";
import DetailPage from "./pages/DetailPage";
import sownData from "./data/sown.data";
import AiChatPage from "./pages/AiChatPage";
import ProtectedRoute from "./components/components/ProtectedRoute";
import "./css/index.css";
import CallbackPage from "./pages/CallbackPage";

function App() {
  const [sownDataState, setSownDataState] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSown = sownDataState.filter((sown) =>
    sown.cultivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSownDataState(sownData);
  }, []);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
