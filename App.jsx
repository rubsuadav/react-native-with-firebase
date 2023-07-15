import { Text } from "react-native";

//local imports
import UserAdminScreen from "./screens/UserAdminScreen";

export default function App() {
  /*const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unsubscribe = FIREBASE_AUTH.onAuthStateChanged(
    (user) => {
      setUser(user);
      setLoading(false);
    },
    (error) => {
      setError(error);
      setLoading(false);
    }
  );

  useEffect(() => {
    unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }*/

  /*if (user && user.uid === "ADMIN_UID_HERE") {
    return (
      <View style={tw`p-4 android:pt-2 bg-white dark:bg-black`}>
        <UserAdminScreen />
      </View>
    );
  } else {*/
  return (
    <Text>
      <UserAdminScreen />
    </Text>
  );
}
