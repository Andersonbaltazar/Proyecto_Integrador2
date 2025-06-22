import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CropsPage from "./pages/CropsPage";
import DetailPage from "./pages/DetailPage";
import sownData from "./data/sown.data";
import AiChatPage from "./pages/AiChatPage";
import "./css/index.css";

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
        <Route path="/home" element={<DashboardPage />} />
        <Route
          path="/crops"
          element={<CropsPage data={filteredSown} onSearch={setSearchTerm} />}
        />
        <Route path="/crops/:id" element={<DetailPage />} />
        <Route path="/ai-chat" element={<AiChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
