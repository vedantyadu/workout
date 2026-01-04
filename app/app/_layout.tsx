import { Stack } from 'expo-router'
import 'react-native-reanimated'
import '../global.css'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { useFonts } from 'expo-font'
import { DeepLinkProvider } from '@/context/DeepLinkContext'

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
    <DeepLinkProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='auth/index' />
        <Stack.Screen name='signin/index' />
      </Stack>
    </DeepLinkProvider>
  )
}
