import AthletesGrowth from './AthletesGrowth'
import EarningsGrowthData from './EarningsGrowthData'

const DashboardCharts = () => {
  return (
    <div className="flex gap-4 px-4">
      <AthletesGrowth />
      <EarningsGrowthData />
    </div>
  )
}

export default DashboardCharts
