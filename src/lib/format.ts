export const rub = (n: number) => `${new Intl.NumberFormat('ru-RU').format(Math.round(n))} ₽`

export const time = (ts: number) =>
  new Date(ts).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

export const plural = (n: number, forms: [string, string, string]) => {
  const a = Math.abs(n) % 100
  const b = a % 10
  if (a > 10 && a < 20) return forms[2]
  if (b > 1 && b < 5) return forms[1]
  if (b === 1) return forms[0]
  return forms[2]
}

export const minutesAgo = (ts: number, now = Date.now()) => {
  const m = Math.max(0, Math.round((now - ts) / 60000))
  if (m < 1) return 'только что'
  if (m < 60) return `${m} мин назад`
  const h = Math.floor(m / 60)
  return `${h} ч ${m % 60} мин назад`
}

/** Маска телефона: +7 (XXX) XXX-XX-XX */
export const formatPhone = (raw: string) => {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('8') || d.startsWith('7')) d = d.slice(1)
  d = d.slice(0, 10)
  let out = '+7'
  if (d.length > 0) out += ` (${d.slice(0, 3)}`
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ` ${d.slice(3, 6)}`
  if (d.length > 6) out += `-${d.slice(6, 8)}`
  if (d.length > 8) out += `-${d.slice(8, 10)}`
  return out
}

export const phoneDigits = (s: string) => s.replace(/\D/g, '').length
