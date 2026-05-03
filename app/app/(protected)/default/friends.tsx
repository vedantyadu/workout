import TabNavBar from '@/components/util/TabNavBar'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { navbarTabs } from '@/utils/navbar/navbarTabs'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function FriendsScreen() {
  return (
    <>
      <View className='flex-1'>
        <View className='flex-1 bg-neutral-100'>
          <SpaceGroteskText>Friends Page</SpaceGroteskText>
        </View>

      </View>
      <TabNavBar
        currentRoute="/default/friends"
        tabs={navbarTabs}
      />
    </>
  )
}
