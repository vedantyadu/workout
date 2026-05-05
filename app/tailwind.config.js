/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        geistRegular: ['Geist-Regular'],
        geistRegularItalic: ['Geist-RegularItalic'],
        geistMedium: ['Geist-Medium'],
        geistSemiBold: ['Geist-SemiBold'],
        geistBold: ['Geist-Bold'],
        spaceGroteskLight: ['SpaceGrotesk-Light'],
        spaceGroteskRegular: ['SpaceGrotesk-Regular'],
        spaceGroteskMedium: ['SpaceGrotesk-Medium'],
        spaceGroteskSemiBold: ['SpaceGrotesk-SemiBold'],
        spaceGroteskBold: ['SpaceGrotesk-Bold'],
        outfitLight: ['Outfit-Light'],
        outfitRegular: ['Outfit-Regular'],
        outfitMedium: ['Outfit-Medium'],
        outfitSemiBold: ['Outfit-SemiBold'],
        outfitBold: ['Outfit-Bold'],
        outfitExtraBold: ['Outfit-ExtraBold'],
      },
    },
  },
  plugins: [],
}