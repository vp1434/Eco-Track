import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  const [timeRange, setTimeRange] = useState(7)

  useEffect(() => {
    fetchDashboardData()
  }, [timeRange])

  const fetchDashboardData = async () => {
    try {
      const [summaryRes, alertsRes] = await Promise.all([
        axios.get(`/api/dashboard/summary?days=${timeRange}`),
        axios.get('/api/dashboard/alerts')
      ])

      setSummary(summaryRes.data.data)
      setAlerts(alertsRes.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <span className="text-slate-400 text-sm font-medium animate-pulse">Loading Dashboard...</span>
        </div>
      </div>
    )
  }

  const COLORS = ['#10b981', '#3b82f6', '#ef4444'] // Emerald, Blue, Red

  const wasteData = summary ? [
    { name: 'Organic', value: summary.wasteDistribution.organic },
    { name: 'Recyclable', value: summary.wasteDistribution.recyclable },
    { name: 'Non-Recyclable', value: summary.wasteDistribution.non_recyclable }
  ] : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">Real-time monitoring of campus resources.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>System Operational</span>
          <span className="text-slate-600">|</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Energy */}
        <div className="glass-card p-6 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Energy Usage</p>
              <h3 className="text-3xl font-bold text-white mt-1">{summary?.totalEnergyToday} <span className="text-lg text-slate-500 font-normal">kWh</span></h3>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
              <i className="fa-solid fa-bolt text-xl"></i>
            </div>
          </div>
          <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center">
            <i className="fa-solid fa-arrow-trend-up text-amber-500 mr-1.5"></i>
            <span className="text-slate-400">Daily Average: 450 kWh</span>
          </p>
        </div>

        {/* Total Waste */}
        <div className="glass-card p-6 border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Waste Output</p>
              <h3 className="text-3xl font-bold text-white mt-1">{summary?.totalWasteToday} <span className="text-lg text-slate-500 font-normal">kg</span></h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <i className="fa-solid fa-dumpster text-xl"></i>
            </div>
          </div>
          <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center">
            <i className="fa-solid fa-arrow-trend-down text-emerald-500 mr-1.5"></i>
            <span className="text-slate-400">-5% from yesterday</span>
          </p>
        </div>

        {/* Active Alerts */}
        <div className="glass-card p-6 border-l-4 border-l-red-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Active Alerts</p>
              <h3 className="text-3xl font-bold text-white mt-1">{summary?.alertsCount}</h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg text-red-500 animate-pulse">
              <i className="fa-solid fa-bell text-xl"></i>
            </div>
          </div>
          <p className="text-xs text-red-400 mt-6 font-medium flex items-center">
            <i className="fa-solid fa-circle-exclamation mr-1.5"></i>
            Attention Required
          </p>
        </div>

        {/* Eco Score */}
        <div className="glass-card p-6 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Sustainability</p>
              <h3 className="text-3xl font-bold text-white mt-1">{summary?.sustainabilityScore}<span className="text-lg text-slate-500">%</span></h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
              <i className="fa-solid fa-leaf text-xl"></i>
            </div>
          </div>
          <div className="w-full bg-slate-700/30 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${summary?.sustainabilityScore}%` }}></div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Target: <span className="text-emerald-400 font-medium">85%</span>
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Energy Consumption Trend</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="text-xs text-slate-200 hover:text-white font-medium px-3 py-1 bg-slate-800/50 rounded border border-slate-700 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value={1} className="bg-slate-900 text-slate-200">Last 24 Hours</option>
              <option value={2} className="bg-slate-900 text-slate-200">Last 2 Days</option>
              <option value={7} className="bg-slate-900 text-slate-200">Last 7 Days</option>
              <option value={30} className="bg-slate-900 text-slate-200">Last 30 Days</option>
              <option value={365} className="bg-slate-900 text-slate-200">Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={summary?.energyTrend}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}k`}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="energy" stroke="#f59e0b" fillOpacity={1} fill="url(#colorEnergy)" />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#1e293b', stroke: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart / Notifications */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Waste Composition</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-3xl font-bold text-white">{summary?.totalWasteToday}</span>
                <p className="text-xs text-slate-400 uppercase">Total kg</p>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-300"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>Organic</span>
              <span className="font-semibold text-white">{wasteData[0]?.value} kg</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-300"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Recyclable</span>
              <span className="font-semibold text-white">{wasteData[1]?.value} kg</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-300"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>Non-Recyclable</span>
              <span className="font-semibold text-white">{wasteData[2]?.value} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">System Notifications</h3>
          <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
            {alerts.length} New
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-white/5 transition-colors flex items-start group">
              <div className={`mt-1 w-2 h-2 rounded-full mr-4 flex-shrink-0 ${alert.severity === 'critical' ? 'bg-red-500 shadow-sm shadow-red-500/50' :
                alert.severity === 'warning' ? 'bg-amber-500 shadow-sm shadow-amber-500/50' :
                  'bg-blue-500 shadow-sm shadow-blue-500/50'
                }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(alert.timestamp).toLocaleTimeString()}</p>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
