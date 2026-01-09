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

      {/* Why Choose Us Section */}
      <section className="why-choose-home">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Why Choose Us?</h2>
          <div className="why-choose-grid">
            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=600&q=80" alt="Fast & Reliable" />
              </div>
              <div className="card-content-box">
                <h3>Fast & Reliable</h3>
                <p>Lightning-fast solutions with 99.9% uptime guarantee for your business continuity.</p>
              </div>
            </div>

            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&q=80" alt="Secure Solutions" />
              </div>
              <div className="card-content-box">
                <h3>Secure Solutions</h3>
                <p>Enterprise-grade security measures to protect your data and maintain compliance.</p>
              </div>
            </div>

            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Quality Assured" />
              </div>
              <div className="card-content-box">
                <h3>Quality Assured</h3>
                <p>Rigorous testing and quality control processes ensure flawless deliverables.</p>
              </div>
            </div>

            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Expert Team" />
              </div>
              <div className="card-content-box">
                <h3>Expert Team</h3>
                <p>Highly skilled professionals with years of experience in cutting-edge technologies.</p>
              </div>
            </div>

            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" alt="Cloud Ready" />
              </div>
              <div className="card-content-box">
                <h3>Cloud Ready</h3>
                <p>Scalable cloud infrastructure for seamless growth and flexibility.</p>
              </div>
            </div>

            <div className="why-choose-card animate-on-scroll">
              <div className="card-image-content">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80" alt="24/7 Support" />
              </div>
              <div className="card-content-box">
                <h3>24/7 Support</h3>
                <p>Round-the-clock customer support to ensure your operations never stop.</p>
              </div>
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
