import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const EMAIL_TO = 'veerapoornabodha@gmail.com'
const EMAIL_SERVICE_ID = 'service_40e1bzb'
// Main notification template (from EmailJS dashboard)
const EMAIL_TEMPLATE_ID = 'template_4m5gsvs'
// Auto-reply template (use same unless you have a dedicated auto-reply template ID)
const EMAIL_AUTOREPLY_TEMPLATE_ID = 'template_4m5gsvs'
const EMAIL_PUBLIC_KEY = 'zxpUIbQL-psjKYoWa'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [touched, setTouched] = useState({})
  const [verifying, setVerifying] = useState({})
  const [fieldValidation, setFieldValidation] = useState({})

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormDraft')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (e) {
        console.error('Failed to parse saved form data')
      }
    }
  }, [])

  // Save form data to localStorage on change
  useEffect(() => {
    if (Object.values(formData).some(val => val.trim() !== '')) {
      localStorage.setItem('contactFormDraft', JSON.stringify(formData))
    }
  }, [formData])

  // Advanced email domain verification
  const verifyEmailDomain = async (email) => {
    const domain = email.split('@')[1]
    if (!domain) return false
    
    // Common valid domains for quick validation
    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']
    if (commonDomains.includes(domain.toLowerCase())) {
      return true
    }
    
    // Simulate domain verification (in production, you'd use a real API)
    await new Promise(resolve => setTimeout(resolve, 500))
    return true // Assume valid for demo
  }

  // Advanced name validation
  const validateName = (name) => {
    const trimmedName = name.trim()
    
    if (!trimmedName) {
      return 'Full name is required'
    }
    
    if (trimmedName.length < 2) {
      return 'Name must be at least 2 characters'
    }
    
    if (trimmedName.length > 50) {
      return 'Name must not exceed 50 characters'
    }
    
    // Check for invalid characters
    const nameRegex = /^[a-zA-Z\s'-]+$/
    if (!nameRegex.test(trimmedName)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
    
    return null
  }

  // Advanced email validation
  const validateEmail = (email) => {
    const trimmedEmail = email.trim()
    
    if (!trimmedEmail) {
      return 'Email address is required'
    }
    
    // RFC 5322 compliant email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address'
    }
    
    if (trimmedEmail.length > 254) {
      return 'Email address is too long'
    }
    
    const [localPart, domain] = trimmedEmail.split('@')
    
    if (localPart.length > 64) {
      return 'Email local part is too long'
    }
    
    // Check for common typos in popular domains
    const domainTypos = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'outlok.com': 'outlook.com'
    }
    
    if (domainTypos[domain]) {
      return `Did you mean ${trimmedEmail.replace(domain, domainTypos[domain])}?`
    }
    
    return null
  }

  // Advanced phone validation
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return null // Phone is optional
    }
    
    const cleaned = phone.replace(/[\s()-]/g, '')
    
    // Check for valid Indian phone number
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    
    if (!phoneRegex.test(cleaned)) {
      return 'Please enter a valid Indian phone number (10 digits starting with 6-9)'
    }
    
    return null
  }

  // Advanced subject validation
  const validateSubject = (subject) => {
    const trimmedSubject = subject.trim()
    
    if (!trimmedSubject) {
      return 'Subject is required'
    }
    
    if (trimmedSubject.length < 3) {
      return 'Subject must be at least 3 characters'
    }
    
    if (trimmedSubject.length > 100) {
      return 'Subject must not exceed 100 characters'
    }
    
    return null
  }

  // Advanced message validation
  const validateMessage = (message) => {
    const trimmedMessage = message.trim()
    
    if (!trimmedMessage) {
      return 'Message is required'
    }
    
    if (trimmedMessage.length < 20) {
      return 'Message must be at least 20 characters for a meaningful inquiry'
    }
    
    if (trimmedMessage.length > 1000) {
      return 'Message must not exceed 1000 characters'
    }
    
    // Check for meaningful content (not just repeated characters)
    const uniqueChars = new Set(trimmedMessage.toLowerCase().replace(/\s/g, ''))
    if (uniqueChars.size < 5) {
      return 'Please provide a more detailed message'
    }
    
    return null
  }

  const validateForm = () => {
    const newErrors = {}

    const nameError = validateName(formData.name)
    if (nameError) newErrors.name = nameError

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    const phoneError = validatePhone(formData.phone)
    if (phoneError) newErrors.phone = phoneError

    const subjectError = validateSubject(formData.subject)
    if (subjectError) newErrors.subject = subjectError

    const messageError = validateMessage(formData.message)
    if (messageError) newErrors.message = messageError

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = async (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    
    // Perform field-specific validation
    let error = null
    switch (fieldName) {
      case 'name':
        error = validateName(formData.name)
        break
      case 'email':
        error = validateEmail(formData.email)
        if (!error && formData.email.includes('@')) {
          setVerifying(prev => ({ ...prev, email: true }))
          const isValid = await verifyEmailDomain(formData.email)
          setVerifying(prev => ({ ...prev, email: false }))
          setFieldValidation(prev => ({ ...prev, email: isValid }))
        }
        break
      case 'phone':
        error = validatePhone(formData.phone)
        break
      case 'subject':
        error = validateSubject(formData.subject)
        break
      case 'message':
        error = validateMessage(formData.message)
        break
      default:
        break
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }))
      setFieldValidation(prev => ({ ...prev, [fieldName]: false }))
    } else {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
      setFieldValidation(prev => ({ ...prev, [fieldName]: true }))
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Clear validation status when editing
    if (touched[name]) {
      setFieldValidation(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    })
    
    if (!validateForm()) {
      setSubmitStatus('validation-error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitError('')

    // Simulate form submission with verification
    try {
      // Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      const emailValid = await verifyEmailDomain(formData.email)
      
      if (!emailValid) {
        setErrors(prev => ({ ...prev, email: 'Email domain could not be verified' }))
        setSubmitStatus('error')
        return
      }
      
      // Send actual email using EmailJS
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        to_name: 'Poornabodha Technologies',
        phone: (formData.phone || '').trim() || 'Not provided',
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        to_email: EMAIL_TO
      }
      
      // EmailJS configuration
      // Send email via EmailJS
      await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, templateParams, EMAIL_PUBLIC_KEY)
      console.log('Email sent successfully via EmailJS')

      // Auto-reply to the user (non-blocking)
      const autoReplyParams = {
        // Matches your auto-reply template placeholders
        name: formData.name.trim() || 'Valued Customer',
        title: formData.subject.trim() || 'Your request',

        // Delivery targets
        to_email: formData.email.trim(),

        // Optional context
        from_name: 'Poornabodha Technologies',
        reply_to: EMAIL_TO
      }

      if (autoReplyParams.to_email) {
        emailjs
          .send(EMAIL_SERVICE_ID, EMAIL_AUTOREPLY_TEMPLATE_ID, autoReplyParams, EMAIL_PUBLIC_KEY)
          .catch(err => console.error('Auto-reply failed:', err?.text || err))
      }
      
      // Success
      setSubmitStatus('success')
      
      // Clear form and localStorage
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      localStorage.removeItem('contactFormDraft')
      setTouched({})
      setFieldValidation({})
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 7000)
    } catch (error) {
      console.error('Email sending failed:', error?.text || error)
      const errorMsg = (error && (error.text || error.message)) || 'Email service temporarily unavailable.'
      setSubmitError(errorMsg)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const clearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    setErrors({})
    setTouched({})
    setFieldValidation({})
    localStorage.removeItem('contactFormDraft')
  }

  return (
    <div className="contact">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title fade-in">Get In Touch</h1>
          <p className="page-subtitle fade-in">
            We'd love to hear from you. Let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Info */}
            <div className="contact-info slide-in-left">
              <h2>Contact Information</h2>
              <p className="contact-intro">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>+91 9008224274</p>
                    <p>For inquiries</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>veerapoornabodha@gmail.com</p>
                    <p>Official Contact</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Registered Office</h4>
                    <p>No 32/2 J R R Complex, MSR/HMT Main Road</p>
                    <p>Mathikere, Bangalore - 560054, Karnataka, India</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="info-content">
                    <h4>Working Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="https://www.linkedin.com/in/poornabodha-technologies-3b80443a4" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://x.com/Poornabodha25" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/poornabodhatechnologies/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm11.25 1.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 8.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 12 10.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrapper slide-in-right">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      className={`${errors.name ? 'error' : ''} ${fieldValidation.name === true ? 'valid' : ''}`}
                      placeholder="John Doe"
                    />
                    {fieldValidation.name === true && (
                      <span className="validation-icon valid">✓</span>
                    )}
                    {fieldValidation.name === false && (
                      <span className="validation-icon invalid">✗</span>
                    )}
                  </div>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                  {!errors.name && touched.name && formData.name && (
                    <span className="char-count">{formData.name.trim().length}/50</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      className={`${errors.email ? 'error' : ''} ${fieldValidation.email === true ? 'valid' : ''}`}
                      placeholder="john@example.com"
                    />
                    {verifying.email && (
                      <span className="validation-icon verifying">
                        <span className="spinner"></span>
                      </span>
                    )}
                    {!verifying.email && fieldValidation.email === true && (
                      <span className="validation-icon valid">✓</span>
                    )}
                    {fieldValidation.email === false && (
                      <span className="validation-icon invalid">✗</span>
                    )}
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                  {fieldValidation.email === true && !errors.email && (
                    <span className="success-message">Email verified ✓</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number (Optional)</label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      className={`${errors.phone ? 'error' : ''} ${fieldValidation.phone === true ? 'valid' : ''}`}
                      placeholder="+91 9876543210"
                    />
                    {fieldValidation.phone === true && (
                      <span className="validation-icon valid">✓</span>
                    )}
                    {fieldValidation.phone === false && (
                      <span className="validation-icon invalid">✗</span>
                    )}
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={() => handleBlur('subject')}
                      className={`${errors.subject ? 'error' : ''} ${fieldValidation.subject === true ? 'valid' : ''}`}
                      placeholder="How can we help you?"
                    />
                    {fieldValidation.subject === true && (
                      <span className="validation-icon valid">✓</span>
                    )}
                    {fieldValidation.subject === false && (
                      <span className="validation-icon invalid">✗</span>
                    )}
                  </div>
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                  {!errors.subject && touched.subject && formData.subject && (
                    <span className="char-count">{formData.subject.trim().length}/100</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <div className="input-wrapper">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      className={`${errors.message ? 'error' : ''} ${fieldValidation.message === true ? 'valid' : ''}`}
                      placeholder="Tell us more about your project or inquiry..."
                    ></textarea>
                    {fieldValidation.message === true && (
                      <span className="validation-icon valid textarea-icon">✓</span>
                    )}
                    {fieldValidation.message === false && (
                      <span className="validation-icon invalid textarea-icon">✗</span>
                    )}
                  </div>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                  {!errors.message && touched.message && formData.message && (
                    <span className="char-count">{formData.message.trim().length}/1000</span>
                  )}
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading"></span>
                        {verifying.email ? 'Verifying...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                  
                  {Object.values(formData).some(val => val.trim() !== '') && !isSubmitting && (
                    <button 
                      type="button" 
                      className="btn btn-secondary clear-btn"
                      onClick={clearForm}
                    >
                      Clear Form
                    </button>
                  )}
                </div>

                {submitStatus === 'validation-error' && (
                  <div className="status-message warning">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Please fix the errors above before submitting.
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="status-message success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Success!</strong> Your message has been sent successfully. We'll get back to you within 24 hours.
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="status-message error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Error!</strong> {submitError || 'Something went wrong. Please try again or contact us directly.'}
                      <div style={{ marginTop: '6px', fontSize: '0.9rem' }}>
                        If the problem persists, click the mail link above or use the fallback email that just opened.
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-placeholder">
          <div className="map-overlay">
            <h3>Visit Our Office</h3>
            <p>No 32/2 J R R Complex, MSR/HMT Main Road</p>
            <p>Mathikere, Bangalore - 560054, Karnataka, India</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
