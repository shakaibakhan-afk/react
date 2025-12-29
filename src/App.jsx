import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
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
      
      
      if (username && password) {
        console.log('Login successful:', { username, password })
        
        setUser({ username })
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
    setUsername('')
    setPassword('')
  }

  
  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-dark-soft border border-mahogany-dark/30 rounded-xl p-8 shadow-2xl">
          {/* Brand Logo with Glow */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-light tracking-wider mb-2 text-glow-mahogany">
              limitless-horizon
            </h1>
           
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-lighter border border-mahogany-dark/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mahogany-dark/50 focus:border-mahogany-dark transition-all text-sm"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-lighter border border-mahogany-dark/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mahogany-dark/50 focus:border-mahogany-dark transition-all text-sm"
              />
            </div>
            
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm text-center py-2.5 px-4 rounded-lg">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 mt-6 ${
                loading 
                  ? 'bg-mahogany-dark cursor-not-allowed opacity-60' 
                  : 'bg-mahogany-dark hover:bg-mahogany-darker active:scale-[0.98] shadow-lg shadow-mahogany-dark/50'
              }`}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
          
          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-xs text-glow-mahogany-light hover:text-glow-mahogany transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Component - Shows after login
function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-dark-soft border-b border-mahogany-dark/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-light tracking-wider text-glow-mahogany">
              limitless-horizon
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-glow-mahogany-light text-sm">Welcome, <span className="font-medium text-glow-mahogany">{user?.username}</span></span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-mahogany-dark text-white rounded-lg hover:bg-mahogany-darker transition-colors text-sm font-medium"
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
          <h2 className="text-4xl font-light mb-3 tracking-wider text-glow-mahogany">
            Welcome to limitless-horizon
          </h2>
          <p className="text-lg text-glow-mahogany-light font-light">
            You have successfully logged in.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-soft border border-mahogany-dark rounded-custom-lg p-6 hover:border-mahogany transition-colors">
            <div className="text-mahogany text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Dashboard</h3>
            <p className="text-gray-400">View your analytics and insights</p>
          </div>

          <div className="bg-dark-soft border border-mahogany-dark rounded-custom-lg p-6 hover:border-mahogany transition-colors">
            <div className="text-mahogany-light text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
            <p className="text-gray-400">Manage your account settings</p>
          </div>

          <div className="bg-dark-soft border border-mahogany-dark rounded-custom-lg p-6 hover:border-mahogany transition-colors">
            <div className="text-mahogany text-3xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-white mb-2">Profile</h3>
            <p className="text-gray-400">Update your profile information</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-dark-soft border border-mahogany-dark rounded-custom-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-dark-lighter rounded-custom-md">
              <div className="w-2 h-2 bg-mahogany rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Login successful</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-dark-lighter rounded-custom-md">
              <div className="w-2 h-2 bg-mahogany-light rounded-full"></div>
              <div className="flex-1">
                <p className="text-white font-medium">Account created</p>
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
