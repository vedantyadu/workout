import { usePostContext } from '@/context/PostContext'
import { backend } from '@/utils/axios/backend'
import { OutfitText } from '@/utils/CustomFontText'
import { Check, MapPin, Plus, Search, Undo2 } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SelectLocation({
  value,
  setValue,
  setSheetOpen,
}: {
  value: string | null
  setValue: (value: string | null) => void
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const inset = useSafeAreaInsets()
  const [locationSearchText, setLocationSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Array<object>>([])
  const [state, setState] = useState<
    'loading' | 'initial' | 'no_results' | 'searched'
  >('initial')

  const searchLocations = async () => {
    if (locationSearchText === '') return

    setState(() => 'loading')
    setSearchResults(() => [])
    const response = await backend.post('/services/search-location', {
      query: locationSearchText,
    })
    if (!response.data.suggestions.length) {
      setState(() => 'no_results')
      return
    }
    setSearchResults(response.data.suggestions)
    setState(() => 'initial')
  }

  useEffect(() => {
    setState('initial')
    setSearchResults([])
  }, [locationSearchText])

  const LocationItems = () => {
    if (state == 'loading') return <ActivityIndicator color='#000' />

    if (state == 'no_results')
      return (
        <OutfitText className='text-xs text-neutral-400 text-center'>
          No results found
        </OutfitText>
      )

    return (
      <View className='py-1'>
        {locationSearchText && (
          <LocationItemTouchable
            customLocation={true}
            setSheetOpen={setSheetOpen}
            location={locationSearchText}
            setValue={setValue}
          />
        )}

        {searchResults.map((location: any, index: number) => (
          <LocationItemTouchable
            key={index}
            setSheetOpen={setSheetOpen}
            location={location.placePrediction.text.text as string}
            setValue={setValue}
          />
        ))}
      </View>
    )
  }

  return (
    <>
      <View className='flex-row items-center justify-between px-4 mb-4'>
        <OutfitText weight='bold'>Select Location</OutfitText>
        {value && (
          <TouchableOpacity
            className='flex-row items-center gap-2'
            onPress={() => {
              setValue(null)
              setSheetOpen(false)
            }}
          >
            <OutfitText
              weight='medium'
              className='text-orange-500 text-sm'
            >
              Remove
            </OutfitText>
          </TouchableOpacity>
        )}
      </View>
      <View className='px-4'>
        <View className='flex-row border border-neutral-300 rounded-lg px-2 items-center gap-2'>
          <TextInput
            value={locationSearchText}
            onChangeText={(v) => {
              setLocationSearchText(v)
            }}
            placeholder='Search location'
            className='text-neutral-800 placeholder:text-neutral-400 text-sm flex-1 font-outfitRegular'
            returnKeyType='search'
            onSubmitEditing={searchLocations}
          />
          <View className='size-6 items-center justify-center'>
            <Search
              size={16}
              color='#a3a3a3'
            />
          </View>
        </View>
      </View>

      <ScrollView className='flex-1 px-4'>
        <LocationItems />
      </ScrollView>

      <View
        className='bg-white'
        style={{ height: inset.bottom }}
      />
    </>
  )
}

function LocationItemTouchable({
  customLocation,
  location,
  setSheetOpen,
  setValue,
}: {
  customLocation?: boolean
  location: string
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  setValue: (value: string | null) => void
}) {
  return (
    <TouchableOpacity
      className={`flex-row px-2 py-3 items-center gap-2`}
      onPress={() => {
        setValue(location)
        setSheetOpen(false)
      }}
    >
      <OutfitText className={`text-sm flex-1 text-neutral-600`}>
        {location}
      </OutfitText>
      {customLocation ? (
        <Plus
          size={20}
          color='#a3a3a3'
        />
      ) : (
        <MapPin
          size={20}
          color='#a3a3a3'
        />
      )}
    </TouchableOpacity>
  )
}
