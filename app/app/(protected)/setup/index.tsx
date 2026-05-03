import TextInputField from '@/components/util/TextInputField'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { Pressable, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image } from 'expo-image'
import { backend } from '@/utils/axios/backend'
import InputFieldWrapper from '@/components/util/InputFieldWrapper'
import { ImagePlus } from 'lucide-react-native'
import Touchable from '@/components/util/Touchable'

export default function SetupScreen() {
  const [profilePicture, setProfilePicture] =
    useState<ImagePicker.ImagePickerResult | null>(null)

  const selectProfilePicture = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      aspect: [1, 1],
      allowsEditing: true,
    })
    setProfilePicture(image)
  }

  const submit = async () => {
    const formData = new FormData()
    const asset = profilePicture?.assets?.[0]
    if (asset) {
      formData.append('profilePicture', {
        uri: asset.uri,
        type: asset.mimeType,
        name: asset.fileName,
      } as any)
    } else {
      formData.append('profilePicture', '')
    }
    formData.append('setupData', JSON.stringify({ fullName: 'John Doe' }))

    try {
      await backend.post('users/setup', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
    } catch (error) {
      const err = error as any
      console.error(err.response?.data || err.message)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-neutral-100 p-4'>
      <View className='mb-4'>
        <SpaceGroteskText
          weight='bold'
          className='text-neutral-800 text-4xl'
        >
          Setup Your Profile
        </SpaceGroteskText>
      </View>

      <View className='gap-2 mb-4'>
        <Pressable
          className='bg-neutral-200 h-32 w-32 rounded-full items-center justify-center overflow-hidden'
          onPress={selectProfilePicture}
        >
          {profilePicture?.assets?.[0] ? (
            <Image
              source={{ uri: profilePicture?.assets?.[0]?.uri }}
              style={{ width: 128, aspectRatio: 1 }}
            />
          ) : (
            <ImagePlus size={32} color="#a3a3a3" />
          )}
        </Pressable>
        <InputFieldWrapper heading='Username'>
          <TextInputField placeholder='johndoe123' />
        </InputFieldWrapper>
        <InputFieldWrapper heading='Full Name'>
          <TextInputField placeholder='John Doe' />
        </InputFieldWrapper>
        <InputFieldWrapper heading='Weight (kg)'>
          <TextInputField
            placeholder='Weight'
            keyboardType='numeric'
          />
        </InputFieldWrapper>
        <InputFieldWrapper heading='Height (cm)'>
          <TextInputField
            placeholder='Height'
            keyboardType='numeric'

          />
        </InputFieldWrapper>

      </View>
      <Touchable>
        <SpaceGroteskText weight='bold' className='text-white'>Submit</SpaceGroteskText>
      </Touchable>
    </SafeAreaView>
  )
}
