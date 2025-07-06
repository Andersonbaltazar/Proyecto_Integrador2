import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import dayjs from "dayjs";
import { usePriceStore } from "../../store/usePriceStore";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const generarDatosInterpolados = (precioActual, precioFuturo, fechaCosecha) => {
  const hoy = dayjs();
  const fin = dayjs(fechaCosecha);
  const meses = fin.diff(hoy, "month");

  if (meses <= 0) return null;

  const labels = [];
  const data = [];

  for (let i = 0; i <= meses; i++) {
    const fecha = hoy.add(i, "month");
    const label = fecha.format("MMM YYYY");
    const precio = precioActual + ((precioFuturo - precioActual) / meses) * i;

    labels.push(label);
    data.push(parseFloat(precio.toFixed(2)));
  }

  return { labels, data };
};

const LinearChart = ({ cultivoId }) => {
  const { priceData, fetchPrice, loading, error } = usePriceStore();

  useEffect(() => {
    if (cultivoId) fetchPrice(cultivoId);
  }, [cultivoId]);

  if (loading) {
    return (
      <div className="timeline-loader-container">
        <div className="timeline-spinner"></div>
        <div>Cargando tu grafica de comercio...</div>
      </div>
    );
  }
  if (error) return <p>Error al cargar precios: {error}</p>;
  if (!priceData) return <p>No hay datos para mostrar.</p>;

  const { precioActualPorKilo, precioFuturoPorKilo, fechaCosecha, nombre } =
    priceData;

  const interpolados = generarDatosInterpolados(
    precioActualPorKilo,
    precioFuturoPorKilo,
    fechaCosecha
  );

  if (!interpolados) return <p>No se puede generar la gráfica.</p>;

  const chartData = {
    labels: interpolados.labels,
    datasets: [
      {
        label: `Proyección de Precio por kilo (USD)`,
        data: interpolados.data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Proyección de precios para ${nombre}`,
      },
    },
  };

  return (
    <div className="w-full h-full d-flex align-center">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LinearChart;
