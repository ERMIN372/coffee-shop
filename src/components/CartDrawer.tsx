import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../store/cart'
import { getItem } from '../lib/menu'
import { plural, rub } from '../lib/format'
import Illustration from './Illustration'

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count, clear } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-coffee-900/40 backdrop-blur-[2px] transition-opacity duration-400 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-label="Корзина"
        className={`absolute top-0 right-0 flex h-full w-full max-w-[480px] flex-col bg-cream-100 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:rounded-l-[32px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 sm:px-8">
          <div>
            <h2 className="font-display text-3xl font-semibold text-coffee-900">Ваш заказ</h2>
            <p className="mt-1 text-[14px] text-coffee-400">
              {count ? `${count} ${plural(count, ['позиция', 'позиции', 'позиций'])} · навынос` : 'Пока пусто'}
            </p>
          </div>
          <button onClick={close} className="grid size-11 place-items-center rounded-full bg-white/70 transition hover:rotate-90 hover:bg-white" aria-label="Закрыть корзину">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="grid size-28 place-items-center rounded-full bg-cream-200 text-5xl">☕</div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-coffee-900">В корзине пока пусто</h3>
            <p className="mt-2 max-w-xs text-[15px] text-coffee-400">Загляните в меню: там капучино, круассаны и сырники весь день.</p>
            <Link to="/menu" onClick={close} className="btn-primary mt-8">
              Открыть меню <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-2 sm:px-6">
              {lines.map((l) => {
                const item = getItem(l.itemId)
                return (
                  <li key={l.key} className="group flex gap-4 rounded-3xl bg-cream-50 p-3 shadow-soft transition hover:shadow-lift">
                    {item && (
                      <div className="grid size-[84px] shrink-0 place-items-center rounded-2xl" style={{ background: item.palette.bg }}>
                        <Illustration kind={item.kind} palette={item.palette} steam={false} className="size-[76px]" />
                      </div>
                    )}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-coffee-900">{l.name}</p>
                          <p className="mt-0.5 truncate text-[13px] text-coffee-400">
                            {[l.sizeLabel, l.milkLabel].filter(Boolean).join(' · ') || 'Стандартная порция'}
                          </p>
                        </div>
                        <button
                          onClick={() => remove(l.key)}
                          className="grid size-8 shrink-0 place-items-center rounded-full text-coffee-300 transition hover:bg-terra-50 hover:text-terra-500"
                          aria-label="Удалить"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full bg-cream-200/70 p-1">
                          <button onClick={() => setQty(l.key, l.qty - 1)} className="grid size-7 place-items-center rounded-full bg-white transition hover:bg-coffee-800 hover:text-white" aria-label="Меньше">
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-[14px] font-semibold tabular-nums">{l.qty}</span>
                          <button onClick={() => setQty(l.key, l.qty + 1)} className="grid size-7 place-items-center rounded-full bg-white transition hover:bg-coffee-800 hover:text-white" aria-label="Больше">
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-semibold text-coffee-900 tabular-nums">{rub(l.unitPrice * l.qty)}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
              <li className="flex justify-center pt-1">
                <button onClick={clear} className="text-[13px] text-coffee-300 underline-offset-4 transition hover:text-terra-500 hover:underline">
                  Очистить корзину
                </button>
              </li>
            </ul>

            <div className="border-t border-coffee-800/[0.07] bg-cream-50/80 px-6 pt-5 pb-6 backdrop-blur sm:px-8">
              <div className="flex items-center gap-3 rounded-2xl bg-terra-50 px-4 py-3 text-[13px] text-terra-700">
                <ShoppingBag className="size-4 shrink-0" />
                Промокод <b className="font-bold">ZERNO10</b> даст −10% при оформлении
              </div>
              <div className="mt-5 flex items-end justify-between">
                <span className="text-coffee-400">Итого</span>
                <span className="font-display text-3xl font-semibold text-coffee-900 tabular-nums">{rub(subtotal)}</span>
              </div>
              <button
                onClick={() => {
                  close()
                  navigate('/checkout')
                }}
                className="btn-primary mt-5 w-full py-4 text-base"
              >
                Оформить заказ <ArrowRight className="size-4" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
