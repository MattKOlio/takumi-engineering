import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineSun, HiOutlineMoon, HiMenu, HiX } from 'react-icons/hi'
import { setLanguage } from '../i18n/index'
import TakumiLogo from './TakumiLogo'

const LANGS = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'sr', label: 'SR', full: 'Srpski' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
]

const NAV_KEYS = ['home', 'about', 'services', 'projects', 'references', 'contact']
const NAV_HREFS = ['#home', '#about', '#services', '#projects', '#references', '#contact']

export default function Navbar({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const [active, setActive]       = useState('home')
  const langRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_KEYS.map(k => document.getElementById(k)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.3 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const isTransparent = !scrolled && !menuOpen
  const logoTheme = isTransparent ? 'light' : theme
  const forceWhite = isTransparent

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}>
          <TakumiLogo theme={logoTheme} size="sm" forceWhite={forceWhite} />
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_KEYS.map((key, i) => (
            <a
              key={key}
              href={NAV_HREFS[i]}
              className={`navbar__link ${active === key ? 'navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); scrollTo(NAV_HREFS[i]) }}
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="navbar__controls">
          {/* Language switcher */}
          <div className="lang-switcher" ref={langRef}>
            <button
              className="lang-switcher__toggle"
              onClick={() => setLangOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              {LANGS.find(l => l.code === i18n.language)?.label || 'EN'}
              <span className={`lang-switcher__arrow ${langOpen ? 'lang-switcher__arrow--open' : ''}`}>▾</span>
            </button>
            {langOpen && (
              <ul className="lang-switcher__dropdown" role="listbox">
                {LANGS.map(({ code, label, full }) => (
                  <li
                    key={code}
                    role="option"
                    aria-selected={i18n.language === code}
                    className={`lang-switcher__option ${i18n.language === code ? 'lang-switcher__option--active' : ''}`}
                    onClick={() => { setLanguage(code); setLangOpen(false) }}
                  >
                    <span className="lang-switcher__code">{label}</span>
                    <span className="lang-switcher__full">{full}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {NAV_KEYS.map((key, i) => (
          <a
            key={key}
            href={NAV_HREFS[i]}
            className={`navbar__mobile-link ${active === key ? 'navbar__mobile-link--active' : ''}`}
            onClick={(e) => { e.preventDefault(); scrollTo(NAV_HREFS[i]) }}
          >
            {t(`nav.${key}`)}
          </a>
        ))}
        <div className="navbar__mobile-langs">
          {LANGS.map(({ code, label, full }) => (
            <button
              key={code}
              className={`navbar__mobile-lang ${i18n.language === code ? 'navbar__mobile-lang--active' : ''}`}
              onClick={() => { setLanguage(code); setMenuOpen(false) }}
            >
              {label} · {full}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
