import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function TextInputField({
  className,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      className={twMerge(
        'bg-neutral-50 rounded-xl px-4 py-3 font-outfitRegular text-neutral-600 placeholder:text-neutral-300 text-sm',
        className,
      )}
      {...props}
    />
  )
}
