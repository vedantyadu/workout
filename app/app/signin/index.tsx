import { SpaceGroteskText } from '@/utils/CustomFontText'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function SignIn() {
  return (
    <SafeAreaProvider>
      <SpaceGroteskText
        weight='bold'
        className='text-xl'
      >
        Sign In Screen
      </SpaceGroteskText>
    </SafeAreaProvider>
  )
}
