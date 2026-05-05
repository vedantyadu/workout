import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabNavBar({ navigation, state, descriptors }: BottomTabBarProps) {

  const { width: windowWidth } = useWindowDimensions();
  const horizontalPadding = 8;
  const numTabs = state.routes.length;
  const tabWidth = (windowWidth - (horizontalPadding * 2)) / numTabs;
  const positionX = useSharedValue(state.index * tabWidth + horizontalPadding);

  const inset = useSafeAreaInsets();
  const router = useRouter()

  useEffect(() => {
    positionX.value = withTiming(state.index * tabWidth + horizontalPadding, { duration: 150 });
  }, [state.index, tabWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
    };
  });

  return (
    <View
      className="bg-white relative bottom-0 left-0 w-full"
      style={{ paddingBottom: inset.bottom }}
    >
      <View className="flex-row py-2" style={{ paddingHorizontal: horizontalPadding }}>
        {state.routes.map((route, index) => {
          const active = state.index === index;
          const { tabBarIcon } = descriptors[route.key].options
          const icon = tabBarIcon?.({ focused: active, color: active ? "#fb923c" : "#a3a3a3", size: 20 })

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              className="flex-1 justify-center items-center py-2"
            >
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.View
        className="h-1 bg-orange-500 absolute rounded-b-sm"
        style={[{ top: 0, width: tabWidth }, animatedStyle]}
      />
    </View>
  );
}
