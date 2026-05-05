import { UserContext, UserContextType } from "@/context/UserContext"
import { router, Stack } from "expo-router"
import { useContext, useLayoutEffect } from "react"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { userDataFetched, userData } = useContext(
    UserContext,
  ) as UserContextType

  useLayoutEffect(() => {
    if (userDataFetched) {
      if (!userData) {
        router.replace('/signin')
      } else if (userData.setupComplete === false) {
        router.replace('/(protected)/setup')
      }
    }
  }, [userDataFetched, userData])

  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}
