import { useEffect } from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import ProductModal from './ProductModal'
import Toast from './Toast'
import { useCart } from '../store/cart'

export default function Layout() {
  const { pathname, state } = useLocation()
  const [params] = useSearchParams()
  const { open, close, closeConfig } = useCart()

  // при переходе на другую страницу закрываем корзину и модалку
  useEffect(() => {
    close()
    closeConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // прокрутка наверх при смене страницы или к нужному блоку
  useEffect(() => {
    const target = (state as { scrollTo?: string } | null)?.scrollTo
    if (target) {
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [pathname, state])

  // ?cart=open — открыть корзину сразу (удобно для скриншотов)
  useEffect(() => {
    if (params.get('cart') === 'open') open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ProductModal />
      <Toast />
    </div>
  )
}
