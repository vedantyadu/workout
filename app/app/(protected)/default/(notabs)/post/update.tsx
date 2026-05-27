import ImageScroller from '@/components/screens/post/ImageScroller'
import SelectLocation from '@/components/screens/post/SelectLocation'
import { AlertModal } from '@/components/util/AlertModal'
import BottomBar from '@/components/util/BottomBar'
import BottomSheet from '@/components/util/BottomSheet'
import InputFieldWrapper from '@/components/util/InputFieldWrapper'
import Option from '@/components/util/Option'
import TextInputField from '@/components/util/TextInputField'
import Touchable from '@/components/util/Touchable'
import {
  PrimaryTouchable,
  SecondaryTouchable,
} from '@/components/util/Touchables'
import * as ImagePicker from 'expo-image-picker'
import { UpdatePostDataType } from '@/types/post'
import { OutfitText } from '@/utils/CustomFontText'
import { CircleCheckBig, ImageIcon, MapPin, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'

type SheetType = 'location' | null
const MAX_IMAGES = 4

export default function PostUpdateScreen() {
  const [loading, setLoading] = useState(false)
  const [sheetContent, setSheetContent] = useState<SheetType>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [data, setData] = useState<UpdatePostDataType>({
    description: '',
    images: [],
    location: null,
  })

  const router = useRouter()

  const handleSubmit = () => {}

  const openSheet = (sheetContent: SheetType) => {
    setSheetContent(sheetContent)
    setSheetOpen(true)
  }

  const SheetView = () => {
    switch (sheetContent) {
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

  const isPostable = () => {
    return (
      data.description != '' || data.images.length > 0 || data.location != null
    )
  }

  return (
    <>
      <View className='flex-1 bg-white'>
        <KeyboardAvoidingView className='flex-1'>
          <ScrollView>
            <View className='gap-4 p-4'>
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
