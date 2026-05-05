import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import '../global.css'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { useFonts } from 'expo-font'
import { DeepLinkProvider } from '@/context/DeepLinkContext'
import { UserProvider } from '@/context/UserContext'

const GesitRegular = require('../assets/fonts/Geist-Regular.ttf')
const GeistRegularItalic = require('../assets/fonts/Geist-RegularItalic.ttf')
const GeistMedium = require('../assets/fonts/Geist-Medium.ttf')
const GeistSemiBold = require('../assets/fonts/Geist-SemiBold.ttf')
const GeistBold = require('../assets/fonts/Geist-Bold.ttf')
const SpaceGroteskLight = require('../assets/fonts/SpaceGrotesk-Light.ttf')
const SpaceGroteskRegular = require('../assets/fonts/SpaceGrotesk-Regular.ttf')
const SpaceGroteskMedium = require('../assets/fonts/SpaceGrotesk-Medium.ttf')
const SpaceGroteskSemiBold = require('../assets/fonts/SpaceGrotesk-SemiBold.ttf')
const SpaceGroteskBold = require('../assets/fonts/SpaceGrotesk-Bold.ttf')

const OutfitLight = require('../assets/fonts/Outfit-Light.ttf')
const OutfitRegular = require('../assets/fonts/Outfit-Regular.ttf')
const OutfitMedium = require('../assets/fonts/Outfit-Medium.ttf')
const OutfitSemiBold = require('../assets/fonts/Outfit-SemiBold.ttf')
const OutfitBold = require('../assets/fonts/Outfit-Bold.ttf')
const OutfitExtraBold = require('../assets/fonts/Outfit-ExtraBold.ttf')

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Geist-Regular': GesitRegular,
    'Geist-RegularItalic': GeistRegularItalic,
    'Geist-Medium': GeistMedium,
    'Geist-SemiBold': GeistSemiBold,
    'Geist-Bold': GeistBold,
    'SpaceGrotesk-Light': SpaceGroteskLight,
    'SpaceGrotesk-Regular': SpaceGroteskRegular,
    'SpaceGrotesk-Medium': SpaceGroteskMedium,
    'SpaceGrotesk-SemiBold': SpaceGroteskSemiBold,
    'SpaceGrotesk-Bold': SpaceGroteskBold,
    'Outfit-Light': OutfitLight,
    'Outfit-Regular': OutfitRegular,
    'Outfit-Medium': OutfitMedium,
    'Outfit-SemiBold': OutfitSemiBold,
    'Outfit-Bold': OutfitBold,
    'Outfit-ExtraBold': OutfitExtraBold,
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setStyle('light')
    }
  }, [])

  if (!loaded && !error) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <DeepLinkProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: 'dark',
            }}
          >
            <Stack.Screen name='(protected)/default' />
            <Stack.Screen name='signin' />
            <Stack.Screen name='auth/index' />
          </Stack>
        </DeepLinkProvider>
      </UserProvider>
    </GestureHandlerRootView>
  )
}
