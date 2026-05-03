import { usePostContext } from "@/context/PostContext"
import { SpaceGroteskText } from "@/utils/CustomFontText"
import { CircleCheck } from "lucide-react-native"
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
      <View className='flex-row justify-between px-4 mb-2'>
        <SpaceGroteskText weight='bold'>Select Activity Type</SpaceGroteskText>
      </View>
      <View className='flex-1'>
        <ScrollView>
          <View style={{ paddingBottom: inset.bottom }}>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => {
                  setNewPostData((f) => ({ ...f, activity }))
                  setSheetOpen(false)
                }}
                className={`flex-row px-4 py-2 items-center gap-2`}
              >
                <SpaceGroteskText
                  className={`text-sm ${newPostData.activity == activity ? 'text-orange-500' : 'text-neutral-800'} flex-1`}
                  numberOfLines={1}
                >
                  {activity}
                </SpaceGroteskText>
                {newPostData.activity == activity ? (
                  <CircleCheck
                    color='#f97316'
                    size={20}
                  />
                ) : (
                  null
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <LinearGradient
        colors={['#ffffff', 'rgba(255, 255, 255, 0.9)', 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        pointerEvents="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: inset.bottom }}
      />
    </>
  )
}
