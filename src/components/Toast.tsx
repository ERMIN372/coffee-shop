import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../store/cart'

export default function Toast() {
  const { toast, open, isOpen } = useCart()
  if (!toast || isOpen) return null
  return (
    <div key={toast.id} className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 animate-fade-up">
      <div className="flex items-center gap-3 rounded-full bg-coffee-900 py-2 pr-2 pl-4 text-[14px] text-cream-50 shadow-lift">
        <CheckCircle2 className="size-5 text-terra-300" />
        <span className="max-w-[52vw] truncate">{toast.text}</span>
        <button onClick={open} className="rounded-full bg-cream-50/10 px-4 py-2 font-semibold transition hover:bg-terra-500">
          Открыть
        </button>
      </div>
    </div>
  )
}
