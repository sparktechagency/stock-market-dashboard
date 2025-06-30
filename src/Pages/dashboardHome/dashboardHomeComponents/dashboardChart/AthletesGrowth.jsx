import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts'

const AthletesGrowth = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse()

  const data = [
    { month: 'Jan', value: 25 },
    { month: 'Feb', value: 75 },
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 35 },
    { month: 'May', value: 80 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 75 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 75 },
    { month: 'Oct', value: 65 },
    { month: 'Nov', value: 55 },
    { month: 'Dec', value: 45 },
  ]

  return (
    <div className="w-1/2 bg-[#0F1724]  border !border-[#FDC105] p-4 rounded-md   ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Athletes Growth</h2>
        <select className="p-2  text-black rounded text-sm outline-none border border-gray-200">
          {years.map((year) => (
            <option key={year} value={year} className="cursor-pointer">
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-100 ">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 5, left: 5, bottom: 25 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8979FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#EBEBEB"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8979FF', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickFormatter={(tick) => `${tick}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8979FF', fontSize: 12 }}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Athlete Growth']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                borderRadius: '3px',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8979FF"
              strokeWidth={2}
              fill="url(#colorGradient)"
              activeDot={{ r: 10 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AthletesGrowth
