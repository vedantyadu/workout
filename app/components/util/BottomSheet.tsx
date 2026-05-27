import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

export default function BottomSheet({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const positionY = useSharedValue(0);
  const sheetHeight = useSharedValue(0);
  const opacity = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      positionY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (event.velocityY > 1000) {
        scheduleOnRN(setOpen, false);
      } else if (event.translationY > 150) {
        scheduleOnRN(setOpen, false);
      } else {
        positionY.value = withTiming(0, { duration: 150 });
      }
    });

  useEffect(() => {
    if (open) {
      positionY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      positionY.value = withTiming(sheetHeight.value, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [open, setOpen]);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: positionY.value }],
    };
  });

  const touchableAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[touchableAnimatedStyle]}
        className={`absolute top-0 left-0 h-full w-screen z-[1001]`}
      >
        <TouchableOpacity
          activeOpacity={1}
          className={`flex-1 bg-black/30`}
          onPress={() => {
            setOpen(false);
          }}
        />
      </Animated.View>

      <Animated.View
        onLayout={(e) => {
          const height = e.nativeEvent.layout.height;
          sheetHeight.value = height;
          if (!open) positionY.value = height;
        }}
        style={[cardAnimatedStyle]}
        className={`absolute bottom-0 left-0 w-screen h-3/5 bg-white rounded-t-3xl z-[1002]`}
      >
        <GestureDetector gesture={panGesture}>
          <View className="items-center justify-center py-4">
            <View className="bg-neutral-200 rounded-full w-1/5 h-1.5" />
          </View>
        </GestureDetector>
        {children}
      </Animated.View>
    </>
  );
}
