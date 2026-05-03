import InputFieldWrapper from "@/components/util/InputFieldWrapper";
import TextInputField from "@/components/util/TextInputField";
import Touchable from "@/components/util/Touchable";
import { SpaceGroteskText } from "@/utils/CustomFontText";
import { CircleCheckBig } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function PostUpdateScreen() {

  const [loading, setLoading] = useState(false)
  const [activity, setActivity] = useState<string>('')
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [duration, setDuration] = useState<any>(null)

  const handleSubmit = () => {

  }

  return (
    <View className='flex-1 bg-neutral-100 p-4'>
      <KeyboardAvoidingView
        className='flex-1'
      >
        <ScrollView>
          <View className="gap-2 mb-6">
            <InputFieldWrapper heading="Write an update">
              <TextInputField placeholder="What's on your mind?" />
            </InputFieldWrapper>

          </View>
          <Touchable
            onPress={handleSubmit}
            disabled={loading}
            className='h-14'
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <>
                <SpaceGroteskText weight='bold' className='text-white'>Post</SpaceGroteskText>
                <View className='size-4'>
                  <CircleCheckBig color="white" size={16} />
                </View>
              </>
            )}

          </Touchable>
        </ScrollView>

      </KeyboardAvoidingView>

    </View>
  )
}
