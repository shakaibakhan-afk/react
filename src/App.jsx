import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/68d68d4834b714f5ba55664d_Frame 2121450324.svg'
import { login, logout, getMe, getCurrentUser, isAuthenticated } from './services/authService'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have a token
        if (isAuthenticated()) {
          // Try to get user info from API
          try {
            const userData = await getMe()
            // Update user state with API response
            const currentUser = getCurrentUser()
            setUser(currentUser || { email: userData.email || userData.user?.email })
            setIsLoggedIn(true)
          } catch (err) {
            // If getMe fails (e.g., 401), clear auth and show login
            console.error('Auth check failed:', err)
            setIsLoggedIn(false)
            setUser(null)
          }
        } else {
          // No token, ensure we're logged out
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (err) {
        console.error('Error checking authentication:', err)
        setIsLoggedIn(false)
        setUser(null)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login(email, password)
      
      // Get user data from response or localStorage
      const currentUser = getCurrentUser()
      setUser(currentUser || { email: response.email || response.user?.email || email })
      setIsLoggedIn(true)
      
      // Clear form
      setEmail('')
      setPassword('')
    } catch (err) {
      // Handle different error types
      let errorMsg = 'Failed to login. Please check your credentials.'
      
      if (err.status === 401) {
        errorMsg = 'Invalid email or password. Please try again.'
      } else if (err.status === 400) {
        errorMsg = err.data?.message || err.message || 'Please check your input and try again.'
      } else if (err.message) {
        errorMsg = err.message
      } else if (err.data?.message) {
        errorMsg = err.data.message
      } else if (err.data?.error) {
        errorMsg = err.data.error
      }
      
      setError(errorMsg)
      setIsLoggedIn(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
    } catch (err) {
      console.error('Logout error:', err)
      // Even if API call fails, clear local state
    } finally {
      setIsLoggedIn(false)
      setUser(null)
      setEmail('')
      setPassword('')
      setError('')
      setLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg ,#61C8D0,#FFE596)' }}>
        <div className="text-center">
          <div className="text-xl font-semibold" style={{ color: '#0F5E7B' }}>Loading...</div>
        </div>
      </div>
    )
  }

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'linear-gradient(180deg ,#61C8D0,#FFE596)' }}>
      {/* Hero Section with Gradient Background */}
      <div className="w-full flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-[400px] mx-auto space-y-6">
          {/* Logo Section */}
          <div className="text-center mb-6">
            <img 
              src={logo} 
              alt="Limitless Horizons Logo" 
              className="h-20 mx-auto mb-3 w-auto max-w-[220px]"
            />
          </div>

          {/* Login Card with White Background */}
          <div className="bg-white rounded-xl shadow-2xl p-10 w-full">
            {/* Welcome Back Text */}
            <h1 className="text-2xl font-bold mb-4 whitespace-nowrap text-center" style={{ color: '#0F5E7B', fontSize: '1.5rem' }}>
              Welcome back
            </h1>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              <div>
                <label htmlFor="email" className="block text-base font-semibold mb-3 tracking-tight whitespace-nowrap" style={{ color: '#0F5E7B', fontSize: '1rem' }}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 text-base bg-white border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD350] focus:border-[#0F5E7B] transition-all duration-200 placeholder-gray-400 hover:border-gray-300"
                  style={{ color: '#0F5E7B', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-base font-semibold mb-3 tracking-tight whitespace-nowrap" style={{ color: '#0F5E7B', fontSize: '1rem' }}>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 text-base bg-white border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD350] focus:border-[#0F5E7B] transition-all duration-200 placeholder-gray-400 hover:border-gray-300"
                  style={{ color: '#0F5E7B', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                />
              </div>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-300 text-red-800 text-sm text-center py-3 px-4 rounded-lg shadow-sm">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className={`btn-primary w-full py-3.5 px-6 rounded-lg text-base font-bold shadow-md hover:shadow-lg ${
                  loading 
                    ? '' 
                    : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
                style={{ fontSize: '1rem' }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            
            {/* Forgot Password Link */}
            <div className="mt-7 text-center">
              <a 
                href="#" 
                className="link-secondary text-sm font-semibold hover:underline"
                style={{ fontSize: '0.875rem' }}
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Component - Shows after login
function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-200 via-teal-200 to-yellow-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Limitless Horizons Logo" 
                className="h-10"
              />
              <h1 className="text-xl font-bold" style={{ color: '#0F5E7B' }}>
                LIMITLESS HORIZONS
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ color: '#0F5E7B' }}>Welcome, <span className="font-semibold">{user?.email}</span></span>
              <button
                onClick={onLogout}
                className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: '#0F5E7B' }}>
            Welcome to Limitless Horizons
          </h2>
          <p className="text-xl" style={{ color: '#576472' }}>
            You have successfully logged in.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-teal-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-teal-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#0F5E7B' }}>Dashboard</h3>
            <p style={{ color: '#576472' }}>View your analytics and insights</p>
          </div>

          <div className="bg-white border-2 border-yellow-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-yellow-600 text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#0F5E7B' }}>Settings</h3>
            <p style={{ color: '#576472' }}>Manage your account settings</p>
          </div>

          <div className="bg-white border-2 border-cyan-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-cyan-600 text-3xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#0F5E7B' }}>Profile</h3>
            <p style={{ color: '#576472' }}>Update your profile information</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F5E7B' }}>Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium" style={{ color: '#0F5E7B' }}>Login successful</p>
                <p className="text-sm" style={{ color: '#576472' }}>Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium" style={{ color: '#0F5E7B' }}>Account accessed</p>
                <p className="text-sm" style={{ color: '#576472' }}>Today</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
