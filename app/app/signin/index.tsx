import { DeepLinkContext, DeepLinkContextType } from '@/context/DeepLinkContext'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'
import { backend } from '@/utils/axios/backend'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'

export default function SignIn() {
  const { currentURL } = useContext(DeepLinkContext) as DeepLinkContextType
  const [serverResponse, setServerResponse] = useState<string | null>(null)

  useEffect(() => {
    console.log('Current URL changed:', currentURL)
    if (!currentURL) return
    const { queryParams } = Linking.parse(currentURL)
    if (!queryParams) return
    const code = queryParams.code as string
    if (!code) return
    getTokens(code as string)
  }, [currentURL])

  const getTokens = async (code: string) => {
    try {
      const response = await backend.post('/oauth/google', { code: code })
      setServerResponse(JSON.stringify(response.data, null, 2))
      await SecureStore.setItemAsync('accessToken', response.data.accessToken)
      await SecureStore.setItemAsync('refreshToken', response.data.refreshToken)
      // router.navigate('/')
    } catch (err) {
      setServerResponse(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView>
      <SpaceGroteskText
        weight='bold'
        className='text-xl'
      >
        {JSON.stringify(Linking.parse(currentURL || ''), null, 2)}
        {serverResponse}
      </SpaceGroteskText>
    </SafeAreaView>
  )
}
