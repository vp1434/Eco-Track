import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Documentation = () => {
  const [searchParams] = useSearchParams()
  const sectionParam = searchParams.get('section')
  const [activeSection, setActiveSection] = useState(sectionParam || 'introduction')

  useEffect(() => {
    if (sectionParam) {
      setActiveSection(sectionParam)
    }
  }, [sectionParam])

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: 'fa-book-open' },
    { id: 'getting-started', title: 'Getting Started', icon: 'fa-rocket' },
    { id: 'features', title: 'Key Features', icon: 'fa-star' },
    { id: 'api-reference', title: 'API Reference', icon: 'fa-code' },
    { id: 'ml-architecture', title: 'ML Architecture', icon: 'fa-network-wired' },
    { id: 'system-status', title: 'System Status', icon: 'fa-server' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: 'fa-screwdriver-wrench' },
  ]

  const content = {
    introduction: (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to EcoTrack Docs</h2>
        <p className="text-slate-400 leading-relaxed">
          EcoTrack is a comprehensive solution designed to help educational institutions monitor and optimize their energy consumption and waste management practices. By leveraging advanced AI and real-time data analytics, we empower campuses to make informed decisions for a sustainable future.
        </p>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Why EcoTrack?</h3>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>Real-time monitoring of energy and waste metrics.</li>
            <li>AI-powered predictions for resource planning.</li>
            <li>Automated reporting and alert systems.</li>
            <li>User-friendly dashboard for administrative insights.</li>
          </ul>
        </div>
      </div>
    ),
    'getting-started': (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Getting Started</h2>
        <p className="text-slate-400 leading-relaxed">
          Setting up EcoTrack is straightforward. Follow these steps to integrate the system into your campus network.
        </p>

        <div className="space-y-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 text-sm font-mono text-slate-300">
            <span className="text-slate-500"># Clone the repository</span><br />
            git clone https://github.com/your-org/ecotrack.git<br /><br />
            <span className="text-slate-500"># Install dependencies</span><br />
            npm install<br /><br />
            <span className="text-slate-500"># Start the development server</span><br />
            npm run dev
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-8 mb-4">System Requirements</h3>
        <p className="text-slate-400">Ensure your server meets the following minimum specifications:</p>
        <ul className="list-disc list-inside text-slate-400 space-y-1">
          <li>Node.js v16.0 or higher</li>
          <li>Python 3.8+ (for AI modules)</li>
          <li>PostgreSQL / MongoDB database</li>
        </ul>
      </div>
    ),
    features: (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <i className="fa-solid fa-bolt text-amber-500"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Energy Monitoring</h3>
            <p className="text-slate-400 text-sm">Track consumption patterns across different departments in real-time.</p>
          </div>
          <div className="glass-card p-6">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <i className="fa-solid fa-recycle text-blue-500"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Waste Management</h3>
            <p className="text-slate-400 text-sm">Monitor waste segregation efficiency and disposal logistics.</p>
          </div>
          <div className="glass-card p-6">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <i className="fa-solid fa-brain text-purple-500"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Forecasts</h3>
            <p className="text-slate-400 text-sm">Predictive models to anticipate future resource needs and anomalies.</p>
          </div>
          <div className="glass-card p-6">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <i className="fa-solid fa-file-lines text-emerald-500"></i>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Detailed Reports</h3>
            <p className="text-slate-400 text-sm">Generate comprehensive reports for auditing and compliance.</p>
          </div>
        </div>
      </div>
    ),
    'api-reference': (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">API Reference</h2>
        <p className="text-slate-400 leading-relaxed mb-6">
          Interact programmatically with the EcoTrack platform. Base URL: <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">/api/dashboard</code>
        </p>

        <div className="space-y-6">
          {/* Summary Endpoint */}
          <div className="border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md mr-3">GET</span>
                <code className="text-sm text-slate-300">/summary</code>
              </div>
              <span className="text-xs text-slate-500">Dashboard Analytics</span>
            </div>
            <div className="p-4 bg-slate-900/50">
              <p className="text-slate-400 text-sm mb-3">Retrieves comprehensive dashboard metrics including energy trends and waste distribution.</p>
              <div className="mb-3">
                <span className="text-xs font-semibold text-slate-300 uppercase">Query Parameters:</span>
                <ul className="text-xs text-slate-400 mt-1 ml-4 list-disc">
                  <li><code className="text-cyan-400">days</code> (optional, int): Number of days for trend history (default: 7).</li>
                </ul>
              </div>
              <pre className="text-xs text-slate-500 overflow-x-auto p-2 bg-black/20 rounded">
                {`{
  "success": true,
  "data": {
    "totalEnergyToday": 850,
    "energyTrend": [ ... ],
    "sustainabilityScore": 92
  }
}`}
              </pre>
            </div>
          </div>

          {/* Predictions Endpoint */}
          <div className="border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center">
                <span className="bg-purple-500/20 text-purple-400 text-xs font-bold px-2 py-1 rounded-md mr-3">GET</span>
                <code className="text-sm text-slate-300">/predictions</code>
              </div>
              <span className="text-xs text-slate-500">AI Forecasting</span>
            </div>
            <div className="p-4 bg-slate-900/50">
              <p className="text-slate-400 text-sm mb-3">Triggers the Python ML, engine to generate 7-day future forecasts for energy components.</p>
              <pre className="text-xs text-slate-500 overflow-x-auto p-2 bg-black/20 rounded">
                {`{
  "success": true,
  "source": "ml",
  "data": [
    { "date": "Day 31", "predictedEnergy": 460.5, "confidence": 0.95 }
  ]
}`}
              </pre>
            </div>
          </div>

          {/* Alerts Endpoint */}
          <div className="border border-slate-700 rounded-xl overflow-hidden">
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center">
                <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded-md mr-3">GET</span>
                <code className="text-sm text-slate-300">/alerts</code>
              </div>
              <span className="text-xs text-slate-500">System Notifications</span>
            </div>
            <div className="p-4 bg-slate-900/50">
              <p className="text-slate-400 text-sm mb-3">Fetches active system alerts and anomalies.</p>
              <pre className="text-xs text-slate-500 overflow-x-auto p-2 bg-black/20 rounded">
                {`{
  "success": true,
  "count": 2,
  "data": [
    { "severity": "critical", "message": "Waste overflow detected" }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    ),
    'ml-architecture': (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">ML Architecture</h2>
        <p className="text-slate-400 leading-relaxed">
          EcoTrack utilizes a hybrid forecasting approach, combining statistical methods with machine learning to predict future resource consumption patterns.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-3">Model Specification</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start">
                <i className="fa-solid fa-layer-group text-cyan-500 mt-1 mr-2"></i>
                <span><strong>Algorithm:</strong> Linear Regression (Scikit-Learn)</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-clock-rotate-left text-cyan-500 mt-1 mr-2"></i>
                <span><strong>Training Data:</strong> Rolling 30-day historical window</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-bullseye text-cyan-500 mt-1 mr-2"></i>
                <span><strong>Target:</strong> 7-day future forecast (Energy & Waste)</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-3">Fallback Mechanism</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To ensure system reliability, the backend implements a robust fallback strategy. If the Python environment is unavailable or the ML model fails to converge, the system automatically reverts to a heuristic-based estimation method, ensuring the dashboard always displays data.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mt-4">
          <h3 className="text-white font-semibold mb-2">Python Integration</h3>
          <p className="text-slate-400 text-sm">
            The Node.js backend spawns a child process to execute `forecast.py`. Data is passed via standard I/O streams in JSON format.
          </p>
          <div className="mt-3 bg-black/30 p-3 rounded text-xs font-mono text-emerald-400">
            backend/ml/forecast.py &ensp;&rarr;&ensp; stdout &ensp;&rarr;&ensp; JSON Response
          </div>
        </div>
      </div>
    ),
    'system-status': (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">System Status</h2>
        <p className="text-slate-400 mb-6">Real-time operational status of EcoTrack services.</p>

        <div className="space-y-4">
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <i className="fa-solid fa-server text-emerald-500"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">API Server</h3>
                <p className="text-xs text-slate-400">Core backend services (Node.js/Express)</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-400">Operational</span>
            </div>
          </div>

          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <i className="fa-solid fa-database text-blue-500"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">Database Cluster</h3>
                <p className="text-xs text-slate-400">Primary data storage and replication</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-medium text-emerald-400">Operational</span>
            </div>
          </div>

          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <i className="fa-solid fa-brain text-purple-500"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Inference Engine</h3>
                <p className="text-xs text-slate-400">Python-based forecasting module</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-sm font-medium text-emerald-400">Operational</span>
            </div>
          </div>

          <div className="glass-card p-4 flex items-center justify-between opacity-75">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <i className="fa-solid fa-satellite-dish text-amber-500"></i>
              </div>
              <div>
                <h3 className="font-semibold text-white">Sensor Gateway</h3>
                <p className="text-xs text-slate-400">IoT device data ingestion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-sm font-medium text-amber-500">Maintenance</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    ),
    troubleshooting: (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-4">Troubleshooting</h2>
        <div className="space-y-4">
          <details className="group bg-slate-800/30 border border-slate-700 rounded-xl p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium text-white list-none">
              <span>ML Predictions showing "Fallback" data</span>
              <i className="fa-solid fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform"></i>
            </summary>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              This usually indicates the Python environment is missing. Ensure Python is installed and run <code className="bg-slate-900 px-1 rounded text-cyan-400">pip install numpy scikit-learn</code>. Check server logs for "spawn python ENOENT" errors.
            </p>
          </details>
          <details className="group bg-slate-800/30 border border-slate-700 rounded-xl p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium text-white list-none">
              <span>Data not syncing on dashboard</span>
              <i className="fa-solid fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform"></i>
            </summary>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Ensure that your sensor nodes are connected to the network and the WebSocket server is running. Check the browser console for any connection errors.
            </p>
          </details>
          <details className="group bg-slate-800/30 border border-slate-700 rounded-xl p-4 cursor-pointer">
            <summary className="flex items-center justify-between font-medium text-white list-none">
              <span>404 Error on API endpoints</span>
              <i className="fa-solid fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform"></i>
            </summary>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Check the base URL configuration in your `.env` file. Ensure the backend server is running on the correct port (default: 5000).
            </p>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Documentation</h3>
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <i className={`fa-solid ${section.icon} w-5`}></i>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
              <h4 className="text-white font-medium mb-2 text-sm">Need Help?</h4>
              <p className="text-xs text-slate-400 mb-4">Contact our support team for specialized assistance.</p>
              <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="glass-card p-8 min-h-[600px]">
            {content[activeSection]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documentation;
