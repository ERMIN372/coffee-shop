import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, ChefHat, ClipboardCheck, Coffee, MapPin, Phone, ShoppingBag } from 'lucide-react'
import { paymentMethods, shops } from '../data/mock'
import { rub, time } from '../lib/format'
import { STATUS_FLOW, useOrders } from '../store/orders'
import type { OrderStatus } from '../types'

const steps: { id: OrderStatus; label: string; icon: typeof Check }[] = [
  { id: 'new', label: 'Принят', icon: ClipboardCheck },
  { id: 'preparing', label: 'Готовится', icon: ChefHat },
  { id: 'ready', label: 'Готов', icon: Coffee },
  { id: 'done', label: 'Выдан', icon: ShoppingBag },
]

const useNow = (ms = 1000) => {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), ms)
    return () => window.clearInterval(t)
  }, [ms])
  return now
}

export default function OrderSuccess() {
  const { id } = useParams()
  const { orders, setStatus } = useOrders()
  const order = orders.find((o) => String(o.id) === id)
  const now = useNow()

  // имитация работы бариста: через 15 секунд заказ «уходит в работу», к таймеру — готов
  const status = order?.status
  const leftMs = order ? order.readyAt - now : 0
  const elapsed = order ? now - order.createdAt : 0
  useEffect(() => {
    if (!order) return
    if (status === 'new' && elapsed > 15000) setStatus(order.id, 'preparing')
    if (status === 'preparing' && leftMs <= 0) setStatus(order.id, 'ready')
  }, [order, status, elapsed, leftMs, setStatus])

  if (!order) {
    return (
      <div className="container-x py-24">
        <div className="card mx-auto max-w-lg p-12 text-center">
          <div className="text-5xl">🔍</div>
          <h1 className="mt-5 font-display text-3xl font-semibold text-coffee-900">Заказ не найден</h1>
          <p className="mt-3 text-coffee-500">Возможно, демо-данные были сброшены.</p>
          <Link to="/menu" className="btn-primary mt-8">
            В меню
          </Link>
        </div>
      </div>
    )
  }

  const shop = shops.find((s) => s.id === order.shopId) ?? shops[0]
  const total = Math.max(1, order.readyAt - order.createdAt)
  const left = Math.max(0, leftMs)
  const progress = order.status === 'ready' || order.status === 'done' ? 1 : Math.min(1, 1 - left / total)
  const mm = String(Math.floor(left / 60000)).padStart(2, '0')
  const ss = String(Math.floor((left % 60000) / 1000)).padStart(2, '0')
  const R = 104
  const C = 2 * Math.PI * R
  const current = STATUS_FLOW.indexOf(order.status)
  const isReady = order.status === 'ready' || order.status === 'done'
  const longWait = left > 60 * 60000

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
        <div className="absolute -top-40 left-1/3 size-[640px] rounded-full bg-sage-100 blur-[120px]" />
        <div className="absolute top-0 right-0 size-[480px] rounded-full bg-terra-100/70 blur-[120px]" />
      </div>

      <div className="container-x relative pt-12 lg:pt-16">
        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
          {/* Статус и таймер */}
          <section className="card relative overflow-hidden p-8 sm:p-12">
            <div className="grain absolute inset-0 opacity-40" />
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="grid size-14 animate-pop place-items-center rounded-full bg-sage-500 text-white shadow-[0_12px_30px_-10px_rgba(111,133,96,.8)]">
                  <Check className="size-7" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-sage-600">
                    {order.payment === 'cash' ? 'Заказ принят · оплата при получении' : 'Оплата прошла · заказ принят'}
                  </p>
                  <p className="text-[14px] text-coffee-400">Отправили СМС на {order.phone}</p>
                </div>
              </div>

              <h1 className="mt-8 font-display text-5xl leading-[1.05] font-medium tracking-tight text-coffee-900 sm:text-6xl">
                Спасибо, {order.customer}!
                <br />
                Заказ <span className="text-terra-500">№{order.id}</span>
              </h1>

              <div className="mt-10 grid items-center gap-10 md:grid-cols-[auto_1fr]">
                <div className="relative mx-auto size-[248px]">
                  <svg viewBox="0 0 240 240" className="size-full -rotate-90">
                    <circle cx="120" cy="120" r={R} fill="none" stroke="#eadbc4" strokeWidth="14" />
                    <circle
                      cx="120"
                      cy="120"
                      r={R}
                      fill="none"
                      stroke={isReady ? '#6f8560' : '#c4613a'}
                      strokeWidth="14"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={C * (1 - progress)}
                      className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      {isReady ? (
                        <>
                          <div className="text-5xl">☕</div>
                          <p className="mt-2 font-display text-2xl font-semibold text-sage-600">Готово!</p>
                        </>
                      ) : (
                        <>
                          <p className="text-[12px] font-bold tracking-[0.2em] text-coffee-400 uppercase">до готовности</p>
                          <p className="mt-1 font-display text-[56px] leading-none font-semibold text-coffee-900 tabular-nums">
                            {longWait ? time(order.readyAt) : `${mm}:${ss}`}
                          </p>
                          <p className="mt-2 text-[13px] text-coffee-400">{longWait ? 'время выдачи' : 'мин : сек'}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[15px] text-coffee-500">
                    {isReady ? 'Заказ ждёт вас на полке выдачи' : 'Будет готов к'}
                  </p>
                  <p className="font-display text-4xl font-semibold text-coffee-900">{time(order.readyAt)}</p>
                  <ol className="mt-8 space-y-0">
                    {steps.map((s, i) => {
                      const done = i < current || (i === current && s.id === 'done')
                      const active = i === current && s.id !== 'done'
                      const Icon = s.icon
                      return (
                        <li key={s.id} className="relative flex items-center gap-4 pb-5 last:pb-0">
                          {i < steps.length - 1 && (
                            <span className={`absolute top-10 left-5 h-[calc(100%-30px)] w-0.5 -translate-x-1/2 ${i < current ? 'bg-sage-500' : 'bg-cream-300'}`} />
                          )}
                          <span
                            className={`relative grid size-10 shrink-0 place-items-center rounded-full transition duration-500 ${
                              done ? 'bg-sage-500 text-white' : active ? 'bg-terra-500 text-white shadow-glow' : 'bg-cream-200 text-coffee-300'
                            }`}
                          >
                            {active && <span className="absolute inset-0 animate-ping rounded-full bg-terra-400 opacity-30" />}
                            {done ? <Check className="size-5" strokeWidth={3} /> : <Icon className="size-5" />}
                          </span>
                          <span className={`font-semibold ${done || active ? 'text-coffee-900' : 'text-coffee-300'}`}>{s.label}</span>
                          {active && <span className="text-[13px] text-terra-500">сейчас</span>}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Чек */}
          <aside className="space-y-6">
            <div className="card p-7 sm:p-8">
              <p className="eyebrow">Где забрать</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-coffee-900">{shop.name}</h2>
              <p className="mt-3 flex items-center gap-2 text-coffee-600">
                <MapPin className="size-4 text-terra-500" /> {shop.address}
              </p>
              <p className="mt-2 flex items-center gap-2 text-coffee-600">
                <Phone className="size-4 text-terra-500" /> {shop.phone}
              </p>
              <p className="mt-5 rounded-2xl bg-cream-200/70 px-4 py-3 text-[14px] text-coffee-600">
                Назовите бариста номер <b>№{order.id}</b> или имя <b>{order.customer}</b> — заказ будет на полке выдачи.
              </p>
            </div>

            <div className="card relative p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-coffee-900">Чек</h2>
                <span className="text-[13px] text-coffee-400">{time(order.createdAt)}</span>
              </div>
              <ul className="mt-5 space-y-3 border-b border-dashed border-coffee-800/15 pb-5">
                {order.lines.map((l) => (
                  <li key={l.key} className="flex justify-between gap-4 text-[15px]">
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-coffee-800">
                        {l.name} {l.qty > 1 && <span className="text-coffee-400">× {l.qty}</span>}
                      </span>
                      {(l.sizeLabel || l.milkLabel) && (
                        <span className="block truncate text-[12px] text-coffee-400">{[l.sizeLabel, l.milkLabel].filter(Boolean).join(' · ')}</span>
                      )}
                    </span>
                    <span className="shrink-0 tabular-nums">{rub(l.unitPrice * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-2 text-[15px]">
                {order.discount > 0 && (
                  <div className="flex justify-between text-sage-600">
                    <dt>Промокод {order.promo}</dt>
                    <dd className="tabular-nums">−{rub(order.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-coffee-500">
                  <dt>Оплата</dt>
                  <dd>{paymentMethods.find((p) => p.id === order.payment)?.label}</dd>
                </div>
                <div className="flex items-end justify-between pt-2">
                  <dt className="font-semibold text-coffee-900">Итого</dt>
                  <dd className="font-display text-3xl font-semibold text-coffee-900 tabular-nums">{rub(order.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/menu" className="btn-dark flex-1">
                Заказать ещё
              </Link>
              <Link to="/admin" className="btn-ghost flex-1">
                Панель бариста <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
