import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3498db", // Couleur de fond du header
        },
        headerTintColor: "#fff", // Couleur du texte du header
        headerTitleStyle: {
          fontWeight: "bold", // Style de titre
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Ma To-Do List" }} />
    </Stack>
  );
}
