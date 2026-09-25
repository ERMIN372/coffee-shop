import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Admin from './pages/Admin'
import { CartProvider } from './store/cart'
import { OrdersProvider } from './store/orders'
import { AuthProvider } from './store/auth'

// HashRouter: GitHub Pages не умеет отдавать index.html на любые пути,
// поэтому маршрут живёт после # и обновление страницы не даёт 404
export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order/:id" element={<OrderSuccess />} />
              </Route>
              <Route path="admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </HashRouter>
  )
}
