import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { BRAND, shops } from '../data/mock'

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-coffee-900 text-cream-200">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 -right-20 size-[480px] rounded-full bg-terra-500/20 blur-[120px]" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo light />
          <p className="mt-5 text-[15px] leading-relaxed text-cream-200/70">
            Обжариваем зерно сами, печём каждое утро и готовим заказ к вашему приходу.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
            <span className="rounded-full border border-cream-50/10 px-3 py-1.5">☕ Specialty</span>
            <span className="rounded-full border border-cream-50/10 px-3 py-1.5">🥐 Своя пекарня</span>
            <span className="rounded-full border border-cream-50/10 px-3 py-1.5">🌱 Растительное молоко</span>
          </div>
        </div>

        <div>
          <h4 className="text-[12px] font-bold tracking-[0.2em] text-cream-50/40 uppercase">Навигация</h4>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li><Link className="transition hover:text-terra-300" to="/">Главная</Link></li>
            <li><Link className="transition hover:text-terra-300" to="/menu">Меню</Link></li>
            <li><Link className="transition hover:text-terra-300" to="/checkout">Оформить заказ</Link></li>
            <li><Link className="transition hover:text-terra-300" to="/admin">Для бариста</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] font-bold tracking-[0.2em] text-cream-50/40 uppercase">Кофейни</h4>
          <ul className="mt-5 space-y-3 text-[15px]">
            {shops.map((s) => (
              <li key={s.id} className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-terra-400" />
                <span>{s.address}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[12px] font-bold tracking-[0.2em] text-cream-50/40 uppercase">Связь</h4>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li className="flex gap-2.5"><Phone className="mt-0.5 size-4 text-terra-400" />{BRAND.phone}</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 size-4 text-terra-400" />{BRAND.email}</li>
            <li className="flex gap-2.5"><Clock className="mt-0.5 size-4 text-terra-400" />Ежедневно с 07:00</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-cream-50/[0.08]">
        <div className="container-x flex flex-col gap-2 py-6 text-[12px] text-cream-50/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Кофейня «Зерно». Название и данные выдуманы.</span>
          <span>Демо-проект</span>
        </div>
      </div>
    </footer>
  )
}
