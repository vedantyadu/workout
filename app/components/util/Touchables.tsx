import { OutfitText } from '@/utils/CustomFontText'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

const touchableBaseClass =
  'flex-row gap-2 items-center justify-center flex-1 py-3 rounded-xl disabled:bg-orange-200'

export function PrimaryTouchable({
  text,
  icon,
  ...props
}: {
  text?: string | null
  icon?: React.ReactNode
} & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className={twMerge(touchableBaseClass, 'bg-orange-500')}
      {...props}
    >
      {icon}
      {text && (
        <OutfitText
          weight='semi-bold'
          className='text-white text-lg'
        >
          {text}
        </OutfitText>
      )}
    </TouchableOpacity>
  )
}

export function SecondaryTouchable({
  text,
  icon,
  ...props
}: {
  text?: string
  icon?: React.ReactNode
} & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className={twMerge(touchableBaseClass, 'bg-orange-100')}
      {...props}
    >
      {icon}
      {text && (
        <OutfitText
          weight='semi-bold'
          className='text-orange-500 text-lg'
        >
          {text}
        </OutfitText>
      )}
    </TouchableOpacity>
  )
}
