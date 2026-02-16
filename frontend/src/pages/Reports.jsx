import { useState, useEffect } from 'react'
import axios from 'axios'

const Reports = () => {
  const [energyData, setEnergyData] = useState([])
  const [wasteData, setWasteData] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showFilter, setShowFilter] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [energyRes, wasteRes] = await Promise.all([
        axios.get('/api/energy'),
        axios.get('/api/waste')
      ])
      setEnergyData(energyRes.data.data)
      setWasteData(wasteRes.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching report data:', error)
      setLoading(false)
    }
  }

  // Filter Data
  const filteredEnergyData = energyData.filter(item => item.date === selectedDate)
  const filteredWasteData = wasteData.filter(item => item.date === selectedDate)

  const handleExportCSV = () => {
    const headers = ['Type', 'Date', 'Category/Department', 'Value/Details']
    const csvRows = [headers.join(',')]

    // Add Energy Data
    filteredEnergyData.forEach(item => {
      csvRows.push(['Energy', item.date, item.block, `${item.energy} kWh`].join(','))
    })

    // Add Waste Data
    filteredWasteData.forEach(item => {
      csvRows.push(['Waste (Organic)', item.date, 'N/A', `${item.organic} kg`].join(','))
      csvRows.push(['Waste (Recyclable)', item.date, 'N/A', `${item.recyclable} kg`].join(','))
      csvRows.push(['Waste (Non-Recyclable)', item.date, 'N/A', `${item.non_recyclable} kg`].join(','))
    })

    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${selectedDate}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Generating Reports...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Reports</h1>
          <p className="text-slate-400 text-sm mt-1">Download and analyze historical performance.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-end">
          {showFilter && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
            />
          )}
          <div className="flex space-x-3">
            <button
              className={`btn-secondary group ${showFilter ? 'bg-slate-700 text-white' : ''}`}
              onClick={() => setShowFilter(!showFilter)}
            >
              <i className="fa-solid fa-filter mr-2 text-slate-400 group-hover:text-white transition-colors"></i> Filter
            </button>
            <button className="btn-primary group" onClick={handleExportCSV}>
              <i className="fa-solid fa-download mr-2 group-hover:animate-bounce"></i> Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Energy Report Card */}
        <div className="glass-card flex flex-col h-full">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-amber-500/5">
            <h3 className="font-semibold text-white flex items-center">
              <i className="fa-solid fa-bolt text-amber-500 mr-2"></i> Energy Logs
            </h3>
            <span className="text-xs text-slate-400">Date: {selectedDate}</span>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="modern-table w-full">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Usage (kWh)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredEnergyData.length > 0 ? (
                  filteredEnergyData.map((item, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.block}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-500 font-medium text-right">{item.energy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-slate-500 text-sm">No energy data for selected date</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 bg-slate-900/30">
            <button className="text-sm text-cyan-500 hover:text-cyan-400 font-medium w-full text-center">View Full Report</button>
          </div>
        </div>

        {/* Waste Report Card */}
        <div className="glass-card flex flex-col h-full">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-blue-500/5">
            <h3 className="font-semibold text-white flex items-center">
              <i className="fa-solid fa-recycle text-blue-500 mr-2"></i> Waste Logs
            </h3>
            <span className="text-xs text-slate-400">Date: {selectedDate}</span>
          </div>
          <div className="p-0 overflow-x-auto flex-1">
            <table className="modern-table w-full">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-emerald-400 uppercase tracking-wider">Org</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-blue-400 uppercase tracking-wider">Rec</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-red-400 uppercase tracking-wider">Non</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredWasteData.length > 0 ? (
                  filteredWasteData.map((item, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-300">{item.organic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-300">{item.recyclable}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-300">{item.non_recyclable}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-slate-500 text-sm">No waste data for selected date</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 bg-slate-900/30">
            <button className="text-sm text-cyan-500 hover:text-cyan-400 font-medium w-full text-center">View Full Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
