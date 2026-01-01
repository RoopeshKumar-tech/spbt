import { useState, useEffect } from 'react'
import './LoadingScreen.css'

function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 300)
          return 100
        }
        return prev + 10
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (!loading) return null

  return (
    <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="logo-animation">
          <div className="logo-circle"></div>
          <h1 className="logo-text">Poornabodha Technologies</h1>
        </div>
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">Loading {progress}%</p>
      </div>
    </div>
  )
}

export default LoadingScreen
