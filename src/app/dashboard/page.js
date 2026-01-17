'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState('Feed')
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)

  // Load user and dashboard data
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)

    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser({
        name: 'John Smith',
        email: 'john@example.edu',
        avatar: 'JS'
      })
    }

    // Mock posts
    setPosts([
      {
        id: 1,
        user: 'Computer Science Club',
        time: '2 hours ago',
        content: 'Join us this Friday for a hackathon workshop! Learn how to build a web app in 24 hours. Food and drinks provided! 🚀',
        likes: 42,
        comments: 8
      },
      {
        id: 2,
        user: 'Sanjida Hossain',
        time: '5 hours ago',
        content: 'Just finished my final project presentation! So grateful for all the support from my team and professor. 🎓',
        likes: 28,
        comments: 3
      }
    ])

    // Mock events
    setEvents([
      { id: 1, day: '18', month: 'DEC', title: 'Tech Conference 2024', time: '10:00 AM', location: 'Main Auditorium' },
      { id: 2, day: '22', month: 'DEC', title: 'Career Fair', time: '9:00 AM', location: 'University Hall' },
      { id: 3, day: '28', month: 'DEC', title: 'Alumni Meetup', time: '6:00 PM', location: 'Campus Cafe' }
    ])

    // Mock clubs
    setClubs([
      { id: 1, icon: 'fa-laptop-code', name: 'Programming Club', members: 128, events: 5 },
      { id: 2, icon: 'fa-paint-brush', name: 'Art Society', members: 86, events: 3 },
      { id: 3, icon: 'fa-volleyball-ball', name: 'Sports Club', members: 210, events: 8 }
    ])

    setLoading(false)
  }

  // Create post
  const handleCreatePost = (content) => {
    if (!content.trim()) return

    const newPost = {
      id: posts.length + 1,
      user: user.name,
      time: 'Just now',
      content: content,
      likes: 0,
      comments: 0
    }
    setPosts([newPost, ...posts])
  }

  // Like post
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const sidebarItems = [
    { icon: 'fa-home', label: 'Feed' },
    { icon: 'fa-users', label: 'Clubs' },
    { icon: 'fa-calendar-alt', label: 'Events' },
    { icon: 'fa-book', label: 'Courses' },
    { icon: 'fa-comments', label: 'Messages' },
    { icon: 'fa-compass', label: 'Explore' },
    { icon: 'fa-user', label: 'Profile' },
    { icon: 'fa-cog', label: 'Settings' }
  ]

  // Loading state
  if (loading) {
    return (
      <div className="container page-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}></i>
          <p style={{ marginTop: '20px' }}>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-container">
      <div className="page active">
        <h2 className="page-title">Dashboard</h2>
        
        <div className="dashboard-container">
          {/* Sidebar */}
          <div className="sidebar">
            <h3>Navigation</h3>
            <ul className="sidebar-menu">
              {sidebarItems.map((item, index) => (
                <li 
                  key={index}
                  className={activeMenu === item.label ? 'active' : ''}
                  onClick={() => setActiveMenu(item.label)}
                >
                  <i className={`fas ${item.icon}`}></i> {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Main content */}
          <div className="dashboard-content">
            {/* Top Bar */}
            <div className="top-bar">
              <div className="search-bar">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search for clubs, events, or people..." />
              </div>
              <div className="user-actions">
                <div className="notification-badge">
                  <i className="fas fa-bell"></i>
                  <span className="badge">3</span>
                </div>
                <div className="user-profile">
                  <div className="user-avatar">{user?.avatar || 'JS'}</div>
                  <span>{user?.name || 'John Smith'}</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
              {/* Posts */}
              <div className="left-column">
                <div className="card create-post">
                  <div className="user-avatar">{user?.avatar || 'JS'}</div>
                  <input 
                    type="text" 
                    placeholder="What's happening at campus?"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleCreatePost(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>

                <div className="card">
                  {posts.map(post => (
                    <div key={post.id} className="post">
                      <div className="post-header">
                        <span className="post-user">{post.user}</span>
                        <span className="post-time">{post.time}</span>
                      </div>
                      <div className="post-content">
                        <p>{post.content}</p>
                      </div>
                      <div className="post-actions">
                        <div className="post-action" onClick={() => handleLikePost(post.id)}>
                          <i className="far fa-heart"></i> {post.likes}
                        </div>
                        <div className="post-action">
                          <i className="far fa-comment"></i> {post.comments}
                        </div>
                        <div className="post-action">
                          <i className="fas fa-share"></i> Share
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widgets */}
              <div className="right-column">
                {/* Events */}
                <div className="card">
                  <h3 className="widget-title">Upcoming Events</h3>
                  {events.map(event => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <div className="event-day">{event.day}</div>
                        <div className="event-month">{event.month}</div>
                      </div>
                      <div className="event-details">
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">{event.time} • {event.location}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Link href="/events" style={{ color: 'var(--primary-blue)', fontWeight: '500', textDecoration: 'none' }}>
                      View all events →
                    </Link>
                  </div>
                </div>

                {/* Clubs */}
                <div className="card">
                  <h3 className="widget-title">Trending Clubs</h3>
                  {clubs.map(club => (
                    <div key={club.id} className="club-item">
                      <div className="club-icon">
                        <i className={`fas ${club.icon}`}></i>
                      </div>
                      <div className="club-details">
                        <div className="club-name">{club.name}</div>
                        <div className="club-activity">{club.members} members • {club.events} events</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Link href="/clubs" style={{ color: 'var(--primary-blue)', fontWeight: '500', textDecoration: 'none' }}>
                      View all clubs →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <Link href="/messaging" className="fab">
          <i className="fas fa-comment"></i>
        </Link>
      </div>
    </div>
  )
}
