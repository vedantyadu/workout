import { UserContext, UserContextType } from '@/context/UserContext'
import { router, Tabs, useSegments } from 'expo-router'
import { useContext, useLayoutEffect } from 'react'
import {
  CirclePlus,
  House,
  UserCircle2,
  UserStar,
} from 'lucide-react-native'
import TabNavBar from '@/components/util/TabNavBar'

export default function ProtectedLayout() {


  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabNavBar {...props} />}
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
