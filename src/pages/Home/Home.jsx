import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../../components/HeroSlider/HeroSlider'
import './Home.css'

function Home() {
  const [stats, setStats] = useState({
    partners: 0,
    year: 0,
    offices: 0,
    domain: 0
  })

  const [isStatsVisible, setIsStatsVisible] = useState(false)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
          
          // Trigger stats counter when stats section becomes visible
          if (entry.target.classList.contains('stats') && !isStatsVisible) {
            setIsStatsVisible(true)
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isStatsVisible])

  // Animated counter for stats
  useEffect(() => {
    if (!isStatsVisible) return

    const targets = { partners: 2, year: 2025, offices: 1, domain: 1 }
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        partners: Math.floor(targets.partners * progress),
        year: Math.floor(targets.year * progress),
        offices: Math.floor(targets.offices * progress),
        domain: Math.floor(targets.domain * progress)
      })

      if (currentStep >= steps) {
        setStats(targets)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isStatsVisible])

  return (
    <div className="home">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3>Fast & Reliable</h3>
              <p>Lightning-fast solutions with 99.9% uptime guarantee for your business continuity.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3>Secure Solutions</h3>
              <p>Enterprise-grade security measures to protect your data and maintain compliance.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3>Quality Assured</h3>
              <p>Rigorous testing and quality control processes ensure flawless deliverables.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3>Expert Team</h3>
              <p>Highly skilled professionals with years of experience in cutting-edge technologies.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
              </div>
              <h3>Cloud Ready</h3>
              <p>Scalable cloud infrastructure for seamless growth and flexibility.</p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support to ensure your operations never stop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats animate-on-scroll">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{stats.partners}+</div>
              <div className="stat-label">Designated Partners</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{stats.year}</div>
              <div className="stat-label">Year of Incorporation</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{stats.offices}+</div>
              <div className="stat-label">Registered Office Location</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">IT</div>
              <div className="stat-label">Core Technology Domain</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's collaborate to build innovative solutions that drive your success.</p>
            <Link to="/contact" className="btn btn-primary">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
