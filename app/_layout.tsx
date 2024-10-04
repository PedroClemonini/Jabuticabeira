import { Stack } from "expo-router";

export default function RootLayout() {
 return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index"
      options={{ title: "Jabuticaba Finder" }} />
    </Stack>
  );
}

