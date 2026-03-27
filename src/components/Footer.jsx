import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaLinkedinIn, FaInstagram, FaTelegramPlane, FaWhatsapp, FaViber } from 'react-icons/fa'
import TakumiLogo from './TakumiLogo'

const socials = [
  { icon: FaLinkedinIn,    label: 'LinkedIn',  href: '#' },
  { icon: FaInstagram,     label: 'Instagram', href: '#' },
  { icon: FaTelegramPlane, label: 'Telegram',  href: '#' },
  { icon: FaWhatsapp,      label: 'WhatsApp',  href: '#' },
  { icon: FaViber,         label: 'Viber',     href: '#' },
]

const NAV_KEYS = ['home', 'about', 'services', 'projects', 'references', 'contact']
const NAV_HREFS = ['#home', '#about', '#services', '#projects', '#references', '#contact']

export default function Footer() {
  const { t } = useTranslation()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <TakumiLogo size="md" forceWhite={true} />
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <div className="footer__socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="footer__social" target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h5 className="footer__col-title">{t('footer.quick_links')}</h5>
          <ul className="footer__links">
            {NAV_KEYS.map((key, i) => (
              <li key={key}>
                <a
                  href={NAV_HREFS[i]}
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(NAV_HREFS[i]) }}
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h5 className="footer__col-title">{t('footer.contact_info')}</h5>
          <ul className="footer__links footer__links--contact">
            <li>{t('contact.address').split('\n')[0]}</li>
            <li>{t('contact.address').split('\n')[1]}</li>
            <li>
              <a href={`tel:${t('contact.phone').replace(/\s/g,'')}`} className="footer__link">
                {t('contact.phone')}
              </a>
            </li>
            <li>
              <a href={`mailto:${t('contact.email')}`} className="footer__link">
                {t('contact.email')}
              </a>
            </li>
            <li>{t('contact.hours')}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__copyright">{t('footer.copyright')}</p>
        <p className="footer__made">Crafted with precision.</p>
      </div>
    </footer>
  )
}
