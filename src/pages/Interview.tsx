import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Play, Pause, Square, RotateCcw, Save } from 'lucide-react'
import './Interview.css'

interface InterviewProps {
  currentUser: string | null
}

interface Question {
  id: number
  text: string
  category: string
}

const Interview = ({ currentUser }: InterviewProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [recordings, setRecordings] = useState<{ [key: number]: Blob }>({})
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [timer, setTimer] = useState(0)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      text: "Tell me about yourself and your background.",
      category: "Introduction"
    },
    {
      id: 2,
      text: "What are your greatest strengths and weaknesses?",
      category: "Self-Assessment"
    },
    {
      id: 3,
      text: "Why are you interested in this position?",
      category: "Motivation"
    },
    {
      id: 4,
      text: "Describe a challenging situation you faced and how you overcame it.",
      category: "Problem Solving"
    },
    {
      id: 5,
      text: "Where do you see yourself in 5 years?",
      category: "Career Goals"
    }
  ]

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording])

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        setRecordings(prev => ({
          ...prev,
          [currentQuestion]: audioBlob
        }))
      }

      setInterviewStarted(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to start the interview.')
    }
  }

  const startRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setTimer(0)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = () => {
    if (recordings[currentQuestion]) {
      const audioUrl = URL.createObjectURL(recordings[currentQuestion])
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setIsPlaying(false)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }

  const resetInterview = () => {
    setCurrentQuestion(0)
    setRecordings({})
    setIsRecording(false)
    setIsPlaying(false)
    setTimer(0)
    setInterviewStarted(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentUser) {
    return (
      <div className="interview-container">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to start your interview.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="interview-container">
      <div className="interview-header">
        <h1>Interview Session</h1>
        <p>Welcome, {currentUser}! Let's begin your interview.</p>
      </div>

      {!interviewStarted ? (
        <div className="start-section">
          <div className="start-card">
            <h2>Ready to Start?</h2>
            <p>You'll be asked 5 questions. Make sure your microphone is working properly.</p>
            <button onClick={startInterview} className="btn-primary">
              <Mic size={20} />
              Start Interview
            </button>
          </div>
        </div>
      ) : (
        <div className="interview-content">
          <div className="question-section">
            <div className="question-header">
              <span className="question-number">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="question-category">{questions[currentQuestion].category}</span>
            </div>
            
            <div className="question-card">
              <h3>{questions[currentQuestion].text}</h3>
            </div>

            <div className="recording-controls">
              {!isRecording ? (
                <button onClick={startRecording} className="btn-primary">
                  <Mic size={20} />
                  Start Recording
                </button>
              ) : (
                <button onClick={stopRecording} className="btn-secondary">
                  <MicOff size={20} />
                  Stop Recording
                </button>
              )}

              {recordings[currentQuestion] && (
                <div className="playback-controls">
                  {!isPlaying ? (
                    <button onClick={playRecording} className="btn-secondary">
                      <Play size={20} />
                      Play
                    </button>
                  ) : (
                    <button onClick={pausePlayback} className="btn-secondary">
                      <Pause size={20} />
                      Pause
                    </button>
                  )}
                </div>
              )}
            </div>

            {isRecording && (
              <div className="recording-indicator">
                <div className="recording-dot"></div>
                <span>Recording... {formatTime(timer)}</span>
              </div>
            )}
          </div>

          <div className="navigation-controls">
            <button 
              onClick={previousQuestion} 
              disabled={currentQuestion === 0}
              className="btn-secondary"
            >
              Previous
            </button>
            
            <button 
              onClick={nextQuestion} 
              disabled={currentQuestion === questions.length - 1}
              className="btn-primary"
            >
              Next Question
            </button>
          </div>

          <div className="progress-section">
            <div className="progress-bar">
              {questions.map((_, index) => (
                <div 
                  key={index}
                  className={`progress-dot ${index === currentQuestion ? 'active' : ''} ${recordings[index] ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="action-controls">
            <button onClick={resetInterview} className="btn-secondary">
              <RotateCcw size={20} />
              Reset Interview
            </button>
            
            <button className="btn-primary">
              <Save size={20} />
              Save Results
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  )
}

export default Interview 