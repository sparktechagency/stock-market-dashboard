import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const EarningsGrowthData = () => {
  const currentYear = new Date().getFullYear()

  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const EarningsGrowthData = {
    labels: months,
    datasets: [
      {
        label: 'Earning Growth',
        data: [100, 80, 75, 78, 77, 90, 85, 80, 75, 78, 76, 79],
        backgroundColor: '#FDC105',
      },
    ],
  }

  return (
    <div className="w-1/2">
      <div className="bg-[#0F1724] p-4 pb-16 border border-[#FDC105] rounded-md ">
        <div className="flex justify-between items-center mb-2 ">
          <h2 className="text-lg font-semibold">Earning Growth</h2>
          <select className="p-2 bg-gray-100 text-black rounded text-sm outline-none border border-gray-200">
            {years.map((year) => (
              <option key={year} value={year} className="cursor-pointer">
                {year}
              </option>
            ))}
          </select>
        </div>
        <Bar data={EarningsGrowthData} />
      </div>
    </div>
  )
}

export default EarningsGrowthData
