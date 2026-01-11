import { DeepLinkContext, DeepLinkContextType } from '@/context/DeepLinkContext'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'
import { backend, baseBackendURL } from '@/utils/axios/backend'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { UserContext, UserContextType } from '@/context/UserContext'
import { setAccessToken, setRefreshToken } from '@/utils/auth'
import axios from 'axios'

export default function AuthScreen() {
  const { currentURL } = useContext(DeepLinkContext) as DeepLinkContextType
  const { setUserData } = useContext(UserContext) as UserContextType

  useEffect(() => {
    const getTokens = async (code: string) => {
      try {
        const response = await axios.post(
          baseBackendURL + '/auth/oauth/google',
          {
            code: code,
          }
        )
        await setAccessToken(response.data.accessToken)
        await setRefreshToken(response.data.refreshToken)
        const userRes = await backend.get('/users/me')
        setUserData(() => userRes.data)
        router.replace('/(protected)')
      } catch {
        router.replace('/signin')
      }
    }

    if (!currentURL) return
    const { queryParams } = Linking.parse(currentURL)
    if (!queryParams?.code) return
    getTokens(queryParams.code as string)
  }, [currentURL, setUserData])

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
