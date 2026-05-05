import TabNavBar from '@/components/util/TabNavBar'
import { UserContext, UserContextType } from '@/context/UserContext'
import { removeAccessToken, removeRefreshToken } from '@/utils/auth'
import { OutfitText } from '@/utils/CustomFontText'
import { navbarTabs } from '@/utils/navbar/navbarTabs'
import { useContext } from 'react'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { userData, setUserData } = useContext(UserContext) as UserContextType

  const logout = async () => {
    await removeAccessToken()
    await removeRefreshToken()
    setUserData(null)
  }

  return (
    <>
      <View className='flex-1'>
        <View className='flex-1 bg-neutral-100 p-4'>
          <OutfitText
            className='text-neutral-400 text-sm'
            weight='medium'
          >
            @ {userData?.id}
          </OutfitText>
          <Pressable
            className='px-4 py-3'
            onPress={logout}
          >
            <OutfitText>Logout</OutfitText>
          </Pressable>
        </View>
      </View>
    </>
  )
}
