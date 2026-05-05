import { Modal, StatusBar, View } from "react-native";

export function AlertModal({ visible, children }: { visible: boolean, children?: React.ReactNode }) {
  return (
    <Modal className="items-center justify-center" visible={visible} statusBarTranslucent={true} navigationBarTranslucent={true} transparent>
      <View className="items-center justify-center flex-1 bg-black/60">
        <View className="w-3/4 bg-white rounded-xl">
          {children}
        </View>
      </View>
    </Modal>
  )
}
