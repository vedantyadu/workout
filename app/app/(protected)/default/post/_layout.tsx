import TopBar from "@/components/util/TopBar";
import { PostProvider } from "@/context/PostContext";
import { Stack } from "expo-router";


export default function PostLayout() {
  return (
    <PostProvider>
      <Stack screenOptions={{ header: ({ options }) => <TopBar title={options.headerTitle?.toString() || "Post"} /> }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="activity" options={{ headerTitle: "Post Activity" }} />
        <Stack.Screen name="update" options={{ headerTitle: "Post Update" }} />
      </Stack>
    </PostProvider>
  )
}
