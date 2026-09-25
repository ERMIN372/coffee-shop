import type { Shop } from '../types'

export interface Slot {
  id: string
  ts: number
  label: string
  hint: string
  asap?: boolean
}

const STEP = 15
const pad = (n: number) => String(n).padStart(2, '0')
const hhmm = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`

/** Ближайшие слоты готовности с учётом часов работы кофейни */
export const getSlots = (shop: Shop, count = 8, now = new Date()): Slot[] => {
  const slots: Slot[] = []
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const earliest = nowMin + shop.prepMinutes

  const isOpenNow = nowMin >= shop.open && earliest <= shop.close
  if (isOpenNow) {
    const ts = now.getTime() + shop.prepMinutes * 60000
    slots.push({ id: 'asap', ts, label: 'Как можно скорее', hint: `≈ ${shop.prepMinutes} мин`, asap: true })
  }

  // первый «круглый» слот после минимального времени приготовления
  let dayOffset = 0
  let m = Math.ceil((Math.max(earliest, shop.open) + 5) / STEP) * STEP
  // «Как можно скорее» занимает две ячейки сетки — тогда обычных слотов на один меньше
  const target = isOpenNow ? count - 1 : count
  while (slots.length < target) {
    if (m > shop.close - STEP) {
      dayOffset += 1
      m = Math.ceil(shop.open / STEP) * STEP
    }
    const d = new Date(now)
    d.setDate(d.getDate() + dayOffset)
    d.setHours(Math.floor(m / 60), m % 60, 0, 0)
    slots.push({
      id: String(d.getTime()),
      ts: d.getTime(),
      label: hhmm(d),
      hint: dayOffset === 0 ? 'сегодня' : 'завтра',
    })
    m += STEP
  }
  return slots
}

export const isShopOpen = (shop: Shop, now = new Date()) => {
  const m = now.getHours() * 60 + now.getMinutes()
  return m >= shop.open && m < shop.close
}
