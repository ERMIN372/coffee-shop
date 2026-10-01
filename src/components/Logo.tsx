import { Link } from 'react-router-dom'

export function BeanMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#34231a" />
      <ellipse cx="20" cy="20" rx="8.5" ry="12" transform="rotate(32 20 20)" fill="#c4613a" />
      <path d="M14.5 11.5c5.5 4 5 13 11 17" stroke="#34231a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ to = '/', light = false }: { to?: string; light?: boolean }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5" aria-label="Зерно — на главную">
      <BeanMark className="size-9 transition-transform duration-500 group-hover:rotate-[20deg]" />
      <span className={`font-display text-[26px] leading-none font-semibold tracking-tight ${light ? 'text-cream-50' : 'text-coffee-900'}`}>
        Зерно
      </span>
    </Link>
  )
}
