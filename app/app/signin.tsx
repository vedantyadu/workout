import { Image } from 'expo-image'
import { View, Pressable } from 'react-native'
import { OutfitText } from '@/utils/CustomFontText'
import * as WebBrowser from 'expo-web-browser'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowRight, ChevronRight } from 'lucide-react-native'

const googleIcon = require('../assets/images/google-icon.svg')
const appLogo = require('../assets/images/workout-logo.svg')

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
    <SafeAreaView className='flex-1 p-4 bg-white'>
      <View className='flex-1 items-center gap-6 justify-center'>
        <View className='items-center'>
          <Image
            source={appLogo}
            style={{ height: 64, aspectRatio: 1 }}
          />
        </View>
        <View className='items-center w-full gap-8'>
          <OutfitText
            weight='bold'
            className='text-2xl text-center'
          >
            Create an account or sign in to continue
          </OutfitText>
          <Pressable
            className='flex-row items-center justify-between px-4 py-4 bg-neutral-50 rounded-lg gap-4 w-full'
            onPress={handleGoogleSignInPress}
          >
            <View className='flex-row items-center gap-4'>
              <Image
                source={googleIcon}
                style={{ width: 16, height: 16 }}
              />
              <OutfitText
                weight='medium'
                className='text-sm text-neutral-400'
                onPress={handleGoogleSignInPress}
              >
                Continue with Google
              </OutfitText>
            </View>
            <View className='items-center justify-center size-4'>
              <ArrowRight
                size={16}
                color='#a3a3a3'
              />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
