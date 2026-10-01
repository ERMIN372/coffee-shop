import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Banknote,
  Clock,
  Coffee,
  KeyRound,
  LayoutGrid,
  List,
  LogOut,
  MessageSquare,
  Receipt,
  RotateCcw,
  Store,
  TrendingUp,
  User,
} from 'lucide-react'
import Logo, { BeanMark } from '../components/Logo'
import Illustration from '../components/Illustration'
import { ADMIN_CREDENTIALS, shops } from '../data/mock'
import { getItem } from '../lib/menu'
import { minutesAgo, plural, rub, time } from '../lib/format'
import { useAuth } from '../store/auth'
import { STATUS_FLOW, STATUS_META, useOrders } from '../store/orders'
import type { Order, OrderStatus } from '../types'

const NEXT_ACTION: Record<OrderStatus, string> = {
  new: 'Взять в работу',
  preparing: 'Готово',
  ready: 'Выдать',
  done: 'Вернуть в новые',
}

const shopShort = (id: string) => shops.find((s) => s.id === id)?.address ?? ''

function Login() {
  const { login } = useAuth()
  const [user, setUser] = useState(ADMIN_CREDENTIALS.login)
  const [pass, setPass] = useState(ADMIN_CREDENTIALS.password)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!login(user, pass)) setError('Неверный логин или пароль')
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-coffee-900 px-4 py-16">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="absolute -top-40 -left-20 size-[600px] rounded-full bg-terra-500/30 blur-[140px]" />
      <div className="absolute right-0 bottom-0 size-[500px] rounded-full bg-coffee-400/30 blur-[140px]" />
      <form onSubmit={submit} className="relative w-full max-w-md animate-fade-up rounded-[32px] bg-cream-50 p-8 shadow-2xl sm:p-10">
        <BeanMark className="size-12" />
        <h1 className="mt-6 font-display text-4xl font-semibold text-coffee-900">Панель бариста</h1>
        <p className="mt-2 text-coffee-500">Входящие заказы и сводка смены</p>

        <label className="mt-8 block">
          <span className="text-[13px] font-semibold text-coffee-500">Логин</span>
          <div className="relative mt-2">
            <User className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-coffee-300" />
            <input className="input pl-11" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username" />
          </div>
        </label>
        <label className="mt-4 block">
          <span className="text-[13px] font-semibold text-coffee-500">Пароль</span>
          <div className="relative mt-2">
            <KeyRound className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-coffee-300" />
            <input className="input pl-11" type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password" />
          </div>
        </label>
        {error && <p className="mt-3 text-[14px] text-terra-600">{error}</p>}
        <button className="btn-primary mt-8 w-full py-4 text-base">
          Войти <ArrowRight className="size-4" />
        </button>
        <p className="mt-5 rounded-2xl bg-cream-200/70 px-4 py-3 text-center text-[13px] text-coffee-500">
          Демо-доступ: <b>{ADMIN_CREDENTIALS.login}</b> / <b>{ADMIN_CREDENTIALS.password}</b>
        </p>
        <Link to="/" className="mt-5 block text-center text-[14px] text-coffee-400 transition hover:text-coffee-800">
          ← На сайт
        </Link>
      </form>
    </div>
  )
}

function StatusChip({ order, onClick }: { order: Order; onClick: () => void }) {
  const m = STATUS_META[order.status]
  const next = STATUS_META[STATUS_FLOW[(STATUS_FLOW.indexOf(order.status) + 1) % STATUS_FLOW.length]]
  return (
    <button
      onClick={onClick}
      title={`Нажмите, чтобы сменить на «${next.label}»`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold ring-1 transition hover:scale-105 hover:shadow-soft ${m.chip}`}
    >
      <span className={`size-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </button>
  )
}

function OrderCard({ order, now }: { order: Order; now: number }) {
  const { advance } = useOrders()
  const late = order.status !== 'done' && order.status !== 'ready' && now > order.readyAt
  const compact = order.status === 'done'
  return (
    <article
      className={`group rounded-3xl border bg-cream-50 p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
        late ? 'border-terra-300' : 'border-coffee-800/[0.06]'
      } ${compact ? 'opacity-75 hover:opacity-100' : ''}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-xl font-semibold text-coffee-900">№{order.id}</p>
          <p className="text-[12px] text-coffee-400">{minutesAgo(order.createdAt, now)}</p>
        </div>
        <StatusChip order={order} onClick={() => advance(order.id)} />
      </div>

      {!compact && (
        <ul className="mt-3 space-y-1.5">
          {order.lines.map((l) => (
            <li key={l.key} className="flex items-start gap-2 text-[13px] leading-snug">
              <span className="mt-px shrink-0 rounded-md bg-cream-200 px-1.5 font-bold text-coffee-700 tabular-nums">{l.qty}×</span>
              <span className="text-coffee-700">
                {l.name}
                {(l.sizeLabel || l.milkLabel) && (
                  <span className="block text-[12px] text-coffee-400">{[l.sizeLabel?.split(' · ')[0], l.milkLabel].filter(Boolean).join(', ')}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      {order.comment && !compact && (
        <p className="mt-3 flex gap-2 rounded-xl bg-terra-50 px-3 py-2 text-[12px] text-terra-700">
          <MessageSquare className="mt-0.5 size-3.5 shrink-0" /> {order.comment}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-coffee-800/10 pt-3 text-[12px] text-coffee-500">
        <span className="flex items-center gap-1.5 font-medium">
          <User className="size-3.5" /> {order.customer}
        </span>
        <span className={`flex items-center gap-1 font-semibold ${late ? 'text-terra-600' : ''}`}>
          <Clock className="size-3.5" /> к {time(order.readyAt)}
        </span>
      </div>
      {!compact && (
        <div className="mt-1.5 flex items-center justify-between text-[12px] text-coffee-400">
          <span className="truncate">{shopShort(order.shopId)}</span>
          <span className="font-semibold text-coffee-800 tabular-nums">{rub(order.total)}</span>
        </div>
      )}

      {order.status !== 'done' && (
        <button
          onClick={() => advance(order.id)}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-[13px] font-semibold transition ${
            order.status === 'new'
              ? 'bg-terra-500 text-white hover:bg-terra-600'
              : order.status === 'preparing'
                ? 'bg-coffee-800 text-cream-50 hover:bg-coffee-900'
                : 'bg-sage-500 text-white hover:bg-sage-600'
          }`}
        >
          {NEXT_ACTION[order.status]} <ArrowRight className="size-3.5" />
        </button>
      )}
    </article>
  )
}

function Board({ orders, now }: { orders: Order[]; now: number }) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0">
      {STATUS_FLOW.map((st) => {
        const list = orders.filter((o) => o.status === st).sort((a, b) => (st === 'done' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt))
        const m = STATUS_META[st]
        return (
          <div key={st} className="flex w-[290px] shrink-0 flex-col rounded-[28px] bg-cream-200/60 p-3 xl:w-auto">
            <div className="flex items-center justify-between px-2 pt-1 pb-3">
              <span className="flex items-center gap-2 text-[14px] font-bold text-coffee-800">
                <span className={`size-2 rounded-full ${m.dot}`} />
                {m.label}
              </span>
              <span className="rounded-full bg-cream-50 px-2.5 py-0.5 text-[12px] font-bold text-coffee-500 tabular-nums">{list.length}</span>
            </div>
            <div className="space-y-3">
              {list.map((o) => (
                <OrderCard key={o.id} order={o} now={now} />
              ))}
              {list.length === 0 && (
                <p className="rounded-3xl border-2 border-dashed border-coffee-800/10 px-4 py-8 text-center text-[13px] text-coffee-300">Пусто</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Table({ orders, now }: { orders: Order[]; now: number }) {
  const { advance } = useOrders()
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[860px] text-left text-[14px]">
        <thead className="border-b border-coffee-800/[0.07] text-[12px] font-bold tracking-wider text-coffee-400 uppercase">
          <tr>
            {['№', 'Создан', 'Гость', 'Кофейня', 'Позиции', 'Сумма', 'Статус'].map((h) => (
              <th key={h} className="px-5 py-4 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...orders]
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((o) => (
              <tr key={o.id} className="border-b border-coffee-800/[0.05] transition last:border-0 hover:bg-cream-200/40">
                <td className="px-5 py-3.5 font-display text-[17px] font-semibold text-coffee-900">{o.id}</td>
                <td className="px-5 py-3.5 text-coffee-500">
                  {time(o.createdAt)} <span className="text-[12px] text-coffee-300">· {minutesAgo(o.createdAt, now)}</span>
                </td>
                <td className="px-5 py-3.5 font-medium text-coffee-800">{o.customer}</td>
                <td className="px-5 py-3.5 text-coffee-500">{shopShort(o.shopId)}</td>
                <td className="max-w-[280px] truncate px-5 py-3.5 text-coffee-500">{o.lines.map((l) => `${l.name}${l.qty > 1 ? ` ×${l.qty}` : ''}`).join(', ')}</td>
                <td className="px-5 py-3.5 font-semibold text-coffee-900 tabular-nums">{rub(o.total)}</td>
                <td className="px-5 py-3.5">
                  <StatusChip order={o} onClick={() => advance(o.id)} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Admin() {
  const { user, logout } = useAuth()
  const { orders, reset } = useOrders()
  const [shop, setShop] = useState<string>('all')
  const [view, setView] = useState<'board' | 'table'>('board')
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15000)
    return () => window.clearInterval(t)
  }, [])

  const filtered = useMemo(() => (shop === 'all' ? orders : orders.filter((o) => o.shopId === shop)), [orders, shop])

  const stats = useMemo(() => {
    const revenue = filtered.reduce((s, o) => s + o.total, 0)
    const active = filtered.filter((o) => o.status === 'new' || o.status === 'preparing').length
    const counts = new Map<string, number>()
    filtered.forEach((o) => o.lines.forEach((l) => counts.set(l.itemId, (counts.get(l.itemId) ?? 0) + l.qty)))
    const popular = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
    return { revenue, active, avg: filtered.length ? revenue / filtered.length : 0, popular }
  }, [filtered])

  if (!user) return <Login />

  const maxPop = stats.popular[0]?.[1] ?? 1
  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })

  const kpis = [
    { label: 'Заказов за день', value: String(filtered.length), hint: `${stats.active} в работе`, icon: Receipt, tone: 'bg-terra-500 text-white' },
    { label: 'Выручка', value: rub(stats.revenue), hint: 'с учётом скидок', icon: Banknote, tone: 'bg-coffee-800 text-cream-50' },
    { label: 'Средний чек', value: rub(stats.avg), hint: 'по всем заказам', icon: TrendingUp, tone: 'bg-sage-500 text-white' },
    {
      label: 'Ждут выдачи',
      value: String(filtered.filter((o) => o.status === 'ready').length),
      hint: 'готовы, на полке',
      icon: Coffee,
      tone: 'bg-cream-300 text-coffee-800',
    },
  ]

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Верхняя панель */}
      <header className="sticky top-0 z-30 border-b border-coffee-800/[0.07] bg-cream-100/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1680px] items-center justify-between gap-4 px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo to="/admin" />
            <span className="hidden rounded-full bg-coffee-800 px-3 py-1 text-[12px] font-bold text-cream-50 sm:inline">Бариста</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden rounded-full px-4 py-2 text-[14px] font-medium text-coffee-500 transition hover:bg-white sm:block">
              На сайт
            </Link>
            <span className="hidden items-center gap-2 rounded-full bg-white/70 py-1.5 pr-4 pl-1.5 text-[14px] font-medium text-coffee-700 md:flex">
              <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-terra-300 to-terra-600 text-[12px] font-bold text-white">БС</span>
              {user}
            </span>
            <button onClick={logout} className="grid size-10 place-items-center rounded-full bg-white/70 text-coffee-500 transition hover:bg-white hover:text-terra-600" aria-label="Выйти">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1680px] px-4 pt-8 pb-16 sm:px-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[14px] font-medium text-coffee-400 first-letter:uppercase">{today}</p>
            <h1 className="mt-1 font-display text-4xl font-semibold text-coffee-900 sm:text-5xl">Заказы смены</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1 rounded-full bg-white/70 p-1">
              {[{ id: 'all', label: 'Все кофейни' }, ...shops.map((s) => ({ id: s.id, label: s.address.split(',')[0] }))].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShop(s.id)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    shop === s.id ? 'bg-coffee-800 text-cream-50' : 'text-coffee-500 hover:text-coffee-900'
                  }`}
                >
                  {s.id === 'all' && <Store className="size-3.5" />}
                  {s.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 rounded-full bg-white/70 p-1">
              <button
                onClick={() => setView('board')}
                className={`grid size-9 place-items-center rounded-full transition ${view === 'board' ? 'bg-coffee-800 text-cream-50' : 'text-coffee-500'}`}
                aria-label="Доска"
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setView('table')}
                className={`grid size-9 place-items-center rounded-full transition ${view === 'table' ? 'bg-coffee-800 text-cream-50' : 'text-coffee-500'}`}
                aria-label="Таблица"
              >
                <List className="size-4" />
              </button>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2.5 text-[13px] font-semibold text-coffee-500 transition hover:bg-white hover:text-coffee-900"
              title="Пересоздать демо-заказы"
            >
              <RotateCcw className="size-3.5" /> Сбросить демо
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="card flex items-center gap-5 p-6">
              <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${k.tone}`}>
                <k.icon className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-coffee-400">{k.label}</p>
                <p className="mt-0.5 font-display text-[32px] leading-tight font-semibold text-coffee-900 tabular-nums">{k.value}</p>
                <p className="text-[12px] text-coffee-400">{k.hint}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-6 2xl:grid-cols-[1fr_360px]">
          <section>
            <p className="mb-4 text-[13px] text-coffee-400">
              Нажмите на статус или кнопку в карточке, чтобы перевести заказ дальше: новый → готовится → готов → выдан.
            </p>
            {view === 'board' ? <Board orders={filtered} now={now} /> : <Table orders={filtered} now={now} />}
          </section>

          <aside className="grid gap-6 md:grid-cols-2 2xl:grid-cols-1">
            <div className="card p-6">
              <h2 className="font-display text-2xl font-semibold text-coffee-900">Популярное сегодня</h2>
              <p className="mt-1 text-[13px] text-coffee-400">по количеству проданных позиций</p>
              <ol className="mt-5 space-y-4">
                {stats.popular.map(([id, qty], i) => {
                  const item = getItem(id)
                  if (!item) return null
                  return (
                    <li key={id} className="flex items-center gap-3" title={`${item.name}: ${qty} шт.`}>
                      <span className="w-4 text-[13px] font-bold text-coffee-300 tabular-nums">{i + 1}</span>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl" style={{ background: item.palette.bg }}>
                        <Illustration kind={item.kind} palette={item.palette} steam={false} className="size-10" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="truncate text-[14px] font-semibold text-coffee-800">{item.name}</span>
                          <span className="shrink-0 text-[13px] font-semibold text-coffee-600 tabular-nums">
                            {qty} {plural(qty, ['шт.', 'шт.', 'шт.'])}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-cream-200">
                          <div className="h-full rounded-full bg-terra-500 transition-all duration-700" style={{ width: `${(qty / maxPop) * 100}%` }} />
                        </div>
                      </div>
                    </li>
                  )
                })}
                {stats.popular.length === 0 && <li className="text-[14px] text-coffee-400">Пока нет заказов</li>}
              </ol>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-2xl font-semibold text-coffee-900">По кофейням</h2>
              <ul className="mt-5 space-y-3">
                {shops.map((s) => {
                  const list = orders.filter((o) => o.shopId === s.id)
                  const sum = list.reduce((a, o) => a + o.total, 0)
                  return (
                    <li key={s.id} className="flex items-center justify-between rounded-2xl bg-cream-200/50 px-4 py-3">
                      <span>
                        <span className="block text-[14px] font-semibold text-coffee-800">{s.address.split(',')[0]}</span>
                        <span className="text-[12px] text-coffee-400">
                          {list.length} {plural(list.length, ['заказ', 'заказа', 'заказов'])}
                        </span>
                      </span>
                      <span className="text-[14px] font-semibold text-coffee-900 tabular-nums">{rub(sum)}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>

        <p className="mt-16 text-center text-[12px] text-coffee-300">Демо-проект</p>
      </main>
    </div>
  )
}
