'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
    terms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError('')

  // Password match check
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match!')
    setIsLoading(false)
    return
  }

  // Terms check
  if (!formData.terms) {
    setError('Please accept the terms and conditions')
    setIsLoading(false)
    return
  }

  const payload = {
    name: formData.fullname,
    email: formData.email,
    password: formData.password,
    role: 'student'
  }

  try {
    const res = await fetch('http://localhost/myapi/signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!data.success) {
      setError(data.message || 'Signup failed')
      setIsLoading(false)
      return
    }

    // ✅ SUCCESS (NO CSS BREAK)
    alert('Account created successfully! Please login.')
    router.push('/login')

  } catch (err) {
    setError('Network error. Please try again.')
  }

  setIsLoading(false)
}


  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
  }

  return (
    <div className="container page-container">
      <div className="page active">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Join AcademiaConnect to access university resources</p>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {error && (
                <div style={{
                  padding: '10px',
                  marginBottom: '15px',
                  backgroundColor: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--error)'
                }}>
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    id="fullname" 
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email / Student ID</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="text" 
                    id="email" 
                    placeholder="Enter your email or student ID"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <div className="input-with-icon">
                  <i className="fas fa-building"></i>
                  <select 
                    id="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  >
                    <option value="">Select your department</option>
                    <option value="cse">Computer Science & Engineering</option>
                    <option value="eee">Electrical & Electronic Engineering</option>
                    <option value="bba">Business Administration</option>
                    <option value="law">Law</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    minLength="6"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    minLength="6"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    type="checkbox" 
                    id="terms" 
                    style={{ marginRight: '10px' }}
                    checked={formData.terms}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  <label htmlFor="terms">I agree to the Terms & Privacy Policy</label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-accent btn-block"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
              
              <div className="form-footer">
                <p>Already have an account? <Link href="/login">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

