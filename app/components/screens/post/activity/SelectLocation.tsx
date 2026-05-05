import { usePostContext } from "@/context/PostContext"
import { OutfitText } from "@/utils/CustomFontText"
import { LinearGradient } from "expo-linear-gradient"
import { Check, MapPin, Plus, Search, Undo2 } from "lucide-react-native"
import { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SelectLocation({ setSheetOpen }: { setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  const inset = useSafeAreaInsets()
  const { newPostData, setNewPostData } = usePostContext()
  const [locationSearchText, setLocationSearchText] = useState<string>("")

  return (
    <>
      <View className='flex-row items-center justify-between px-4 mb-4'>
        <OutfitText weight='bold'>Select Location</OutfitText>
        {newPostData.location && <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => {
            setNewPostData((f) => ({ ...f, location: null }))
            setSheetOpen(false)
          }}
        >
          <OutfitText weight="medium" className="text-orange-500 text-sm">Remove</OutfitText>
        </TouchableOpacity>
        }
      </View>
      <View className='px-4'>
        <View className="flex-row border border-neutral-300 rounded-lg px-2 items-center gap-2">
          <TextInput
            value={locationSearchText}
            onChangeText={(v) => { setLocationSearchText(v) }}
            placeholder="Search location"
            className="text-neutral-800 placeholder:text-neutral-400 text-sm flex-1"
            style={{ fontFamily: 'SpaceGrotesk-Regular' }}
            returnKeyType="search"
          />
          <View className="size-6 items-center justify-center">
            <Search size={16} color="#a3a3a3" />
          </View>
        </View>


      </View>

      <ScrollView className="flex-1 px-4">
        <View className="py-1">
          {locationSearchText && <LocationItemTouchable customLocation={true} setSheetOpen={setSheetOpen} location={locationSearchText} />}
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
          <LocationItemTouchable setSheetOpen={setSheetOpen} location="India" />
        </View>
      </ScrollView>

      <View className="bg-white" style={{ height: inset.bottom }} />
    </>
  )
}

function LocationItemTouchable({ customLocation, location, setSheetOpen }: { customLocation?: boolean, location: string, setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { newPostData, setNewPostData } = usePostContext()

  return (
    <TouchableOpacity
      className={`flex-row px-2 py-3 items-center gap-2`}
      onPress={() => {
        setNewPostData({ ...newPostData, location });
        setSheetOpen(false)
      }}
    >
      <OutfitText
        className={`text-sm flex-1 text-neutral-600`}
        numberOfLines={1}
      >
        {location}
      </OutfitText>
      {customLocation ? <Plus size={20} color="#a3a3a3" /> : <MapPin size={20} color="#a3a3a3" />}
    </TouchableOpacity>
  )
}
