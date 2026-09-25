export type CategoryId = 'coffee' | 'tea' | 'desserts' | 'breakfast'

export type IllustrationKind =
  | 'cup'
  | 'espresso'
  | 'glass'
  | 'tea'
  | 'matcha'
  | 'croissant'
  | 'cake'
  | 'roll'
  | 'macarons'
  | 'syrniki'
  | 'toast'
  | 'bowl'
  | 'pan'

export interface Palette {
  /** основной цвет напитка / блюда */
  main: string
  /** второй цвет: пенка, начинка, слой */
  accent: string
  /** цвет посуды */
  ware: string
  /** фон карточки: CSS-градиент */
  bg: string
}

export interface SizeOption {
  id: string
  label: string
  volume: string
  delta: number
}

export interface MilkOption {
  id: string
  label: string
  delta: number
}

export interface MenuItem {
  id: string
  category: CategoryId
  name: string
  description: string
  price: number
  kind: IllustrationKind
  palette: Palette
  sizes?: SizeOption[]
  milk?: boolean
  badge?: 'Хит' | 'Новинка' | 'Сезон' | 'Веган'
  meta?: string
}

export interface Shop {
  id: string
  name: string
  address: string
  district: string
  hours: string
  open: number // минуты от полуночи
  close: number
  phone: string
  prepMinutes: number
  mapSeed: number
  features: string[]
}

export interface CartLine {
  key: string
  itemId: string
  name: string
  sizeLabel?: string
  milkLabel?: string
  unitPrice: number
  qty: number
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'done'

export type PaymentMethod = 'card' | 'sbp' | 'cash'

export interface Order {
  id: number
  createdAt: number
  readyAt: number
  shopId: string
  customer: string
  phone: string
  lines: CartLine[]
  subtotal: number
  discount: number
  total: number
  payment: PaymentMethod
  promo?: string
  comment?: string
  status: OrderStatus
}

export interface Review {
  name: string
  role: string
  text: string
  rating: number
  gradient: string
}
