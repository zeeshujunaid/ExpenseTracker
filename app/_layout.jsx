import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="(auth)/Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)/Homescreen" />
      <Stack.Screen name="(auth)/Login" />
      <Stack.Screen name="(auth)/Signup" />
    </Stack>
  );
}
