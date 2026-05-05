import { usePostContext } from "@/context/PostContext"
import { OutfitText } from "@/utils/CustomFontText"
import { Check, Circle, CircleCheck, CircleX, RefreshCcw, Undo2 } from "lucide-react-native"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from 'expo-linear-gradient';

const activities = [
  'Running',
  'Cycling',
  'Weight Training',
  'Swimming',
  'Yoga',
  'Walking',
  'Dancing',
  'Hiking',
  'Team Sports',
  'HIIT',
  'Pilates',
  'Boxing',
  'Rock Climbing',
  'Tennis',
  'Badminton',
  'Basketball',
  'Football/Soccer',
  'Golf',
  'Martial Arts',
  'Stretching',
  'Meditation',
  'Rowing',
  'CrossFit',
  'Skating',
  'Surfing',
  'Other',
]

export default function SelectActivity({ setSheetOpen }: { setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  const { newPostData, setNewPostData } = usePostContext()
  const inset = useSafeAreaInsets()

  return (
    <>
      <View className='flex-row justify-between items-center px-4 pb-2'>
        <OutfitText weight='bold'>Select Activity Type</OutfitText>
        {newPostData.activity && <View>
          <View className="items-center">
            <TouchableOpacity onPress={() => {
              setNewPostData((f) => ({ ...f, activity: null }))
              setSheetOpen(false)
            }}>
              <OutfitText weight="medium" className="text-orange-500 text-sm">Reset</OutfitText>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
      <View className='flex-1'>
        <ScrollView>
          <View className="px-4">
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => {
                  setNewPostData((f) => ({ ...f, activity }))
                  setSheetOpen(false)
                }}
                className={`flex-row py-3 items-center gap-2`}
              >
                <OutfitText
                  className={`text-sm ${newPostData.activity == activity ? 'text-orange-500' : 'text-neutral-600'} flex-1`}
                  numberOfLines={1}
                >
                  {activity}
                </OutfitText>
                {newPostData.activity == activity ? (
                  <CircleCheck
                    color='#f97316'
                    size={20}
                  />
                ) : (
                  <Circle
                    color='#a3a3a3'
                    size={20}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="bg-white" style={{ height: inset.bottom }} />
      </View>
    </>
  )
}
