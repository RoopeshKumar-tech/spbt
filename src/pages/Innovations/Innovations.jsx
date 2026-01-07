import { useEffect } from 'react'
import './Innovations.css'

function Innovations() {
  useEffect(() => {
    const options = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('animate') })
    }, options)
    document.querySelectorAll('.animate-on-scroll').forEach(el=>obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="innovations">
      <section className="innovations-hero">
        <div className="container">
          <h1 className="page-title fade-in">Innovations</h1>
          <p className="page-subtitle fade-in">R&D, prototypes, and agentic AI initiatives</p>
        </div>
      </section>

      <section className="innovations-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Focus Areas</h2>
          <div className="cards-grid">
            <div className="card animate-on-scroll">
              <h3>Agentic AI</h3>
              <p>Autonomous agents for workflows: research, summarization, QA, and integrations with CRMs.</p>
              <ul>
                <li>Guardrails + audit logs</li>
                <li>Human-in-the-loop review</li>
              </ul>
            </div>
            <div className="card animate-on-scroll">
              <h3>DevX Tooling</h3>
              <p>Internal developer tools for CI, code quality, and staged rollouts with observability.</p>
              <ul>
                <li>Templates and scaffolds</li>
                <li>Automated checks</li>
              </ul>
            </div>
            <div className="card animate-on-scroll">
              <h3>Cloud Acceleration</h3>
              <p>Blueprints for secure, cost-optimized cloud on AWS/Azure, with IaC and policy-as-code.</p>
              <ul>
                <li>Reference architectures</li>
                <li>Cost guardrails</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="innovations-cta">
        <div className="container">
          <div className="cta-box animate-on-scroll">
            <h2>Partner With Our R&D Team</h2>
            <p>Pilot an idea in 2–4 weeks with a sharp, measurable scope.</p>
            <a className="btn btn-primary" href="/contact">Co-create With Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Innovations
