'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('About')
  const [isSaving, setIsSaving] = useState(false)

  const profileImageRef = useRef(null)
  const coverImageRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    education: { degree: '', university: '', years: '' },
    activities: []
  })

  
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)
  const [newSkill, setNewSkill] = useState('')
  const [newActivity, setNewActivity] = useState('')


  // Load user
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
    const parsed = JSON.parse(userData)
    const fullUser = {
      id: parsed.id || 1,
      name: parsed.name || 'John Smith',
      email: parsed.email || '',
      department: parsed.department || '',
      phone: parsed.phone || '',
      location: parsed.location || '',
      bio: parsed.bio || '',
      avatar: parsed.avatar || 'JS',
      profileImage: parsed.profileImage || null,
      coverImage: parsed.coverImage || null,
      skills: parsed.skills || [],
      education: parsed.education || { degree: '', university: '', years: '' },
      activities: parsed.activities || [],
      year: parsed.year || 'Senior Year'
      }
      setUser(fullUser)
      setFormData(fullUser)
    }
  }, [])

  const handleEditToggle = () => {
    if (isEditing) setFormData(user)
    setProfileImagePreview(null)
    setCoverImagePreview(null)
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEducationChange = (field, value) => {
    setFormData(prev => ({ ...prev, education: { ...prev.education, [field]: value } }))
  }

  const handleProfileImageChange = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('type', 'profile')
  formData.append('id', user.id)
  formData.append('file', file)

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()
  if(data.success) {
    setProfileImagePreview(data.path)  // path from server
  }
}


  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return alert('Image size should be less than 5MB')
    const reader = new FileReader()
    reader.onloadend = () => setCoverImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }
  const handleAddActivity = () => {
  if (newActivity.trim()) {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity.trim()]
    }))
    setNewActivity('')
  }
}

const handleRemoveActivity = (index) => {
  setFormData(prev => ({
    ...prev,
    activities: prev.activities.filter((_, i) => i !== index)
  }))
}


  const handleSaveProfile = async () => {
  const payload = {
    ...formData,
    id: user.id,
    coverImageBase64: coverImagePreview || null,
    profileImageBase64: profileImagePreview || null
  }

  const res = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json()
  if (res.ok) {
    alert('Profile updated successfully!')
    setUser({ ...formData, coverImage: coverImagePreview || user.coverImage, profileImage: profileImagePreview || user.profileImage })
    setIsEditing(false)
  } else {
    alert(data.error)
  }
}





  const tabs = ['About', 'Posts', 'Clubs', 'Events', 'Courses']

  if (!user) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>

  return (
    <div className="container page-container" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Cover Photo */}
      <div className="cover-photo" style={{
        height: '200px',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        backgroundImage: `url(${coverImagePreview || user.coverImage || ''})`,
        position: 'relative',
        marginBottom: '60px'
      }}>
        {isEditing && (
          <>
            <button style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '8px 12px',
              backgroundColor: '#395b64',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }} onClick={() => coverImageRef.current.click()}>
              Change Cover
            </button>
            <input type="file" ref={coverImageRef} style={{ display: 'none' }} accept="image/*" onChange={handleCoverImageChange} />
          </>
        )}
      </div>

      {/* Profile Info */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ position: 'relative' }}>
          {profileImagePreview || user.profileImage ? (
            <img src={profileImagePreview || user.profileImage} alt="avatar" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 0 8px rgba(0,0,0,0.2)' }} />
          ) : (
            <div style={{
              width: '120px', height: '120px',
              borderRadius: '50%', backgroundColor: '#ddd',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', color: '#555'
            }}>{user.avatar}</div>
          )}
          {isEditing && (
            <>
              <button style={{
                position: 'absolute', bottom: '0', right: '0',
                backgroundColor: '#395b64',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '35px', height: '35px',
                cursor: 'pointer'
              }} onClick={() => profileImageRef.current.click()}>
                <i className="fas fa-camera"></i>
              </button>
              <input type="file" ref={profileImageRef} style={{ display: 'none' }} accept="image/*" onChange={handleProfileImageChange} />
            </>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <input value={formData.name} onChange={handleInputChange} name="name" style={{ width: '100%', padding: '10px', fontSize: '1.2rem', marginBottom: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input value={formData.department} onChange={handleInputChange} name="department" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '8px' }} />
            </>
          ) : (
            <>
              <h2 style={{ margin: '0', fontSize: '1.8rem', fontWeight: 600 }}>{user.name}</h2>
              <p style={{ margin: '4px 0', color: '#555' }}>{user.department} • {user.year}</p>
            </>
          )}

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
            {isEditing ? formData.skills.map((skill, idx) => (
              <span key={idx} style={{
                padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem'
              }}>
                {skill} <i style={{ cursor: 'pointer' }} className="fas fa-times" onClick={() => handleRemoveSkill(skill)}></i>
              </span>
            )) : user.skills.map((s, i) => (
              <span key={i} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '15px', fontSize: '0.85rem' }}>{s}</span>
            ))}
          </div>

          {isEditing && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddSkill()} placeholder="Add skill" style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <button onClick={handleAddSkill} style={{ padding: '8px 12px', borderRadius: '5px', backgroundColor: '#395b64', color: '#fff', border: 'none', cursor: 'pointer' }}>Add</button>
            </div>
          )}

          {/* Edit Buttons */}
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            {isEditing ? (
              <>
                <button onClick={handleSaveProfile} disabled={isSaving} style={{ padding: '8px 16px', backgroundColor: '#395b64', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{isSaving ? 'Saving...' : 'Save'}</button>
                <button onClick={handleEditToggle} style={{ padding: '8px 16px', backgroundColor: '#ddd', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditToggle} style={{ padding: '8px 16px', backgroundColor: '#395b64', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <div key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '10px 15px',
            cursor: 'pointer',
            borderBottom: activeTab === tab ? '3px solid #395b64' : '3px solid transparent',
            fontWeight: activeTab === tab ? 600 : 500
          }}>
            {tab}
          </div>
        ))}
      </div>

      {/* About tab */}
      {activeTab === 'About' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {/* Education */}
          <div style={{ padding: '15px', boxShadow: '0 0 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px' }}>Education</h4>
            {isEditing ? (
              <>
                <input value={formData.education.degree} onChange={e => handleEducationChange('degree', e.target.value)} placeholder="Degree" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input value={formData.education.university} onChange={e => handleEducationChange('university', e.target.value)} placeholder="University" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input value={formData.education.years} onChange={e => handleEducationChange('years', e.target.value)} placeholder="Years" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
              </>
            ) : (
              <>
                <p><strong>{user.education.degree}</strong></p>
                <p>{user.education.university}</p>
                <p>{user.education.years}</p>
              </>
            )}
          </div>

          {/* Contact */}
          <div style={{ padding: '15px', boxShadow: '0 0 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '10px' }}>Contact</h4>
            {isEditing ? (
              <>
                <input value={formData.email} onChange={handleInputChange} name="email" placeholder="Email" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input value={formData.phone} onChange={handleInputChange} name="phone" placeholder="Phone" style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                <input value={formData.location} onChange={handleInputChange} name="location" placeholder="Location" style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Location:</strong> {user.location}</p>
              </>
            )}
          </div>

          {/* Activities */}
          <div style={{
  padding: '15px',
  boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  borderRadius: '8px'
}}>
  <h4 style={{ marginBottom: '10px' }}>Activities</h4>

  {isEditing ? (
    <>
      {formData.activities.map((activity, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px',
          background: '#f4f4f4',
          borderRadius: '6px',
          marginBottom: '6px'
        }}>
          <span>{activity}</span>
          <i
            className="fas fa-times"
            style={{ cursor: 'pointer' }}
            onClick={() => handleRemoveActivity(i)}
          ></i>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
        <input
          value={newActivity}
          onChange={e => setNewActivity(e.target.value)}
          placeholder="Add activity"
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleAddActivity}
          style={{
            padding: '8px 14px',
            backgroundColor: '#395b64',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
    </>
  ) : (
    user.activities.map((a, i) => (
      <p key={i}>{a}</p>
    ))
  )}
</div>
        </div>
      )}

      {/* Floating messaging button */}
      <Link href="/messaging" style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        backgroundColor: '#395b64',
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '1.3rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <i className="fas fa-comment"></i>
      </Link>
    </div>
  )
}
