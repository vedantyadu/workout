import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function SelectTouchable({ children, className, ...props }: React.PropsWithChildren<TouchableOpacityProps>) {
  return (
    <TouchableOpacity
      className={twMerge('flex-row gap-2 border border-neutral-200 rounded-lg overflow-hidden px-4 py-3 items-center justify-between', className)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}
