import { Link, useLocation } from 'react-router-dom'
import { User, LogOut, Home, Mic, BarChart3 } from 'lucide-react'
import './Navbar.css'

interface NavbarProps {
  currentUser: string | null
  setCurrentUser: (user: string | null) => void
}

const Navbar = ({ currentUser, setCurrentUser }: NavbarProps) => {
  const location = useLocation()

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <Mic className="logo-icon" />
            <span>Quiver Interview</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/interview" 
            className={`navbar-link ${isActive('/interview') ? 'active' : ''}`}
          >
            <Mic size={20} />
            <span>Interview</span>
          </Link>
          
          <Link 
            to="/results" 
            className={`navbar-link ${isActive('/results') ? 'active' : ''}`}
          >
            <BarChart3 size={20} />
            <span>Results</span>
          </Link>
        </div>

        <div className="navbar-user">
          {currentUser ? (
            <div className="user-section">
              <div className="user-info">
                <User size={20} />
                <span>{currentUser}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-section">
              <span className="login-prompt">Please login to start</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar 