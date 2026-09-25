import { useId, type ReactNode } from 'react'
import type { IllustrationKind, Palette } from '../types'

interface Props {
  kind: IllustrationKind
  palette: Palette
  className?: string
  steam?: boolean
}

const Shadow = ({ rx = 72, cy = 206 }: { rx?: number; cy?: number }) => (
  <ellipse cx="120" cy={cy} rx={rx} ry="9" fill="#34231a" opacity="0.13" />
)

const Steam = ({ color = '#ffffff', y = 70 }: { color?: string; y?: number }) => (
  <g stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8">
    {[-22, 0, 22].map((dx, i) => (
      <path
        key={dx}
        d={`M${120 + dx} ${y} c-8 -10 8 -18 0 -30 c-6 -9 4 -14 2 -22`}
        className="animate-steam"
        style={{ animationDelay: `${i * 0.7}s`, transformBox: 'fill-box', transformOrigin: 'bottom' }}
      />
    ))}
  </g>
)

const Plate = ({ color, cy = 176, rx = 92 }: { color: string; cy?: number; rx?: number }) => (
  <g>
    <ellipse cx="120" cy={cy + 4} rx={rx} ry={rx * 0.26} fill="#34231a" opacity="0.08" />
    <ellipse cx="120" cy={cy} rx={rx} ry={rx * 0.26} fill={color} />
    <ellipse cx="120" cy={cy - 1} rx={rx * 0.72} ry={rx * 0.18} fill="#34231a" opacity="0.05" />
  </g>
)

const Leaf = ({ x, y, r = 0, s = 1, c = '#6f8560' }: { x: number; y: number; r?: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 0 C6 -12 20 -14 26 -12 C22 -2 12 6 0 0Z" fill={c} />
    <path d="M1 -1 C9 -6 16 -9 24 -11" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" fill="none" />
  </g>
)

function Cup({ p, id, crema, leaf }: { p: Palette; id: string; crema?: boolean; leaf?: boolean }) {
  return (
    <g>
      <Shadow rx={84} cy={196} />
      {/* блюдце */}
      <ellipse cx="120" cy="186" rx="88" ry="21" fill={p.ware} />
      <ellipse cx="120" cy="186" rx="88" ry="21" fill={`url(#${id}-shade)`} />
      <ellipse cx="120" cy="183" rx="58" ry="12" fill="#34231a" opacity="0.07" />
      {/* ручка */}
      <path d="M176 122 C206 116 208 156 176 162" stroke={p.ware} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M176 122 C206 116 208 156 176 162" stroke="#34231a" strokeOpacity=".08" strokeWidth="11" fill="none" strokeLinecap="round" />
      {/* корпус */}
      <path d="M56 106 C58 152 76 182 120 182 C164 182 182 152 184 106 Z" fill={p.ware} />
      <path d="M56 106 C58 152 76 182 120 182 C164 182 182 152 184 106 Z" fill={`url(#${id}-shade)`} />
      <path d="M72 122 C74 146 84 164 100 172" stroke="#fff" strokeOpacity=".45" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* край и напиток */}
      <ellipse cx="120" cy="106" rx="64" ry="17" fill={p.ware} />
      <ellipse cx="120" cy="107" rx="57" ry="13" fill={p.main} />
      {crema ? (
        <g>
          <ellipse cx="120" cy="107" rx="52" ry="11" fill={`url(#${id}-crema)`} />
          <circle cx="104" cy="104" r="2" fill={p.main} opacity=".5" />
          <circle cx="132" cy="110" r="1.6" fill={p.main} opacity=".5" />
          <circle cx="140" cy="103" r="1.2" fill={p.main} opacity=".4" />
        </g>
      ) : (
        <g transform="translate(120 108) scale(1 .44)">
          <ellipse cx="0" cy="0" rx="46" ry="24" fill={p.accent} opacity=".25" />
          <path
            d="M0 24 C-28 6 -32 -14 -17 -21 C-8 -25 -2 -19 0 -12 C2 -19 8 -25 17 -21 C32 -14 28 6 0 24Z"
            fill={p.accent}
          />
          <path d="M0 22 L0 -8" stroke={p.main} strokeWidth="2.4" opacity=".55" />
          <path d="M-10 -2 C-4 2 4 2 10 -2 M-12 8 C-4 12 4 12 12 8" stroke={p.main} strokeWidth="2" fill="none" opacity=".35" />
        </g>
      )}
      {leaf && (
        <g>
          <Leaf x={40} y={186} r={-20} s={1.1} />
          <Leaf x={52} y={192} r={10} s={0.9} c="#8aa05c" />
        </g>
      )}
    </g>
  )
}

function Espresso({ p, id }: { p: Palette; id: string }) {
  return (
    <g transform="translate(18 34) scale(.85)">
      <Cup p={p} id={id} crema />
    </g>
  )
}

function Glass({ p, id }: { p: Palette; id: string }) {
  const glass = 'M76 56 L164 56 L153 190 Q152 199 143 199 L97 199 Q88 199 87 190 Z'
  return (
    <g>
      <Shadow rx={52} cy={204} />
      <clipPath id={`${id}-glass`}>
        <path d={glass} />
      </clipPath>
      <g clipPath={`url(#${id}-glass)`}>
        <rect x="60" y="56" width="120" height="150" fill="#fff" opacity=".35" />
        {/* молочный слой и кофе с волной */}
        <rect x="60" y="74" width="120" height="140" fill={p.accent} />
        <path d="M60 128 C84 118 100 136 120 128 C140 120 156 136 180 126 L180 206 L60 206Z" fill={p.main} opacity=".55" />
        <path d="M60 150 C84 142 100 158 120 150 C140 142 156 158 180 148 L180 206 L60 206Z" fill={p.main} />
        <rect x="60" y="74" width="120" height="10" fill="#fff" opacity=".55" />
        {/* лёд */}
        <rect x="92" y="88" width="24" height="22" rx="6" fill="#fff" opacity=".4" transform="rotate(-12 104 99)" />
        <rect x="122" y="96" width="22" height="20" rx="6" fill="#fff" opacity=".3" transform="rotate(14 133 106)" />
        {/* корица на пенке */}
        {[96, 108, 118, 131, 142].map((x, i) => (
          <circle key={x} cx={x} cy={78 + (i % 2) * 3} r="1.6" fill="#8a5230" opacity=".7" />
        ))}
      </g>
      <path d={glass} fill="none" stroke="#fff" strokeWidth="3" opacity=".9" />
      <path d="M86 70 L95 184" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
      {/* трубочка */}
      <rect x="130" y="24" width="10" height="70" rx="5" fill="#c4613a" transform="rotate(14 135 60)" />
      <rect x="130" y="24" width="4" height="70" rx="2" fill="#fff" opacity=".3" transform="rotate(14 135 60)" />
    </g>
  )
}

function Tea({ p, id }: { p: Palette; id: string }) {
  const mug = 'M70 72 L170 72 L162 184 Q160 198 146 198 L94 198 Q80 198 78 184 Z'
  return (
    <g>
      <Shadow rx={62} cy={205} />
      <path d="M166 100 C200 98 202 150 162 156" stroke="#fff" strokeWidth="9" fill="none" opacity=".8" strokeLinecap="round" />
      <clipPath id={`${id}-mug`}>
        <path d={mug} />
      </clipPath>
      <g clipPath={`url(#${id}-mug)`}>
        <rect x="60" y="60" width="120" height="150" fill="#fff" opacity=".4" />
        <rect x="60" y="94" width="120" height="120" fill={`url(#${id}-tea)`} />
        <ellipse cx="120" cy="94" rx="50" ry="6" fill={p.accent} opacity=".6" />
        {/* ягоды / частички в чае */}
        <circle cx="100" cy="150" r="6" fill={p.accent} opacity=".85" />
        <circle cx="114" cy="170" r="5" fill={p.accent} opacity=".7" />
        <circle cx="140" cy="160" r="6.5" fill={p.accent} opacity=".8" />
        <circle cx="130" cy="182" r="4" fill={p.accent} opacity=".7" />
      </g>
      <path d={mug} fill="none" stroke="#fff" strokeWidth="3" opacity=".95" />
      <path d="M84 88 L92 182" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" />
      {/* долька цитруса */}
      <g transform="translate(150 84)">
        <circle r="24" fill="#f6c64a" />
        <circle r="20" fill="#fbe39a" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path key={i} d="M0 0 L0 -18" stroke="#f6c64a" strokeWidth="2" transform={`rotate(${i * 45})`} />
        ))}
      </g>
      <Leaf x={78} y={80} r={-30} s={1.1} />
      <Leaf x={86} y={78} r={-80} s={0.9} c="#8aa05c" />
      <Steam y={62} />
    </g>
  )
}

function Croissant({ p, id }: { p: Palette; id: string }) {
  const body =
    'M34 160 C36 116 80 86 120 86 C160 86 204 116 206 160 C192 152 176 146 160 148 C148 138 134 134 120 134 C106 134 92 138 80 148 C64 146 48 152 34 160Z'
  return (
    <g>
      <Plate color={p.ware} cy={174} />
      <path d={body} fill="#34231a" opacity=".12" transform="translate(0 8)" />
      <path d={body} fill={`url(#${id}-bake)`} />
      {/* складки теста */}
      <g stroke={p.accent} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".75">
        <path d="M64 114 Q70 134 80 148" />
        <path d="M94 94 Q98 118 104 137" />
        <path d="M146 94 Q142 118 136 137" />
        <path d="M176 114 Q170 134 160 148" />
      </g>
      <path d="M92 104 Q120 92 148 104" stroke="#fff" strokeOpacity=".4" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M50 138 Q56 126 66 120" stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* миндальные лепестки / пудра */}
      {[
        [108, 100, -20],
        [128, 98, 30],
        [140, 112, -10],
        [96, 116, 40],
        [120, 114, 70],
      ].map(([x, y, r]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="2.4" fill="#fff" opacity=".45" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </g>
  )
}

function Cake({ p, id }: { p: Palette; id: string }) {
  return (
    <g>
      <Plate color={p.ware} cy={176} />
      {/* основание */}
      <path d="M56 158 L168 170 L186 144 L186 152 L168 180 L56 168 Z" fill="#8a5230" />
      {/* грани */}
      <path d="M56 116 L168 126 L168 170 L56 158 Z" fill={p.main} />
      <path d="M56 116 L168 126 L168 170 L56 158 Z" fill={`url(#${id}-side)`} />
      <path d="M168 126 L186 100 L186 144 L168 170 Z" fill={p.main} />
      <path d="M168 126 L186 100 L186 144 L168 170 Z" fill="#34231a" opacity=".16" />
      {/* верх */}
      <path d="M56 116 L186 100 L168 126 Z" fill={p.accent} />
      <path d="M56 116 L168 126 L168 134 C150 128 140 136 128 130 C116 124 104 132 92 126 C80 121 70 124 56 120 Z" fill={p.accent} />
      <path d="M140 131 C140 142 146 142 146 132" fill={p.accent} />
      {/* ягоды и крем */}
      <ellipse cx="150" cy="104" rx="16" ry="8" fill="#fff" opacity=".9" />
      <ellipse cx="150" cy="99" rx="10" ry="6" fill="#fff" />
      <circle cx="150" cy="92" r="6" fill="#9c3b41" />
      <circle cx="148" cy="90" r="1.6" fill="#fff" opacity=".6" />
      <Leaf x={156} y={92} r={-40} s={0.6} />
    </g>
  )
}

function Roll({ p, id }: { p: Palette; id: string }) {
  const pts: string[] = []
  for (let t = 0; t <= Math.PI * 5.2; t += 0.12) {
    const r = 3 + t * 3.7
    pts.push(`${(120 + r * Math.cos(t)).toFixed(1)},${(128 + r * 0.62 * Math.sin(t)).toFixed(1)}`)
  }
  return (
    <g>
      <Plate color={p.ware} cy={176} />
      <ellipse cx="120" cy="148" rx="66" ry="34" fill={p.accent} />
      <rect x="54" y="128" width="132" height="20" fill={p.accent} />
      <ellipse cx="120" cy="128" rx="66" ry="40" fill={`url(#${id}-bake)`} />
      <polyline points={pts.join(' ')} fill="none" stroke={p.accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".85" />
      {/* глазурь */}
      <path
        d="M70 116 C84 100 96 132 110 112 C122 96 132 130 146 110 C156 98 168 118 172 124"
        stroke="#fffaf0"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M96 122 C98 138 104 138 104 126" fill="#fffaf0" />
      <path d="M150 116 C150 132 156 134 157 120" fill="#fffaf0" />
    </g>
  )
}

function Macarons({ p }: { p: Palette }) {
  const one = (y: number, c: string, x = 0) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x="62" y="0" width="116" height="26" rx="13" fill={c} />
      <rect x="62" y="0" width="116" height="26" rx="13" fill="#fff" opacity=".18" />
      <path d="M66 24 Q120 30 174 24" stroke="#34231a" strokeOpacity=".12" strokeWidth="3" fill="none" />
      <rect x="70" y="26" width="100" height="10" rx="5" fill="#fff6e6" />
      <rect x="62" y="34" width="116" height="26" rx="13" fill={c} />
      <ellipse cx="96" cy="40" rx="18" ry="3" fill="#fff" opacity=".35" />
    </g>
  )
  return (
    <g>
      <Shadow rx={70} cy={200} />
      {one(136, '#d9a36a', -4)}
      {one(82, p.accent, 6)}
      {one(28, p.main, -2)}
    </g>
  )
}

function Syrniki({ p, id }: { p: Palette; id: string }) {
  const one = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="12" rx="34" ry="14" fill="#a8642c" />
      <rect x="-34" y="0" width="68" height="12" fill="#c98543" />
      <ellipse cx="0" cy="0" rx="34" ry="14" fill={`url(#${id}-bake)`} />
      <ellipse cx="-8" cy="-4" rx="14" ry="4" fill="#fff" opacity=".25" />
    </g>
  )
  return (
    <g>
      <Plate color={p.ware} cy={170} rx={98} />
      {one(84, 150)}
      {one(152, 150)}
      {one(118, 124, 1.04)}
      {/* сметана */}
      <ellipse cx="120" cy="116" rx="18" ry="8" fill="#fffdf7" />
      <path d="M108 114 C112 102 128 102 132 112 C126 108 116 108 108 114Z" fill="#fffdf7" />
      <path d="M120 104 C124 96 116 94 120 90" stroke="#fffdf7" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* ягоды */}
      <circle cx="58" cy="176" r="7" fill={p.accent} />
      <circle cx="70" cy="184" r="6" fill={p.accent} />
      <circle cx="182" cy="178" r="7" fill="#3d3a6b" />
      <circle cx="56" cy="174" r="2" fill="#fff" opacity=".5" />
      <Leaf x={168} y={172} r={-150} s={0.9} />
    </g>
  )
}

function Toast({ p, id }: { p: Palette; id: string }) {
  const bread =
    'M60 170 L60 108 C60 82 84 76 96 86 C104 68 136 68 144 86 C156 76 180 82 180 108 L180 170 Q180 180 170 180 L70 180 Q60 180 60 170Z'
  return (
    <g>
      <Plate color={p.ware} cy={180} rx={100} />
      <g transform="rotate(-6 120 130)">
        <path d={bread} fill="#9a5b2c" />
        <path d={bread} fill={`url(#${id}-bake)`} transform="translate(120 128) scale(.86) translate(-120 -128)" />
        {/* слайсы авокадо / сыра */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={i}
            cx={86 + i * 17}
            cy={146 - (i % 2) * 4}
            rx="12"
            ry="26"
            fill={p.accent}
            stroke="#fff"
            strokeOpacity=".35"
            strokeWidth="2"
            transform={`rotate(${-24 + i * 12} ${86 + i * 17} 146)`}
          />
        ))}
        {/* яйцо */}
        <path d="M100 106 C96 88 126 84 140 94 C156 104 146 124 128 124 C110 126 102 120 100 106Z" fill="#fffdf7" />
        <circle cx="122" cy="106" r="11" fill="#f5a524" />
        <circle cx="118" cy="102" r="3.2" fill="#fff" opacity=".6" />
        {[
          [84, 118],
          [150, 126],
          [96, 170],
          [160, 162],
        ].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#3b2a20" opacity=".7" />
        ))}
      </g>
      <Leaf x={170} y={96} r={-120} s={0.8} />
    </g>
  )
}

function Bowl({ p }: { p: Palette }) {
  return (
    <g>
      <Shadow rx={66} cy={204} />
      <path d="M92 190 L148 190 L144 200 L96 200 Z" fill={p.ware} />
      <path d="M44 116 C48 168 84 196 120 196 C156 196 192 168 196 116 Z" fill={p.ware} />
      <path d="M44 116 C48 168 84 196 120 196 C156 196 192 168 196 116 Z" fill="#34231a" opacity=".1" />
      <path d="M58 132 C66 162 88 180 110 186" stroke="#fff" strokeOpacity=".3" strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="120" cy="116" rx="76" ry="20" fill={p.ware} />
      <ellipse cx="120" cy="116" rx="68" ry="15" fill={p.main} />
      {/* гранола */}
      {[
        [82, 112, 7],
        [94, 118, 6],
        [104, 110, 5],
        [88, 122, 5],
        [100, 124, 4],
        [74, 118, 4],
      ].map(([x, y, r]) => (
        <rect key={`${x}${y}`} x={x - r} y={y - r * 0.7} width={r * 2} height={r * 1.4} rx={r * 0.5} fill="#c28a4a" />
      ))}
      {/* ягоды */}
      <circle cx="136" cy="110" r="7" fill={p.accent} />
      <circle cx="150" cy="118" r="6" fill={p.accent} />
      <circle cx="160" cy="108" r="6" fill="#3d3a6b" />
      <circle cx="134" cy="108" r="2" fill="#fff" opacity=".5" />
      <path d="M114 106 C122 114 128 120 146 124" stroke="#e6b547" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".9" />
      <Leaf x={120} y={112} r={-70} s={0.8} />
    </g>
  )
}

function Pan({ p }: { p: Palette }) {
  return (
    <g>
      <Shadow rx={82} cy={200} />
      <rect x="176" y="74" width="16" height="64" rx="8" fill={p.ware} transform="rotate(48 184 106)" />
      <ellipse cx="116" cy="140" rx="84" ry="54" fill={p.ware} />
      <ellipse cx="116" cy="134" rx="76" ry="46" fill={p.main} />
      <ellipse cx="116" cy="134" rx="76" ry="46" fill="#34231a" opacity=".06" />
      {[
        [70, 140],
        [150, 120],
        [96, 160],
        [158, 156],
        [120, 104],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#e0633f" />
      ))}
      {[
        [88, 124],
        [140, 146],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <ellipse cx={x} cy={y} rx="20" ry="14" fill={p.accent} />
          <circle cx={x + 2} cy={y - 1} r="7.5" fill="#f5a524" />
          <circle cx={x} cy={y - 3} r="2.2" fill="#fff" opacity=".6" />
        </g>
      ))}
      {[
        [120, 130],
        [70, 150],
        [160, 128],
      ].map(([x, y]) => (
        <rect key={`${x}${y}`} x={x} y={y} width="9" height="8" rx="2" fill="#fffaf0" transform={`rotate(20 ${x} ${y})`} />
      ))}
      {[
        [104, 140],
        [128, 116],
        [80, 108],
        [150, 164],
        [112, 164],
        [170, 140],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill="#6f8560" />
      ))}
    </g>
  )
}

export default function Illustration({ kind, palette: p, className, steam = true }: Props) {
  const id = 'i' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const hot = steam && ['cup', 'matcha'].includes(kind)

  let body: ReactNode
  switch (kind) {
    case 'cup':
      body = <Cup p={p} id={id} />
      break
    case 'matcha':
      body = <Cup p={p} id={id} leaf />
      break
    case 'espresso':
      body = <Espresso p={p} id={id} />
      break
    case 'glass':
      body = <Glass p={p} id={id} />
      break
    case 'tea':
      body = <Tea p={p} id={id} />
      break
    case 'croissant':
      body = <Croissant p={p} id={id} />
      break
    case 'cake':
      body = <Cake p={p} id={id} />
      break
    case 'roll':
      body = <Roll p={p} id={id} />
      break
    case 'macarons':
      body = <Macarons p={p} />
      break
    case 'syrniki':
      body = <Syrniki p={p} id={id} />
      break
    case 'toast':
      body = <Toast p={p} id={id} />
      break
    case 'bowl':
      body = <Bowl p={p} />
      break
    case 'pan':
      body = <Pan p={p} />
      break
  }

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" x2="1">
          <stop offset="0.45" stopColor="#34231a" stopOpacity="0" />
          <stop offset="1" stopColor="#34231a" stopOpacity="0.16" />
        </linearGradient>
        <radialGradient id={`${id}-crema`} cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor={p.accent} />
          <stop offset=".7" stopColor={p.accent} stopOpacity=".85" />
          <stop offset="1" stopColor={p.main} />
        </radialGradient>
        <linearGradient id={`${id}-tea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.main} stopOpacity=".75" />
          <stop offset="1" stopColor={p.main} />
        </linearGradient>
        <radialGradient id={`${id}-bake`} cx=".4" cy=".3" r=".9">
          <stop offset="0" stopColor="#f6d39b" />
          <stop offset=".45" stopColor={p.main} />
          <stop offset="1" stopColor="#9a5b2c" />
        </radialGradient>
        <linearGradient id={`${id}-side`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".25" />
          <stop offset="1" stopColor="#34231a" stopOpacity=".08" />
        </linearGradient>
      </defs>
      {hot && <Steam color="#ffffff" y={74} />}
      {body}
    </svg>
  )
}
