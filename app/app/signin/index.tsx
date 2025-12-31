import { GeistText } from '@/utils/CustomFontText'
import { useGlobalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'

export default function Signin() {
  return (
    <SafeAreaView className='flex-1 p-4 bg-neutral-100'>
      <GeistText
        weight='bold'
        className='text-2xl'
      >
        Login
      </GeistText>
      <GeistText>Please log in to continue.</GeistText>
    </SafeAreaView>
  )
}
