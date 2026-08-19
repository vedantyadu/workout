import { OutfitText } from '@/utils/CustomFontText'
import { KeyboardAvoidingView, Pressable, ScrollView, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRef, useState } from 'react'
import { Image } from 'expo-image'
import { backend } from '@/utils/axios/backend'
import InputTouchable from '@/components/util/InputTouchable'
import {
  AtSign,
  Check,
  Heart,
  ImagePlus,
  Quote,
  Ruler,
  User,
  VenusAndMars,
  Weight,
} from 'lucide-react-native'
import { useRouter } from 'expo-router'
import BottomBar from '@/components/util/BottomBar'
import { PrimaryTouchable } from '@/components/util/Touchables'
import TopBar from '@/components/util/TopBar'
import { Section } from '@/components/util/Layout'
import ProfilePictureTouchable from '@/components/util/ProfilePictureTouchable'
import BottomSheet from '@/components/util/BottomSheet'
import Username from '@/components/screens/setup/Username'

export default function SetupScreen() {
  const router = useRouter()

  const [profilePicture, setProfilePicture] =
    useState<ImagePicker.ImagePickerResult | null>(null)

  const [data, setData] = useState({
    username: '',
    bio: '',
    height: '',
    weight: '',
    sex: '',
  })

  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetType, setSheetType] = useState<'username' | 'bio' | null>(null)

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
    formData.append('setupData', JSON.stringify(data))

    try {
      await backend.post('users/setup', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })

      router.replace('/default')
    } catch (error) {
      const err = error as any
      console.error(err.response?.data || err.message)
    }
  }

  return (
    <>
      <TopBar
        title='Profile Setup'
        onBack={() => router.navigate('/signin')}
      />
      <KeyboardAvoidingView
        className='flex-1 bg-white'
        behavior='padding'
      >
        <ScrollView>
          <View className='gap-8 p-4'>
            <Section
              title='Personal details'
              icon={
                <User
                  size={16}
                  color='#d4d4d4'
                />
              }
            >
              <ProfilePictureTouchable
                image={profilePicture?.assets?.[0]?.uri}
                onPress={selectProfilePicture}
              />

              <InputTouchable
                icon={
                  <AtSign
                    size={20}
                    color='#737373'
                  />
                }
                title='Username'
                value={data.username}
                placeholder='Create a username'
                indicator
                onPress={() => {
                  setSheetOpen(true)
                  setSheetType('username')
                }}
              />

              <InputTouchable
                icon={
                  <Quote
                    size={20}
                    color='#737373'
                  />
                }
                title='Bio'
                value={data.bio}
                placeholder='Tell us about yourself...'
                onPress={() => {}}
              />
            </Section>
            <Section
              title='Physical details'
              icon={
                <Heart
                  size={16}
                  color='#d4d4d4'
                />
              }
            >
              <InputTouchable
                icon={
                  <VenusAndMars
                    size={20}
                    color='#737373'
                  />
                }
                title='Sex'
                value={data.sex}
                placeholder='Select your sex'
                indicator
                visibility='public'
                onPress={() => {}}
              />
              <InputTouchable
                icon={
                  <Weight
                    size={20}
                    color='#737373'
                  />
                }
                title='Weight'
                value={data.weight}
                placeholder='Enter your weight'
                indicator
                visibility='private'
                onPress={() => {}}
              />
              <InputTouchable
                icon={
                  <Ruler
                    size={20}
                    color='#737373'
                  />
                }
                title='Height'
                value={data.height}
                placeholder='Enter your height'
                indicator
                visibility='public'
                onPress={() => {}}
              />
            </Section>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomBar>
        <PrimaryTouchable
          text='Finish'
          onPress={submit}
          icon={
            <Check
              color='white'
              size={20}
            />
          }
        />
      </BottomBar>

      <BottomSheet
        setOpen={setSheetOpen}
        open={sheetOpen}
      >
        {sheetType === 'username' && (
          <Username
            value={data.username}
            setValue={(value) => {
              setData({ ...data, username: value })
            }}
            setSheetOpen={setSheetOpen}
          />
        )}
      </BottomSheet>
    </>
  )
}
