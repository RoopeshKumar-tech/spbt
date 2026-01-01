import { useEffect } from 'react'
import './About.css'

function About() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="about">
      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title fade-in">About Us</h1>
          <p className="page-subtitle fade-in">
            Transforming visions into digital reality
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text animate-on-scroll">
              <h2 className="section-title">Poornabodha Technologies LLP</h2>
              <p>
                Incorporated on May 13, 2025, and registered under RoC-Bangalore (LLPIN: ACO-3350), 
                Poornabodha Technologies LLP has emerged as a trusted partner for businesses seeking 
                innovative technology solutions. Our commitment to excellence and client satisfaction 
                drives everything we do.
              </p>
              <p>
                We specialize in Computer Programming, Consultancy and Related Activities, delivering 
                cutting-edge software development, cloud solutions, mobile applications, and IT consulting 
                services. Led by our designated partners, our team of expert professionals brings together 
                years of industry experience and technical expertise to solve complex business challenges.
              </p>
              <p>
                At Poornabodha Technologies, we believe in building long-term relationships with our clients 
                by delivering exceptional value, maintaining transparent communication, and consistently 
                exceeding expectations.
              </p>
            </div>
            <div className="overview-image animate-on-scroll">
              <div className="image-placeholder">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'rgb(102,126,234)',stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'rgb(118,75,162)',stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="url(#grad1)" opacity="0.2"/>
                  <circle cx="100" cy="100" r="60" fill="url(#grad1)" opacity="0.4"/>
                  <circle cx="100" cy="100" r="40" fill="url(#grad1)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card animate-on-scroll">
              <div className="mv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To empower businesses with innovative technology solutions that drive growth, 
                efficiency, and digital transformation. We strive to be the catalyst for our 
                clients' success through excellence in every project we undertake.
              </p>
            </div>

            <div className="mv-card animate-on-scroll">
              <div className="mv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be recognized as a global leader in IT solutions, known for innovation, 
                reliability, and customer-centricity. We envision a future where technology 
                seamlessly integrates with business to create unprecedented value.
              </p>
            </div>

            <div className="mv-card animate-on-scroll">
              <div className="mv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3>Our Values</h3>
              <p>
                Integrity, innovation, excellence, and collaboration form the cornerstone of 
                our operations. We are committed to ethical practices, continuous learning, 
                and delivering solutions that create lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Our Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">💻</div>
              <h4>Software Development</h4>
              <p>Custom software solutions tailored to your business needs</p>
            </div>
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">☁️</div>
              <h4>Cloud Solutions</h4>
              <p>Scalable cloud infrastructure and migration services</p>
            </div>
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">📱</div>
              <h4>Mobile Development</h4>
              <p>Native and cross-platform mobile applications</p>
            </div>
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">🔒</div>
              <h4>Cybersecurity</h4>
              <p>Comprehensive security solutions and audits</p>
            </div>
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">📊</div>
              <h4>Data Analytics</h4>
              <p>Business intelligence and data-driven insights</p>
            </div>
            <div className="expertise-item animate-on-scroll">
              <div className="expertise-icon">🤖</div>
              <h4>AI & ML</h4>
              <p>Artificial intelligence and machine learning solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Why Partner With Us?</h2>
          <div className="choose-grid">
            <div className="choose-item animate-on-scroll">
              <span className="choose-number">01</span>
              <h4>Proven Track Record</h4>
              <p>Over 500+ successful projects delivered across various industries</p>
            </div>
            <div className="choose-item animate-on-scroll">
              <span className="choose-number">02</span>
              <h4>Expert Team</h4>
              <p>Certified professionals with deep domain expertise</p>
            </div>
            <div className="choose-item animate-on-scroll">
              <span className="choose-number">03</span>
              <h4>Agile Methodology</h4>
              <p>Flexible and iterative approach ensuring timely delivery</p>
            </div>
            <div className="choose-item animate-on-scroll">
              <span className="choose-number">04</span>
              <h4>24/7 Support</h4>
              <p>Round-the-clock assistance for uninterrupted operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details Section */}
      <section className="company-details">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Company Information</h2>
          <div className="details-grid">
            <div className="detail-card animate-on-scroll">
              <div className="detail-icon">🏢</div>
              <h4>Registration Details</h4>
              <div className="detail-info">
                <p><strong>LLPIN:</strong> ACO-3350</p>
                <p><strong>ROC:</strong> RoC-Bangalore</p>
                <p><strong>Incorporated:</strong> May 13, 2025</p>
                <p><strong>Status:</strong> <span className="status-active">Active</span></p>
              </div>
            </div>

            <div className="detail-card animate-on-scroll">
              <div className="detail-icon">💼</div>
              <h4>Business Activity</h4>
              <div className="detail-info">
                <p><strong>Division Code:</strong> 62</p>
                <p><strong>Category:</strong> Computer Programming, Consultancy and Related Activities</p>
                <p><strong>Entity Type:</strong> Limited Liability Partnership</p>
              </div>
            </div>

            <div className="detail-card animate-on-scroll">
              <div className="detail-icon">👥</div>
              <h4>Designated Partners</h4>
              <div className="detail-info">
                <p><strong>1.</strong> Pulugura Chandra Shekar Venu Madhav</p>
                <p className="partner-detail">DIN: 09825801 | Since May 13, 2025</p>
                <p><strong>2.</strong> Maranna Lokesh</p>
                <p className="partner-detail">DIN: 11103974 | Since May 13, 2025</p>
              </div>
            </div>

            <div className="detail-card animate-on-scroll">
              <div className="detail-icon">📍</div>
              <h4>Registered Office</h4>
              <div className="detail-info">
                <p>No 32/2 J R R Complex</p>
                <p>MSR/HMT Main Road, Mathikere</p>
                <p>Bangalore North, Karnataka</p>
                <p><strong>PIN:</strong> 560054, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
