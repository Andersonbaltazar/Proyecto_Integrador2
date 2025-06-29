import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Timeline from "../components/modules/Timeline";
import LineChart from "../components/modules/LinearChart";
import Button from "../components/widgets/Button";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Graph, setGraph] = useState("Timeline");
  const { item } = location.state || {};

  if (!item) {
    return (
      <main className="dashboard-layout d-flex">
        <Sidebar />
        <div className="dashboard-content-container d-flex align-center justify-center w-full">
          <p className="text-center text-danger">
            No se encontraron datos del sembrío.{" "}
            <Button onClick={() => navigate(-1)}>Volver</Button>
          </p>
        </div>
      </main>
    );
  }

  const { nombre, fechaSiembra, descripcion } = item;

  const showGraph = () => {
    switch (Graph) {
      case "Timeline":
        return <Timeline />;
      case "Comercio":
        return <LineChart />;
      default:
        return null;
    }
  };

  const graphTitle =
    Graph === "Timeline"
      ? "Línea de Tiempo de la Cosecha"
      : "Gráfico de Comercio de la Cosecha";

  return (
    <main className="page-layout d-flex">
      <Sidebar />
      <div className="page-content-container d-flex">
        <article className="d-flex flex-column w-full h-full">
          <header className="header-dashboard-container d-flex flex-column">
            <h1 className="title-header-dashboard">Detalles del Sembrío</h1>
          </header>
          <section className="details-container d-flex mt-3 w-full h-full">
            <div className="w-full h-full d-flex gap-2 flex-column justify-around">
              <article className="card d-flex w-full h-full justify-between flex-wrap">
                <div className="d-flex flex-column h-full w-35">
                  <div className="d-flex flex-column w-full gap-2">
                    <div className="w-full background-secondary p-4 br-2">
                      <p className="card-item">
                        <span className="card-label">
                          <strong>Cultivo: </strong>
                        </span>
                        <span className="card-value">{nombre}</span>
                      </p>
                      <p className="card-item">
                        <span className="card-label">
                          <strong>Fecha de la Siembra: </strong>
                        </span>
                        <span className="card-value">{fechaSiembra}</span>
                      </p>
                      <p className="card-description text-justify">
                        {descripcion}
                      </p>
                    </div>
                    <div className="w-full background-tertiary p-4 br-2">
                      <h4>Recomendaciones</h4>
                      <ul>
                        <li>Evitar exceso de riego</li>
                        <li>Revisar hojas por plagas</li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex w-full justify-center mt-a">
                    <Button className="button" label="Volver" onClick={() => navigate(-1)} />
                  </div>
                </div>
                <div className="w-60 h-full d-flex flex-column">
                  <h2 className="text-center">{graphTitle}</h2>
                  {showGraph()}
                  <div className="w-full d-flex gap-4 justify-center">
                    <Button
                      className="button"
                      label="Linea de Progreso"
                      onClick={() => setGraph("Timeline")}
                    />
                    <Button
                      className="button"
                      label="Linea de Comercio"
                      onClick={() => setGraph("Comercio")}
                    />
                  </div>
                </div>
              </article>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
};

export default DetailPage;
