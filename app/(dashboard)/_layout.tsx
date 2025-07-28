import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { BooksProvider } from "../../contexts/BooksContext";

export default function TabLayout() {
  return (
    <BooksProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "person" : "person-outline"}
                color="#666"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books"
          options={{
            title: "Books",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "book" : "book-outline"}
                color="#666"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "create" : "create-outline"}
                color="#666"
              />
            ),
          }}
        />
        <Tabs.Screen name="books/[id]" options={{ href: null }} />
      </Tabs>
    </BooksProvider>
  );
}
