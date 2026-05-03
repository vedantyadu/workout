import React, { useState } from 'react'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native'
import TextInputField from '@/components/util/TextInputField'
import InputFieldWrapper from '@/components/util/InputFieldWrapper'
import { useRouter } from 'expo-router'
import { usePostContext } from '@/context/PostContext'
import Touchable from '@/components/util/Touchable'
import BottomSheet from '@/components/util/BottomSheet'
import { ChevronDown, ChevronRight, ChevronUp, CircleCheckBig, CircleFadingArrowUp, CircleFadingPlus, ImageIcon, ImagePlus, MapPin, MapPinPlus, Plus, X } from 'lucide-react-native'
import SelectTouchable from '@/components/util/SelectTouchable'
import SelectActivity from '@/components/screens/post/activity/SelectActivity'
import SelectDuration from '@/components/screens/post/activity/SelectDuration'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import SelectLocation from '@/components/screens/post/activity/SelectLocation'

type SheetType = 'activity' | 'duration' | 'location' | null

function SheetContent({ sheet, setSheetOpen }: { sheet: SheetType, setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  switch (sheet) {
    case 'activity':
      return <SelectActivity setSheetOpen={setSheetOpen} />
    case 'duration':
      return <SelectDuration setSheetOpen={setSheetOpen} />
    case 'location':
      return <SelectLocation setSheetOpen={setSheetOpen} />
    default:
      return null
  }
}

export default function PostActivityScreen() {
  const { newPostData, setNewPostData } = usePostContext()
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState<SheetType>(null)
  const inset = useSafeAreaInsets()

  const router = useRouter()

  const openSheet = (sheetContent: SheetType) => {
    setSheetContent(sheetContent)
    setSheetOpen(true)
  }

  const handleSubmit = async () => {
    // setLoading(true)
  }

  return (
    <>
      <View className='flex-1 bg-neutral-100'>
        <KeyboardAvoidingView
          className='flex-1'
        >
          <ScrollView className='p-4'>
            <View className='flex-row mb-4'>
              <TouchableOpacity className='flex-row gap-2 items-center justify-between py-1 px-2 rounded-xl border border-neutral-300'
                onPress={() => openSheet('location')}
              >
                {
                  newPostData.location ?
                    <MapPin size={16} color="#a3a3a3" />
                    : <MapPinPlus size={16} color="#a3a3a3" />
                }
                {
                  newPostData.location ? <SpaceGroteskText className='text-xs'>{newPostData.location}</SpaceGroteskText> : <SpaceGroteskText className='text-xs text-neutral-500'>Add Location</SpaceGroteskText>

                }
              </TouchableOpacity>
            </View>

            <View className='gap-2 mb-4'>
              <InputFieldWrapper heading='Activity Type'>
                <SelectTouchable onPress={() => openSheet('activity')}>
                  <View className='flex-1 overflow-hidden'>

                    {
                      !newPostData.activity ? (
                        <SpaceGroteskText className='text-neutral-400 text-sm' numberOfLines={1}>Select an activity</SpaceGroteskText>
                      ) : (
                        <SpaceGroteskText className='text-neutral-800 text-sm' numberOfLines={1}>{newPostData.activity}</SpaceGroteskText>
                      )
                    }
                  </View>
                  <View className='size-5 items-start justify-center'>
                    <ChevronDown size={20} className='stroke-neutral-400' />
                  </View>
                </SelectTouchable>
              </InputFieldWrapper>

              <InputFieldWrapper heading='Duration'>
                <SelectTouchable onPress={() => openSheet('duration')}>
                  <View className='flex-1 overflow-hidden'>
                    {!newPostData.duration.hours && !newPostData.duration.minutes ? (
                      <SpaceGroteskText className='text-neutral-400 text-sm' numberOfLines={1}>Select duration</SpaceGroteskText>
                    ) : (
                      <SpaceGroteskText className='text-neutral-800 text-sm' numberOfLines={1}>
                        {newPostData.duration.hours ? `${newPostData.duration.hours}h` : ''} {newPostData.duration.minutes ? `${newPostData.duration.minutes}m` : ''}
                      </SpaceGroteskText>
                    )}
                  </View>
                  <View className='size-5 items-start justify-center'>
                    <ChevronDown size={20} color="#a3a3a3" />
                  </View>
                </SelectTouchable>
              </InputFieldWrapper>

              <InputFieldWrapper heading='Caption'>
                <TextInputField
                  value={newPostData.description}
                  onChangeText={(v) =>
                    setNewPostData((f) => ({ ...f, description: v }))
                  }
                  multiline
                  numberOfLines={4}
                  placeholder="What's on your mind?"
                  textAlignVertical='top'
                  className='h-32'
                />
              </InputFieldWrapper>
            </View>

            {newPostData.images.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex-row gap-2 mb-4'>
                {
                  newPostData.images.map((image, index) => (
                    <View className='relative size-32 rounded-lg overflow-hidden' key={image}>
                      <TouchableOpacity className='absolute top-1 right-1 z-10 bg-white border border-neutral-200 items-center justify-center p-1 rounded-full' onPress={() => {
                        setNewPostData({ ...newPostData, images: newPostData.images.filter((img, i) => i != index) })
                      }}>
                        <X color="#a3a3a3" size={12} />
                      </TouchableOpacity>
                      <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  ))
                }
              </View>
            </ScrollView>}

            <View className='flex-row'>
              <TouchableOpacity className='flex-row gap-2 items-center justify-center rounded-lg border border-neutral-300 px-2 py-1'
                onPress={async () => {
                  const image = await ImagePicker.launchImageLibraryAsync({
                    selectionLimit: 4,
                    allowsMultipleSelection: true,
                  })
                  console.log(image)
                  setNewPostData({ ...newPostData, images: image.assets ? image.assets.map((a) => a.uri) : [] })
                }}
              >
                {newPostData.images.length > 0 ? <ImageIcon color="#a3a3a3" size={16} /> : <ImagePlus color="#a3a3a3" size={16} />}
                <SpaceGroteskText className='text-xs text-neutral-500'>{newPostData.images.length > 0 ? `${newPostData.images.length}/4` : 'Add'} Images</SpaceGroteskText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View className='flex-row py-3 px-4 items-center gap-4 justify-between bg-white' style={{ paddingBottom: inset.bottom + 8 }}>
          <Touchable
            onPress={handleSubmit}
            disabled={loading}
            className='py-2 flex-1 h-12'
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <>
                <View className='size-4'>
                  <Plus color="white" size={16} strokeWidth={4} />
                </View>
                <SpaceGroteskText weight='bold' className='text-white'>Post</SpaceGroteskText>
              </>
            )}

          </Touchable>
        </View>
      </View >

      <BottomSheet open={sheetOpen} setOpen={setSheetOpen}>
        <SheetContent sheet={sheetContent} setSheetOpen={setSheetOpen} />
      </BottomSheet>
    </>
  )
}
