import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState('Admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      onLogin(selectedRole)
      navigate('/dashboard')
    } else {
      alert('Please enter username and password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0f172a] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-purple-500/5 rounded-full blur-[80px] animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5 mb-4">
              <i className="fa-solid fa-leaf text-4xl text-cyan-400"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Sign in to access the Campus Eco-Monitor</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Toggle */}
            <div className="bg-slate-950/50 p-1 rounded-xl flex border border-white/5">
              <button
                type="button"
                onClick={() => setSelectedRole('Admin')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedRole === 'Admin'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Administrator
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('Viewer')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedRole === 'Viewer'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Viewer
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field pl-10 bg-slate-950/50 border-slate-800 focus:bg-slate-900/80"
                    placeholder="Enter your ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <i className="fa-regular fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 bg-slate-950/50 border-slate-800 focus:bg-slate-900/80"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 shadow-lg shadow-cyan-900/20">
              Sign In
              <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              <i className="fa-solid fa-circle-info mr-1"></i>
              Demo Access: Any credentials will work
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
