import { Image } from 'expo-image'
import { View, Pressable } from 'react-native'
import { SpaceGroteskText } from '@/utils/CustomFontText'
import * as WebBrowser from 'expo-web-browser'
import { SafeAreaView } from 'react-native-safe-area-context'

const googleIcon = require('../../assets/images/google-icon.svg')
const appLogo = require('../../assets/images/workout-logo.svg')

export default function SignInScreen() {
  const handleGoogleSignInPress = async () => {
    const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth'

    const options = {
      redirect_uri: 'https://workout-redirect.vercel.app',
      client_id:
        '827281209561-a4qffegka0lj3lbkoip7nat43qp681e5.apps.googleusercontent.com',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    }

    const queryString = new URLSearchParams(options)
    const queryStringURL = `${baseURL}?${queryString.toString()}`

    await WebBrowser.openAuthSessionAsync(queryStringURL)
  }

  return (
    <SafeAreaView className='flex-1 p-4 bg-neutral-100'>
      <View className='flex-1 items-center gap-16 pt-16'>
        <View className='items-center'>
          <Image
            source={appLogo}
            style={{ height: 64, aspectRatio: 1 }}
          />
          <SpaceGroteskText
            weight='medium'
            className='text-neutral-400 text-xs'
          >
            Workout, Out Loud.
          </SpaceGroteskText>
        </View>
        <View className='items-center w-full gap-4'>
          <SpaceGroteskText
            weight='bold'
            className='text-xl text-neutral-600'
          >
            Sign in or Create an Account to Continue.
          </SpaceGroteskText>
          <Pressable className='flex-row items-center justify-center px-6 py-4 border border-neutral-400 rounded-lg gap-4 w-full'>
            <Image
              source={googleIcon}
              style={{ width: 16, height: 16 }}
            />
            <SpaceGroteskText
              weight='semi-bold'
              className='text-sm text-neutral-500'
              onPress={handleGoogleSignInPress}
            >
              Continue with Google
            </SpaceGroteskText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
