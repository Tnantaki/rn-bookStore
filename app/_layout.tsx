import { Stack } from "expo-router";
import "../global.css";
import { SessionProvider, useSession } from "../contexts/SessionContext";
import { SplashScreenController } from "../components/splash";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavitor />
    </SessionProvider>
  );
}

function RootNavitor() {
  const { session } = useSession();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ddd",
        },
        headerTintColor: "#333",
      }}
    >
      <Stack.Protected guard={!session}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
