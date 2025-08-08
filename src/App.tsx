import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Results from './pages/Results'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  return (
    <Router>
      <div className="App">
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/interview" element={<Interview currentUser={currentUser} />} />
            <Route path="/results" element={<Results currentUser={currentUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 