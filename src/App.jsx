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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Main Login Card */}
        <div className="bg-white border border-gray-300 rounded-sm p-10">
          {/* Limitless Horizon Logo */}
          <h1 className="text-center text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            limitless-horizon
          </h1>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Phone number, username or email address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
            
            {error && (
              <div className="text-red-600 text-sm text-center py-2">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-2 px-4 rounded-sm text-sm font-semibold text-white ${
                loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
              } transition-colors duration-200`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-4 text-xs font-semibold text-gray-500 uppercase">OR</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Forgot Password Link */}
          <a 
            href="#" 
            className="block text-center text-xs text-blue-900 hover:text-blue-700 mb-4"
          >
            Forgotten your password?
          </a>
        </div>
        
        {/* Sign Up Card */}
        <div className="bg-white border border-gray-300 rounded-sm p-6 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 font-semibold hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
        
        {/* App Download Section */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-700">Get the app.</p>
          <div className="flex justify-center items-center gap-2">
            <a 
              href="#" 
              className="inline-block"
            >
              <img 
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" 
                alt="Get it on Google Play" 
                className="h-10"
              />
            </a>
            <a 
              href="#" 
              className="inline-block"
            >
              <img 
                src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" 
                alt="Download on the App Store" 
                className="h-10"
              />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              limitless-horizon
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, <span className="font-semibold">{user?.username}</span></span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to limitless-horizon! 🚀
          </h2>
          <p className="text-xl text-gray-600">
            You have successfully logged in.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard</h3>
            <p className="text-gray-600">View your analytics and insights</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-purple-600 text-3xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-indigo-600 text-3xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600">Update your profile information</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Login successful</p>
                <p className="text-sm text-gray-500">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">Account created</p>
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
