import { useState } from 'react'
import './App.css'
import logo from './assets/68d68d4834b714f5ba55664d_Frame 2121450324.svg'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password) {
        console.log('Login successful:', { email, password })
        setUser({ email })
        setIsLoggedIn(true)
      } else {
        throw new Error('Please fill in all fields')
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to login. Please check your credentials.'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setEmail('')
    setPassword('')
  }

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-cyan-200 via-teal-200 to-yellow-200">
      {/* Hero Section with Gradient Background */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <img 
              src={logo} 
              alt="Limitless Horizons Logo" 
              className="h-20 mx-auto mb-4"
            />
          </div>

          {/* Login Card with White Background */}
          <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 md:p-12">
            
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              <div>
                <label htmlFor="email" className="block text-base sm:text-lg font-semibold text-teal-900 mb-3 tracking-tight">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-base sm:text-lg bg-white border-2 border-gray-200 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-cyan-300 focus:border-cyan-400 focus:shadow-lg transition-all duration-200 placeholder-gray-400 text-gray-900 hover:border-gray-300"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-base sm:text-lg font-semibold text-teal-900 mb-3 tracking-tight">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 text-base sm:text-lg bg-white border border-white/40 rounded-xl shadow-md focus:outline-none focus:ring-3 focus:ring-white/60 focus:border-white focus:shadow-lg transition-all duration-200 placeholder-gray-400 text-gray-900 hover:border-white/60"
                />
              </div>
              
              {error && (
                <div className="bg-red-100 border-2 border-red-300 text-red-800 text-base text-center py-4 px-5 rounded-xl shadow-md">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 px-6 rounded-xl text-lg sm:text-xl font-bold text-teal-900 transition-all duration-300 ${
                  loading 
                    ? 'bg-white/70 cursor-not-allowed opacity-70 shadow-md' 
                    : 'bg-white hover:bg-white/95 active:bg-white/85 shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            
            {/* Forgot Password Link */}
            <div className="mt-7 sm:mt-8 text-center">
              <a 
                href="#" 
                className="text-base sm:text-lg text-teal-900 hover:text-teal-950 font-semibold transition-colors duration-200 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            
            {/* Divider */}
            <div className="flex items-center my-7 sm:my-8">
              <div className="flex-1 border-t-2 border-teal-900/30"></div>
              <div className="px-4 text-sm font-bold text-teal-900 uppercase tracking-wider">OR</div>
              <div className="flex-1 border-t-2 border-teal-900/30"></div>
            </div>
            
            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-base sm:text-lg text-teal-900">
                Don't have an account?{' '}
                <a href="#" className="text-teal-950 hover:text-teal-900 font-bold transition-colors duration-200 underline hover:no-underline">
                  Sign up
                </a>
              </p>
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
              <h1 className="text-xl font-bold text-teal-900">
                LIMITLESS HORIZONS
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-teal-900">Welcome, <span className="font-semibold">{user?.email}</span></span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-yellow-200 text-teal-900 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-semibold shadow-md"
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
          <h2 className="text-4xl font-bold text-teal-900 mb-4">
            Welcome to Limitless Horizons
          </h2>
          <p className="text-xl text-gray-600">
            You have successfully logged in.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-teal-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-teal-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">Dashboard</h3>
            <p className="text-gray-600">View your analytics and insights</p>
          </div>

          <div className="bg-white border-2 border-yellow-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-yellow-600 text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          <div className="bg-white border-2 border-cyan-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-cyan-600 text-3xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-teal-900 mb-2">Profile</h3>
            <p className="text-gray-600">Update your profile information</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-teal-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-teal-50 rounded-lg">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-teal-900 font-medium">Login successful</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-teal-900 font-medium">Account accessed</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
