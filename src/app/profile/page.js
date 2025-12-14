'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('About')
  const [isSaving, setIsSaving] = useState(false)
  
  // File input refs
  const profileImageRef = useRef(null)
  const coverImageRef = useRef(null)
  
  // Form data for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    education: {
      degree: '',
      university: '',
      years: ''
    },
    activities: []
  })
  
  // Temporary image previews
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)
  
  // New skill input
  const [newSkill, setNewSkill] = useState('')

  // Load user data
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = () => {
    // DATABASE: Fetch user profile from API
    // const response = await fetch(`/api/users/${userId}`)
    // const data = await response.json()
    // setUser(data)
    
    // For now, load from localStorage or use mock data
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsed = JSON.parse(userData)
      const fullUser = {
        id: parsed.id || 1,
        name: parsed.name || 'John Smith',
        email: parsed.email || 'john.smith@example.edu',
        department: parsed.department || 'Computer Science & Engineering',
        phone: parsed.phone || '(123) 456-7890',
        location: parsed.location || 'Campus Residence Hall B',
        bio: parsed.bio || 'Senior Computer Science student with a passion for web development and AI. President of the Programming Club and active participant in hackathons.',
        avatar: parsed.avatar || 'JS',
        profileImage: parsed.profileImage || null,
        coverImage: parsed.coverImage || null,
        skills: parsed.skills || ['Web Development', 'UI/UX Design', 'Data Science', 'Python', 'JavaScript'],
        education: parsed.education || {
          degree: 'BS in Computer Science',
          university: 'University of Example',
          years: '2020 - 2024'
        },
        activities: parsed.activities || [
          'Programming Club - President',
          'Robotics Team - Lead Developer',
          'Student Government - Representative'
        ],
        year: parsed.year || 'Senior Year'
      }
      setUser(fullUser)
      setFormData(fullUser)
    }
  }

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form data
      setFormData(user)
      setProfileImagePreview(null)
      setCoverImagePreview(null)
    }
    setIsEditing(!isEditing)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle nested education changes
  const handleEducationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value
      }
    }))
  }

  // Handle profile image upload
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle cover image upload
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  // Save profile changes
  const handleSaveProfile = async () => {
    setIsSaving(true)

    // DATABASE: Update user profile
    // try {
    //   const formDataToSend = new FormData()
    //   
    //   // Add text fields
    //   formDataToSend.append('name', formData.name)
    //   formDataToSend.append('email', formData.email)
    //   formDataToSend.append('department', formData.department)
    //   formDataToSend.append('phone', formData.phone)
    //   formDataToSend.append('location', formData.location)
    //   formDataToSend.append('bio', formData.bio)
    //   formDataToSend.append('skills', JSON.stringify(formData.skills))
    //   formDataToSend.append('education', JSON.stringify(formData.education))
    //   formDataToSend.append('activities', JSON.stringify(formData.activities))
    //   
    //   // Add images if changed
    //   if (profileImageRef.current?.files[0]) {
    //     formDataToSend.append('profileImage', profileImageRef.current.files[0])
    //   }
    //   if (coverImageRef.current?.files[0]) {
    //     formDataToSend.append('coverImage', coverImageRef.current.files[0])
    //   }
    //   
    //   const response = await fetch(`/api/users/${user.id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    //     },
    //     body: formDataToSend
    //   })
    //   
    //   if (response.ok) {
    //     const updatedUser = await response.json()
    //     setUser(updatedUser)
    //     localStorage.setItem('user', JSON.stringify(updatedUser))
    //     setIsEditing(false)
    //     alert('Profile updated successfully!')
    //   } else {
    //     alert('Failed to update profile')
    //   }
    // } catch (error) {
    //   console.error('Error updating profile:', error)
    //   alert('An error occurred while updating profile')
    // }

    // For now, update localStorage
    setTimeout(() => {
      const updatedUser = {
        ...formData,
        profileImage: profileImagePreview || user.profileImage,
        coverImage: coverImagePreview || user.coverImage
      }
      
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      
      setIsEditing(false)
      setProfileImagePreview(null)
      setCoverImagePreview(null)
      setIsSaving(false)
      
      alert('Profile updated successfully!')
    }, 1000)
  }

  const tabs = ['About', 'Posts', 'Clubs', 'Events', 'Courses']

  if (!user) {
    return (
      <>
        <Header />
        <div className="container page-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}></i>
            <p style={{ marginTop: '20px' }}>Loading profile...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container page-container">
        <div className="page active">
          <h2 className="page-title">User Profile</h2>
          
          <div className="profile-header">
            {/* Cover Photo */}
            <div 
              className="cover-photo" 
              style={coverImagePreview || user.coverImage ? {
                backgroundImage: `url(${coverImagePreview || user.coverImage})`
              } : {}}
            >
              {isEditing && (
                <button 
                  className="btn btn-secondary"
                  style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px',
                    padding: '8px 15px'
                  }}
                  onClick={() => coverImageRef.current.click()}
                >
                  <i className="fas fa-camera"></i> Change Cover
                </button>
              )}
              <input 
                type="file"
                ref={coverImageRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleCoverImageChange}
              />
            </div>
            
            {/* Profile Info */}
            <div className="profile-info">
              <div className="profile-avatar-container">
                {profileImagePreview || user.profileImage ? (
                  <img 
                    src={profileImagePreview || user.profileImage} 
                    alt={user.name}
                    className="profile-avatar"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="profile-avatar">{user.avatar}</div>
                )}
                {isEditing && (
                  <button 
                    className="change-avatar-btn"
                    onClick={() => profileImageRef.current.click()}
                  >
                    <i className="fas fa-camera"></i>
                  </button>
                )}
                <input 
                  type="file"
                  ref={profileImageRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </div>
              
              <div className="profile-details">
                {isEditing ? (
                  <>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="profile-name-input"
                      placeholder="Your name"
                    />
                    <input 
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="profile-department-input"
                      placeholder="Your department"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="profile-name">{user.name}</h2>
                    <p className="profile-department">{user.department} • {user.year}</p>
                  </>
                )}
                
                {/* Skills */}
                <div className="profile-skills">
                  {isEditing ? (
                    <div style={{ width: '100%' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                        {formData.skills.map((skill, index) => (
                          <span key={index} className="skill-tag" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {skill}
                            <i 
                              className="fas fa-times" 
                              style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                              onClick={() => handleRemoveSkill(skill)}
                            ></i>
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                          style={{ 
                            flex: 1, 
                            padding: '8px 12px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                        <button 
                          className="btn btn-secondary"
                          onClick={handleAddSkill}
                          style={{ padding: '8px 15px' }}
                        >
                          <i className="fas fa-plus"></i> Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {user.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button 
                        className="btn btn-primary" 
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        <i className="fas fa-check"></i> {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        onClick={handleEditToggle}
                        disabled={isSaving}
                      >
                        <i className="fas fa-times"></i> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary" onClick={handleEditToggle}>
                        <i className="fas fa-edit"></i> Edit Profile
                      </button>
                      <button className="btn btn-secondary">
                        <i className="fas fa-share"></i> Share Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="profile-tabs">
              {tabs.map((tab, index) => (
                <div 
                  key={index}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'About' && (
              <>
                <h3>About</h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: 'var(--border-radius)',
                      fontSize: '1rem',
                      marginBottom: '20px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p>{user.bio}</p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
                  {/* Education Card */}
                  <div className="card">
                    <h4>Education</h4>
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={formData.education.degree}
                          onChange={(e) => handleEducationChange('degree', e.target.value)}
                          placeholder="Degree"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            marginBottom: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                        <input
                          type="text"
                          value={formData.education.university}
                          onChange={(e) => handleEducationChange('university', e.target.value)}
                          placeholder="University"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            marginBottom: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                        <input
                          type="text"
                          value={formData.education.years}
                          onChange={(e) => handleEducationChange('years', e.target.value)}
                          placeholder="Years (e.g., 2020 - 2024)"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p><strong>{user.education.degree}</strong></p>
                        <p>{user.education.university}</p>
                        <p>{user.education.years}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Contact Card */}
                  <div className="card">
                    <h4>Contact</h4>
                    {isEditing ? (
                      <>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            marginBottom: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Phone:</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            marginBottom: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Location:</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="Location"
                          style={{ 
                            width: '100%', 
                            padding: '8px', 
                            border: '1px solid #ddd', 
                            borderRadius: 'var(--border-radius)' 
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                      </>
                    )}
                  </div>
                  
                  {/* Activities Card */}
                  <div className="card">
                    <h4>Activities</h4>
                    {user.activities.map((activity, index) => (
                      <p key={index}>{activity}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'Posts' && (
              <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
                <i className="fas fa-newspaper" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                <p>No posts yet</p>
              </div>
            )}
            
            {activeTab === 'Clubs' && (
              <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
                <i className="fas fa-users" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                <p>Not a member of any clubs yet</p>
              </div>
            )}
            
            {activeTab === 'Events' && (
              <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
                <i className="fas fa-calendar-alt" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                <p>No events attended yet</p>
              </div>
            )}
            
            {activeTab === 'Courses' && (
              <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>
                <i className="fas fa-book" style={{ fontSize: '3rem', marginBottom: '20px' }}></i>
                <p>No courses enrolled yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      
      <Link href="/messaging" className="fab">
        <i className="fas fa-comment"></i>
      </Link>
    </>
  )
}