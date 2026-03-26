import { SpaceGroteskText } from '@/utils/CustomFontText'
import { View } from 'react-native'

export default function InputFieldWrapper({
  heading,
  children,
  error,
}: {
  heading: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <View className='flex flex-col gap-1'>
      <SpaceGroteskText className='text-sm text-neutral-600'>
        {heading}
      </SpaceGroteskText>
      {children}
      {error && (
        <SpaceGroteskText className='text-sm text-red-500'>
          {error}
        </SpaceGroteskText>
      )}
    </View>
  )
}
