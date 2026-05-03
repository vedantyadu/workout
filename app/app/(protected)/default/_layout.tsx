import { UserContext, UserContextType } from '@/context/UserContext'
import { router, Tabs, useSegments } from 'expo-router'
import { useContext, useLayoutEffect } from 'react'
import {
  Activity,
  CirclePlus,
  House,
  UserCircle2,
  UserStar,
} from 'lucide-react-native'
import TabNavBar from '@/components/util/TabNavBar'

export default function ProtectedLayout() {
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
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='post'
      tabBar={(props) => null}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <House
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='post'
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => (
            <CirclePlus
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <UserStar
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <UserCircle2
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
