import TabNavBar from '@/components/util/TabNavBar'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { navbarTabs } from '@/utils/navbar/navbarTabs'
import { View } from 'react-native'

export default function Home() {
  return (
    <>
      <View className='flex-1 bg-neutral-100'>
        <View className='flex-1'>
          <SpaceGroteskText>Home Screen</SpaceGroteskText>
        </View>
      </View>
      <TabNavBar
        currentRoute="/default"
        tabs={navbarTabs}
      />
    </>
  )
}
