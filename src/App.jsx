import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Innovations from './pages/Innovations/Innovations'
import Careers from './pages/Careers/Careers'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import './App.css'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if page is being refreshed or loaded for first time
    // If not on home page, redirect to home
    if (location.pathname !== '/') {
      navigate('/')
    }
  }, [])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/innovations" element={<Innovations />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
