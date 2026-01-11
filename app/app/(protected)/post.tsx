import { SpaceGroteskText } from '@/utils/CustomFontText'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PostScreen() {
  return (
    <SafeAreaView className='flex-1 bg-neutral-100'>
      <SpaceGroteskText>Post Screen</SpaceGroteskText>
    </SafeAreaView>
  )
}
