import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Milk, Plus, Ruler, Sparkles } from 'lucide-react'
import Illustration from '../components/Illustration'
import { categories, menu } from '../data/mock'
import { rub } from '../lib/format'
import { useCart } from '../store/cart'
import type { CategoryId, MenuItem } from '../types'

const badgeStyle: Record<NonNullable<MenuItem['badge']>, string> = {
  Хит: 'bg-coffee-800 text-cream-50',
  Новинка: 'bg-sage-500 text-white',
  Сезон: 'bg-terra-500 text-white',
  Веган: 'bg-cream-50 text-sage-600',
}

function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  const { pick } = useCart()
  return (
    <article
      className="group flex animate-fade-up flex-col overflow-hidden rounded-[28px] border border-coffee-800/[0.06] bg-cream-50 shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative grid aspect-[1/0.86] place-items-center overflow-hidden" style={{ background: item.palette.bg }}>
        <div className="grain absolute inset-0 opacity-40" />
        <Illustration
          kind={item.kind}
          palette={item.palette}
          className="relative w-[76%] transition duration-700 ease-out group-hover:scale-[1.07] group-hover:-rotate-2"
        />
        {item.badge && (
          <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[12px] font-bold shadow-soft ${badgeStyle[item.badge]}`}>
            {item.badge}
          </span>
        )}
        {item.meta && (
          <span className="absolute right-4 bottom-4 rounded-full bg-cream-50/85 px-3 py-1 text-[12px] font-medium text-coffee-600 backdrop-blur">
            {item.meta}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[23px] leading-tight font-semibold text-coffee-900">{item.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-[44px] text-[14px] leading-relaxed text-coffee-400">{item.description}</p>

        <div className="mt-4 flex min-h-[26px] flex-wrap gap-1.5">
          {item.sizes && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-2.5 py-1 text-[12px] font-medium text-coffee-600">
              <Ruler className="size-3.5" />
              {item.sizes.map((s) => s.label).join(' · ')}
            </span>
          )}
          {item.milk && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-200/80 px-2.5 py-1 text-[12px] font-medium text-coffee-600">
              <Milk className="size-3.5" />
              молоко на выбор
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-[20px] font-bold text-coffee-900 tabular-nums">
            {item.sizes && item.sizes.length > 1 && <span className="mr-1 text-[13px] font-medium text-coffee-400">от</span>}
            {rub(item.price)}
          </span>
          <button
            onClick={() => pick(item)}
            className="flex items-center gap-2 rounded-full bg-coffee-800 py-2.5 pr-2.5 pl-5 text-[14px] font-semibold text-cream-50 transition duration-300 hover:bg-terra-500 hover:shadow-glow active:scale-95"
          >
            В корзину
            <span className="grid size-7 place-items-center rounded-full bg-cream-50/15">
              <Plus className="size-4" />
            </span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Menu() {
  const [params, setParams] = useSearchParams()
  const active = (categories.find((c) => c.id === params.get('cat'))?.id ?? 'coffee') as CategoryId
  const cat = categories.find((c) => c.id === active)!
  const items = useMemo(() => menu.filter((m) => m.category === active), [active])

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute -top-40 left-1/4 size-[600px] rounded-full bg-terra-100/70 blur-[120px]" />
        <div className="absolute -top-20 right-0 size-[500px] rounded-full bg-cream-300/60 blur-[120px]" />
      </div>

      <section className="container-x relative pt-12 pb-10 lg:pt-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow">Меню навынос</span>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-medium tracking-tight text-coffee-900 sm:text-7xl">
              Что вам <em className="text-terra-500 italic">сегодня</em>?
            </h1>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-coffee-800/[0.07] bg-white/50 p-4 pr-6 backdrop-blur">
            <span className="grid size-12 place-items-center rounded-2xl bg-terra-500 text-white shadow-glow">
              <Sparkles className="size-6" />
            </span>
            <div>
              <p className="font-semibold text-coffee-900">Готовим к нужному времени</p>
              <p className="text-[14px] text-coffee-400">Выберите слот при оформлении заказа</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[76px] z-30 border-y border-coffee-800/[0.06] bg-cream-100/85 backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <div role="tablist" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1">
            {categories.map((c) => {
              const on = c.id === active
              const count = menu.filter((m) => m.category === c.id).length
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setParams({ cat: c.id }, { replace: true })}
                  className={`flex shrink-0 items-center gap-2.5 rounded-full py-2.5 pr-3 pl-4 text-[15px] font-semibold transition duration-300 ${
                    on ? 'bg-coffee-800 text-cream-50 shadow-lift' : 'bg-white/60 text-coffee-600 hover:bg-white hover:text-coffee-900'
                  }`}
                >
                  <span className="text-lg">{c.emoji}</span>
                  {c.label}
                  <span className={`rounded-full px-2 py-0.5 text-[12px] tabular-nums ${on ? 'bg-cream-50/15' : 'bg-cream-200'}`}>{count}</span>
                </button>
              )
            })}
          </div>
          <p className="hidden text-[14px] text-coffee-400 lg:block">{cat.hint}</p>
        </div>
      </div>

      <section className="container-x pt-10">
        <div key={active} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
