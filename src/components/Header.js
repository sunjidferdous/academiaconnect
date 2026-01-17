'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  // hooks always at the top
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
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
  }, [router])

  // conditional rendering
  if (pathname === '/login' || pathname === '/signup') return null

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/dashboard" className="logo">
          <i className="fas fa-graduation-cap" style={{ fontSize: '2rem', color: 'var(--accent-yellow)' }}></i>
          <h1>Academia<span>Connect</span></h1>
        </Link>

        <ul className="nav">
          <li>
            <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
              <i className="fas fa-home"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/notice-board" className={pathname === '/notice-board' ? 'active' : ''}>
              <i className="fas fa-bullhorn"></i> Notice Board
            </Link>
          </li>
          <li>
            <Link href="/events" className={pathname === '/events' ? 'active' : ''}>
              <i className="fas fa-calendar-alt"></i> Events
            </Link>
          </li>
          <li>
            <Link href="/clubs" className={pathname === '/clubs' ? 'active' : ''}>
              <i className="fas fa-users"></i> Clubs
            </Link>
          </li>
          <li>
            <Link href="/courses" className={pathname === '/courses' ? 'active' : ''}>
              <i className="fas fa-book"></i> Courses
            </Link>
          </li>
          <li>
            <Link href="/messaging" className={pathname === '/messaging' ? 'active' : ''}>
              <i className="fas fa-comments"></i> Messages
            </Link>
          </li>
          <li>
            <Link href="/profile" className={pathname === '/profile' ? 'active' : ''}>
              <i className="fas fa-user"></i> Profile
            </Link>
          </li>
          <li>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
