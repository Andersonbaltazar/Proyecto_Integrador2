import AiChat from "../components/components/AiChat";
import Sidebar from "../components/layouts/Sidebar";

const AiChatPage = () => {
  return (
    <main className="page-layout d-flex">
      <Sidebar />
      <div className="page-content-container d-flex">
        <article className="d-flex flex-column w-full h-full">
          <header className="header-dashboard-container d-flex flex-column">
            <h1 className="title-header-dashboard">Asistente AI</h1>
          </header>
          <section className="details-container d-flex mt-3 w-full h-full">
            <AiChat />
          </section>
        </article>
      </div>
    </main>
  );
};

export default AiChatPage;
