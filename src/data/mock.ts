/**
 * Все данные демо-проекта. Имена, адреса и компании выдуманы,
 * любые совпадения случайны.
 */
import type {
  CategoryId,
  MenuItem,
  MilkOption,
  OrderStatus,
  PaymentMethod,
  Review,
  Shop,
  SizeOption,
} from '../types'

export const BRAND = {
  name: 'Зерно',
  tagline: 'Кофейня со своей обжаркой',
  phone: '+7 (000) 120-40-40',
  email: 'hello@zerno.demo',
}

export const categories: { id: CategoryId; label: string; emoji: string; hint: string }[] = [
  { id: 'coffee', label: 'Кофе', emoji: '☕', hint: 'Эспрессо-бар на зерне недели' },
  { id: 'tea', label: 'Чай', emoji: '🍵', hint: 'Листовой чай и авторские настои' },
  { id: 'desserts', label: 'Десерты', emoji: '🥐', hint: 'Выпечка из нашей пекарни каждое утро' },
  { id: 'breakfast', label: 'Завтраки', emoji: '🍳', hint: 'Подаём весь день, с 7 утра до закрытия' },
]

const cupSizes: SizeOption[] = [
  { id: 's', label: 'S', volume: '250 мл', delta: 0 },
  { id: 'm', label: 'M', volume: '350 мл', delta: 40 },
  { id: 'l', label: 'L', volume: '450 мл', delta: 80 },
]

const espressoSizes: SizeOption[] = [
  { id: 'single', label: 'Одинарный', volume: '30 мл', delta: 0 },
  { id: 'double', label: 'Двойной', volume: '60 мл', delta: 60 },
]

const teaSizes: SizeOption[] = [
  { id: 'cup', label: 'Стакан', volume: '350 мл', delta: 0 },
  { id: 'pot', label: 'Чайник', volume: '700 мл', delta: 130 },
]

export const milkOptions: MilkOption[] = [
  { id: 'cow', label: 'Коровье', delta: 0 },
  { id: 'lactose-free', label: 'Безлактозное', delta: 30 },
  { id: 'oat', label: 'Овсяное', delta: 50 },
  { id: 'almond', label: 'Миндальное', delta: 60 },
  { id: 'coconut', label: 'Кокосовое', delta: 60 },
]

const bg = {
  latte: 'linear-gradient(150deg, #f6e9d8 0%, #ecd6bb 100%)',
  caramel: 'linear-gradient(150deg, #f7e3cc 0%, #eac39c 100%)',
  dark: 'linear-gradient(150deg, #e9d9c9 0%, #d3b79d 100%)',
  terra: 'linear-gradient(150deg, #f8e2d4 0%, #eebea3 100%)',
  pumpkin: 'linear-gradient(150deg, #fae3c9 0%, #f0b886 100%)',
  sage: 'linear-gradient(150deg, #e9eddf 0%, #cfd8bf 100%)',
  berry: 'linear-gradient(150deg, #f6e1e0 0%, #e7bcbc 100%)',
  honey: 'linear-gradient(150deg, #fbeccb 0%, #efd08f 100%)',
  cream: 'linear-gradient(150deg, #f8f0e3 0%, #eadfcb 100%)',
  sky: 'linear-gradient(150deg, #e7ebe8 0%, #cbd6d1 100%)',
}

export const menu: MenuItem[] = [
  // ——— Кофе ———
  {
    id: 'pumpkin-raf',
    category: 'coffee',
    name: 'Тыквенный раф',
    description: 'Сливочный раф с запечённой тыквой, корицей и щепоткой мускатного ореха',
    price: 320,
    kind: 'glass',
    palette: { main: '#e59a5a', accent: '#fbe7cf', ware: '#ffffff', bg: bg.pumpkin },
    sizes: cupSizes,
    milk: true,
    badge: 'Сезон',
  },
  {
    id: 'cappuccino',
    category: 'coffee',
    name: 'Капучино',
    description: 'Двойной эспрессо и шелковистая микропена. Классика, которую мы любим',
    price: 230,
    kind: 'cup',
    palette: { main: '#8a5a3c', accent: '#f6e6d2', ware: '#f7efe4', bg: bg.latte },
    sizes: cupSizes,
    milk: true,
    badge: 'Хит',
  },
  {
    id: 'flat-white',
    category: 'coffee',
    name: 'Флэт уайт',
    description: 'Ристретто на зерне недели и тонкий слой бархатного молока',
    price: 260,
    kind: 'cup',
    palette: { main: '#6e4430', accent: '#ecd5bb', ware: '#c4613a', bg: bg.terra },
    sizes: cupSizes.slice(0, 2),
    milk: true,
  },
  {
    id: 'latte',
    category: 'coffee',
    name: 'Латте',
    description: 'Мягкий и молочный, с нежной пенкой. Добавим сироп по желанию',
    price: 240,
    kind: 'cup',
    palette: { main: '#a9744f', accent: '#faeedd', ware: '#34231a', bg: bg.caramel },
    sizes: cupSizes,
    milk: true,
  },
  {
    id: 'espresso',
    category: 'coffee',
    name: 'Эспрессо',
    description: 'Зерно недели: Эфиопия, мытая обработка. Ноты жасмина и бергамота',
    price: 150,
    kind: 'espresso',
    palette: { main: '#4a2c1d', accent: '#c28a5c', ware: '#f7efe4', bg: bg.dark },
    sizes: espressoSizes,
    meta: 'Обжарка 3 дня назад',
  },
  {
    id: 'honey-raf',
    category: 'coffee',
    name: 'Медовый раф',
    description: 'Сливки, эспрессо и гречишный мёд с пасеки наших друзей',
    price: 300,
    kind: 'glass',
    palette: { main: '#d9a441', accent: '#fdf1d6', ware: '#ffffff', bg: bg.honey },
    sizes: cupSizes,
    milk: true,
  },
  {
    id: 'cold-brew',
    category: 'coffee',
    name: 'Колд брю тоник',
    description: 'Кофе холодной экстракции 18 часов, тоник и долька апельсина',
    price: 290,
    kind: 'glass',
    palette: { main: '#5b3322', accent: '#f3c38d', ware: '#ffffff', bg: bg.sky },
    sizes: cupSizes.slice(1),
    badge: 'Новинка',
  },
  {
    id: 'filter',
    category: 'coffee',
    name: 'Фильтр-кофе',
    description: 'Колумбия, натуральная обработка. Вишня, какао, долгое послевкусие',
    price: 210,
    kind: 'cup',
    palette: { main: '#3f2418', accent: '#3f2418', ware: '#6f8560', bg: bg.sage },
    sizes: cupSizes,
  },

  // ——— Чай ———
  {
    id: 'sea-buckthorn',
    category: 'tea',
    name: 'Облепиховый с имбирём',
    description: 'Облепиха, свежий имбирь, апельсин и немного мёда. Согревает сразу',
    price: 280,
    kind: 'tea',
    palette: { main: '#f0a13a', accent: '#f6d27b', ware: '#ffffff', bg: bg.pumpkin },
    sizes: teaSizes,
    badge: 'Сезон',
  },
  {
    id: 'matcha-latte',
    category: 'tea',
    name: 'Матча латте',
    description: 'Церемониальная матча из Удзи, взбитая вручную, и молоко на выбор',
    price: 310,
    kind: 'matcha',
    palette: { main: '#8aa05c', accent: '#e8efd3', ware: '#f7efe4', bg: bg.sage },
    sizes: cupSizes,
    milk: true,
    badge: 'Хит',
  },
  {
    id: 'berry-tea',
    category: 'tea',
    name: 'Ягодный морс-чай',
    description: 'Брусника, клюква и смородиновый лист на чёрном чае',
    price: 260,
    kind: 'tea',
    palette: { main: '#b23a48', accent: '#e57b86', ware: '#ffffff', bg: bg.berry },
    sizes: teaSizes,
  },
  {
    id: 'earl-grey',
    category: 'tea',
    name: 'Эрл грей',
    description: 'Цейлонский чай с натуральным маслом бергамота',
    price: 190,
    kind: 'tea',
    palette: { main: '#8b4a26', accent: '#f1c27d', ware: '#ffffff', bg: bg.caramel },
    sizes: teaSizes,
  },
  {
    id: 'chai-latte',
    category: 'tea',
    name: 'Масала чай',
    description: 'Чёрный чай, томлённый с кардамоном, гвоздикой и корицей',
    price: 290,
    kind: 'cup',
    palette: { main: '#c08a5b', accent: '#f4e0c6', ware: '#c4613a', bg: bg.terra },
    sizes: cupSizes,
    milk: true,
  },
  {
    id: 'sencha',
    category: 'tea',
    name: 'Сенча',
    description: 'Японский зелёный чай, свежий и травянистый',
    price: 210,
    kind: 'tea',
    palette: { main: '#b7b957', accent: '#dfe39a', ware: '#ffffff', bg: bg.sage },
    sizes: teaSizes,
  },

  // ——— Десерты ———
  {
    id: 'croissant',
    category: 'desserts',
    name: 'Круассан на масле',
    description: '27 слоёв, французское масло 82%. Печём с шести утра',
    price: 190,
    kind: 'croissant',
    palette: { main: '#d99a4e', accent: '#b8702f', ware: '#f7efe4', bg: bg.honey },
    badge: 'Хит',
  },
  {
    id: 'cinnamon-roll',
    category: 'desserts',
    name: 'Синнабон с корицей',
    description: 'Мягкая булочка, цейлонская корица и сливочная глазурь',
    price: 230,
    kind: 'roll',
    palette: { main: '#d7a26b', accent: '#8a5230', ware: '#f7efe4', bg: bg.caramel },
  },
  {
    id: 'cheesecake',
    category: 'desserts',
    name: 'Баскский чизкейк',
    description: 'Карамельная корочка и кремовая сердцевина. С ягодным соусом',
    price: 340,
    kind: 'cake',
    palette: { main: '#f4dcae', accent: '#9c3b41', ware: '#f7efe4', bg: bg.berry },
  },
  {
    id: 'pumpkin-pie',
    category: 'desserts',
    name: 'Тыквенный тарт',
    description: 'Песочная основа, пряная тыква и облако взбитых сливок',
    price: 290,
    kind: 'cake',
    palette: { main: '#e0883d', accent: '#fff4e2', ware: '#f7efe4', bg: bg.pumpkin },
    badge: 'Сезон',
  },
  {
    id: 'macarons',
    category: 'desserts',
    name: 'Макаронс, 3 шт.',
    description: 'Солёная карамель, фисташка и малина',
    price: 270,
    kind: 'macarons',
    palette: { main: '#e7a8a4', accent: '#b8c98e', ware: '#f7efe4', bg: bg.cream },
  },
  {
    id: 'almond-croissant',
    category: 'desserts',
    name: 'Миндальный круассан',
    description: 'Двойная выпечка с франжипаном и лепестками миндаля',
    price: 260,
    kind: 'croissant',
    palette: { main: '#c9894a', accent: '#f5ecdc', ware: '#f7efe4', bg: bg.latte },
  },

  // ——— Завтраки ———
  {
    id: 'syrniki',
    category: 'breakfast',
    name: 'Сырники со сметаной',
    description: 'Фермерский творог, ванильная сметана и ягодный конфитюр',
    price: 390,
    kind: 'syrniki',
    palette: { main: '#e2a560', accent: '#b8364a', ware: '#fdfaf5', bg: bg.honey },
    badge: 'Хит',
  },
  {
    id: 'avocado-toast',
    category: 'breakfast',
    name: 'Тост с авокадо',
    description: 'Хлеб на закваске, авокадо, яйцо пашот и микрозелень',
    price: 450,
    kind: 'toast',
    palette: { main: '#d7a869', accent: '#8fae5a', ware: '#fdfaf5', bg: bg.sage },
  },
  {
    id: 'shakshuka',
    category: 'breakfast',
    name: 'Шакшука',
    description: 'Яйца в томатах с перцем, фета, зелень и хрустящая чиабатта',
    price: 480,
    kind: 'pan',
    palette: { main: '#c8432d', accent: '#fff6e6', ware: '#34231a', bg: bg.terra },
  },
  {
    id: 'granola',
    category: 'breakfast',
    name: 'Гранола с йогуртом',
    description: 'Домашняя гранола, греческий йогурт, сезонные ягоды и мёд',
    price: 360,
    kind: 'bowl',
    palette: { main: '#f8f1e4', accent: '#b8364a', ware: '#6f8560', bg: bg.cream },
    badge: 'Веган',
  },
  {
    id: 'porridge',
    category: 'breakfast',
    name: 'Овсянка с грушей',
    description: 'На овсяном молоке, с карамелизированной грушей и орехами',
    price: 320,
    kind: 'bowl',
    palette: { main: '#ecd9b8', accent: '#d9a441', ware: '#c4613a', bg: bg.caramel },
  },
  {
    id: 'croque',
    category: 'breakfast',
    name: 'Крок-мадам',
    description: 'Бриошь, запечённая ветчина, бешамель и глазунья сверху',
    price: 470,
    kind: 'toast',
    palette: { main: '#e0b56f', accent: '#f6c64a', ware: '#fdfaf5', bg: bg.honey },
  },
]

export const seasonal = {
  title: 'Осень в чашке',
  subtitle:
    'Тыква, облепиха и пряности: собрали всё, за что мы любим холодные утра. Три позиции, которые пахнут октябрём.',
  itemIds: ['pumpkin-raf', 'sea-buckthorn', 'pumpkin-pie'],
  deal: 'Только до 30 ноября',
  dealHint: 'потом — до следующей осени',
}

export const advantages = [
  {
    icon: 'flame',
    title: 'Своя обжарка',
    text: 'Жарим зерно раз в неделю в мастерской на Липовой. В чашке кофе, которому не больше 14 дней.',
  },
  {
    icon: 'egg',
    title: 'Завтраки весь день',
    text: 'Сырники в семь вечера или шакшука в полдень? Меню завтраков доступно до закрытия.',
  },
  {
    icon: 'timer',
    title: 'Готово к приходу',
    text: 'Выберите время, и бариста начнёт готовить так, чтобы напиток был горячим ровно к вам.',
  },
  {
    icon: 'leaf',
    title: 'Своя кружка = −10%',
    text: 'Приходите со своей кружкой или термосом. Бережём планету и немного ваш бюджет.',
  },
] as const

export const shops: Shop[] = [
  {
    id: 'lipovaya',
    name: 'Зерно на Липовой',
    address: 'ул. Липовая, 14',
    district: 'Старый город',
    hours: '07:30 – 22:00',
    open: 7 * 60 + 30,
    close: 22 * 60,
    phone: '+7 (000) 120-40-41',
    prepMinutes: 10,
    mapSeed: 1,
    features: ['Обжарочная', 'Веранда', 'Wi-Fi'],
  },
  {
    id: 'naberezhnaya',
    name: 'Зерно у реки',
    address: 'Набережная Мельников, 27',
    district: 'Речной квартал',
    hours: '08:00 – 23:00',
    open: 8 * 60,
    close: 23 * 60,
    phone: '+7 (000) 120-40-42',
    prepMinutes: 12,
    mapSeed: 2,
    features: ['Вид на реку', 'С собаками можно'],
  },
  {
    id: 'kashtanovy',
    name: 'Зерно в Каштановом',
    address: 'Каштановый проспект, 3, стр. 2',
    district: 'Бизнес-парк «Каштан»',
    hours: '07:00 – 21:00',
    open: 7 * 60,
    close: 21 * 60,
    phone: '+7 (000) 120-40-43',
    prepMinutes: 8,
    mapSeed: 3,
    features: ['Окно выдачи', 'Быстрый заказ'],
  },
]

export const reviews: Review[] = [
  {
    name: 'Алина Верескова',
    role: 'Заходит каждое утро',
    text: 'Заказываю флэт уайт из трамвая, а на Липовой он уже ждёт на стойке. Лучшие 8 минут моего утра.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #e39673, #a94f2d)',
  },
  {
    name: 'Тимофей Ладогин',
    role: 'Дизайнер, работает рядом',
    text: 'Сырники здесь можно есть на ужин, и никто не смотрит косо. Тыквенный раф — отдельная любовь.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #a8866d, #463023)',
  },
  {
    name: 'Вера Сомова',
    role: 'Гость с собакой',
    text: 'У реки пускают с собакой, а бариста всегда выносит ей миску воды. Кофе — огонь, круассаны хрустят.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #8fa27a, #5a6e4d)',
  },
  {
    name: 'Марк Ольховский',
    role: 'Любитель фильтра',
    text: 'Редко где можно попробовать моносорт недели и спокойно поболтать с бариста про обработку. Тут — да.',
    rating: 5,
    gradient: 'linear-gradient(135deg, #d9a441, #8a5230)',
  },
]

export const PROMO_CODES: Record<string, number> = {
  ZERNO10: 10,
}

export const paymentMethods: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: 'card', label: 'Картой онлайн', hint: 'Visa, Мир, Mastercard' },
  { id: 'sbp', label: 'СБП', hint: 'По QR-коду из приложения банка' },
  { id: 'cash', label: 'При получении', hint: 'Картой или наличными на кассе' },
]

export const ADMIN_CREDENTIALS = { login: 'barista', password: 'zerno2026' }

/** Шаблоны заказов «на сегодня» для админ-панели. minutesAgo — сколько минут назад создан. */
export const seedOrders: {
  minutesAgo: number
  shopId: string
  customer: string
  phone: string
  status: OrderStatus
  payment: PaymentMethod
  lines: { itemId: string; size?: string; milk?: string; qty: number }[]
  promo?: string
}[] = [
  { minutesAgo: 2, shopId: 'lipovaya', customer: 'Алина', phone: '+7 (000) 311-22-10', status: 'new', payment: 'card', lines: [{ itemId: 'flat-white', size: 'm', milk: 'oat', qty: 1 }, { itemId: 'croissant', qty: 1 }] },
  { minutesAgo: 5, shopId: 'naberezhnaya', customer: 'Глеб', phone: '+7 (000) 311-22-11', status: 'new', payment: 'sbp', lines: [{ itemId: 'pumpkin-raf', size: 'l', milk: 'cow', qty: 2 }] },
  { minutesAgo: 7, shopId: 'kashtanovy', customer: 'Ника', phone: '+7 (000) 311-22-12', status: 'new', payment: 'card', lines: [{ itemId: 'matcha-latte', size: 's', milk: 'almond', qty: 1 }, { itemId: 'granola', qty: 1 }], promo: 'ZERNO10' },
  { minutesAgo: 9, shopId: 'lipovaya', customer: 'Степан', phone: '+7 (000) 311-22-13', status: 'preparing', payment: 'cash', lines: [{ itemId: 'cappuccino', size: 'm', milk: 'cow', qty: 2 }, { itemId: 'syrniki', qty: 1 }] },
  { minutesAgo: 12, shopId: 'naberezhnaya', customer: 'Ульяна', phone: '+7 (000) 311-22-14', status: 'preparing', payment: 'card', lines: [{ itemId: 'shakshuka', qty: 1 }, { itemId: 'sea-buckthorn', size: 'pot', qty: 1 }] },
  { minutesAgo: 14, shopId: 'kashtanovy', customer: 'Роман', phone: '+7 (000) 311-22-15', status: 'preparing', payment: 'sbp', lines: [{ itemId: 'espresso', size: 'double', qty: 1 }] },
  { minutesAgo: 18, shopId: 'lipovaya', customer: 'Полина', phone: '+7 (000) 311-22-16', status: 'ready', payment: 'card', lines: [{ itemId: 'latte', size: 'l', milk: 'coconut', qty: 1 }, { itemId: 'cinnamon-roll', qty: 2 }] },
  { minutesAgo: 24, shopId: 'naberezhnaya', customer: 'Арсений', phone: '+7 (000) 311-22-17', status: 'ready', payment: 'card', lines: [{ itemId: 'cold-brew', size: 'm', qty: 1 }, { itemId: 'avocado-toast', qty: 1 }], promo: 'ZERNO10' },
  { minutesAgo: 41, shopId: 'kashtanovy', customer: 'Дарина', phone: '+7 (000) 311-22-18', status: 'done', payment: 'card', lines: [{ itemId: 'cappuccino', size: 's', milk: 'oat', qty: 3 }, { itemId: 'croissant', qty: 3 }] },
  { minutesAgo: 58, shopId: 'lipovaya', customer: 'Лев', phone: '+7 (000) 311-22-19', status: 'done', payment: 'cash', lines: [{ itemId: 'pumpkin-raf', size: 'm', milk: 'cow', qty: 1 }, { itemId: 'pumpkin-pie', qty: 1 }] },
  { minutesAgo: 73, shopId: 'naberezhnaya', customer: 'Мирра', phone: '+7 (000) 311-22-20', status: 'done', payment: 'sbp', lines: [{ itemId: 'flat-white', size: 's', milk: 'cow', qty: 2 }, { itemId: 'cheesecake', qty: 1 }] },
  { minutesAgo: 96, shopId: 'kashtanovy', customer: 'Фёдор', phone: '+7 (000) 311-22-21', status: 'done', payment: 'card', lines: [{ itemId: 'filter', size: 'l', qty: 1 }, { itemId: 'croque', qty: 1 }] },
  { minutesAgo: 124, shopId: 'lipovaya', customer: 'Эмилия', phone: '+7 (000) 311-22-22', status: 'done', payment: 'card', lines: [{ itemId: 'cappuccino', size: 'm', milk: 'almond', qty: 1 }, { itemId: 'syrniki', qty: 1 }, { itemId: 'macarons', qty: 1 }] },
  { minutesAgo: 150, shopId: 'naberezhnaya', customer: 'Игнат', phone: '+7 (000) 311-22-23', status: 'done', payment: 'cash', lines: [{ itemId: 'honey-raf', size: 'l', milk: 'cow', qty: 2 }] },
  { minutesAgo: 185, shopId: 'kashtanovy', customer: 'Ксения', phone: '+7 (000) 311-22-24', status: 'done', payment: 'card', lines: [{ itemId: 'latte', size: 'm', milk: 'lactose-free', qty: 2 }, { itemId: 'almond-croissant', qty: 2 }] },
  { minutesAgo: 220, shopId: 'lipovaya', customer: 'Савва', phone: '+7 (000) 311-22-25', status: 'done', payment: 'sbp', lines: [{ itemId: 'pumpkin-raf', size: 's', milk: 'oat', qty: 1 }, { itemId: 'croissant', qty: 1 }] },
]

export const FIRST_ORDER_NUMBER = 1024
