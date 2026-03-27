import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiArrowDown } from 'react-icons/hi'

const HERO_IMG = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80'

const wordVariant = {
  hidden: { opacity: 0, y: 60, skewY: 4 },
  visible: (i) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { delay: i * 0.18, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.7 + i * 0.15, duration: 0.65, ease: 'easeOut' }
  }),
}

export default function Hero() {
  const { t } = useTranslation()

  const scrollDown = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = [
    { value: t('hero.stat1_value'), label: t('hero.stat1_label') },
    { value: t('hero.stat2_value'), label: t('hero.stat2_label') },
    { value: t('hero.stat3_value'),  label: t('hero.stat3_label') },
    { value: t('hero.stat4_value'), label: t('hero.stat4_label') },
  ]

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <img src={HERO_IMG} alt="" className="hero__img" loading="eager" />
        <div className="hero__overlay" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <motion.span
          className="hero__label"
          variants={fadeUp}
          custom={-1}
          initial="hidden"
          animate="visible"
        >
          {t('hero.label')}
        </motion.span>

        <h1 className="hero__headline">
          <span className="hero__headline-row">
            {t('hero.headline1').split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i * 0.03}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                className="hero__headline-char"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
          <span className="hero__headline-row hero__headline-row--accent">
            {t('hero.headline2').split('').map((char, i) => (
              <motion.span
                key={i}
                custom={0.4 + i * 0.03}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                className="hero__headline-char"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="hero__sub"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          className="hero__ctas"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <a
            href="#projects"
            className="btn btn--primary"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            {t('hero.cta_primary')}
          </a>
          <a
            href="#contact"
            className="btn btn--light"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            {t('hero.cta_secondary')}
          </a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="hero__stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="hero__stats-inner container">
          {stats.map(({ value, label }, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll"
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <HiArrowDown size={22} />
        </motion.span>
      </motion.button>
    </section>
  )
}
