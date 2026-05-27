import TopBar from '@/components/util/TopBar'
import { Stack } from 'expo-router'

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ options }) => (
          <TopBar title={options.headerTitle?.toString() || 'Post'} />
        ),
      }}
    >
      <Stack.Screen
        name='activity'
        options={{ headerTitle: 'Post Activity' }}
      />
      <Stack.Screen
        name='update'
        options={{ headerTitle: 'Post Update' }}
      />
    </Stack>
  )
}
