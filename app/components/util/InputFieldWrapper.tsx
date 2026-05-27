import { OutfitText } from "@/utils/CustomFontText";
import { Asterisk } from "lucide-react-native";
import { View } from "react-native";

export default function InputFieldWrapper({
  heading,
  required,
  children,
  error,
}: {
  heading: string;
  required?: boolean;
  children?: React.ReactNode;
  error?: string;
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex-row items-center gap-1">
        <OutfitText className="text-xs text-neutral-500">{heading}</OutfitText>
        {required && (
          <OutfitText weight="bold" className="text-orange-500 text-xs">
            *
          </OutfitText>
        )}
      </View>
      {children}
      {error && (
        <OutfitText className="text-xs text-red-500">{error}</OutfitText>
      )}
    </View>
  );
}
