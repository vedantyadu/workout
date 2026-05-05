import React, { useEffect, useState } from 'react'
import { OutfitText } from '@/utils/CustomFontText'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal,
  BackHandler,
  Alert,
} from 'react-native'
import TextInputField from '@/components/util/TextInputField'
import InputFieldWrapper from '@/components/util/InputFieldWrapper'
import { useRouter } from 'expo-router'
import { usePostContext } from '@/context/PostContext'
import Touchable from '@/components/util/Touchable'
import BottomSheet from '@/components/util/BottomSheet'
import { ChevronDown, ChevronRight, ChevronUp, CircleCheckBig, CircleFadingArrowUp, CircleFadingPlus, CircleX, ImageIcon, ImagePlus, MapPin, MapPinPlus, Plus, Trash, X } from 'lucide-react-native'
import SelectTouchable from '@/components/util/SelectTouchable'
import SelectActivity from '@/components/screens/post/activity/SelectActivity'
import SelectDuration from '@/components/screens/post/activity/SelectDuration'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import SelectLocation from '@/components/screens/post/activity/SelectLocation'
import { AlertModal } from '@/components/util/AlertModal'

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
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const inset = useSafeAreaInsets()

  const router = useRouter()

  const openSheet = (sheetContent: SheetType) => {
    setSheetContent(sheetContent)
    setSheetOpen(true)
  }

  const handleSubmit = async () => {
    // setLoading(true)
  }

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (sheetOpen) {
        setSheetOpen(false)
        setSheetContent(null)
        return true
      }
      else if (newPostData.description || newPostData.activity || newPostData.duration || newPostData.location || newPostData.images) {
        setAlertOpen(true)
        return true
      }
      return false
    })

    return () => handler.remove()
  }, [])

  return (
    <>
      <View className='flex-1 bg-neutral-50'>
        <KeyboardAvoidingView
          className='flex-1'
        >
          <ScrollView className='p-4'>
            <View className='flex-row mb-4'>
              <TouchableOpacity className='flex-row gap-2 items-center justify-between py-1 px-2 rounded-full border-neutral-200 border'
                onPress={() => openSheet('location')}
              >
                {
                  newPostData.location ?
                    <MapPin size={16} color="#a3a3a3" />
                    : <MapPinPlus size={16} color="#a3a3a3" />
                }
                {
                  newPostData.location ? <OutfitText className='text-xs'>{newPostData.location}</OutfitText> : <OutfitText className='text-xs text-neutral-400'>Add Location</OutfitText>

                }
              </TouchableOpacity>
            </View>

            <View className='gap-4 mb-4'>
              <InputFieldWrapper heading='Activity Type'>
                <SelectTouchable onPress={() => openSheet('activity')}>
                  <View className='flex-1 overflow-hidden'>

                    {
                      !newPostData.activity ? (
                        <OutfitText className='text-neutral-400 text-sm' numberOfLines={1}>Select an activity</OutfitText>
                      ) : (
                        <OutfitText className='text-neutral-800 text-sm' numberOfLines={1}>{newPostData.activity}</OutfitText>
                      )
                    }
                  </View>
                  <View className='size-5 items-start justify-center'>
                    <ChevronDown size={20} color="#d4d4d4" />
                  </View>
                </SelectTouchable>
              </InputFieldWrapper>

              <InputFieldWrapper heading='Duration'>
                <SelectTouchable onPress={() => openSheet('duration')}>
                  <View className='flex-1 overflow-hidden'>
                    {!newPostData.duration.hours && !newPostData.duration.minutes ? (
                      <OutfitText className='text-neutral-400 text-sm' numberOfLines={1}>Select duration</OutfitText>
                    ) : (
                      <OutfitText className='text-neutral-800 text-sm' numberOfLines={1}>
                        {newPostData.duration.hours ? `${newPostData.duration.hours}h` : ''} {newPostData.duration.minutes ? `${newPostData.duration.minutes}m` : ''}
                      </OutfitText>
                    )}
                  </View>
                  <View className='size-5 items-start justify-center'>
                    <ChevronDown size={20} color="#d4d4d4" />
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
              <TouchableOpacity className='flex-row gap-2 items-center justify-center rounded-full border border-neutral-200 px-2 py-1'
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
                <OutfitText className='text-xs text-neutral-400'>{newPostData.images.length > 0 ? `${newPostData.images.length}/4` : 'Add'} Images</OutfitText>
              </TouchableOpacity>
            </View>
          </ScrollView>

        </KeyboardAvoidingView>

        <View className='flex-row px-4 py-4 items-center gap-4 justify-between bg-white'>
          <Touchable
            onPress={handleSubmit}
            disabled={loading}
            className='flex-1'
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <>
                <View className='size-4 items-center justify-center'>
                  <Plus color="white" size={16} strokeWidth={3} />
                </View>
                <OutfitText weight='semi-bold' className='text-white'>Post</OutfitText>
              </>
            )}

          </Touchable>
        </View>

        <View className='bg-white' style={{ height: inset.bottom }} >

        </View>
      </View >

      <AlertModal visible={alertOpen}>
        <View className="p-4">
          <OutfitText weight='semi-bold' className='text-lg mb-2'>Discard Post?</OutfitText>
          <OutfitText className='text-neutral-400 text-sm mb-4'>All changes will be lost.</OutfitText>
          <View className='gap-2'>
            <TouchableOpacity className='flex-row gap-2 bg-orange-500 py-3 px-4 rounded-lg items-center justify-between' onPress={() => setAlertOpen(false)}>
              <OutfitText weight='medium' className='text-white'>Cancel</OutfitText>
              <CircleX color="white" size={16} />
            </TouchableOpacity>
            <TouchableOpacity className='flex-row gap-2 bg-neutral-200 py-3 px-4 rounded-lg items-center justify-between' onPress={() => router.back()}>
              <OutfitText weight='medium' className='text-neutral-400'>Discard</OutfitText>
              <Trash color='#a3a3a3' size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>

      <BottomSheet open={sheetOpen} setOpen={setSheetOpen}>
        <SheetContent sheet={sheetContent} setSheetOpen={setSheetOpen} />
      </BottomSheet>
    </>
  )
}
