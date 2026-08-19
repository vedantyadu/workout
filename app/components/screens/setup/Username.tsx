import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { OutfitText } from '@/utils/CustomFontText'
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import TextInputField from '@/components/util/TextInputField'
import Touchable from '@/components/util/Touchable'
import { Check } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Username({
  value,
  setValue,
  setSheetOpen,
}: {
  value: string
  setValue: (value: string) => void
  setSheetOpen: Dispatch<SetStateAction<boolean>>
}) {
  const [username, setUsername] = useState<string>(value)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const insets = useSafeAreaInsets()

  const usernameValid = useMemo(() => {
    let valid = true
    let err = null

    if (!username) {
      err = 'Username is required'
      valid = false
    }
    if (username.length < 3 || username.length > 32) {
      err = 'Username must be between 3 and 32 characters'
      valid = false
    }
    if (!/^[A-Za-z0-9._-]+$/.test(username)) {
      err = 'Invalid username'
      valid = false
    }

    setUsernameError(err)
    return valid
  }, [username])

  const saveUsername = () => {
    if (usernameValid) {
      setValue(username)
      setSheetOpen(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      className='flex-1'
    >
      <View className='flex-row justify-between items-center px-4 pb-2'>
        <OutfitText weight='bold'>Enter a username</OutfitText>
        {value && (
          <View>
            <View className='items-center'>
              <TouchableOpacity onPress={() => setUsername('')}>
                <OutfitText
                  weight='semi-bold'
                  className='text-orange-500 text-sm'
                >
                  Reset
                </OutfitText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View className='flex-1'>
        <ScrollView>
          <View className='px-4'>
            <TextInputField
              value={username}
              onChangeText={(val) => setUsername(val)}
              placeholder='johndoe123'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        </ScrollView>
      </View>

      <View
        className='px-4 py-4 gap-2'
        style={{ paddingBottom: insets.bottom }}
      >
        <Touchable
          onPress={saveUsername}
          disabled={!usernameValid}
        >
          <Check
            size={20}
            color='#fff'
          />
          <OutfitText
            weight='semi-bold'
            className='text-white'
          >
            Save
          </OutfitText>
        </Touchable>
      </View>
    </KeyboardAvoidingView>
  )
}
