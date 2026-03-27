import React from 'react'
import { FaLinkedinIn, FaInstagram, FaTelegramPlane, FaWhatsapp, FaViber } from 'react-icons/fa'

const socials = [
  { icon: FaLinkedinIn, label: 'LinkedIn',  href: '#', color: '#0077b5' },
  { icon: FaInstagram,  label: 'Instagram', href: '#', color: '#e1306c' },
  { icon: FaTelegramPlane, label: 'Telegram', href: '#', color: '#229ed9' },
  { icon: FaWhatsapp,   label: 'WhatsApp',  href: '#', color: '#25d366' },
  { icon: FaViber,      label: 'Viber',     href: '#', color: '#7360f2' },
]

export default function SocialSidebar() {
  return (
    <aside className="social-sidebar" aria-label="Social media links">
      <div className="social-sidebar__line" />
      {socials.map(({ icon: Icon, label, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-sidebar__item"
          aria-label={label}
          data-label={label}
          style={{ '--social-color': color }}
        >
          <Icon />
        </a>
      ))}
      <div className="social-sidebar__line" />
    </aside>
  )
}
