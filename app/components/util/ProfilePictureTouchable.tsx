import { OutfitText } from '@/utils/CustomFontText'
import { Image } from 'expo-image'
import { ImagePlus } from 'lucide-react-native'
import { TouchableOpacity, View } from 'react-native'

export default function ProfilePictureTouchable({
  image,
  onPress,
}: {
  image?: string
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      className='flex-row bg-neutral-50 px-4 py-3 rounded-xl items-center gap-4'
      onPress={onPress}
    >
      <View className='size-24 items-center justify-center rounded-full bg-neutral-100 overflow-hidden'>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 96, aspectRatio: 1 }}
          />
        ) : (
          <ImagePlus
            size={32}
            color='#d4d4d4'
          />
        )}
      </View>
      <View className='flex-1'>
        <OutfitText
          weight='semi-bold'
          className='leading-none'
        >
          Profile picture
        </OutfitText>
        <OutfitText className='text-neutral-400 text-xs'>
          Tap to change
        </OutfitText>
      </View>
    </TouchableOpacity>
  )
}
