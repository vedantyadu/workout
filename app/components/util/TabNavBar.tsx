import { TabNavbarPropsType } from "@/types/tabNavbar";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabNavBar({ tabs, currentRoute }: TabNavbarPropsType) {

  const { width: windowWidth } = useWindowDimensions();
  const horizontalPadding = 8;
  const numTabs = tabs.length;
  const tabWidth = (windowWidth - (horizontalPadding * 2)) / numTabs;
  const positionX = useSharedValue(tabs.findIndex(t => t.route === currentRoute) * tabWidth + horizontalPadding);

  const inset = useSafeAreaInsets();
  const router = useRouter()

  useEffect(() => {
    positionX.value = withTiming(tabs.findIndex(t => t.route === currentRoute) * tabWidth + horizontalPadding, { duration: 150 });
  }, [currentRoute, tabWidth]);

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
        {tabs.map((tab, index) => {
          const active = currentRoute === tab.route;
          const Icon = tab.icon

          return (
            <TouchableOpacity
              key={tab.route.toString()}
              onPress={() => router.navigate(tab.route)}
              className="flex-1 justify-center items-center py-2"
            >
              <Icon active={active} />
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
