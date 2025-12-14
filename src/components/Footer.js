'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  
  // Don't show footer on auth pages or messaging
  if (pathname === '/login' || pathname === '/signup' || pathname === '/messaging') {
    return null
  }
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>AcademiaConnect</h3>
          <p>Your university's hub for activities, clubs, events, and connections.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/notice-board">Notice Board</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/clubs">Clubs</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><Link href="/help">Help Center</Link></li>
            <li><Link href="/directory">University Directory</Link></li>
            <li><Link href="/calendar">Academic Calendar</Link></li>
            <li><Link href="/handbook">Student Handbook</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li><Link href="mailto:support@academiaconnect.edu">support@academiaconnect.edu</Link></li>
            <li><Link href="tel:8001234567">(800) 123-4567</Link></li>
            <li><span>Campus Building A, Room 101</span></li>
          </ul>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p>&copy; 2024 AcademiaConnect. All rights reserved.</p>
      </div>
    </footer>
  )
}