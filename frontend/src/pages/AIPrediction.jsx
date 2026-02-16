import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts'

const AIPrediction = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [predictionType, setPredictionType] = useState('Energy') // Energy or Waste

  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {
    try {
      const response = await axios.get('/api/predictions')
      setPredictions(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching predictions:', error)
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-400">Running AI Models...</div>

  // Filter data based on type
  const chartData = predictions.map(p => ({
    date: p.date,
    actual: predictionType === 'Energy' ? p.predictedEnergy * (0.9 + Math.random() * 0.2) : p.predictedWaste * (0.9 + Math.random() * 0.2), // Mock actual
    predicted: predictionType === 'Energy' ? p.predictedEnergy : p.predictedWaste
  }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Insights & Forecasting</h1>
          <p className="text-slate-400 text-sm mt-1">Predictive analytics for resource planning.</p>
        </div>

        <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex">
          <button
            onClick={() => setPredictionType('Energy')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${predictionType === 'Energy' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
          >
            Energy Forecast
          </button>
          <button
            onClick={() => setPredictionType('Waste')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${predictionType === 'Waste' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
          >
            Waste Trends
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Key Metrics */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wide">Model Confidence</h3>
            <div className="mt-2 flex items-end">
              <span className="text-4xl font-bold text-white">94.2%</span>
              <span className="text-emerald-500 text-sm ml-2 mb-1"><i className="fa-solid fa-arrow-up"></i> +1.2%</span>
            </div>
            <div className="w-full bg-slate-700/50 h-2 mt-4 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-emerald-500/20 animate-pulse"></div>
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full relative z-10" style={{ width: '94.2%' }}></div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wide">Next Week Forecast</h3>
            <p className="text-lg text-white font-medium mt-1">
              {predictionType === 'Energy' ? 'Expect 5% decrease' : 'Stable output expected'}
            </p>
            <p className="text-xs text-slate-500 mt-2">Based on historical patterns and weather data.</p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">
            {predictionType} Consumption Forecast vs Actual
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Previous Trend"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke={predictionType === 'Energy' ? '#f59e0b' : '#3b82f6'}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <h3 className="text-lg font-semibold text-white">Detected Anomalies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start space-x-3">
            <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-1"></i>
            <div>
              <h4 className="text-white font-medium text-sm">Unusual Spike in CSE Lab</h4>
              <p className="text-slate-400 text-xs mt-1">Energy usage 40% above baseline on Sunday.</p>
            </div>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 flex items-start space-x-3">
            <i className="fa-solid fa-circle-check text-emerald-500 mt-1"></i>
            <div>
              <h4 className="text-white font-medium text-sm">Efficiency Improvement</h4>
              <p className="text-slate-400 text-xs mt-1">Library HVAC optimization saved 120 kWh.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIPrediction
