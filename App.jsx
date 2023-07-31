import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import tw from "twrnc";
//local imports
import UserAdminScreen from "./screens/UserAdminScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <NavigationContainer>
      <View style={[tw`android:mt-14`, { height, width }]}>
        <Header user={user} />
        <Stack.Navigator>
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
}
