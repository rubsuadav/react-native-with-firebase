import { Text, View } from "react-native";
import tw from "twrnc";
import UserAdminScreen from "./components/UserAdminScreen";

export default function App() {
  return (
    <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
      <UserAdminScreen />
    </View>
  );
}
