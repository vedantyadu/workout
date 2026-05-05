import { OutfitText } from '@/utils/CustomFontText'
import { View } from 'react-native'

export default function InputFieldWrapper({
  heading,
  children,
  error,
}: {
  heading: string
  children?: React.ReactNode
  error?: string
}) {
  return (
    <View className='flex flex-col gap-2'>
      <OutfitText weight='medium' className='text-xs text-neutral-500'>
        {heading}
      </OutfitText>
      {children}
      {error && (
        <OutfitText className='text-xs text-red-500'>
          {error}
        </OutfitText>
      )}
    </View>
  )
}
