import { UserContext, UserContextType } from '@/context/UserContext'
import { removeAccessToken, removeRefreshToken } from '@/utils/auth'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { useContext } from 'react'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { userData, setUserData } = useContext(UserContext) as UserContextType

  const logout = async () => {
    await removeAccessToken()
    await removeRefreshToken()
    setUserData(null)
  }

  return (
    <SafeAreaView className='flex-1 bg-neutral-100 p-4'>
      <SpaceGroteskText
        className='text-neutral-400 text-sm'
        weight='medium'
      >
        @ {userData?.id}
      </SpaceGroteskText>
      <Pressable
        className='px-4 py-3'
        onPress={logout}
      >
        <SpaceGroteskText>Logout</SpaceGroteskText>
      </Pressable>
    </SafeAreaView>
  )
}
