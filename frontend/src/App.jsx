import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// import Documentation from './pages/Documentation'

import EnergyMonitoring from './pages/EnergyMonitoring'
import WasteMonitoring from './pages/WasteMonitoring'
import AIPrediction from './pages/AIPrediction'
import Reports from './pages/Reports'
import About from './pages/About'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Documentation from './pages/Documentation'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const auth = localStorage.getItem('isAuthenticated')
    const role = localStorage.getItem('userRole')
    if (auth === 'true') {
      setIsAuthenticated(true)
      setUserRole(role)
    }
  }, [])

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white">
      {isAuthenticated && <Navbar onLogout={handleLogout} userRole={userRole} />}

      <div className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/energy"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <EnergyMonitoring />
              </ProtectedRoute>
            }
          />

          <Route
            path="/waste"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <WasteMonitoring />
              </ProtectedRoute>
            }
          />

          <Route
            path="/predictions"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AIPrediction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <About />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>


        {/* <Route path="/documentation" element={<Documentation />} /> */}
      </div>

      {isAuthenticated && <Footer />}
    </div>
  )
}

export default App
