import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ onLogout, userRole }) => {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: 'fa-chart-pie' },
    { path: '/energy', label: 'Energy', icon: 'fa-bolt' },
    { path: '/waste', label: 'Waste', icon: 'fa-recycle' },
    { path: '/predictions', label: 'AI Insights', icon: 'fa-brain' },
    { path: '/reports', label: 'Reports', icon: 'fa-file-lines' },
    { path: '/about', label: 'About', icon: 'fa-users' },
  ]

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-leaf text-white text-sm"></i>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Eco<span className="text-cyan-400">Track</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${location.pathname === item.path
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <i className={`fa-solid ${item.icon} ${location.pathname === item.path ? 'text-cyan-400' : ''}`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-xs text-white font-bold">
                {userRole.charAt(0)}
              </div>
              <span className="text-sm text-slate-300 font-medium">{userRole}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              title="Logout"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Header (simple horizontal scroll) */}
      <div className="md:hidden border-t border-white/5 overflow-x-auto">
        <div className="flex px-4 py-2 space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${location.pathname === item.path
                ? 'bg-cyan-600 text-white'
                : 'bg-white/5 text-slate-400'
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
