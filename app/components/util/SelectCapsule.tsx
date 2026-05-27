import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function SelectCapsule({
  className,
  children,
  ...props
}: React.PropsWithChildren<TouchableOpacityProps>) {
  return (
    <TouchableOpacity
      className={twMerge(
        'flex-row gap-2 items-center justify-between py-1 px-2 rounded-full bg-neutral-50',
        className,
      )}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}
