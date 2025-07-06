import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CropsPage from "./pages/CropsPage";
import DetailPage from "./pages/DetailPage";
import AiChatPage from "./pages/AiChatPage";
import CallbackPage from "./pages/CallbackPage";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./components/components/ProtectedRoute";

import useAuthStore from "./store/useAuthStore";

import "./css/index.css";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();

  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/callback") {
      checkSession();
    }
  }, [location.pathname, checkSession]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
            <CropsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crop/:id"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crop/:id/ai-chat"
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
  );
}

export default AppWrapper;
