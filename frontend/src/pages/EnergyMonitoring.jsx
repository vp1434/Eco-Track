import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const EnergyMonitoring = () => {
  const [energyData, setEnergyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBlock, setSelectedBlock] = useState('All')

  const blocks = ['All', 'CSE', 'Hostel', 'Library', 'Labs']

  useEffect(() => {
    fetchEnergyData()
  }, [])

  const fetchEnergyData = async () => {
    try {
      const response = await axios.get('/api/energy')
      setEnergyData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching energy data:', error)
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Energy Data...</div>

  // Data processing
  const latestDate = energyData.length > 0 ? energyData[energyData.length - 1].date : null
  const latestData = energyData.filter(item => item.date === latestDate)

  const blockTotals = blocks.slice(1).map(block => {
    const blockData = energyData.filter(item => item.block === block)
    const total = blockData.reduce((sum, item) => sum + item.energy, 0)
    return { block, total }
  })

  // Filter data for table
  const filteredData = selectedBlock === 'All'
    ? energyData
    : energyData.filter(item => item.block === selectedBlock)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Energy Management</h1>
          <p className="text-slate-400 mt-1">Real-time departmental power consumption analysis.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">Live Monitoring</span>
          </div>

          {/* Block Filter */}
          <div className="flex bg-slate-800/50 p-1 rounded-lg border border-slate-700">
            {blocks.map((block) => (
              <button
                key={block}
                onClick={() => setSelectedBlock(block)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${selectedBlock === block
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                {block}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {latestData.map((item) => (
          <div key={item.block} className="glass-card p-5 group hover:border-amber-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-400 text-sm font-medium">{item.block}</span>
              <i className={`fa-solid ${item.block === 'CSE' ? 'fa-laptop-code' :
                item.block === 'Hostel' ? 'fa-bed' :
                  item.block === 'Library' ? 'fa-book' : 'fa-flask'
                } text-slate-600 group-hover:text-amber-500 transition-colors`}></i>
            </div>
            <div className="text-2xl font-bold text-white">
              {item.energy} <span className="text-sm text-slate-500 font-normal">kWh</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1">
              <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${Math.min(item.energy / 5, 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="glass-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-white mb-6">Total Consumption by Department</h2>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={blockTotals} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
              <XAxis dataKey="block" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {blockTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#f59e0b' : '#d97706'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Consumption Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Department</th>
                <th>Consumption (kWh)</th>
                <th>Time Logged</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(-10).reverse().map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {item.block}
                    </span>
                  </td>
                  <td className="font-medium text-amber-500">{item.energy}</td>
                  <td className="text-slate-500">{new Date(item.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EnergyMonitoring
