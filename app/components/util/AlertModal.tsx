import { useEffect, useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { twMerge } from 'tailwind-merge'

export function AlertModal({
  visible,
  children,
}: {
  visible: boolean
  children?: React.ReactNode
}) {
  const [show, setShow] = useState<boolean>(visible)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (visible) {
      setShow(() => true)
      opacity.value = withTiming(1, { duration: 200 })
    } else {
      opacity.value = withTiming(0, { duration: 200 }, () => {
        scheduleOnRN(setShow, false)
      })
    }
  }, [visible])

  const viewAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    show && (
      <Animated.View
        className='items-center justify-center absolute w-full h-full top-0 left-0 z-[1003]'
        style={viewAnimatedStyle}
      >
        <View className='absolute w-full h-full top-0 left-0 items-center justify-center flex-1 bg-black/50'></View>
        <View className='w-3/4 bg-white rounded-xl p-4'>{children}</View>
      </Animated.View>
    )
  )
}
