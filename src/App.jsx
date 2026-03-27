import React from 'react'
import './App.css'
import './styles/components.css'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import SocialSidebar from './components/SocialSidebar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import References from './components/References'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app" data-theme={theme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <SocialSidebar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <References />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
