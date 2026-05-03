import { SpaceGroteskText } from "@/utils/CustomFontText"
import { TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SelectLocation({ setSheetOpen }: { setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  const inset = useSafeAreaInsets()

  return (
    <>
      <View className='flex-row justify-between px-4 mb-2'>
        <SpaceGroteskText weight='bold'>Select Location</SpaceGroteskText>
      </View>
      <View className='flex-1'>
        <ScrollView>
          <View style={{ paddingBottom: inset.bottom }}>

          </View>
        </ScrollView>
      </View>
    </>
  )
}
