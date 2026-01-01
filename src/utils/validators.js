// Advanced validation utilities

export const validators = {
  // Name validation
  name: (value) => {
    const trimmed = value.trim()
    
    if (!trimmed) {
      return 'Full name is required'
    }
    
    if (trimmed.length < 2) {
      return 'Name must be at least 2 characters'
    }
    
    if (trimmed.length > 50) {
      return 'Name must not exceed 50 characters'
    }
    
    const nameParts = trimmed.split(/\s+/)
    if (nameParts.length < 2) {
      return 'Please enter your full name (first and last name)'
    }
    
    const nameRegex = /^[a-zA-Z\s'-]+$/
    if (!nameRegex.test(trimmed)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
    
    return null
  },

  // Email validation with typo detection
  email: (value) => {
    const trimmed = value.trim()
    
    if (!trimmed) {
      return 'Email address is required'
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address'
    }
    
    if (trimmed.length > 254) {
      return 'Email address is too long'
    }
    
    const [localPart, domain] = trimmed.split('@')
    
    if (localPart.length > 64) {
      return 'Email local part is too long'
    }
    
    // Common typos in popular domains
    const domainTypos = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'hotmial.com': 'hotmail.com',
      'outlok.com': 'outlook.com'
    }
    
    if (domainTypos[domain]) {
      return `Did you mean ${trimmed.replace(domain, domainTypos[domain])}?`
    }
    
    return null
  },

  // Phone validation for Indian numbers
  phone: (value, required = false) => {
    if (!value.trim()) {
      return required ? 'Phone number is required' : null
    }
    
    const cleaned = value.replace(/[\s()-]/g, '')
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    
    if (!phoneRegex.test(cleaned)) {
      return 'Please enter a valid Indian phone number (10 digits starting with 6-9)'
    }
    
    return null
  },

  // Subject validation
  subject: (value) => {
    const trimmed = value.trim()
    
    if (!trimmed) {
      return 'Subject is required'
    }
    
    if (trimmed.length < 3) {
      return 'Subject must be at least 3 characters'
    }
    
    if (trimmed.length > 100) {
      return 'Subject must not exceed 100 characters'
    }
    
    return null
  },

  // Message validation
  message: (value, minLength = 20) => {
    const trimmed = value.trim()
    
    if (!trimmed) {
      return 'Message is required'
    }
    
    if (trimmed.length < minLength) {
      return `Message must be at least ${minLength} characters for a meaningful inquiry`
    }
    
    if (trimmed.length > 1000) {
      return 'Message must not exceed 1000 characters'
    }
    
    // Check for meaningful content
    const uniqueChars = new Set(trimmed.toLowerCase().replace(/\s/g, ''))
    if (uniqueChars.size < 5) {
      return 'Please provide a more detailed message'
    }
    
    return null
  }
}

// Email domain verification
export const verifyEmailDomain = async (email) => {
  const domain = email.split('@')[1]
  if (!domain) return false
  
  // Common valid domains for quick validation
  const commonDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
    'icloud.com', 'live.com', 'msn.com', 'yahoo.co.in',
    'rediffmail.com', 'aol.com', 'protonmail.com'
  ]
  
  if (commonDomains.includes(domain.toLowerCase())) {
    return true
  }
  
  // Simulate domain verification
  await new Promise(resolve => setTimeout(resolve, 500))
  return true
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  const temp = document.createElement('div')
  temp.textContent = input
  return temp.innerHTML
}

// Format phone number for display
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

export default validators
