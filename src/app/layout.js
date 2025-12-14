import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export const metadata = {
  title: 'AcademiaConnect - University Hub',
  description: 'Your university hub for activities, clubs, events, and connections',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}