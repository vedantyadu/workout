import { SpaceGroteskText } from '@/utils/CustomFontText'
import { View } from 'react-native'

export default function FieldHeading({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <View className='flex flex-col gap-1'>
      <SpaceGroteskText className='text-sm text-neutral-600'>
        {heading}
      </SpaceGroteskText>
      {children}
    </View>
  )
}
