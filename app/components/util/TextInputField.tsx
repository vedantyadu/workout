import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function TextInputField({
  className,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      className={twMerge(
        'px-4 py-3 font-outfitRegular border border-neutral-200 rounded-xl text-neutral-600 placeholder:text-neutral-300 text-sm',
        className,
      )}
      {...props}
    />
  )
}
