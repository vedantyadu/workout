import Touchable from "@/components/util/Touchable";
import { usePostContext } from "@/context/PostContext";
import { OutfitText } from "@/utils/CustomFontText";
import { Check, Minus, Plus } from "lucide-react-native";
import { useRef } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SelectDuration({ setSheetOpen }: { setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { newPostData, setNewPostData } = usePostContext();
  const inset = useSafeAreaInsets()

  const updateHours = (val: string) => {
    setNewPostData(prev => ({
      ...prev,
      duration: { ...prev.duration, hours: val.replace(/[^0-9]/g, '') }
    }));
  };

  const updateMinutes = (val: string) => {
    let numericVal = val.replace(/[^0-9]/g, '');
    if (numericVal && parseInt(numericVal) > 59) numericVal = '59';
    setNewPostData(prev => ({
      ...prev,
      duration: { ...prev.duration, minutes: numericVal }
    }));
  };

  const adjustHours = (delta: number) => {
    const current = parseInt(newPostData.duration.hours || '0');
    const next = Math.max(0, current + delta);
    updateHours(next.toString());
  };

  const adjustMinutes = (delta: number) => {
    const current = parseInt(newPostData.duration.minutes || '0');
    let next = current + delta;
    if (next < 0) next = 0;
    if (next > 59) next = 59;
    updateMinutes(next.toString());
  };

  const timerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);

  const startAdjusting = (adjustFn: (delta: number) => void, delta: number) => {
    adjustFn(delta);
    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        adjustFn(delta);
      }, 100);
    }, 500);
  };

  const stopAdjusting = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <View className='flex-1'>
      <View className='flex-row justify-between items-center px-4 pb-2'>
        <OutfitText weight='bold' className=' text-neutral-800'>Set Duration</OutfitText>
        <TouchableOpacity onPress={() => {
          setNewPostData(prev => ({ ...prev, duration: { hours: "", minutes: "" } }))
          setSheetOpen(false)
        }}>
          <OutfitText weight='medium' className='text-orange-500 text-sm'>Reset</OutfitText>
        </TouchableOpacity>
      </View>

      <ScrollView className='flex-1 px-4'>
        <View className='gap-4'>
          {/* Hours Selector */}
          <View className='gap-2'>
            <OutfitText weight='medium' className='text-neutral-500 text-sm'>Hours</OutfitText>
            <View className='flex-row items-center justify-between'>
              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustHours, -1)}
                onPressOut={stopAdjusting}
                className='bg-neutral-100 size-12 rounded-full items-center justify-center'
              >
                <Minus size={20} color="#a3a3a3" />
              </TouchableOpacity>

              <View className='flex-row items-baseline gap-2'>
                <TextInput
                  value={newPostData.duration.hours}
                  onChangeText={updateHours}
                  keyboardType='numeric'
                  placeholder='0'
                  className='text-4xl text-neutral-800 min-w-[40px] text-center font-outfitMedium'
                  placeholderTextColor="#d4d4d4"
                  underlineColorAndroid='transparent'
                />
                <OutfitText className='text-neutral-400 text-lg'>hrs</OutfitText>
              </View>

              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustHours, 1)}
                onPressOut={stopAdjusting}
                className='bg-neutral-100 size-12 rounded-full items-center justify-center'
              >
                <Plus size={20} color="#a3a3a3" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Minutes Selector */}
          <View className='gap-2'>
            <OutfitText weight='medium' className='text-neutral-500 text-sm'>Minutes</OutfitText>
            <View className='flex-row items-center justify-between rounded-2xl'>
              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustMinutes, -5)}
                onPressOut={stopAdjusting}
                className='bg-neutral-100 size-12 rounded-full items-center justify-center'
              >
                <Minus size={20} color="#a3a3a3" />
              </TouchableOpacity>

              <View className='flex-row items-baseline gap-2'>
                <TextInput
                  value={newPostData.duration.minutes}
                  onChangeText={updateMinutes}
                  keyboardType='numeric'
                  placeholder='12'
                  className='text-4xl text-neutral-800 min-w-[40px] text-center font-outfitMedium'
                  placeholderTextColor="#d4d4d4"
                  underlineColorAndroid='transparent'
                />
                <OutfitText className='text-neutral-400'>min</OutfitText>
              </View>

              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustMinutes, 10)}
                onPressOut={stopAdjusting}
                className='bg-neutral-100 size-12 rounded-full items-center justify-center'
              >
                <Plus size={20} color="#a3a3a3" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-4 py-4 gap-2">
        <Touchable onPress={() => setSheetOpen(false)}>
          <Check size={20} color="#fff" />
          <OutfitText weight='semi-bold' className="text-white">Done</OutfitText>
        </Touchable>
      </View>

      <View className="bg-white" style={{ height: inset.bottom }} />
    </View>
  );
}
