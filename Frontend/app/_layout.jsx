import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

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
      </GestureHandlerRootView>
  );
}
