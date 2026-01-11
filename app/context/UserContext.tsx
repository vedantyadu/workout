import { UserDataType } from '@/types/user'
import { backend } from '@/utils/axios/backend'
import { createContext, useLayoutEffect, useState } from 'react'

export type UserContextType = {
  userDataFetched: boolean
  setUserDataFetched: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserDataType | null
  setUserData: React.Dispatch<React.SetStateAction<UserDataType | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userDataFetched, setUserDataFetched] = useState(false)
  const [userData, setUserData] = useState<UserDataType | null>(null)

  const getUserData = async () => {
    try {
      const res = await backend.get('/users/me')
      setUserData(res.data)
    } catch {}
    setUserDataFetched(true)
  }

  useLayoutEffect(() => {
    getUserData()
  }, [])

  return (
    <UserContext.Provider
      value={{ userData, setUserData, userDataFetched, setUserDataFetched }}
    >
      {children}
    </UserContext.Provider>
  )
}
