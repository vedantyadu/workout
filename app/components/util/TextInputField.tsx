import { TextInput, TextInputProps } from 'react-native'

export default function TextInputField({
  className,
  ...props
}: TextInputProps) {
  return (
    <TextInput
      className={`border border-neutral-300 rounded-lg px-4 text-neutral-600 placeholder:text-neutral-400 ${className}`}
      {...props}
    />
  )
}
