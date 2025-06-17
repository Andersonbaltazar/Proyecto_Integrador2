import { Chrono } from "react-chrono";

const items = [
  {
    title: "Enero 2023",
    cardTitle: "Inicio del Cultivo",
    cardSubtitle: "Preparación del terreno",
    cardDetailedText: "Se realizó el arado y la siembra inicial.",
  },
  {
    title: "Marzo 2023",
    cardTitle: "Crecimiento",
    cardSubtitle: "Aplicación de fertilizantes",
    cardDetailedText: "Se aplicaron nutrientes para mejorar el desarrollo.",
  },
  {
    title: "Enero 2023",
    cardTitle: "Inicio del Cultivo",
    cardSubtitle: "Preparación del terreno",
    cardDetailedText: "Se realizó el arado y la siembra inicial.",
  },
  {
    title: "Marzo 2023",
    cardTitle: "Crecimiento",
    cardSubtitle: "Aplicación de fertilizantes",
    cardDetailedText: "Se aplicaron nutrientes para mejorar el desarrollo.",
  },
  {
    title: "Enero 2023",
    cardTitle: "Inicio del Cultivo",
    cardSubtitle: "Preparación del terreno",
    cardDetailedText: "Se realizó el arado y la siembra inicial.",
  },
  {
    title: "Marzo 2023",
    cardTitle: "Crecimiento",
    cardSubtitle: "Aplicación de fertilizantes",
    cardDetailedText: "Se aplicaron nutrientes para mejorar el desarrollo.",
  },
];

const Timeline = () => {
  return (
    <div className="w-full h-full" style={{ overflowX: "auto" }}>
      <div className="w-full h-full d-flex align-center">
        <Chrono
            items={items}
            mode="HORIZONTAL"
            disableToolbar={true}
            hideControls={false}
        />
      </div>
    </div>
  );
};

export default Timeline;
