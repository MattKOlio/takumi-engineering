import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail,
  HiOutlineClock, HiArrowRight
} from 'react-icons/hi'
import { fadeUp, slideLeft, slideRight, viewportConfig } from '../utils/animations'

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('sending')
    emailjs.send(
      'service_9qmoljt',
      'template_c5h9hgj',
      {
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    form.message,
      },
      'OzxcOfyDGV8a2Ldck'
    )
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }

  const infoItems = [
    { icon: HiOutlineLocationMarker, label: t('contact.address_label'), value: t('contact.address') },
    { icon: HiOutlinePhone,          label: t('contact.phone_label'),   value: t('contact.phone') },
    { icon: HiOutlineMail,           label: t('contact.email_label'),   value: t('contact.email') },
    { icon: HiOutlineClock,          label: t('contact.hours_label'),   value: t('contact.hours') },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="contact__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-label">{t('contact.label')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="contact__grid">
          {/* Info panel */}
          <motion.div
            className="contact__info"
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {infoItems.map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="contact__info-item">
                <div className="contact__info-icon"><Icon size={20} /></div>
                <div>
                  <div className="contact__info-label">{label}</div>
                  <div className="contact__info-value" style={{ whiteSpace: 'pre-line' }}>{value}</div>
                </div>
              </div>
            ))}

            {/* Blue accent block */}
            <div className="contact__accent">
              <p className="contact__accent-text">
                Ready to start your next project? Let's discuss how Takumi Engineering can bring your vision to life.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact__form-wrap"
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {status === 'success' ? (
              <motion.div
                className="contact__success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="contact__success-icon">✓</span>
                <p>{t('contact.form_success')}</p>
              </motion.div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">{t('contact.form_name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">{t('contact.form_email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="subject">{t('contact.form_subject')}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="message">{t('contact.form_message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                {status === 'error' && (
                  <p className="contact__error">{t('contact.form_error')}</p>
                )}
                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? t('contact.form_sending') : t('contact.form_submit')}
                  {status !== 'sending' && <HiArrowRight />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
