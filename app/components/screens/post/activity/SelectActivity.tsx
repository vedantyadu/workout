import { OutfitText } from '@/utils/CustomFontText'
import { Circle, CircleCheck } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ACTIVITIES = [
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

export default function SelectActivity({
  value,
  setValue,
  setSheetOpen,
}: {
  value: string | null
  setValue: (value: string | null) => void
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const inset = useSafeAreaInsets()

  return (
    <>
      <View className='flex-row justify-between items-center px-4 pb-2'>
        <OutfitText weight='bold'>Select Activity Type</OutfitText>
        {value && (
          <View>
            <View className='items-center'>
              <TouchableOpacity
                onPress={() => {
                  setValue(null)
                  setSheetOpen(false)
                }}
              >
                <OutfitText
                  weight='semi-bold'
                  className='text-orange-500 text-sm'
                >
                  Reset
                </OutfitText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View className='flex-1'>
        <ScrollView>
          <View className='px-4'>
            {ACTIVITIES.map((activity) => (
              <TouchableOpacity
                key={activity}
                onPress={() => {
                  setValue(activity)
                  setSheetOpen(false)
                }}
                className={`flex-row py-3 items-center gap-2`}
              >
                <OutfitText
                  className={`text-sm ${value == activity ? 'text-orange-500' : 'text-neutral-600'} flex-1`}
                  numberOfLines={1}
                >
                  {activity}
                </OutfitText>
                {value == activity ? (
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

        <View
          className='bg-white'
          style={{ height: inset.bottom }}
        />
      </View>
    </>
  )
}
