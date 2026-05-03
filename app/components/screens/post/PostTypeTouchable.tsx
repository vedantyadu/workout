import { SpaceGroteskText } from "@/utils/CustomFontText";
import { ArrowRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export default function PostTypeTouchable({ children, className, icon, title, description, ...props }: React.PropsWithChildren<TouchableOpacityProps> & { icon: React.ReactNode, title: string, description: string }) {
  return (
    <TouchableOpacity className="py-6 px-4 rounded-lg bg-neutral-50 flex-row items-center border border-neutral-200" {...props}>
      <View className="flex-1 flex-row items-center gap-4">
        {icon}
        <View>
          <SpaceGroteskText weight="bold" className="text-lg">{title}</SpaceGroteskText>
          <SpaceGroteskText className="text-sm !text-neutral-400">{description}</SpaceGroteskText>
        </View>
      </View>
      <ArrowRight color="#a3a3a3" size={20} />
    </TouchableOpacity>
  )
}
