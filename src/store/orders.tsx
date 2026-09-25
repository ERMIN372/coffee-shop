import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartLine, Order, OrderStatus, PaymentMethod } from '../types'
import { FIRST_ORDER_NUMBER, PROMO_CODES, seedOrders, shops } from '../data/mock'
import { load, save } from '../lib/storage'
import { buildLine, getItem, linesTotal } from '../lib/menu'

const KEY = 'zerno:orders'
const SEED_KEY = 'zerno:seeded-on'

export const STATUS_FLOW: OrderStatus[] = ['new', 'preparing', 'ready', 'done']

export const STATUS_META: Record<OrderStatus, { label: string; dot: string; chip: string }> = {
  new: { label: 'Новый', dot: 'bg-terra-500', chip: 'bg-terra-50 text-terra-600 ring-terra-200' },
  preparing: { label: 'Готовится', dot: 'bg-amber-500', chip: 'bg-amber-50 text-amber-700 ring-amber-200' },
  ready: { label: 'Готов', dot: 'bg-sage-500', chip: 'bg-sage-100 text-sage-600 ring-sage-500/30' },
  done: { label: 'Выдан', dot: 'bg-coffee-300', chip: 'bg-coffee-50 text-coffee-500 ring-coffee-100' },
}

const today = () => new Date().toDateString()

const buildSeed = (): Order[] => {
  const now = Date.now()
  return seedOrders
    .slice()
    .sort((a, b) => b.minutesAgo - a.minutesAgo)
    .map((s, i) => {
      const lines: CartLine[] = s.lines.flatMap((l) => {
        const item = getItem(l.itemId)
        return item ? [buildLine(item, l.size, l.milk, l.qty)] : []
      })
      const subtotal = linesTotal(lines)
      const discount = s.promo ? Math.round((subtotal * (PROMO_CODES[s.promo] ?? 0)) / 100) : 0
      const shop = shops.find((x) => x.id === s.shopId) ?? shops[0]
      const createdAt = now - s.minutesAgo * 60000
      return {
        id: FIRST_ORDER_NUMBER + i,
        createdAt,
        readyAt: createdAt + shop.prepMinutes * 60000,
        shopId: shop.id,
        customer: s.customer,
        phone: s.phone,
        lines,
        subtotal,
        discount,
        total: subtotal - discount,
        payment: s.payment,
        promo: s.promo,
        status: s.status,
      }
    })
}

const initial = (): Order[] => {
  const stored = load<Order[] | null>(KEY, null)
  if (stored && load(SEED_KEY, '') === today()) return stored
  // новый день — новая смена: пересоздаём демо-заказы
  const seed = buildSeed()
  save(SEED_KEY, today())
  save(KEY, seed)
  return seed
}

export interface NewOrder {
  shopId: string
  readyAt: number
  customer: string
  phone: string
  lines: CartLine[]
  payment: PaymentMethod
  promo?: string
  comment?: string
}

interface OrdersCtx {
  orders: Order[]
  place: (o: NewOrder) => Order
  setStatus: (id: number, status: OrderStatus) => void
  advance: (id: number) => void
  reset: () => void
}

const Ctx = createContext<OrdersCtx | null>(null)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initial)

  useEffect(() => save(KEY, orders), [orders])

  // синхронизация между вкладками: заказ из витрины сразу виден в админке
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) setOrders(JSON.parse(e.newValue) as Order[])
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const place = useCallback(
    (o: NewOrder) => {
      const subtotal = linesTotal(o.lines)
      const pct = o.promo ? (PROMO_CODES[o.promo] ?? 0) : 0
      const discount = Math.round((subtotal * pct) / 100)
      const order: Order = {
        ...o,
        id: Math.max(FIRST_ORDER_NUMBER - 1, ...orders.map((x) => x.id)) + 1,
        createdAt: Date.now(),
        subtotal,
        discount,
        total: subtotal - discount,
        promo: pct ? o.promo : undefined,
        status: 'new',
      }
      setOrders((prev) => [...prev, order])
      return order
    },
    [orders],
  )

  const setStatus = useCallback((id: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }, [])

  const advance = useCallback((id: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o
        const next = STATUS_FLOW[(STATUS_FLOW.indexOf(o.status) + 1) % STATUS_FLOW.length]
        return { ...o, status: next }
      }),
    )
  }, [])

  const reset = useCallback(() => setOrders(buildSeed()), [])

  const value = useMemo(() => ({ orders, place, setStatus, advance, reset }), [orders, place, setStatus, advance, reset])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useOrders = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useOrders вне OrdersProvider')
  return ctx
}
