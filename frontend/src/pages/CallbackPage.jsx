// src/pages/CallbackPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { ClipLoader } from "react-spinners";

const CallbackPage = () => {
  const checkSession = useAuthStore((state) => state.checkSession);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      await checkSession();
      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 3000);
    };

    verify();
  }, [checkSession, navigate]);

  return (
    <div className="d-flex flex-column justify-center align-center h-full w-full">
      {isLoading && (
        <>
          <ClipLoader color="#2ecc71" size={60} />
          <p className="mt-3">Cargando sesión...</p>
        </>
      )}
    </div>
  );
};

export default CallbackPage;
