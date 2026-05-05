import TabNavBar from '@/components/util/TabNavBar'
import { OutfitText } from '@/utils/CustomFontText'
import { navbarTabs } from '@/utils/navbar/navbarTabs'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Home() {
  const inset = useSafeAreaInsets()

  return (
    <View className='flex-1 bg-neutral-100' style={{ paddingTop: inset.top }}>
      <ScrollView>

        <View className='flex-1 p-4'>
          <OutfitText>Home Screen</OutfitText>
          {
            Array(25).fill(0).map((_, i) => (
              <View key={i} className='my-4'>
                <OutfitText>Post {i}</OutfitText>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}
