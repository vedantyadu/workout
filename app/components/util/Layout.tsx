import { OutfitText } from '@/utils/CustomFontText'
import { View } from 'react-native'

export function Section({
  title,
  icon,
  children,
}: {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <View className='gap-4'>
      {(icon || title) && (
        <View className='flex-row items-center gap-2'>
          {icon}
          <OutfitText
            weight='semi-bold'
            className='text-xs text-neutral-300'
          >
            {title}
          </OutfitText>
        </View>
      )}
      <View className='gap-2'>{children}</View>
    </View>
  )
}
