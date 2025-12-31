import { GeistText } from '@/utils/CustomFontText'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'

export default function Signin() {
  const url = Linking.useLinkingURL()

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url)
    console.log(hostname, path, queryParams)
  }

  return (
    <SafeAreaView className='flex-1 p-4 bg-neutral-100'>
      <GeistText
        weight='bold'
        className='text-2xl'
      >
        Login Screen
      </GeistText>
      <GeistText>Please log in to continue.</GeistText>
    </SafeAreaView>
  )
}
