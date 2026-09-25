import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
  Egg,
  Flame,
  Leaf,
  MapPin,
  Plus,
  Quote,
  Star,
  Timer,
} from 'lucide-react'
import Illustration from '../components/Illustration'
import ShopMap from '../components/ShopMap'
import { Bean } from '../components/Beans'
import { advantages, menu, reviews, seasonal, shops } from '../data/mock'
import { getItem } from '../lib/menu'
import { isShopOpen } from '../lib/slots'
import { rub } from '../lib/format'
import { useCart } from '../store/cart'

const heroCup = getItem('cappuccino')!

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-[640px] rounded-full bg-cream-300/60 blur-[120px]" />
        <div className="absolute top-20 right-[-10%] size-[720px] rounded-full bg-terra-200/50 blur-[140px]" />
        <div className="grain absolute inset-0 opacity-70" />
      </div>

      <div className="container-x relative grid items-center gap-12 pt-10 pb-20 lg:min-h-[min(calc(100vh-76px),860px)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-6 lg:pb-16">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-coffee-800/10 bg-white/60 py-1.5 pr-4 pl-2 text-[13px] font-medium text-coffee-600 backdrop-blur">
            <span className="relative flex size-6 items-center justify-center rounded-full bg-sage-100">
              <span className="absolute size-2.5 animate-ping rounded-full bg-sage-500 opacity-60" />
              <span className="size-2 rounded-full bg-sage-500" />
            </span>
            Открыто сейчас · зерно недели — Эфиопия
          </span>

          <h1 className="mt-8 font-display text-[48px] leading-[1.04] font-medium tracking-[-0.02em] text-coffee-900 sm:text-[68px] xl:text-[84px]">
            <span className="whitespace-nowrap">Кофе, который</span>
            <br />
            <em className="font-normal text-terra-500 italic">ждёт вас</em>
            <br />у стойки
          </h1>

          <p className="mt-7 max-w-[520px] text-lg leading-relaxed text-coffee-500 sm:text-xl">
            Закажите онлайн за минуту — бариста приготовит всё к нужному времени. Своя обжарка, утренняя выпечка и
            завтраки весь день.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/menu" className="btn-primary px-8 py-4 text-base">
              Заказать навынос <ArrowRight className="size-5" />
            </Link>
            <Link to="/" state={{ scrollTo: 'shops' }} className="btn-ghost px-7 py-4 text-base">
              <MapPin className="size-5" /> 3 кофейни рядом
            </Link>
          </div>

          <dl className="mt-14 grid max-w-[560px] grid-cols-3 divide-x divide-coffee-800/10">
            {[
              ['14 дней', 'максимальный возраст зерна'],
              ['8 мин', 'среднее время готовности'],
              ['4,9', 'рейтинг по 2 400 отзывам'],
            ].map(([v, l], i) => (
              <div key={v} className={i ? 'pl-5 sm:pl-7' : 'pr-5'}>
                <dt className="flex items-center gap-1 font-display text-[28px] font-semibold text-coffee-900 sm:text-[34px]">
                  {v}
                  {i === 2 && <Star className="size-5 fill-terra-500 text-terra-500" />}
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-coffee-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[620px] animate-fade-up [animation-delay:.15s]">
          {/* круги-подложки */}
          <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-terra-300 via-terra-400 to-terra-600 shadow-[0_60px_120px_-40px_rgba(169,79,45,.7)]" />
          <div className="absolute inset-[6%] rounded-full grain opacity-50 mix-blend-multiply" />
          <div className="absolute inset-[16%] rounded-full border border-cream-50/30" />
          <div className="absolute inset-[26%] rounded-full border border-cream-50/20" />

          <Illustration kind={heroCup.kind} palette={{ ...heroCup.palette, ware: '#fdfaf5' }} className="absolute inset-[10%] drop-shadow-[0_30px_40px_rgba(52,35,26,.35)]" />

          <Bean className="absolute top-[4%] left-[18%] w-9 rotate-[-24deg] animate-float" />
          <Bean className="absolute top-[18%] right-[2%] w-7 rotate-[40deg] animate-float [animation-delay:1.2s]" />
          <Bean className="absolute bottom-[10%] left-[4%] w-11 rotate-[70deg] animate-float [animation-delay:2s]" />
          <Bean className="absolute right-[18%] bottom-[2%] w-6 rotate-[-10deg] animate-float [animation-delay:.6s]" />

          <div className="absolute top-[12%] left-[-2%] animate-float rounded-3xl border border-white/60 bg-cream-50/85 p-4 pr-6 shadow-lift backdrop-blur-md [animation-delay:.4s] sm:left-[-6%]">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-sage-100 text-sage-600">
                <CheckCircle2 className="size-6" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-coffee-900">Флэт уайт готов</p>
                <p className="text-[13px] text-coffee-400">Заказ №1042 · ул. Липовая, 14</p>
              </div>
            </div>
          </div>

          <div className="absolute right-[-2%] bottom-[14%] w-[230px] animate-float rounded-3xl border border-white/60 bg-cream-50/90 p-5 shadow-lift backdrop-blur-md [animation-delay:1.6s] sm:right-[-4%]">
            <p className="eyebrow">Зерно недели</p>
            <p className="mt-2 font-display text-xl font-semibold text-coffee-900">Эфиопия, Сидамо</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['жасмин', 'бергамот', 'мёд'].map((n) => (
                <span key={n} className="rounded-full bg-cream-200 px-2.5 py-1 text-[12px] font-medium text-coffee-600">
                  {n}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-coffee-400">
              <Flame className="size-3.5 text-terra-500" /> Обжарка 3 дня назад
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Seasonal() {
  const { pick } = useCart()
  const items = seasonal.itemIds.map((id) => getItem(id)!).filter(Boolean)
  return (
    <section className="container-x">
      <div className="relative overflow-hidden rounded-[40px] bg-coffee-900 px-6 py-12 text-cream-50 sm:px-12 lg:px-16 lg:py-16">
        <div className="grain absolute inset-0 opacity-60" />
        <div className="absolute -top-32 -left-24 size-[520px] rounded-full bg-terra-500/35 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-40%] size-[560px] rounded-full bg-[#e59a5a]/25 blur-[140px]" />
        <span className="absolute top-10 right-12 hidden rotate-12 text-6xl opacity-80 lg:block">🍂</span>
        <span className="absolute bottom-10 left-[36%] hidden -rotate-12 text-4xl opacity-60 lg:block">🍁</span>

        <div className="relative grid items-center gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <span className="eyebrow text-terra-300">Сезонное меню</span>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] font-medium sm:text-6xl">
              Осень <em className="text-terra-300 italic">в чашке</em>
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-cream-200/75">{seasonal.subtitle}</p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-cream-50/10 bg-cream-50/5 px-4 py-3 backdrop-blur">
              <span className="text-2xl">🎃</span>
              <div>
                <p className="text-[15px] font-semibold">{seasonal.deal}</p>
                <p className="text-[13px] text-cream-200/60">{seasonal.dealHint}</p>
              </div>
            </div>
            <div className="mt-9">
              <Link to="/menu" className="btn bg-cream-50 text-coffee-900 hover:-translate-y-0.5 hover:bg-white">
                Всё сезонное меню <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {items.map((item, i) => (
              <article
                key={item.id}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-cream-50 text-coffee-900 transition duration-500 hover:-translate-y-2 ${i === 1 ? 'sm:translate-y-8 sm:hover:translate-y-6' : ''}`}
              >
                <div className="relative grid aspect-[4/3.6] place-items-center" style={{ background: item.palette.bg }}>
                  <Illustration kind={item.kind} palette={item.palette} className="w-[78%] transition duration-700 group-hover:scale-105 group-hover:-rotate-3" />
                  <span className="absolute top-4 left-4 rounded-full bg-cream-50/80 px-3 py-1 text-[12px] font-bold backdrop-blur">
                    {item.category === 'desserts' ? 'Десерт' : item.category === 'tea' ? 'Чай' : 'Кофе'}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-coffee-400">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-lg font-semibold">{rub(item.price)}</span>
                    <button
                      onClick={() => pick(item)}
                      className="grid size-11 place-items-center rounded-full bg-coffee-800 text-cream-50 transition hover:scale-110 hover:bg-terra-500"
                      aria-label={`Добавить ${item.name}`}
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const advIcons = { flame: Flame, egg: Egg, timer: Timer, leaf: Leaf }

function Advantages() {
  const [roast, breakfast, timer, leaf] = advantages
  const RoastIcon = advIcons[roast.icon]
  const breakfastItems = menu.filter((m) => m.category === 'breakfast').slice(0, 3)
  return (
    <section className="container-x pt-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Почему к нам возвращаются</span>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight font-medium text-coffee-900 sm:text-5xl">
            Маленькая кофейня с&nbsp;большим вниманием к&nbsp;деталям
          </h2>
        </div>
        <p className="max-w-sm text-[16px] leading-relaxed text-coffee-500">
          Мы не сеть с одинаковым меню. Каждая чашка — это зерно, которое мы выбрали, обжарили и попробовали сами.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
        <article className="group relative overflow-hidden rounded-[32px] bg-coffee-800 p-8 text-cream-50 md:col-span-2 lg:row-span-2 lg:p-10">
          <div className="grain absolute inset-0 opacity-50" />
          <div className="absolute -right-24 -bottom-24 size-96 rounded-full bg-terra-500/30 blur-3xl transition duration-700 group-hover:bg-terra-500/45" />
          <Bean className="absolute top-10 right-12 hidden w-24 rotate-[28deg] opacity-90 transition duration-700 group-hover:rotate-[40deg] lg:block" />
          <Bean className="absolute top-40 right-40 hidden w-12 -rotate-12 opacity-60 transition duration-700 group-hover:-rotate-[30deg] lg:block" />
          <Bean className="absolute top-56 right-16 hidden w-16 rotate-[80deg] opacity-40 lg:block" />
          <div className="relative flex h-full flex-col">
            <span className="grid size-14 place-items-center rounded-2xl bg-terra-500 shadow-glow">
              <RoastIcon className="size-7" />
            </span>
            <h3 className="mt-8 font-display text-4xl font-medium">{roast.title}</h3>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-cream-200/75">{roast.text}</p>

            {/* шкала обжарки */}
            <div className="mt-10 lg:mt-auto">
              <div className="flex justify-between text-[12px] font-semibold tracking-wider text-cream-200/50 uppercase">
                <span>Светлая</span>
                <span>Средняя</span>
                <span>Тёмная</span>
              </div>
              <div className="relative mt-3 h-3 rounded-full bg-gradient-to-r from-[#e4c29a] via-[#9a5b2c] to-[#2a1b14]">
                <span className="absolute top-1/2 left-[28%] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cream-50 bg-terra-500 shadow-glow" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ['Эфиопия', 'эспрессо'],
                  ['Колумбия', 'фильтр'],
                  ['Бразилия', 'молочные'],
                ].map(([c, u]) => (
                  <div key={c} className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-4 backdrop-blur">
                    <Bean className="w-4" />
                    <p className="mt-3 font-semibold">{c}</p>
                    <p className="text-[13px] text-cream-200/60">для {u}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-[32px] bg-terra-100 p-8 md:col-span-2 lg:p-10">
          <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <span className="grid size-14 place-items-center rounded-2xl bg-cream-50 text-terra-500 shadow-soft">
                <Egg className="size-7" />
              </span>
              <h3 className="mt-7 font-display text-3xl font-medium text-coffee-900">{breakfast.title}</h3>
              <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-coffee-600">{breakfast.text}</p>
            </div>
            <div className="flex -space-x-8">
              {breakfastItems.map((b, i) => (
                <div
                  key={b.id}
                  className="grid size-28 place-items-center rounded-full border-4 border-terra-100 shadow-soft transition duration-500 group-hover:-translate-y-1"
                  style={{ background: b.palette.bg, transitionDelay: `${i * 60}ms` }}
                >
                  <Illustration kind={b.kind} palette={b.palette} className="size-24" />
                </div>
              ))}
            </div>
          </div>
        </article>

        {[timer, leaf].map((a) => {
          const Icon = advIcons[a.icon]
          return (
            <article key={a.title} className="card group p-8 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid size-14 place-items-center rounded-2xl bg-cream-200 text-coffee-700 transition group-hover:bg-coffee-800 group-hover:text-cream-50">
                <Icon className="size-7" />
              </span>
              <h3 className="mt-7 font-display text-2xl font-medium text-coffee-900">{a.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-coffee-500">{a.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Shops() {
  const now = new Date()
  return (
    <section id="shops" className="container-x scroll-mt-24 pt-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Наши кофейни</span>
          <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-coffee-900 sm:text-5xl">
            Три адреса — <em className="text-terra-500 italic">один вкус</em>
          </h2>
        </div>
        <p className="max-w-sm text-[16px] leading-relaxed text-coffee-500">
          Выберите кофейню при оформлении, и заказ будет ждать вас на полке выдачи с вашим именем.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {shops.map((s) => {
          const open = isShopOpen(s, now)
          return (
            <article key={s.id} className="card group overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="relative h-52 overflow-hidden">
                <ShopMap seed={s.mapSeed} className="size-full transition duration-700 group-hover:scale-105" />
                <span
                  className={`absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-bold backdrop-blur ${
                    open ? 'bg-cream-50/90 text-sage-600' : 'bg-coffee-900/80 text-cream-100'
                  }`}
                >
                  <span className={`size-2 rounded-full ${open ? 'bg-sage-500' : 'bg-coffee-300'}`} />
                  {open ? 'Открыто' : 'Закрыто'}
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-cream-50/90 px-3 py-1.5 text-[12px] font-bold text-coffee-700 backdrop-blur">
                  ≈ {s.prepMinutes} мин
                </span>
              </div>
              <div className="p-7">
                <p className="text-[13px] font-semibold text-coffee-400">{s.district}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-coffee-900">{s.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-[15px] text-coffee-600">
                  <MapPin className="size-4 text-terra-500" /> {s.address}
                </p>
                <p className="mt-2 flex items-center gap-2 text-[15px] text-coffee-600">
                  <Clock className="size-4 text-terra-500" /> {s.hours}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span key={f} className="rounded-full bg-cream-200 px-3 py-1 text-[12px] font-medium text-coffee-600">
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  to="/menu"
                  state={{ shopId: s.id }}
                  onClick={() => {
                    try {
                      localStorage.setItem('zerno:shop', JSON.stringify(s.id))
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="mt-7 flex items-center justify-between rounded-2xl border border-coffee-800/10 px-5 py-3.5 font-semibold text-coffee-800 transition group-hover:border-coffee-800 group-hover:bg-coffee-800 group-hover:text-cream-50"
                >
                  Заказать отсюда <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="container-x pt-28">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_2fr]">
        <div>
          <span className="eyebrow">Отзывы</span>
          <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-coffee-900 sm:text-5xl">Говорят гости</h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="font-display text-7xl font-medium text-coffee-900">4,9</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-terra-500 text-terra-500" />
                ))}
              </div>
              <p className="mt-1.5 text-[14px] text-coffee-400">2 400 оценок за год</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className={`card relative p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lift ${i % 2 ? 'sm:translate-y-8' : ''}`}
            >
              <Quote className="absolute top-6 right-6 size-10 text-cream-300" />
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="size-4 fill-terra-500 text-terra-500" />
                ))}
              </div>
              <blockquote className="mt-4 text-[16px] leading-relaxed text-coffee-700">«{r.text}»</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full text-[15px] font-bold text-white" style={{ background: r.gradient }}>
                  {r.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span>
                  <span className="block font-semibold text-coffee-900">{r.name}</span>
                  <span className="text-[13px] text-coffee-400">{r.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function PromoBand() {
  const [copied, setCopied] = useState(false)
  return (
    <section className="container-x pt-32">
      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-terra-400 via-terra-500 to-terra-700 px-6 py-12 text-cream-50 sm:px-14 sm:py-14">
        <div className="grain absolute inset-0 opacity-40 mix-blend-multiply" />
        <div className="absolute -top-10 right-40 size-72 rounded-full bg-cream-50/10 blur-2xl" />
        <Bean className="absolute top-8 right-10 w-10 rotate-12 opacity-80" />
        <Bean className="absolute right-40 bottom-6 w-7 -rotate-45 opacity-70" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-4xl leading-tight font-medium sm:text-5xl">Первый заказ онлайн — <span className="whitespace-nowrap">минус 10%</span></h2>
            <p className="mt-3 text-[17px] text-cream-50/80">Введите промокод при оформлении. Действует на всё меню.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText('ZERNO10').catch(() => undefined)
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1800)
              }}
              className="flex items-center gap-3 rounded-full border-2 border-dashed border-cream-50/50 px-6 py-3.5 font-mono text-lg font-bold tracking-widest transition hover:bg-cream-50/10"
            >
              ZERNO10 {copied ? <CheckCircle2 className="size-5" /> : <Copy className="size-5 opacity-70" />}
            </button>
            <Link to="/menu" className="btn bg-coffee-900 px-7 py-4 text-cream-50 hover:-translate-y-0.5 hover:bg-coffee-800">
              В меню <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Seasonal />
      <Advantages />
      <Shops />
      <Reviews />
      <PromoBand />
    </>
  )
}
