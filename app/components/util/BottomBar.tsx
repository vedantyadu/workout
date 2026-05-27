import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BottomBar({ children }: { children: React.ReactNode }) {
  const inset = useSafeAreaInsets()
  return (
    <View
      className='flex-row px-4 py-4 items-center gap-4 justify-between bg-white border-t border-neutral-100'
      style={{
        paddingBottom: inset.bottom,
      }}
    >
      {children}
    </View>
  )
}
