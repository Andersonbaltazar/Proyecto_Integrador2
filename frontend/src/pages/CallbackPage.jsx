// src/pages/CallbackPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const CallbackPage = () => {
  const checkSession = useAuthStore((state) => state.checkSession);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      await checkSession(); // ✅ aquí ya se tiene la cookie
      navigate("/home");    // ✅ luego de verificar, se va a home
    };

    verify();
  }, [checkSession, navigate]);

  return (
    <div className="d-flex justify-center align-center vh-100">
      <h2>Verificando sesión...</h2>
    </div>
  );
};

export default CallbackPage;
