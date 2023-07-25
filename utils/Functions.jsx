import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

//local imports
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export async function getUserProfile({ setError, setUser }) {
  const currentUser = FIREBASE_AUTH.currentUser;
  switch (currentUser) {
    case null:
      setError("No se encontró el usuario");
      break;
    default:
      const userRef = doc(FIREBASE_DB, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      switch (docSnap.exists()) {
        case true:
          const name = docSnap.data().name;
          const lastName = docSnap.data().lastName;
          const displayName = `${name} ${lastName}`;
          setUser({ ...docSnap.data(), displayName });
          break;
        case false:
          setError("No se encontró el usuario");
          break;
      }
      break;
  }
}
export async function handleLogout({ navigation, setError }) {
  try {
    await signOut(FIREBASE_AUTH);
    navigation.navigate("Login");
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        setError("El usuario no existe");
        break;
      default:
        break;
    }
  }
}
