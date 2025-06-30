import { useGetMetaDataQuery } from '../../../../Redux/metaApis'
import { useEffect, useState } from 'react'

const StatCard = ({ title, value }) => (
  <div className="rounded-md border h-[120px] !bg-[#0F1724] border-[#FDC105] p-4 flex flex-col items-center justify-center">
    <div className="text-2xl font-bold text-[#FDC105]">{value}</div>
    <div className="flex items-center mb-2 mt-2">
      <span className="ml-2 text-[22px]">{title}</span>
    </div>
  </div>
)

const OverView = () => {
  const { data: getAllMetaData } = useGetMetaDataQuery()

  const [stats, setStats] = useState([])

  useEffect(() => {
    if (getAllMetaData?.data) {
      const mappedStats = [
        {
          title: 'Total Users',
          value: getAllMetaData.data.totalUser ?? 0,
        },
        {
          title: 'Total Owners',
          value: getAllMetaData.data.totalOwner ?? 0,
        },
        {
          title: 'Total Athletics',
          value: getAllMetaData.data.totalAthletics ?? 0,
        },
        {
          title: 'Total Sports',
          value: getAllMetaData.data.totalSports ?? 0,
        },
        {
          title: 'Total Earnings',
          value: `$${getAllMetaData.data.totalEarning ?? 0}`,
        },
      ]
      setStats(mappedStats)
    }
  }, [getAllMetaData])

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  )
}

export default OverView
