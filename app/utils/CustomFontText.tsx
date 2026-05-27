import { Text } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function MontserratText({
  weight,
  children,
  style,
  className,
  ...props
}: React.ComponentProps<typeof Text> & {
  weight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold'
}) {
  let fontString: string

  switch (weight) {
    case 'light':
      fontString = 'Montserrat-Light'
      break
    case 'regular':
      fontString = 'Montserrat-Regular'
      break
    case 'medium':
      fontString = 'Montserrat-Medium'
      break
    case 'semi-bold':
      fontString = 'Montserrat-SemiBold'
      break
    case 'bold':
      fontString = 'Montserrat-Bold'
      break
    default:
      fontString = 'Montserrat-Regular'
      break
  }

  return (
    <Text
      className={twMerge('text-neutral-800', className)}
      style={[style, { fontFamily: fontString }]}
      {...props}
    >
      {children}
    </Text>
  )
}

export function SpaceGroteskText({
  weight,
  children,
  style,
  className,
  ...props
}: React.ComponentProps<typeof Text> & {
  weight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold'
}) {
  let fontString: string

  switch (weight) {
    case 'light':
      fontString = 'SpaceGrotesk-Light'
      break
    case 'regular':
      fontString = 'SpaceGrotesk-Regular'
      break
    case 'medium':
      fontString = 'SpaceGrotesk-Medium'
      break
    case 'semi-bold':
      fontString = 'SpaceGrotesk-SemiBold'
      break
    case 'bold':
      fontString = 'SpaceGrotesk-Bold'
      break
    default:
      fontString = 'SpaceGrotesk-Regular'
      break
  }
  return (
    <Text
      className={twMerge('text-neutral-800', className)}
      style={[style, { fontFamily: fontString }]}
      {...props}
    >
      {children}
    </Text>
  )
}

export function OutfitText({
  weight,
  children,
  style,
  className,
  ...props
}: React.ComponentProps<typeof Text> & {
  weight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold' | 'extra-bold'
}) {
  let fontString: string
  switch (weight) {
    case 'light':
      fontString = 'Outfit-Light'
      break
    case 'regular':
      fontString = 'Outfit-Regular'
      break
    case 'medium':
      fontString = 'Outfit-Medium'
      break
    case 'semi-bold':
      fontString = 'Outfit-SemiBold'
      break
    case 'bold':
      fontString = 'Outfit-Bold'
      break
    case 'extra-bold':
      fontString = 'Outfit-ExtraBold'
      break
    default:
      fontString = 'Outfit-Regular'
      break
  }

  return (
    <Text
      className={twMerge('text-neutral-800', className)}
      style={[style, { fontFamily: fontString }]}
      {...props}
    >
      {children}
    </Text>
  )

}
