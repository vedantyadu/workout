import { DeepLinkContext, DeepLinkContextType } from '@/context/DeepLinkContext'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'
import { backend } from '@/utils/axios/backend'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'

export default function SignIn() {
  const { currentURL } = useContext(DeepLinkContext) as DeepLinkContextType

  useEffect(() => {
    if (!currentURL) return
    const { queryParams } = Linking.parse(currentURL) ?? {}
    const code = queryParams?.code as string
    if (!code) return
    getTokens(code)
  }, [currentURL])

  const getTokens = async (code: string) => {
    try {
      const response = await backend.post('/oauth/google', { code: code })
      await SecureStore.setItemAsync('accessToken', response.data.accessToken)
      await SecureStore.setItemAsync('refreshToken', response.data.refreshToken)
      router.replace('/')
    } catch {
      router.replace('/signin')
    }
  }

  return (
    <SafeAreaView className='items-center justify-center flex-1'>
      <ActivityIndicator
        size={48}
        color={'#fb923c'}
      />
      <SpaceGroteskText className='text-neutral-500 mt-4 text-sm'>
        Signing you in
      </SpaceGroteskText>
    </SafeAreaView>
  )
}
