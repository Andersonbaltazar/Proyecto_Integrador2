import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  datasets: [
    {
      label: 'Temperatura (°C)',
      data: [22, 25, 20, 23, 26],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      tension: 0
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Temperatura mensual'
    }
  }
};

const LinearChart = () => {
  return ( 
    <div className="w-full h-full d-flex align-center">
        <Line data={data} options={options} />;
    </div>
   );
}
 
export default LinearChart;
