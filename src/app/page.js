'use client' // This makes it a Client Component (needed for useEffect and useRouter)

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Automatically redirect to signup page when someone visits the home page
    router.push('/signup')
  }, [router])
  
  // Return null because we're redirecting immediately
  return null
}