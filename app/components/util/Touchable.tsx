import React, { PropsWithChildren } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function Touchable({
  children,
  className,
  ...props
}: PropsWithChildren<TouchableOpacityProps>) {
  return (
    <TouchableOpacity
      {...props}
      className={twMerge(
        'bg-orange-500 rounded-lg p-3 items-center justify-center flex-row gap-2 disabled:opacity-60',
        className,
      )}
    >
      {children}
    </TouchableOpacity>
  )
}
