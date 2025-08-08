import { useState } from 'react'
import { BarChart3, TrendingUp, Clock, Mic, Download, Share2 } from 'lucide-react'
import './Results.css'

interface ResultsProps {
  currentUser: string | null
}

interface InterviewResult {
  id: string
  date: string
  duration: string
  questionsAnswered: number
  totalQuestions: number
  averageResponseTime: string
  confidenceScore: number
  clarityScore: number
  overallScore: number
}

const Results = ({ currentUser }: ResultsProps) => {
  const [selectedResult, setSelectedResult] = useState<string | null>(null)

  // Mock data - in a real app, this would come from an API
  const mockResults: InterviewResult[] = [
    {
      id: '1',
      date: '2024-01-15',
      duration: '12:34',
      questionsAnswered: 5,
      totalQuestions: 5,
      averageResponseTime: '2:30',
      confidenceScore: 85,
      clarityScore: 78,
      overallScore: 82
    },
    {
      id: '2',
      date: '2024-01-10',
      duration: '10:45',
      questionsAnswered: 4,
      totalQuestions: 5,
      averageResponseTime: '2:15',
      confidenceScore: 72,
      clarityScore: 80,
      overallScore: 76
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#51cf66'
    if (score >= 60) return '#ffd43b'
    return '#ff6b6b'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Improvement'
  }

  if (!currentUser) {
    return (
      <div className="results-container">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to view your interview results.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Interview Results</h1>
        <p>View your performance analytics and insights</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <Mic size={24} />
          </div>
          <div className="stat-content">
            <h3>{mockResults.length}</h3>
            <p>Total Interviews</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{mockResults.reduce((acc, result) => acc + result.questionsAnswered, 0)}</h3>
            <p>Questions Answered</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{Math.round(mockResults.reduce((acc, result) => acc + result.overallScore, 0) / mockResults.length)}%</h3>
            <p>Average Score</p>
          </div>
        </div>
      </div>

      <div className="results-list">
        <h2>Recent Interviews</h2>
        <div className="results-grid">
          {mockResults.map((result) => (
            <div 
              key={result.id} 
              className={`result-card ${selectedResult === result.id ? 'selected' : ''}`}
              onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
            >
              <div className="result-header">
                <div className="result-date">
                  <span className="date">{new Date(result.date).toLocaleDateString()}</span>
                  <span className="duration">{result.duration}</span>
                </div>
                <div 
                  className="score-badge"
                  style={{ backgroundColor: getScoreColor(result.overallScore) }}
                >
                  {result.overallScore}%
                </div>
              </div>

              <div className="result-stats">
                <div className="stat-item">
                  <span className="stat-label">Questions:</span>
                  <span className="stat-value">{result.questionsAnswered}/{result.totalQuestions}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg Response:</span>
                  <span className="stat-value">{result.averageResponseTime}</span>
                </div>
              </div>

              <div className="score-breakdown">
                <div className="score-item">
                  <span>Confidence</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ 
                        width: `${result.confidenceScore}%`,
                        backgroundColor: getScoreColor(result.confidenceScore)
                      }}
                    />
                  </div>
                  <span>{result.confidenceScore}%</span>
                </div>
                <div className="score-item">
                  <span>Clarity</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ 
                        width: `${result.clarityScore}%`,
                        backgroundColor: getScoreColor(result.clarityScore)
                      }}
                    />
                  </div>
                  <span>{result.clarityScore}%</span>
                </div>
              </div>

              {selectedResult === result.id && (
                <div className="result-details">
                  <div className="detail-section">
                    <h4>Performance Summary</h4>
                    <p className="performance-label">
                      {getScoreLabel(result.overallScore)} Performance
                    </p>
                    <p className="performance-description">
                      Your interview showed {result.overallScore >= 80 ? 'excellent' : result.overallScore >= 60 ? 'good' : 'room for improvement'} 
                      communication skills with particular strength in {result.confidenceScore > result.clarityScore ? 'confidence' : 'clarity'}.
                    </p>
                  </div>

                  <div className="action-buttons">
                    <button className="btn-secondary">
                      <Download size={16} />
                      Download Report
                    </button>
                    <button className="btn-secondary">
                      <Share2 size={16} />
                      Share Results
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-section">
        <h2>Performance Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Score Trend</h3>
            <div className="chart-placeholder">
              <BarChart3 size={48} />
              <p>Score trend visualization</p>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Response Time Analysis</h3>
            <div className="chart-placeholder">
              <Clock size={48} />
              <p>Response time patterns</p>
            </div>
          </div>

          <div className="analytics-card">
            <h3>Question Performance</h3>
            <div className="chart-placeholder">
              <Mic size={48} />
              <p>Question-by-question breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results 