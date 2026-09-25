import { useId, type CSSProperties } from 'react'

/** Декоративное кофейное зерно */
export function Bean({ className, style }: { className?: string; style?: CSSProperties }) {
  const id = 'b' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 40 56" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={id} cx=".3" cy=".25" r=".8">
          <stop offset="0" stopColor="#a8866d" stopOpacity=".7" />
          <stop offset="1" stopColor="#241812" stopOpacity=".2" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="#5a3e2e" />
      <ellipse cx="20" cy="28" rx="17" ry="25" fill={`url(#${id})`} />
      <path d="M13 6 C24 18 14 36 26 50" stroke="#2a1b14" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
