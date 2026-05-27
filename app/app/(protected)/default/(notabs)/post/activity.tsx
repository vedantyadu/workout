import React, { useCallback, useEffect, useState } from 'react'
import { OutfitText } from '@/utils/CustomFontText'
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  BackHandler,
} from 'react-native'
import TextInputField from '@/components/util/TextInputField'
import { useRouter } from 'expo-router'
import BottomSheet from '@/components/util/BottomSheet'
import { Activity, Clock4, ImageIcon, MapPin, Plus } from 'lucide-react-native'
import SelectActivity from '@/components/screens/post/activity/SelectActivity'
import SelectDuration from '@/components/screens/post/activity/SelectDuration'
import * as ImagePicker from 'expo-image-picker'
import SelectLocation from '@/components/screens/post/SelectLocation'
import { AlertModal } from '@/components/util/AlertModal'
import Option from '@/components/util/Option'
import {
  PrimaryTouchable,
  SecondaryTouchable,
} from '@/components/util/Touchables'
import ImageScroller from '@/components/screens/post/ImageScroller'
import BottomBar from '@/components/util/BottomBar'
import { ActivityPostDataType } from '@/types/post'

type SheetType = 'activity' | 'duration' | 'location' | null
const MAX_IMAGES = 4

export default function PostActivityScreen() {
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetContent, setSheetContent] = useState<SheetType>(null)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [data, setData] = useState<ActivityPostDataType>({
    activity: null,
    duration: { hours: '', minutes: '' },
    description: '',
    images: [],
    location: null,
  })

  const router = useRouter()

  const openSheet = (sheetContent: SheetType) => {
    setSheetContent(sheetContent)
    setSheetOpen(true)
  }

  const handleSubmit = async () => {
    // setLoading(true)
  }

  const SheetView = useCallback(() => {
    switch (sheetContent) {
      case 'activity':
        return (
          <SelectActivity
            value={data.activity}
            setValue={(value) => setData({ ...data, activity: value })}
            setSheetOpen={setSheetOpen}
          />
        )
      case 'duration':
        return (
          <SelectDuration
            value={data.duration}
            setValue={(value) => setData({ ...data, duration: value })}
            setSheetOpen={setSheetOpen}
          />
        )
      case 'location':
        return (
          <SelectLocation
            value={data.location}
            setValue={(value) => setData({ ...data, location: value })}
            setSheetOpen={setSheetOpen}
          />
        )
      default:
        return null
    }
  }, [sheetContent])

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (sheetOpen) {
        setSheetOpen(false)
        setSheetContent(null)
        return true
      } else if (
        data.description ||
        data.activity ||
        data.duration ||
        data.location ||
        data.images
      ) {
        setAlertOpen(true)
        return true
      }
      return false
    })

    return () => handler.remove()
  }, [])

  const isPostable = () => {
    return (
      data.activity && data.duration.hours != '' && data.duration.minutes != ''
    )
  }

  const handleAddImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: MAX_IMAGES,
      allowsMultipleSelection: true,
    })
    setData({
      ...data,
      images: image.assets ? image.assets.map((a) => a.uri) : [],
    })
  }

  return (
    <>
      <View className='flex-1 bg-white'>
        <KeyboardAvoidingView className='flex-1'>
          <ScrollView>
            <View className='gap-4 p-4'>
              <Option
                icon={
                  <Activity
                    size={16}
                    color='#a3a3a3'
                  />
                }
                heading='Activity'
                value={data.activity}
                placeholder='Select Activity'
                dotVisible={data.activity ? false : true}
                onPress={() => {
                  openSheet('activity')
                }}
              />

              <Option
                icon={
                  <Clock4
                    size={16}
                    color='#a3a3a3'
                  />
                }
                heading='Duration'
                value={
                  data.duration.hours && data.duration.minutes
                    ? `${data.duration.hours}hrs ${data.duration.minutes}mins`
                    : ''
                }
                placeholder='Select Duration'
                dotVisible={
                  data.duration.hours && data.duration.minutes ? false : true
                }
                onPress={() => {
                  openSheet('duration')
                }}
              />

              <Option
                icon={
                  <MapPin
                    size={16}
                    color='#a3a3a3'
                  />
                }
                heading='Location'
                value={data.location}
                placeholder='Add Location'
                dotVisible={false}
                onPress={() => {
                  openSheet('location')
                }}
              />

              <Option
                icon={
                  <ImageIcon
                    size={16}
                    color='#a3a3a3'
                  />
                }
                heading='Images'
                value={
                  data.images.length > 0
                    ? `${data.images.length} / ${MAX_IMAGES} Images`
                    : ''
                }
                placeholder='Add Images'
                dotVisible={false}
                onPress={() => {
                  if (data.images.length < MAX_IMAGES) {
                    handleAddImage()
                  }
                }}
              />

              <TextInputField
                value={data.description}
                onChangeText={(v) => setData((f) => ({ ...f, description: v }))}
                multiline
                numberOfLines={4}
                placeholder="What's on your mind?"
                textAlignVertical='top'
                className='h-32'
              />

              {data.images.length > 0 && (
                <ImageScroller
                  images={data.images}
                  onRemove={(index) => {
                    setData({
                      ...data,
                      images: data.images.filter((img, i) => i != index),
                    })
                  }}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <BottomBar>
          <PrimaryTouchable
            onPress={handleSubmit}
            disabled={loading || !isPostable()}
            icon={
              loading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                <View className='size-4 items-center justify-center'>
                  <Plus
                    color='white'
                    size={16}
                    strokeWidth={3}
                  />
                </View>
              )
            }
            text={loading ? null : 'Post'}
          />
        </BottomBar>
      </View>

      <AlertModal visible={alertOpen}>
        <OutfitText
          weight='semi-bold'
          className='text-lg mb-2'
        >
          Discard Post?
        </OutfitText>
        <OutfitText className='text-neutral-400 text-sm mb-8'>
          All changes will be lost.
        </OutfitText>
        <View className='gap-4 flex-row'>
          <SecondaryTouchable
            text='Cancel'
            onPress={() => setAlertOpen(false)}
          />
          <PrimaryTouchable
            text='Discard'
            onPress={() => router.back()}
          />
        </View>
      </AlertModal>

      <BottomSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
      >
        <SheetView />
      </BottomSheet>
    </>
  )
}
