import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mic, Play, BarChart3, User, ArrowRight } from 'lucide-react'
import './Home.css'

interface HomeProps {
  currentUser: string | null
  setCurrentUser?: (user: string) => void
}

const Home = ({ currentUser, setCurrentUser }: HomeProps) => {
  const [username, setUsername] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && setCurrentUser) {
      setCurrentUser(username.trim())
    }
  }

  const features = [
    {
      icon: <Mic className="feature-icon" />,
      title: 'Voice Interviews',
      description: 'Conduct interviews using advanced voice recognition technology'
    },
    {
      icon: <Play className="feature-icon" />,
      title: 'Real-time Recording',
      description: 'Record and analyze interviews in real-time with instant feedback'
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: 'Analytics Dashboard',
      description: 'View detailed analytics and performance metrics'
    }
  ]

  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">Quiver Interview</span>
          </h1>
          <p className="hero-subtitle">
            The next-generation interview platform powered by AI voice recognition
          </p>
          
          {!currentUser ? (
            <div className="login-section">
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Enter your name to start
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  <User size={20} />
                  Start Interview
                </button>
              </form>
            </div>
          ) : (
            <div className="welcome-section">
              <div className="welcome-card">
                <h2>Welcome back, {currentUser}!</h2>
                <p>Ready to continue your interview journey?</p>
                <div className="action-buttons">
                  <Link to="/interview" className="btn-primary">
                    <Mic size={20} />
                    Start New Interview
                  </Link>
                  <Link to="/results" className="btn-secondary">
                    <BarChart3 size={20} />
                    View Results
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Platform Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-card">
          <h2>Ready to get started?</h2>
          <p>Join thousands of users who trust Quiver Interview for their hiring process</p>
          <Link to="/interview" className="btn-primary">
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 