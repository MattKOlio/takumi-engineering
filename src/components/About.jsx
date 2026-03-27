import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { fadeUp, slideLeft, slideRight, staggerContainer, viewportConfig } from '../utils/animations'

const ABOUT_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'

const VALUE_ICONS = ['◈', '⬡', '◆']

export default function About() {
  const { t } = useTranslation()
  const values = t('about.values', { returnObjects: true })

  return (
    <section id="about" className="section about">
      <div className="container">
        {/* Header */}
        <motion.div
          className="about__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-label">{t('about.label')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>

        {/* Main grid */}
        <div className="about__grid">
          {/* Text column */}
          <motion.div
            className="about__text"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="about__p">{t('about.p1')}</p>
            <p className="about__p">{t('about.p2')}</p>

            {/* Values */}
            <motion.div
              className="about__values"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              {values.map((v, i) => (
                <motion.div key={i} className="about__value" variants={fadeUp}>
                  <span className="about__value-icon">{VALUE_ICONS[i]}</span>
                  <div>
                    <h4 className="about__value-title">{v.title}</h4>
                    <p className="about__value-text">{v.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="about__visual"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <div className="about__img-wrap">
              <img src={ABOUT_IMG} alt="Takumi Engineering team at work" className="about__img" loading="lazy" />
              <div className="about__img-accent" />
            </div>

            {/* Experience badge */}
            <motion.div
              className="about__badge"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <span className="about__badge-value">15+</span>
              <span className="about__badge-label">Years of<br/>Excellence</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
