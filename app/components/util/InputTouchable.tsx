import { OutfitText } from '@/utils/CustomFontText'
import { ChevronRight, Globe, Lock } from 'lucide-react-native'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native'

export default function InputTouchable({
  icon,
  title,
  value,
  placeholder,
  indicator = false,
  visibility,
  error,
  onPress,
}: {
  icon: React.ReactNode
  title: string
  value?: string | null
  placeholder?: string
  indicator?: boolean
  visibility?: 'public' | 'private'
  error?: string
  onPress?: (event: GestureResponderEvent) => void
}) {
  return (
    <TouchableOpacity
      className='flex flex-col bg-neutral-50 rounded-xl py-4 gap-1 px-4'
      onPress={onPress}
    >
      <View className='flex-row gap-4 items-center'>
        <View className='flex-row items-center justify-center gap-2'>
          {icon}
        </View>
        <View className='flex-1'>
          <View className=' flex-row gap-2 items-center'>
            <OutfitText
              className='text-xs text-neutral-600 leading-tight'
              weight='semi-bold'
            >
              {title}
            </OutfitText>
            {indicator && (
              <View className='bg-orange-500 rounded-full size-1' />
            )}
          </View>
          {value ? (
            <OutfitText className='text-xs text-neutral-600 leading-tight'>
              {value}
            </OutfitText>
          ) : (
            placeholder && (
              <OutfitText className='text-xs text-neutral-300 leading-tight'>
                {placeholder}
              </OutfitText>
            )
          )}
        </View>
        {visibility && (
          <View className='flex-row items-center rounded-full border border-neutral-200 px-2 py-0.5 gap-1'>
            {visibility == 'private' ? (
              <Lock
                size={12}
                color='#737373'
              />
            ) : (
              <Globe
                size={12}
                color='#737373'
              />
            )}
            <OutfitText className='text-xs'>
              {visibility == 'private' ? 'Private' : 'Public'}
            </OutfitText>
          </View>
        )}
        <View className='size-4'>
          <ChevronRight
            size={16}
            color='#737373'
            strokeWidth={3}
          />
        </View>
      </View>

      {error && (
        <OutfitText className='text-xs text-red-500'>{error}</OutfitText>
      )}
    </TouchableOpacity>
  )
}
