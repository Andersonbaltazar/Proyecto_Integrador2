import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
import Timeline from "../components/modules/Timeline";
import LineChart from "../components/modules/LinearChart";
import Button from "../components/widgets/Button";
import useCropStore from "../store/useCropStore";
import CultivoModal from "../components/CultivoModal";
import Swal from "sweetalert2";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const deleteCrop = useCropStore((state) => state.deleteCrop);
  const patchCrop = useCropStore((state) => state.patchCrop);
  const [selectedGraph, setSelectedGraph] = useState("Timeline");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const actionsDropdownRef = useRef(null);
  const { item } = location.state || {};

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  const handleEditCrop = () => {
    toggleModal();
  };

  // Cierra el dropdown si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (
        actionsDropdownRef.current &&
        !actionsDropdownRef.current.contains(e.target)
      ) {
        setActionsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!item) {
    return (
      <main className="page-layout d-flex">
        <Sidebar />
        <div className="page-content-container d-flex align-center justify-center w-full">
          <div className="enhanced-empty-state">
            <h3 className="enhanced-empty-title">
              No se encontraron datos del sembrío
            </h3>
            <Link
              className="enhanced-button enhanced-button--secondary"
              to="/crops"
            >
              Volver
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const {
    id,
    nombre,
    fechaSiembra,
    descripcion,
    localidad,
    estado,
    tipoTerreno,
  } = item;

  const graphOptions = [
    { id: "Timeline", label: "Línea de Progreso", icon: "time-outline" },
    {
      id: "Comercio",
      label: "Gráfico de Comercio",
      icon: "trending-up-outline",
    },
  ];

  const showGraph = () => {
    switch (selectedGraph) {
      case "Timeline":
        return <Timeline cultivoId={id}/>;
      case "Comercio":
        return <LineChart cultivoId={id} />;
      default:
        return <Timeline cultivoId={id} />;
    }
  };

  const handleToggleState = async () => {
    const nuevoEstado = estado === "Activo" ? "Completado" : "Activo";

    const result = await Swal.fire({
      title: `¿Deseas marcar como ${nuevoEstado}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await patchCrop(id, nuevoEstado);
        Swal.fire("Actualizado", `Marcado como ${nuevoEstado}`, "success");
        navigate("/crops");
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar.", "error");
      }
    }
  };

  const getGraphTitle = () => {
    const option = graphOptions.find((opt) => opt.id === selectedGraph);
    return option ? option.label : "Gráfico";
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleActionsDropdown = () => {
    setActionsDropdownOpen(!actionsDropdownOpen);
  };

  const selectGraph = (graphId) => {
    setSelectedGraph(graphId);
    setDropdownOpen(false);
  };

  const handleDelete = async () => {
    setActionsDropdownOpen(false);

    const result = await Swal.fire({
      title: "¿Estas seguro de eliminar el sembrío?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteCrop(id);
        Swal.fire(
          "¡Eliminado!",
          "El cultivo ha sido eliminado correctamente.",
          "success"
        );
        navigate("/crops");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el cultivo.", "error");
      }
    }
  };

  return (
    <main className="page-layout d-flex">
      <Sidebar />
      <div className="page-content-container d-flex">
        <article className="d-flex flex-column w-full h-full">
          <header className="enhanced-header">
            <div className="d-flex justify-between align-center w-full flex-wrap gap-3">
              <h1 className="enhanced-title">Detalles del Cultivo</h1>
              <div className="d-flex gap-2">
                <Link
                  className="enhanced-button enhanced-button--secondary"
                  to="/crops"
                >
                  <ion-icon name="arrow-back-outline"></ion-icon>
                  Volver
                </Link>
                <Link
                      className="enhanced-button enhanced-button--secondary"
                      to={`/crop/${id}/ai-chat`}
                    >
                      <ion-icon name="sparkles-outline"></ion-icon>
                      Ir a ChatAI
                    </Link>

                {/* Dropdown de acciones */}
                <div className="dropdown" ref={actionsDropdownRef}>
                  <Button
                    className="enhanced-button enhanced-button--secondary"
                    onClick={toggleActionsDropdown}
                  >
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                  </Button>

                  {actionsDropdownOpen && (
                    <div className="dropdown-menu actions-dropdown-menu">
                      <div className="dropdown-item" onClick={handleEditCrop}>
                        <ion-icon name="create-outline"></ion-icon>
                        Editar Sembrío
                      </div>
                      <div className="d-flex justify-center">
                        <div
                          className="dropdown-item dropdown-item--danger"
                          onClick={handleDelete}
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                          Eliminar Sembrío
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <section className="enhanced-content d-flex mt-3 w-full h-full">
            <div className="w-full h-full d-flex gap-4 detail-page-layout">
              {/* Panel de información del cultivo */}
              <div className="detail-info-panel">
                <div className="enhanced-card detail-card">
                  <div className="progress-card-content">
                    <div className="progress-card-header">
                      <h3 className="progress-card-title">{nombre}</h3>
                      <span className="progress-card-status active">
                        Activo
                      </span>
                    </div>

                    <div className="progress-card-details">
                      <div className="progress-card-detail">
                        <ion-icon name="leaf"></ion-icon>
                        <span>
                          <strong>Tipo de Terreno:</strong> {tipoTerreno.nombre}
                        </span>
                      </div>
                    </div>

                    <div className="progress-card-details">
                      <div className="progress-card-detail">
                        <ion-icon name="location"></ion-icon>
                        <span>
                          <strong>Localidad:</strong> {localidad}
                        </span>
                      </div>
                    </div>

                    <div className="progress-card-details">
                      <div className="progress-card-detail">
                        <ion-icon name="calendar"></ion-icon>
                        <span>
                          <strong>Fecha de Siembra:</strong> {fechaSiembra}
                        </span>
                      </div>
                    </div>

                    <div className="progress-card-details">
                      <div className="progress-card-detail">
                        <ion-icon name="trending-up"></ion-icon>
                        <span>
                          <strong>Estado:</strong> {estado}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="enhanced-stat-label">Descripción</h4>
                      <p className="text-justify">{descripcion}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-center mt-4">
                    <div
                      className="enhanced-button enhanced-button--secondary"
                      onClick={handleToggleState}
                    >
                      <ion-icon name="options-outline"></ion-icon>
                      {estado === "Activo"
                        ? "Marcar como Completado"
                        : "Marcar como Activo"}
                    </div>
                  </div>
                </div>

                {/* Panel de recomendaciones */}
                <div className="enhanced-card detail-card">
                  <div className="progress-card-content">
                    <div className="progress-card-header">
                      <h4 className="progress-card-title">
                        <ion-icon name="bulb-outline"></ion-icon>
                        Recomendaciones
                      </h4>
                    </div>
                    <ul className="mt-2">
                      <li className="progress-card-detail">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        Evitar exceso de riego
                      </li>
                      <li className="progress-card-detail">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        Revisar hojas por plagas
                      </li>
                      <li className="progress-card-detail">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                        Mantener control de temperatura
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Panel del gráfico */}
              <div className="detail-graph-panel">
                <div className="enhanced-card detail-card h-full">
                  <div className="progress-card-content h-full d-flex flex-column">
                    {/* Header del gráfico con dropdown */}
                    <div className="progress-card-header d-flex justify-between align-center flex-wrap gap-3">
                      <h2 className="enhanced-title">{getGraphTitle()}</h2>

                      {/* Dropdown para seleccionar gráfico */}
                      <div className="dropdown" ref={dropdownRef}>
                        <Button
                          className="enhanced-button enhanced-button--secondary"
                          onClick={toggleDropdown}
                        >
                          <ion-icon name="options-outline"></ion-icon>
                          Cambiar Gráfico
                        </Button>

                        {dropdownOpen && (
                          <div className="dropdown-menu">
                            {graphOptions.map((option) => (
                              <div
                                key={option.id}
                                className={`dropdown-item ${
                                  selectedGraph === option.id ? "active" : ""
                                }`}
                                onClick={() => selectGraph(option.id)}
                              >
                                <ion-icon name={option.icon}></ion-icon>
                                {option.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido del gráfico */}
                    <div className="flex-1 d-flex flex-column justify-center">
                      {showGraph()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
      <CultivoModal show={showModal} toggle={toggleModal} initialData={item} />
    </main>
  );
};

export default DetailPage;
