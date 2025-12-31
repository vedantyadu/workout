import { Text } from 'react-native'

export function GeistText({
  weight,
  children,
  style,
  ...props
}: React.ComponentProps<typeof Text> & {
  weight?: 'regular' | 'italic' | 'medium' | 'semi-bold' | 'bold'
}) {
  let fontString: string

  switch (weight) {
    case 'regular':
      fontString = 'Geist-Regular'
      break
    case 'italic':
      fontString = 'Geist-RegularItalic'
      break
    case 'medium':
      fontString = 'Geist-Medium'
      break
    case 'semi-bold':
      fontString = 'Geist-SemiBold'
      break
    case 'bold':
      fontString = 'Geist-Bold'
      break
    default:
      fontString = 'Geist-Regular'
      break
  }

  return (
    <Text
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
      style={[style, { fontFamily: fontString }]}
      {...props}
    >
      {children}
    </Text>
  )
}
