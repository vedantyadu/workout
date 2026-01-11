import { UserContext, UserContextType } from '@/context/UserContext'
import { router, Tabs } from 'expo-router'
import { useContext, useLayoutEffect } from 'react'
import {
  Activity,
  CirclePlus,
  UserCircle2,
  UserStar,
} from 'lucide-react-native'

export default function ProtectedLayout() {
  const { userDataFetched, userData } = useContext(
    UserContext
  ) as UserContextType

  useLayoutEffect(() => {
    if (userDataFetched && userData === null) {
      router.replace('/signin')
    }
  }, [userDataFetched, userData])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fb923c',
        tabBarInactiveTintColor: '#a3a3a3',
        tabBarLabelStyle: {
          fontFamily: 'SpaceGrotesk-Regular',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => (
            <Activity
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
