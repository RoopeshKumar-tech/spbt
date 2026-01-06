import { useEffect } from 'react'
import './Services.css'

function Services() {
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

  const services = [
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Chatbots']
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Cloud migration, infrastructure setup, and management services.',
      features: ['AWS/Azure/GCP', 'Cloud Migration', 'DevOps Services', 'Cost Optimization']
    },
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern frameworks and best practices.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Secure & Scalable']
    },
    
    
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Incident Response']
    },
    
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights for better decision-making.',
      features: ['Business Intelligence', 'Data Visualization', 'Big Data Solutions', 'Reporting']
    },
    {
      icon: '🛠️',
      title: 'IT Consulting',
      description: 'Strategic IT guidance to help you make informed technology decisions.',
      features: ['Technology Strategy', 'Digital Transformation', 'Process Optimization', 'Training']
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      description: '24/7 technical support and maintenance to keep your systems running smoothly.',
      features: ['24/7 Monitoring', 'Bug Fixes', 'Performance Tuning', 'Updates & Upgrades']
    }
  ]

  return (
    <div className="services">
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container">
          <h1 className="page-title fade-in">Our Services</h1>
          <p className="page-subtitle fade-in">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">What We Offer</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Our Process</h2>
          <div className="process-timeline">
            <div className="process-step animate-on-scroll">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Discovery & Analysis</h4>
                <p>We understand your business requirements and objectives through detailed consultation.</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Planning & Strategy</h4>
                <p>Develop a comprehensive roadmap with clear milestones and deliverables.</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Design & Development</h4>
                <p>Create stunning designs and develop robust solutions using cutting-edge technologies.</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Testing & Quality Assurance</h4>
                <p>Rigorous testing to ensure flawless performance and user experience.</p>
              </div>
            </div>
            <div className="process-step animate-on-scroll">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Deployment & Support</h4>
                <p>Smooth deployment and ongoing support to ensure continued success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how we can help transform your business with our services.</p>
            <a href="/contact" className="btn btn-primary">Get a Free Consultation</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
