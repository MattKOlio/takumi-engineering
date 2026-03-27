import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiOutlineStar } from 'react-icons/hi'
import { fadeUp, staggerContainer, viewportConfig, scaleUp } from '../utils/animations'

export default function References() {
  const { t } = useTranslation()
  const testimonials = t('references.testimonials', { returnObjects: true })
  const clients = t('references.clients', { returnObjects: true })

  return (
    <section id="references" className="section section--alt references">
      <div className="container">
        <motion.div
          className="references__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-label">{t('references.label')}</span>
          <h2 className="section-title">{t('references.title')}</h2>
          <p className="section-subtitle">{t('references.subtitle')}</p>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="testimonials"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {testimonials.map((t_, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              {/* Stars */}
              <div className="testimonial-card__stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <HiOutlineStar key={j} size={16} className="testimonial-card__star" />
                ))}
              </div>

              <blockquote className="testimonial-card__quote">
                "{t_.quote}"
              </blockquote>

              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  {t_.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="testimonial-card__name">{t_.name}</div>
                  <div className="testimonial-card__role">
                    {t_.title} · {t_.company}
                  </div>
                  <div className="testimonial-card__location">{t_.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Client logos */}
        <motion.div
          className="clients"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h4 className="clients__title">{t('references.clients_title')}</h4>
          <motion.div
            className="clients__logos"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {clients.map((name, i) => (
              <motion.div
                key={i}
                className="client-logo"
                variants={scaleUp}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
              >
                <span className="client-logo__name">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
