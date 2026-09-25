import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../store/cart'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/menu', label: 'Меню' },
  { to: '/', label: 'Кофейни', scrollTo: 'shops' },
  { to: '/checkout', label: 'Оформление' },
]

export default function Header() {
  const { count, subtotal, open } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const { pathname } = useLocation()
  const [bump, setBump] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobile(false), [pathname])

  useEffect(() => {
    if (!count) return
    setBump(true)
    const t = window.setTimeout(() => setBump(false), 350)
    return () => window.clearTimeout(t)
  }, [count])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-coffee-800/[0.07] bg-cream-100/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-coffee-800/[0.07] bg-white/50 p-1 backdrop-blur md:flex">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              state={l.scrollTo ? { scrollTo: l.scrollTo } : undefined}
              end
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[14px] font-medium transition ${
                  isActive && !l.scrollTo ? 'bg-coffee-800 text-cream-50 shadow-soft' : 'text-coffee-600 hover:bg-white hover:text-coffee-900'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className={`group flex items-center gap-3 rounded-full bg-coffee-800 py-2 pr-2 pl-4 text-cream-50 transition hover:bg-coffee-900 hover:shadow-lift ${bump ? 'scale-105' : ''}`}
            aria-label="Открыть корзину"
          >
            <span className="hidden text-[14px] font-semibold tabular-nums sm:inline">
              {count ? `${new Intl.NumberFormat('ru-RU').format(subtotal)} ₽` : 'Корзина'}
            </span>
            <span className="relative grid size-9 place-items-center rounded-full bg-cream-50/10 transition group-hover:bg-terra-500">
              <ShoppingBag className="size-[18px]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-terra-500 px-1 text-[11px] leading-5 font-bold ring-2 ring-coffee-800">
                  {count}
                </span>
              )}
            </span>
          </button>
          <button
            className="grid size-11 place-items-center rounded-full border border-coffee-800/10 bg-white/60 md:hidden"
            onClick={() => setMobile((v) => !v)}
            aria-label="Меню навигации"
          >
            {mobile ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="container-x pb-5 md:hidden">
          <nav className="card grid gap-1 p-2">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                state={l.scrollTo ? { scrollTo: l.scrollTo } : undefined}
                className="rounded-2xl px-4 py-3 font-medium text-coffee-700 hover:bg-cream-200"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/admin" className="rounded-2xl px-4 py-3 font-medium text-coffee-400 hover:bg-cream-200">
              Для бариста
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
