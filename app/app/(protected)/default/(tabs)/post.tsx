import { OutfitText } from "@/utils/CustomFontText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { Activity, MessageCirclePlus } from "lucide-react-native";
import PostTypeTouchable from "@/components/screens/post/PostTypeTouchable";
import { useRouter } from "expo-router";
import TabNavBar from "@/components/util/TabNavBar";
import { navbarTabs } from "@/utils/navbar/navbarTabs";

export default function PostScreen() {

  const router = useRouter()
  const inset = useSafeAreaInsets();

  return (
    <>
      <View className="flex-1 bg-neutral-50" style={{ paddingTop: inset.top }}>
        <View className="p-4 flex-1">
          <OutfitText weight='bold' className='text-2xl mb-4'>
            Create a New Post
          </OutfitText>
          <View className="flex-col gap-2">
            <PostTypeTouchable
              icon={<Activity color="#f97316" size={20} />}
              title="Activity"
              description="Log your workout"
              onPress={() => router.push('/default/post/activity')} />
            <PostTypeTouchable
              icon={<MessageCirclePlus color="#f97316" size={20} />}
              title="Update"
              description="Share your thoughts"
              onPress={() => router.push('/default/post/update')} />
          </View>
        </View>
      </View>
    </>
  )
}
