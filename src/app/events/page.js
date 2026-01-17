'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Events() {
  const router = useRouter()
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all',
    date: 'all',
    search: ''
  })

  // RSVP states
  const [rsvpLoading, setRsvpLoading] = useState({})
  const [rsvpedEvents, setRsvpedEvents] = useState([])

  // Load events and user data
  useEffect(() => {
    loadUserData()
    loadEvents()
    loadUserRSVPs()
  }, [])

  // Apply filters when events or filters change
  useEffect(() => {
    applyFilters()
  }, [events, filters])

  const loadUserData = () => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
    else setUser({ name: 'John Smith', avatar: 'JS' }) // mock user
  }

  const loadEvents = async () => {
    setLoading(true)
    // Mock data
    setTimeout(() => {
      const mockEvents = [
        { id: 1, title: 'Tech Conference 2024', date: '2024-12-18', time: '10:00 AM', location: 'Main Auditorium', category: 'technology', description: 'Annual tech conference.', organizer: 'CS Dept', capacity: 200, registered: 87 },
        { id: 2, title: 'Career Fair', date: '2024-12-22', time: '9:00 AM', location: 'University Hall', category: 'career', description: 'Connect with top employers.', organizer: 'Career Services', capacity: 500, registered: 234 },
        { id: 3, title: 'Alumni Meetup', date: '2024-12-28', time: '6:00 PM', location: 'Campus Cafe', category: 'social', description: 'Network with alumni.', organizer: 'Alumni Association', capacity: 100, registered: 56 },
        { id: 4, title: 'Science Exhibition', date: '2025-01-05', time: '11:00 AM', location: 'Science Building', category: 'academic', description: 'Showcase student projects.', organizer: 'Science Dept', capacity: 300, registered: 142 }
      ]
      setEvents(mockEvents)
      setLoading(false)
    }, 500)
  }

  const loadUserRSVPs = () => {
    const savedRSVPs = localStorage.getItem('userRSVPs')
    if (savedRSVPs) setRsvpedEvents(JSON.parse(savedRSVPs))
  }

  const applyFilters = () => {
    let filtered = [...events]

    if (filters.category !== 'all')
      filtered = filtered.filter(e => e.category === filters.category)

    const today = new Date()
    today.setHours(0,0,0,0)

    if (filters.date === 'upcoming')
      filtered = filtered.filter(e => new Date(e.date) >= today)
    else if (filters.date === 'past')
      filtered = filtered.filter(e => new Date(e.date) < today)
    else if (filters.date === 'today')
      filtered = filtered.filter(e => new Date(e.date).toDateString() === today.toDateString())

    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(query) || 
        e.description.toLowerCase().includes(query) || 
        e.location.toLowerCase().includes(query) ||
        e.organizer.toLowerCase().includes(query)
      )
    }

    filtered.sort((a,b) => new Date(a.date) - new Date(b.date))
    setFilteredEvents(filtered)
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleRSVP = (eventId) => {
    if (!user) {
      alert('Please login to RSVP')
      router.push('/login')
      return
    }

    setRsvpLoading(prev => ({ ...prev, [eventId]: true }))

    setTimeout(() => {
      const newRSVPs = [...rsvpedEvents, eventId]
      setRsvpedEvents(newRSVPs)
      localStorage.setItem('userRSVPs', JSON.stringify(newRSVPs))
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered: e.registered + 1 } : e))
      setRsvpLoading(prev => ({ ...prev, [eventId]: false }))
      alert('RSVP successful!')
    }, 300)
  }

  const handleCancelRSVP = (eventId) => {
    setRsvpLoading(prev => ({ ...prev, [eventId]: true }))
    setTimeout(() => {
      const newRSVPs = rsvpedEvents.filter(id => id !== eventId)
      setRsvpedEvents(newRSVPs)
      localStorage.setItem('userRSVPs', JSON.stringify(newRSVPs))
      setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registered: Math.max(0, e.registered - 1) } : e))
      setRsvpLoading(prev => ({ ...prev, [eventId]: false }))
      alert('RSVP cancelled')
    }, 300)
  }

  const isEventFull = e => e.registered >= e.capacity
  const isEventPast = dateStr => new Date(dateStr) < new Date()

  if (loading) return (
    <div className="container page-container" style={{ textAlign: 'center', padding: '50px' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}></i>
      <p style={{ marginTop: '20px' }}>Loading events...</p>
    </div>
  )

  return (
    <div className="container page-container">
      <h2>University Events</h2>
      <p>Discover and register for upcoming events</p>

      {/* Filters */}
      <div className="filter-section">
        <select value={filters.category} onChange={e => handleFilterChange('category', e.target.value)}>
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="academic">Academic</option>
          <option value="career">Career</option>
          <option value="cultural">Cultural</option>
          <option value="social">Social</option>
          <option value="sports">Sports</option>
        </select>

        <select value={filters.date} onChange={e => handleFilterChange('date', e.target.value)}>
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>

        <input type="text" placeholder="Search..." value={filters.search} onChange={e => handleFilterChange('search', e.target.value)} />
      </div>

      <div style={{ margin: '10px 0' }}>
        Showing {filteredEvents.length} of {events.length} events
      </div>

      {/* Events List */}
      <div className="events-grid">
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign:'center', padding:'50px', color:'#888' }}>
            <i className="fas fa-calendar-times" style={{ fontSize:'3rem', marginBottom:'20px' }}></i>
            <p>No events found</p>
          </div>
        ) : filteredEvents.map(event => {
          const past = isEventPast(event.date)
          const full = isEventFull(event)
          const registered = rsvpedEvents.includes(event.id)
          const loadingBtn = rsvpLoading[event.id]

          return (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>{event.date} • {event.time} • {event.location}</p>
              <p>Organizer: {event.organizer}</p>
              <p>Registered: {event.registered} / {event.capacity}</p>

              <div className="event-actions">
                {past ? <button disabled>Event Ended</button> :
                 registered ? <button disabled={loadingBtn} onClick={() => handleCancelRSVP(event.id)}>{loadingBtn ? 'Cancelling...' : 'Cancel RSVP'}</button> :
                 <button disabled={full || loadingBtn} onClick={() => handleRSVP(event.id)}>{loadingBtn ? 'Processing...' : full ? 'Event Full' : 'RSVP'}</button>}
              </div>
            </div>
          )
        })}
      </div>

      <Link href="/messaging" className="fab">
        <i className="fas fa-comment"></i>
      </Link>
    </div>
  )
}
