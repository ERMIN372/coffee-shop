import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { CartLine, MenuItem } from '../types'
import { load, save } from '../lib/storage'
import { buildLine, linesTotal } from '../lib/menu'

const KEY = 'zerno:cart'

interface Toast {
  id: number
  text: string
}

interface CartCtx {
  lines: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  toast: Toast | null
  /** позиция, для которой открыта модалка с опциями */
  configuring: MenuItem | null
  /** «В корзину»: напиткам с опциями открываем модалку, остальное кладём сразу */
  pick: (item: MenuItem) => void
  closeConfig: () => void
  open: () => void
  close: () => void
  add: (line: CartLine) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => load(KEY, []))
  const [isOpen, setOpen] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [configuring, setConfiguring] = useState<MenuItem | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => save(KEY, lines), [lines])

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const same = prev.find((l) => l.key === line.key)
      if (same) return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l))
      return [...prev, line]
    })
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), text: `${line.name} — в корзине` })
    timer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    )
  }, [])

  const value = useMemo<CartCtx>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: linesTotal(lines),
      isOpen,
      toast,
      configuring,
      pick: (item) => (item.sizes || item.milk ? setConfiguring(item) : add(buildLine(item))),
      closeConfig: () => setConfiguring(null),
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQty,
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      clear: () => setLines([]),
    }),
    [lines, isOpen, toast, configuring, add, setQty],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useCart = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart вне CartProvider')
  return ctx
}
