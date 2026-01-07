import { useEffect } from 'react'
import './Careers.css'

function Careers(){
  useEffect(()=>{
    const obs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('animate')})},{threshold:0.1})
    document.querySelectorAll('.animate-on-scroll').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  return (
    <div className="careers">
      <section className="careers-hero">
        <div className="container">
          <h1 className="page-title fade-in">Careers</h1>
          <p className="page-subtitle fade-in">Build with a product-first, quality-obsessed team</p>
        </div>
      </section>

      <section className="careers-section">
        <div className="container">
          <div className="careers-grid">
            <div className="careers-card animate-on-scroll">
              <h3>Open Roles</h3>
              <ul className="roles">
                <li>Frontend Engineer (React)</li>
                <li>Backend Engineer (Node/Python)</li>
                <li>Agentic AI Engineer (RAG/Tools)</li>
              </ul>
              <p className="note">Don’t see a match? We’re always happy to meet great people.</p>
            </div>
            <div className="careers-card animate-on-scroll">
              <h3>How to Apply</h3>
              <p>Send your resume and GitHub/portfolio to <a href="mailto:poornabodhaveera@gmail.com">poornabodhaveera@gmail.com</a> with subject “Application - [Role]”.</p>
              <ul className="bullets">
                <li>Brief cover note (2–4 lines)</li>
                <li>Links to recent work</li>
                <li>Notice period & location preference</li>
              </ul>
            </div>
            <div className="careers-card animate-on-scroll">
              <h3>What We Value</h3>
              <ul className="bullets">
                <li>Ownership and craftsmanship</li>
                <li>Bias for action and clarity</li>
                <li>Security, testing, and docs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-cta">
        <div className="container">
          <div className="cta-box animate-on-scroll">
            <h2>Join Us</h2>
            <p>We’re hiring across engineering, design, and product.</p>
            <a className="btn btn-primary" href="mailto:poornabodhaveera@gmail.com">Apply Now</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers
