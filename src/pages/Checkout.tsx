import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BadgePercent,
  Check,
  Clock,
  CreditCard,
  Loader2,
  Lock,
  MapPin,
  QrCode,
  Sparkles,
  Wallet,
  X,
  Zap,
} from 'lucide-react'
import Illustration from '../components/Illustration'
import { PROMO_CODES, paymentMethods, shops } from '../data/mock'
import { buildLine, getItem } from '../lib/menu'
import { formatPhone, phoneDigits, rub } from '../lib/format'
import { getSlots, isShopOpen } from '../lib/slots'
import { load, save } from '../lib/storage'
import { useCart } from '../store/cart'
import { useOrders } from '../store/orders'
import type { PaymentMethod } from '../types'

const payIcons: Record<PaymentMethod, typeof CreditCard> = { card: CreditCard, sbp: QrCode, cash: Wallet }

function Step({ n, title, children, aside }: { n: number; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-coffee-900">
          <span className="grid size-9 place-items-center rounded-full bg-coffee-800 font-sans text-[15px] font-bold text-cream-50">{n}</span>
          {title}
        </h2>
        {aside}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function EmptyCheckout() {
  const { add } = useCart()
  const fillDemo = () => {
    const a = getItem('flat-white')
    const b = getItem('croissant')
    const c = getItem('pumpkin-raf')
    if (a) add(buildLine(a, 'm', 'oat', 1))
    if (b) add(buildLine(b, undefined, undefined, 2))
    if (c) add(buildLine(c, 'l', 'cow', 1))
  }
  return (
    <div className="container-x py-24">
      <div className="card mx-auto max-w-xl p-10 text-center sm:p-14">
        <div className="mx-auto grid size-24 place-items-center rounded-full bg-cream-200 text-5xl">🧺</div>
        <h1 className="mt-6 font-display text-4xl font-semibold text-coffee-900">Корзина пуста</h1>
        <p className="mt-3 text-coffee-500">Добавьте что-нибудь из меню, чтобы оформить заказ навынос.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="btn-primary">
            Перейти в меню
          </Link>
          <button onClick={fillDemo} className="btn-ghost">
            <Sparkles className="size-4" /> Заполнить демо-заказом
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const { place } = useOrders()
  const navigate = useNavigate()

  const [shopId, setShopId] = useState<string>(() => load('zerno:shop', shops[0].id))
  const shop = shops.find((s) => s.id === shopId) ?? shops[0]
  const slots = useMemo(() => getSlots(shop), [shop])
  const [slotId, setSlotId] = useState(slots[0].id)
  const [name, setName] = useState(() => load('zerno:name', ''))
  const [phone, setPhone] = useState(() => load('zerno:phone', ''))
  const [comment, setComment] = useState('')
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState<string | null>(null)
  const [promoError, setPromoError] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [processing, setProcessing] = useState(false)

  useEffect(() => save('zerno:shop', shopId), [shopId])
  // при смене кофейни слоты другие — выбираем ближайший
  useEffect(() => setSlotId(slots[0].id), [slots])

  if (lines.length === 0 && !processing) return <EmptyCheckout />

  const slot = slots.find((s) => s.id === slotId) ?? slots[0]
  const pct = promo ? PROMO_CODES[promo] : 0
  const discount = Math.round((subtotal * pct) / 100)
  const total = subtotal - discount

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    if (PROMO_CODES[code]) {
      setPromo(code)
      setPromoError('')
    } else {
      setPromo(null)
      setPromoError('Такого промокода нет. Попробуйте ZERNO10 😉')
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const errs: typeof errors = {}
    if (name.trim().length < 2) errs.name = 'Как к вам обращаться?'
    if (phoneDigits(phone) < 11) errs.phone = 'Нужен номер целиком, чтобы прислать СМС о готовности'
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    save('zerno:name', name.trim())
    save('zerno:phone', phone)
    setProcessing(true)
    // имитация платёжного шлюза
    window.setTimeout(() => {
      const order = place({
        shopId,
        readyAt: slot.ts,
        customer: name.trim(),
        phone,
        lines,
        payment,
        promo: promo ?? undefined,
        comment: comment.trim() || undefined,
      })
      clear()
      navigate(`/order/${order.id}`)
    }, 1600)
  }

  return (
    <div className="container-x pt-10 lg:pt-14">
      <Link to="/menu" className="inline-flex items-center gap-2 text-[14px] font-medium text-coffee-400 transition hover:text-coffee-800">
        <ArrowLeft className="size-4" /> Вернуться в меню
      </Link>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-tight text-coffee-900 sm:text-6xl">Оформление заказа</h1>

      <form onSubmit={submit} className="mt-10 grid items-start gap-8 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-6">
          <Step n={1} title="Кофейня">
            <div className="grid gap-3 md:grid-cols-3">
              {shops.map((s) => {
                const on = s.id === shopId
                const open = isShopOpen(s)
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setShopId(s.id)}
                    className={`relative rounded-3xl border-2 p-5 text-left transition duration-300 ${
                      on ? 'border-terra-500 bg-terra-50/70 shadow-soft' : 'border-coffee-800/[0.07] bg-white/60 hover:border-coffee-800/20'
                    }`}
                  >
                    <span
                      className={`absolute top-4 right-4 grid size-6 place-items-center rounded-full transition ${
                        on ? 'bg-terra-500 text-white' : 'border-2 border-coffee-800/15'
                      }`}
                    >
                      {on && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    <MapPin className={`size-5 ${on ? 'text-terra-500' : 'text-coffee-300'}`} />
                    <p className="mt-3 pr-6 font-semibold text-coffee-900">{s.name}</p>
                    <p className="mt-1 text-[13px] text-coffee-500">{s.address}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-coffee-400">
                      <span className={`size-1.5 rounded-full ${open ? 'bg-sage-500' : 'bg-coffee-300'}`} />
                      {s.hours}
                    </p>
                  </button>
                )
              })}
            </div>
          </Step>

          <Step
            n={2}
            title="Время готовности"
            aside={
              <span className="hidden items-center gap-1.5 text-[13px] text-coffee-400 sm:flex">
                <Clock className="size-4" /> готовим ≈ {shop.prepMinutes} мин
              </span>
            }
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {slots.map((s) => {
                const on = s.id === slot.id
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setSlotId(s.id)}
                    className={`rounded-2xl border px-4 py-3.5 text-left transition duration-300 ${
                      s.asap ? 'col-span-2' : ''
                    } ${
                      on
                        ? 'border-coffee-800 bg-coffee-800 text-cream-50 shadow-lift'
                        : 'border-coffee-800/10 bg-white/70 text-coffee-800 hover:border-coffee-800/30'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      {s.asap && <Zap className={`size-4 ${on ? 'text-terra-300' : 'text-terra-500'}`} />}
                      {s.label}
                    </span>
                    <span className={`text-[13px] ${on ? 'text-cream-200/70' : 'text-coffee-400'}`}>{s.hint}</span>
                  </button>
                )
              })}
            </div>
          </Step>

          <div id="contacts">
            <Step n={3} title="Контакты">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[13px] font-semibold text-coffee-500">Имя для стакана</span>
                  <input
                    className={`input mt-2 ${errors.name ? 'border-terra-400 ring-4 ring-terra-100' : ''}`}
                    placeholder="Например, Алина"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="given-name"
                  />
                  {errors.name && <span className="mt-1.5 block text-[13px] text-terra-600">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="text-[13px] font-semibold text-coffee-500">Телефон</span>
                  <input
                    className={`input mt-2 tabular-nums ${errors.phone ? 'border-terra-400 ring-4 ring-terra-100' : ''}`}
                    placeholder="+7 (000) 000-00-00"
                    inputMode="tel"
                    value={phone}
                    onFocus={() => !phone && setPhone('+7')}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="mt-1.5 block text-[13px] text-terra-600">{errors.phone}</span>}
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[13px] font-semibold text-coffee-500">Комментарий для бариста</span>
                  <input
                    className="input mt-2"
                    placeholder="Погорячее, без крышки, приборы не нужны…"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
              </div>
            </Step>
          </div>

          <Step n={4} title="Оплата">
            <div className="grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((m) => {
                const on = m.id === payment
                const Icon = payIcons[m.id]
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`flex items-start gap-3 rounded-3xl border-2 p-4 text-left transition duration-300 ${
                      on ? 'border-terra-500 bg-terra-50/70' : 'border-coffee-800/[0.07] bg-white/60 hover:border-coffee-800/20'
                    }`}
                  >
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${on ? 'bg-terra-500 text-white' : 'bg-cream-200 text-coffee-600'}`}>
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-coffee-900">{m.label}</span>
                      <span className="text-[12px] leading-snug text-coffee-400">{m.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[13px] text-coffee-400">
              <Lock className="size-3.5" /> Оплата имитируется: это демо, данные карты не запрашиваются и никуда не передаются.
            </p>
          </Step>
        </div>

        {/* Итог */}
        <aside className="lg:sticky lg:top-24">
          <div className="card overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-coffee-900">Ваш заказ</h2>
              <ul className="mt-5 max-h-[280px] space-y-3 overflow-y-auto pr-1">
                {lines.map((l) => {
                  const item = getItem(l.itemId)
                  return (
                    <li key={l.key} className="flex items-center gap-3">
                      {item && (
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl" style={{ background: item.palette.bg }}>
                          <Illustration kind={item.kind} palette={item.palette} steam={false} className="size-12" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-semibold text-coffee-900">
                          {l.name} {l.qty > 1 && <span className="text-coffee-400">× {l.qty}</span>}
                        </span>
                        <span className="block truncate text-[12px] text-coffee-400">
                          {[l.sizeLabel, l.milkLabel].filter(Boolean).join(' · ') || 'Стандартная порция'}
                        </span>
                      </span>
                      <span className="text-[15px] font-semibold tabular-nums">{rub(l.unitPrice * l.qty)}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6">
                {promo ? (
                  <div className="flex items-center justify-between rounded-2xl bg-sage-100 px-4 py-3 text-sage-600">
                    <span className="flex items-center gap-2 text-[14px] font-semibold">
                      <BadgePercent className="size-5" /> {promo} · −{pct}%
                    </span>
                    <button type="button" onClick={() => setPromo(null)} className="rounded-full p-1 transition hover:bg-white/60" aria-label="Убрать промокод">
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      className="input py-3 uppercase placeholder:normal-case"
                      placeholder="Промокод"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value)
                        setPromoError('')
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          applyPromo()
                        }
                      }}
                    />
                    <button type="button" onClick={applyPromo} className="btn-dark shrink-0 rounded-2xl px-5 py-3">
                      Применить
                    </button>
                  </div>
                )}
                {promoError && <p className="mt-2 text-[13px] text-terra-600">{promoError}</p>}
              </div>

              <dl className="mt-6 space-y-2.5 text-[15px]">
                <div className="flex justify-between text-coffee-500">
                  <dt>Сумма</dt>
                  <dd className="tabular-nums">{rub(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage-600">
                    <dt>Скидка по промокоду</dt>
                    <dd className="tabular-nums">−{rub(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-coffee-500">
                  <dt>Упаковка навынос</dt>
                  <dd>бесплатно</dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-dashed border-coffee-800/15 bg-cream-200/40 p-6 sm:p-8">
              <div className="flex items-end justify-between">
                <span className="text-coffee-500">К оплате</span>
                <span className="font-display text-4xl font-semibold text-coffee-900 tabular-nums">{rub(total)}</span>
              </div>
              <p className="mt-3 text-[13px] text-coffee-400">
                {shop.address} · {slot.asap ? `через ≈ ${shop.prepMinutes} мин` : `к ${slot.label}, ${slot.hint}`}
              </p>
              <button type="submit" disabled={processing} className="btn-primary mt-6 w-full py-4 text-base">
                {processing ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Проводим оплату…
                  </>
                ) : payment === 'cash' ? (
                  `Оформить заказ · ${rub(total)}`
                ) : (
                  `Оплатить ${rub(total)}`
                )}
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  )
}
