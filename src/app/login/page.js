'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }
    
    // DATABASE: Call login API
    // try {
    //   const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials)
    //   })
    //   
    //   const data = await response.json()
    //   
    //   if (response.ok) {
    //     // Store user data and token
    //     localStorage.setItem('user', JSON.stringify(data.user))
    //     localStorage.setItem('authToken', data.token)
    //     
    //     router.push('/dashboard')
    //   } else {
    //     setError(data.message || 'Invalid credentials')
    //   }
    // } catch (err) {
    //   setError('Network error. Please try again.')
    // }

    // For now, create mock user and store
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: 'John Smith',
        email: credentials.email,
        department: 'Computer Science',
        avatar: 'JS'
      }
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      setIsLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.id]: e.target.value
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
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Sign in to your AcademiaConnect account</p>
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
                <label htmlFor="email">Email / Student ID</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    id="email" 
                    placeholder="Enter your email or student ID"
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div style={{ textAlign: 'right', marginTop: '5px' }}>
                  <Link 
                    href="#" 
                    style={{ 
                      color: 'var(--primary-blue)', 
                      textDecoration: 'none', 
                      fontSize: '0.9rem' 
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="form-footer">
                <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}