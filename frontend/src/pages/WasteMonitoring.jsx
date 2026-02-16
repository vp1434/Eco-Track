import { useState, useEffect } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const WasteMonitoring = () => {
  const [wasteData, setWasteData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWasteData()
  }, [])

  const fetchWasteData = async () => {
    try {
      const response = await axios.get('/api/waste')
      setWasteData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching waste data:', error)
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Waste Metrics...</div>

  const latestData = wasteData.length > 0 ? wasteData[wasteData.length - 1] : null
  const totalWaste = latestData ? latestData.organic + latestData.recyclable + latestData.non_recyclable : 0

  const pieData = latestData ? [
    { name: 'Organic', value: latestData.organic, color: '#10b981' }, // Emerald-500
    { name: 'Recyclable', value: latestData.recyclable, color: '#3b82f6' }, // Blue-500
    { name: 'Non-Recyclable', value: latestData.non_recyclable, color: '#f59e0b' } // Amber-500 (changed from Red for better aesthetics)
  ] : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Waste Management</h1>
        <p className="text-slate-400 text-sm mt-1">Daily segregation and disposal tracking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Stats */}
        <div className="glass-card p-6 flex flex-col justify-center lg:col-span-1">
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 border border-slate-700 mb-4">
              <i className="fa-solid fa-dumpster text-3xl text-slate-400"></i>
            </div>
            <h2 className="text-4xl font-bold text-white mb-1">{totalWaste}<span className="text-lg text-slate-500 font-normal">kg</span></h2>
            <p className="text-slate-500 text-sm">Total Daily Waste</p>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Composition Analysis</h3>
          <div className="h-[250px] w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Organic</h3>
            <i className="fa-solid fa-leaf text-emerald-500"></i>
          </div>
          <p className="text-3xl font-bold text-white">{latestData?.organic} <span className="text-sm text-slate-500 font-normal">kg</span></p>
          <p className="text-xs text-slate-500 mt-2">Compostable material</p>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Recyclable</h3>
            <i className="fa-solid fa-recycle text-blue-500"></i>
          </div>
          <p className="text-3xl font-bold text-white">{latestData?.recyclable} <span className="text-sm text-slate-500 font-normal">kg</span></p>
          <p className="text-xs text-slate-500 mt-2">Plastics, Paper, Glass</p>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-amber-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white">Non-Recyclable</h3>
            <i className="fa-solid fa-trash text-amber-500"></i>
          </div>
          <p className="text-3xl font-bold text-white">{latestData?.non_recyclable} <span className="text-sm text-slate-500 font-normal">kg</span></p>
          <p className="text-xs text-slate-500 mt-2">Hazardous / General Waste</p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Collection Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Date</th>
                <th className="text-emerald-400">Organic</th>
                <th className="text-blue-400">Recyclable</th>
                <th className="text-amber-400">Non-Recyclable</th>
                <th className="text-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {wasteData.slice().reverse().map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td className="font-medium text-emerald-500">{item.organic}</td>
                  <td className="font-medium text-blue-500">{item.recyclable}</td>
                  <td className="font-medium text-amber-500">{item.non_recyclable}</td>
                  <td className="font-bold text-white">{item.organic + item.recyclable + item.non_recyclable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WasteMonitoring
