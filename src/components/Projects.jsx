import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiOutlineLocationMarker, HiOutlineCalendar, HiX } from 'react-icons/hi'
import { fadeUp, staggerContainer, viewportConfig } from '../utils/animations'

const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1467533003447-e295ff1b0435?auto=format&fit=crop&w=800&q=80',
]

const PROJECT_IMAGES_LARGE = PROJECT_IMAGES.map(url =>
  url.replace('w=800', 'w=1400')
)

function ProjectModal({ project, image, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="project-modal__backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal__close" onClick={onClose} aria-label="Close">
          <HiX size={20} />
        </button>

        <div className="project-modal__img-wrap">
          <img
            src={image}
            alt={project.title}
            className="project-modal__img"
          />
          <span className="project-modal__category">{project.category}</span>
        </div>

        <div className="project-modal__body">
          <h3 className="project-modal__title">{project.title}</h3>
          <p className="project-modal__desc">{project.desc}</p>
          <div className="project-modal__meta">
            <span><HiOutlineLocationMarker size={14} /> {project.location}</span>
            <span><HiOutlineCalendar size={14} /> {project.year}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const [activeFilter, setActiveFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const categories = ['all', ...new Set(items.map(p => p.category))]

  const filtered = activeFilter === 'all'
    ? items
    : items.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="projects__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="section-label">{t('projects.label')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-subtitle">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="projects__filters"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`projects__filter ${activeFilter === cat ? 'projects__filter--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'all' ? t('projects.filter_all') : cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects__grid"
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const imgIdx = items.indexOf(project)
              return (
                <motion.article
                  key={project.title}
                  className="project-card project-card--clickable"
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover="hover"
                  onClick={() => setSelected({ project, imgIdx })}
                >
                  <div className="project-card__img-wrap">
                    <img
                      src={PROJECT_IMAGES[imgIdx]}
                      alt={project.title}
                      className="project-card__img"
                      loading="lazy"
                    />
                    <motion.div
                      className="project-card__overlay"
                      variants={{ hover: { opacity: 1 } }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="project-card__desc">{project.desc}</p>
                    </motion.div>
                  </div>

                  <div className="project-card__body">
                    <span className="project-card__category">{project.category}</span>
                    <h3 className="project-card__title">{project.title}</h3>
                    <div className="project-card__meta">
                      <span><HiOutlineLocationMarker size={13} /> {project.location}</span>
                      <span><HiOutlineCalendar size={13} /> {project.year}</span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected.project}
            image={PROJECT_IMAGES_LARGE[selected.imgIdx]}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
