import { Image } from 'expo-image'
import { X } from 'lucide-react-native'
import { ScrollView, TouchableOpacity, View } from 'react-native'

export default function ImageScroller({
  images,
  onRemove,
}: {
  images: string[]
  onRemove: (index: number) => void
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View className='flex-row gap-2 mb-4'>
        {images.map((image, index) => (
          <View
            className='relative size-32 rounded-lg overflow-hidden'
            key={image}
          >
            <TouchableOpacity
              className='absolute top-1 right-1 z-10 bg-white border border-neutral-200 items-center justify-center p-1 rounded-full'
              onPress={() => {
                onRemove(index)
              }}
            >
              <X
                color='#a3a3a3'
                size={12}
              />
            </TouchableOpacity>
            <Image
              key={index}
              source={{ uri: image }}
              style={{ flex: 1 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
