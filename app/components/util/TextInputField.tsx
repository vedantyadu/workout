import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function TextInputField({
  className,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      className={twMerge('border border-neutral-300 rounded-lg px-4 py-3 font-spaceGroteskRegular text-neutral-800 placeholder:text-neutral-400 text-sm', className)}
      {...props}
    />
  )
}
