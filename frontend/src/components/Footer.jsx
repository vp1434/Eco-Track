import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/dashboard" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <i className="fa-solid fa-leaf text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">EcoTrack</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced AI-powered monitoring for sustainable campus management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/energy" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Energy Monitor</Link></li>
              <li><Link to="/waste" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Waste Management</Link></li>
              <li><Link to="/predictions" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">AI Forecasts</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Documentation</Link></li>
              <li><Link to="/documentation?section=system-status" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">System Status</Link></li>
              <li><Link to="/documentation?section=api-reference" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">API Reference</Link></li>
              <li><Link to="/reports" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Data Reports</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
            <p className="text-slate-400 text-sm mb-2"><i className="fa-solid fa-envelope mr-2"></i> support@ecotrack.edu</p>
            <p className="text-slate-400 text-sm"><i className="fa-solid fa-phone mr-2"></i> +91-7260818774</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center bg-slate-900/50">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} College Waste & Energy Monitoring System. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
