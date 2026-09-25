/** Стилизованная SVG-карта района: без внешних тайлов, просто геометрия */
export default function ShopMap({ seed, className }: { seed: number; className?: string }) {
  const river = seed === 2
  const park = seed !== 2
  return (
    <svg viewBox="0 0 400 220" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="220" fill="#efe3d0" />
      {/* кварталы */}
      {Array.from({ length: 6 }).map((_, c) =>
        Array.from({ length: 4 }).map((__, r) => {
          const x = c * 70 - ((seed * 17) % 30)
          const y = r * 60 - ((seed * 11) % 24)
          return <rect key={`${c}-${r}`} x={x + 8} y={y + 8} width="54" height="44" rx="8" fill="#e6d5bd" />
        }),
      )}
      {park && (
        <g>
          <rect x={seed === 1 ? 250 : 40} y={seed === 1 ? 20 : 130} width="120" height="80" rx="18" fill="#cfd8bf" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={(seed === 1 ? 270 : 60) + i * 20} cy={(seed === 1 ? 50 : 160) + (i % 2) * 18} r="8" fill="#b4c29f" />
          ))}
        </g>
      )}
      {river && (
        <path d="M-10 170 C80 140 140 200 230 160 C300 130 340 150 410 120 L410 230 L-10 230Z" fill="#c9d8d6" />
      )}
      {/* улицы */}
      <path d={`M0 ${96 + seed * 4} L400 ${80 + seed * 6}`} stroke="#fdfaf5" strokeWidth="12" />
      <path d={`M${150 + seed * 12} 0 L${170 + seed * 8} 220`} stroke="#fdfaf5" strokeWidth="10" />
      <path d="M0 30 L400 44" stroke="#fdfaf5" strokeWidth="5" opacity=".8" />
      <path d={`M${300 - seed * 10} 0 L${280 - seed * 6} 220`} stroke="#fdfaf5" strokeWidth="5" opacity=".8" />
      {/* маршрут до точки */}
      <path
        d={`M40 ${200 - seed * 4} C90 ${150 - seed * 6} 120 ${120 - seed * 2} ${162 + seed * 10} ${90 + seed * 5}`}
        stroke="#c4613a"
        strokeWidth="3"
        strokeDasharray="2 7"
        strokeLinecap="round"
        fill="none"
      />
      {/* пин */}
      <g transform={`translate(${162 + seed * 10} ${90 + seed * 5})`}>
        <circle r="26" fill="#c4613a" opacity=".15">
          <animate attributeName="r" values="14;30;14" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;0;.35" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <path d="M0 6 C-12 -6 -14 -12 -14 -18 A14 14 0 0 1 14 -18 C14 -12 12 -6 0 6Z" fill="#34231a" />
        <circle cy="-18" r="6" fill="#c4613a" />
      </g>
    </svg>
  )
}
