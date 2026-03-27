import React from 'react'

const MARK_COLORS = {
  light: { primary: '#073777', gray: '#949599' },
  dark:  { primary: '#ffffff', gray: '#959595' },
}

export default function TakumiLogo({ theme = 'light', size = 'md', forceWhite = false }) {
  const colors = forceWhite
    ? { primary: '#ffffff', gray: 'rgba(255,255,255,0.65)' }
    : MARK_COLORS[theme] || MARK_COLORS.light

  const sizes = {
    sm: { markH: 32, gap: 10, nameSize: 18, subSize: 9 },
    md: { markH: 42, gap: 13, nameSize: 22, subSize: 11 },
    lg: { markH: 60, gap: 18, nameSize: 32, subSize: 15 },
    xl: { markH: 90, gap: 24, nameSize: 46, subSize: 22 },
  }
  const { markH, gap, nameSize, subSize } = sizes[size] || sizes.md
  const markW = markH * (165 / 160)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, userSelect: 'none' }}>
      {/* Logo Mark — TE monogram */}
      <svg
        width={markW}
        height={markH}
        viewBox="0 0 165 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top horizontal bar (T crossbar + E top arm) */}
        <rect x="0" y="0" width="160" height="24" fill={colors.primary} />
        {/* Left vertical bar (T stem + E spine) */}
        <rect x="0" y="0" width="24" height="160" fill={colors.primary} />
        {/* E middle arm */}
        <rect x="40" y="64" width="120" height="24" fill={colors.gray} />
        {/* E bottom arm */}
        <rect x="40" y="120" width="120" height="24" fill={colors.gray} />
      </svg>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: nameSize,
            letterSpacing: '0.12em',
            color: forceWhite ? '#ffffff' : colors.primary,
            textTransform: 'uppercase',
          }}
        >
          TAKUMI
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: subSize,
            letterSpacing: '0.26em',
            color: forceWhite ? 'rgba(255,255,255,0.7)' : colors.gray,
            textTransform: 'uppercase',
            marginTop: 3,
          }}
        >
          Engineering
        </span>
      </div>
    </div>
  )
}
