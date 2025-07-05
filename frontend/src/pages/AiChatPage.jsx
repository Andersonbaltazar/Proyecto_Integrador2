import AiChat from "../components/components/AiChat";
import Sidebar from "../components/layouts/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import "../css/modules/ai-chat.css";

const AiChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    // Volver a la página anterior o a la página de cultivos
    navigate(-1);
  };

  return (
    <main className="page-layout d-flex">
      <Sidebar />
      <div className="page-content-container d-flex">
        <article className="d-flex flex-column w-full h-full">
          <section className="details-container d-flex w-full h-full">
            <AiChat cultivoId={id} onBack={handleBack} />
          </section>
        </article>
      </div>
    </main>
  );
};

export default AiChatPage;
