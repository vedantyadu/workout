import { OutfitText } from '@/utils/CustomFontText'
import { ChevronRight } from 'lucide-react-native'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'

export default function OptionTouchable({
  icon,
  heading,
  value,
  placeholder,
  onPress,
  dotVisible,
}: {
  icon: React.ReactNode
  heading: string
  value?: string | null
  placeholder?: string
  onPress?: (event: GestureResponderEvent) => void
  private?: boolean
  dotVisible?: boolean
}) {
  return (
    <TouchableOpacity
      className='flex-row gap-8 justify-between py-2'
      onPress={onPress}
    >
      <View className='flex-row gap-4 items-start'>
        <View className='flex-row gap-2 items-center'>
          {icon}
          <View className='flex-row items-center justify-between gap-2'>
            <OutfitText
              weight='semi-bold'
              className='text-sm'
            >
              {heading}
            </OutfitText>
            {dotVisible && (
              <View className='size-2 bg-orange-500 rounded-full'></View>
            )}
          </View>
        </View>
      </View>
      <View className='flex-row gap-2 items-center flex-1 justify-end'>
        {value ? (
          <OutfitText className='text-neutral-500 text-sm flex-1 text-right'>
            {value}
          </OutfitText>
        ) : (
          <OutfitText className='text-neutral-300 text-sm flex-1 text-right'>
            {placeholder}
          </OutfitText>
        )}
        <ChevronRight
          size={20}
          color='#d4d4d4'
        />
      </View>
    </TouchableOpacity>
  )
}
