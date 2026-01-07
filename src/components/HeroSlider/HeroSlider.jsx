import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HeroSlider.css'

function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'Welcome to',
      highlight: 'Poornabodha Technologies',
      subtitle: 'Computer Programming, Consultancy and Related Activities',
      description: 'We deliver cutting-edge IT solutions that transform businesses and drive digital success. Your trusted partner in technology innovation.',
       primaryBtn: { text: 'See Our Work', link: '/services' },
      secondaryBtn: { text: 'Schedule Consultation', link: '/contact' },
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80' // Tech/data visualization
    },
    {
      id: 2,
      title: 'AI & Machine Learning',
      highlight: 'Powering Smarter Decisions',
      subtitle: 'Transform data into actionable intelligence',
      description: 'Unlock the full potential of your data with custom AI solutions. From predictive analytics to automation, we build systems that give you a competitive edge.',
      primaryBtn: { text: 'Explore AI Solutions', link: '/services' },
      secondaryBtn: { text: 'Get Started', link: '/contact' },
      bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80' // AI/ML concept
    },
    {
      id: 3,
      title: 'Cloud Infrastructure',
      highlight: 'Built for Performance',
      subtitle: 'Secure, scalable, and cost-effective',
      description: 'Modernize your infrastructure with cloud solutions designed for reliability. Reduce costs by up to 40% while improving speed and security.',
      primaryBtn: { text: 'Cloud Services', link: '/services' },
      secondaryBtn: { text: 'Speak with Expert', link: '/contact' },
      bgImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80' // Cloud/server technology
    },
    {
      id: 4,
      title: 'Strategic IT Consulting',
      highlight: 'For Sustainable Growth',
      subtitle: 'Expert guidance at every stage',
      description: 'Navigate digital transformation with confidence. Our consultants bring decades of combined experience helping businesses choose the right technology stack.',
      primaryBtn: { text: 'Book Consultation', link: '/contact' },
      secondaryBtn: { text: 'View Case Studies', link: '/services' },
      bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80' // Business/consulting
    }
  ]

  useEffect(() => {
    // Auto-slide disabled - manual navigation only
    // Uncomment below to enable auto-slide
    /*
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
    */
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="hero-slider">
      <div className="hero-background">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>

      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: slide.bgImage ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.bgImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="container">
              <div className="slide-content fade-in">
                <h1 className="slide-title">
                  {slide.title} <span className="gradient-text">{slide.highlight}</span>
                </h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <p className="slide-description">{slide.description}</p>
                <div className="slide-buttons">
                  <Link to={slide.primaryBtn.link} className="btn btn-primary">
                    {slide.primaryBtn.text}
                  </Link>
                  <Link to={slide.secondaryBtn.link} className="btn btn-secondary">
                    {slide.secondaryBtn.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider
