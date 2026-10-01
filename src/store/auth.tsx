import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ADMIN_CREDENTIALS } from '../data/mock'
import { load, save } from '../lib/storage'

const KEY = 'zerno:admin-session'

interface AuthCtx {
  user: string | null
  login: (login: string, password: string) => boolean
  logout: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

/** Имитация входа: проверяем пару логин/пароль из mock-данных и храним «сессию» в localStorage */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => load(KEY, null))
  useEffect(() => save(KEY, user), [user])

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      login: (login, password) => {
        const ok = login.trim() === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password
        if (ok) setUser('Бариста смены')
        return ok
      },
      logout: () => setUser(null),
    }),
    [user],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth вне AuthProvider')
  return ctx
}
