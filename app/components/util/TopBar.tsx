import { OutfitText } from "@/utils/CustomFontText";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopBar({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  const inset = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      className="bg-white border-b border-neutral-100 z-[1000]"
      style={{ paddingTop: inset.top }}
    >
      <View className="flex flex-row items-center px-2 py-2 gap-4">
        <TouchableOpacity
          onPress={onBack ?? (() => router.back())}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center"
        >
          <ArrowLeft size={20} color="#a3a3a3" />
        </TouchableOpacity>
        <View className="flex-1 justify-center">
          <OutfitText
            weight="semi-bold"
            className="text-lg text-neutral-800 leading-tight"
          >
            {title}
          </OutfitText>
        </View>
      </View>
    </View>
  );
}
