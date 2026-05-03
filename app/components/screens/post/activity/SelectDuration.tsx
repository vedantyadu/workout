import { usePostContext } from "@/context/PostContext";
import { SpaceGroteskText } from "@/utils/CustomFontText";
import { Minus, Plus } from "lucide-react-native";
import { useRef } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

export default function SelectDuration({ setSheetOpen }: { setSheetOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { newPostData, setNewPostData } = usePostContext();

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
      <View className='flex-row justify-between items-center px-6 pb-4 border-b border-neutral-100'>
        <SpaceGroteskText weight='bold' className='text-xl text-neutral-800'>Set Duration</SpaceGroteskText>
        <TouchableOpacity onPress={() => setSheetOpen(false)}>
          <SpaceGroteskText weight='medium' className='text-orange-500'>Done</SpaceGroteskText>
        </TouchableOpacity>
      </View>

      <ScrollView className='flex-1 px-6' contentContainerStyle={{ paddingVertical: 24 }}>
        <View className='gap-8'>
          {/* Hours Selector */}
          <View className='gap-4'>
            <SpaceGroteskText weight='medium' className='text-neutral-500 uppercase text-xs tracking-widest'>Hours</SpaceGroteskText>
            <View className='flex-row items-center justify-between bg-neutral-50 p-4 rounded-2xl border border-neutral-100'>
              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustHours, -1)}
                onPressOut={stopAdjusting}
                className='bg-white size-12 rounded-xl items-center justify-center shadow-sm border border-neutral-100'
              >
                <Minus size={20} color="#525252" />
              </TouchableOpacity>

              <View className='flex-row items-baseline gap-2'>
                <TextInput
                  value={newPostData.duration.hours}
                  onChangeText={updateHours}
                  keyboardType='numeric'
                  placeholder='0'
                  style={{ fontFamily: 'SpaceGrotesk-Bold' }}
                  className='text-4xl text-neutral-800 min-w-[40px] text-center'
                  placeholderTextColor="#d4d4d4"
                  underlineColorAndroid='transparent'
                />
                <SpaceGroteskText className='text-neutral-400 text-lg'>hrs</SpaceGroteskText>
              </View>

              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustHours, 1)}
                onPressOut={stopAdjusting}
                className='bg-white size-12 rounded-xl items-center justify-center shadow-sm border border-neutral-100'
              >
                <Plus size={20} color="#525252" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Minutes Selector */}
          <View className='gap-4'>
            <SpaceGroteskText weight='medium' className='text-neutral-500 uppercase text-xs tracking-widest'>Minutes</SpaceGroteskText>
            <View className='flex-row items-center justify-between bg-neutral-50 p-4 rounded-2xl border border-neutral-100'>
              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustMinutes, -5)}
                onPressOut={stopAdjusting}
                className='bg-white size-12 rounded-xl items-center justify-center shadow-sm border border-neutral-100'
              >
                <Minus size={20} color="#525252" />
              </TouchableOpacity>

              <View className='flex-row items-baseline gap-2'>
                <TextInput
                  value={newPostData.duration.minutes}
                  onChangeText={updateMinutes}
                  keyboardType='numeric'
                  placeholder='0'
                  style={{ fontFamily: 'SpaceGrotesk-Bold' }}
                  className='text-4xl text-neutral-800 min-w-[40px] text-center'
                  placeholderTextColor="#d4d4d4"
                  underlineColorAndroid='transparent'
                />
                <SpaceGroteskText className='text-neutral-400 text-lg'>min</SpaceGroteskText>
              </View>

              <TouchableOpacity
                onPressIn={() => startAdjusting(adjustMinutes, 10)}
                onPressOut={stopAdjusting}
                className='bg-white size-12 rounded-xl items-center justify-center shadow-sm border border-neutral-100'
              >
                <Plus size={20} color="#525252" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
