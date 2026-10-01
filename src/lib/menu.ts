import { menu, milkOptions } from '../data/mock'
import type { CartLine, MenuItem } from '../types'

export const menuById = new Map(menu.map((m) => [m.id, m]))

export const getItem = (id: string) => menuById.get(id)

/** Собирает строку корзины из позиции и выбранных опций */
export const buildLine = (item: MenuItem, sizeId?: string, milkId?: string, qty = 1): CartLine => {
  const size = item.sizes?.find((s) => s.id === sizeId) ?? item.sizes?.[0]
  const milk = item.milk ? (milkOptions.find((m) => m.id === milkId) ?? milkOptions[0]) : undefined
  return {
    key: [item.id, size?.id, milk?.id].filter(Boolean).join(':'),
    itemId: item.id,
    name: item.name,
    sizeLabel: size ? `${size.label} · ${size.volume}` : undefined,
    milkLabel: milk && milk.id !== 'cow' ? `${milk.label} молоко` : undefined,
    unitPrice: item.price + (size?.delta ?? 0) + (milk?.delta ?? 0),
    qty,
  }
}

export const lineTotal = (l: CartLine) => l.unitPrice * l.qty
export const linesTotal = (lines: CartLine[]) => lines.reduce((s, l) => s + lineTotal(l), 0)
