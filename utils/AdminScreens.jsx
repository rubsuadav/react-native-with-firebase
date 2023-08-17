import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

//local imports
import BookingScreen from "../screens/BookingScreen";
import UserAdminScreen from "../screens/UserAdminScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingFormScreen from "../screens/BookingFormScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();
export default function AdminScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bookings"
        component={BookingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserAdmin"
        component={UserAdminScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
