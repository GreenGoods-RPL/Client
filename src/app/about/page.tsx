import AboutNavbar from '@/components/AboutNavbar'
import AboutHeroSection from '@/components/AboutHeroSection'
import AboutFutureSection from '@/components/AboutFutureSection'
import AboutFooter from '@/components/AboutFooter'
import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-teal-600">
      <AboutNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AboutHeroSection />
        <AboutFutureSection />
      </div>
      <AboutFooter />
    </main>
  )
}
