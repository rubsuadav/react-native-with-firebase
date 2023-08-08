import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import tw from "twrnc";

//local imports
//screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

//firebase
import { FIREBASE_AUTH } from "./firebaseConfig";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//utils
import { getUserRole } from "./utils/Functions";
import UserScreens from "./utils/UserScreens";
import AdminScreens from "./utils/AdminScreens";

export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onIdTokenChanged(async (user) => {
      setUser(user);
      if (user) {
        const role = await getUserRole({ user });
        setUserRole(role);
      }
    });
    return unsubscribe;
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <NavigationContainer>
      <View style={[tw`android:mt-14`, { height, width }]}>
        <Header />
        <Stack.Navigator>
          {userRole === "admin" ? (
            <Stack.Screen
              name="AdminScreens"
              component={AdminScreens}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              {!user ? (
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
              ) : (
                <Stack.Screen
                  name="UserScreens"
                  component={UserScreens}
                  options={{ headerShown: false }}
                />
              )}
            </>
          )}
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
}
