import { useEffect, useState } from 'react'
import { Check, Minus, Plus, X } from 'lucide-react'
import { useCart } from '../store/cart'
import { milkOptions } from '../data/mock'
import { buildLine } from '../lib/menu'
import { rub } from '../lib/format'
import Illustration from './Illustration'

export default function ProductModal() {
  const { configuring: item, closeConfig, add } = useCart()
  const [size, setSize] = useState<string>()
  const [milk, setMilk] = useState('cow')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!item) return
    setSize(item.sizes?.[Math.min(1, item.sizes.length - 1)]?.id)
    setMilk('cow')
    setQty(1)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeConfig()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, closeConfig])

  if (!item) return null
  const line = buildLine(item, size, milk, qty)

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-label={item.name}>
      <div onClick={closeConfig} className="absolute inset-0 animate-fade-in bg-coffee-900/50 backdrop-blur-sm" />
      <div className="relative grid max-h-[92vh] w-full max-w-[920px] animate-fade-up overflow-hidden rounded-t-[32px] bg-cream-50 shadow-2xl sm:rounded-[32px] md:grid-cols-[1fr_1.1fr]">
        <button onClick={closeConfig} className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:rotate-90 hover:bg-white" aria-label="Закрыть">
          <X className="size-5" />
        </button>

        <div className="relative hidden place-items-center p-10 md:grid" style={{ background: item.palette.bg }}>
          <div className="grain absolute inset-0 opacity-50" />
          <Illustration kind={item.kind} palette={item.palette} className="relative size-full max-w-[340px] drop-shadow-xl" />
        </div>

        <div className="flex flex-col overflow-y-auto p-6 sm:p-9">
          <div className="flex items-center gap-4 md:block">
            <div className="grid size-20 shrink-0 place-items-center rounded-2xl md:hidden" style={{ background: item.palette.bg }}>
              <Illustration kind={item.kind} palette={item.palette} className="size-18" steam={false} />
            </div>
            <div>
              {item.badge && <span className="eyebrow">{item.badge}</span>}
              <h3 className="mt-1 font-display text-[32px] leading-tight font-semibold text-coffee-900">{item.name}</h3>
            </div>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-coffee-500">{item.description}</p>

          {item.sizes && (
            <fieldset className="mt-7">
              <legend className="text-[13px] font-bold tracking-wide text-coffee-400 uppercase">Объём</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {item.sizes.map((s) => {
                  const active = s.id === size
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        active ? 'border-coffee-800 bg-coffee-800 text-cream-50 shadow-lift' : 'border-coffee-800/10 bg-white hover:border-coffee-800/30'
                      }`}
                    >
                      <span className="block font-semibold">{s.label}</span>
                      <span className={`text-[13px] ${active ? 'text-cream-200/80' : 'text-coffee-400'}`}>
                        {s.volume}
                        {s.delta ? ` · +${s.delta} ₽` : ''}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {item.milk && (
            <fieldset className="mt-6">
              <legend className="text-[13px] font-bold tracking-wide text-coffee-400 uppercase">Молоко</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {milkOptions.map((m) => {
                  const active = m.id === milk
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMilk(m.id)}
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[14px] font-medium transition ${
                        active ? 'border-terra-500 bg-terra-50 text-terra-700' : 'border-coffee-800/10 bg-white text-coffee-600 hover:border-coffee-800/30'
                      }`}
                    >
                      {active && <Check className="size-4" />}
                      {m.label}
                      {m.delta > 0 && <span className="text-coffee-300">+{m.delta}</span>}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-auto flex items-center gap-3 pt-8">
            <div className="flex items-center gap-1 rounded-full bg-cream-200 p-1.5">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-10 place-items-center rounded-full bg-white transition hover:bg-coffee-800 hover:text-white" aria-label="Меньше">
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-lg font-semibold tabular-nums">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid size-10 place-items-center rounded-full bg-white transition hover:bg-coffee-800 hover:text-white" aria-label="Больше">
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(line)
                closeConfig()
              }}
              className="btn-primary flex-1 justify-between py-4 pr-5 pl-6 text-base"
            >
              В корзину <span className="tabular-nums">{rub(line.unitPrice * qty)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
