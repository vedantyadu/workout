import { SpaceGroteskText } from '@/utils/CustomFontText'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <SpaceGroteskText>Home Screen</SpaceGroteskText>
    </SafeAreaView>
  )
}
