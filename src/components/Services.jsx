import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineTemplate, HiOutlineCalculator, HiOutlineDocumentText,
  HiOutlineClipboardCheck, HiOutlineLightBulb, HiOutlineCube
} from 'react-icons/hi'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

const ICONS = [
  HiOutlineTemplate,
  HiOutlineCalculator,
  HiOutlineDocumentText,
  HiOutlineClipboardCheck,
  HiOutlineLightBulb,
  HiOutlineCube,
]

export default function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true })

  return (
    <section id="services" className="section section--alt services">
      <div className="container">
        <motion.div
          className="services__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-label">{t('services.label')}</span>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </motion.div>

        <motion.div
          className="services__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {items.map((item, i) => {
            const Icon = ICONS[i] || HiOutlineLightBulb
            return (
              <motion.div
                key={i}
                className="service-card"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="service-card__icon">
                  <Icon size={28} />
                </div>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__text">{item.text}</p>
                <div className="service-card__line" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
