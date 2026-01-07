import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <img src="/logo.png" alt="Poornabodha Technologies" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="logo-content">
              <span className="logo-text">Poornabodha Technologies</span>
            </div>
          </Link>

          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link
                to="/services"
                className={`nav-link nav-btn ${location.pathname === '/services' ? 'active' : ''}`}
              >
                Agentic AI Solutions
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/innovations"
                className={`nav-link nav-btn ${location.pathname === '/innovations' ? 'active' : ''}`}
              >
                Innovations
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/careers"
                className={`nav-link nav-btn ${location.pathname === '/careers' ? 'active' : ''}`}
              >
                Career
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link nav-btn ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link nav-btn ${location.pathname === '/contact' ? 'active' : ''}`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
