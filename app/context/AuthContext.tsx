import { createContext, useEffect, useState } from 'react'

export type AuthContextType = {
  userData: null | {}
  setUserData: React.Dispatch<React.SetStateAction<null | {}>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<null | {}>(null)

  useEffect(() => {}, [])

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}
