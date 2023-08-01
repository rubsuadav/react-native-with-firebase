import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Alert } from "react-native";

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

export async function getUserRole({ user }) {
  const userRef = doc(FIREBASE_DB, "users", user.uid);
  const docSnap = await getDoc(userRef);
  switch (docSnap.exists()) {
    case true:
      return docSnap.data().roleId;
    case false:
      return null;
  }
}

//------------------------------------------------ALERTS------------------------------------------------

//////////////////////////////////////////MOBILE///////////////////////////////

export async function shouldLogoutAlertMobile({ navigation }) {
  Alert.alert(
    "Cerrar sesión",
    "¿Quieres cerrar sesión?",
    [
      {
        text: "Sí",
        onPress: () => {
          showAutoLogoutAlertMobile({ navigation });
        },
      },
      {
        text: "No",
        onPress: () => { },
        style: "cancel",
      },
    ],
  );
}

function showAutoLogoutAlertMobile({ navigation }) {
  let count = 10; // tiempo en segundos
  const interval = 400; // intervalo de tiempo en milisegundos
  const timer = setInterval(async () => {
    count--;
    if (count === 0) {
      clearInterval(timer);
      await FIREBASE_AUTH.signOut();
      navigation.navigate("Login");
    }
    Alert.alert(
      'Cerrando sesión',
      `La sesión se cerrará automáticamente en ${count} segundos.`,
      [{ onPress: () => clearInterval(timer) }],
    );
  }, interval);
}

//////////////////////////////////////////WEB///////////////////////////////

export async function shouldLogoutAlertWeb() {
  const swal = await Swal.fire({
    title: 'Quieres cerrar sesión?',
    showDenyButton: true,
    confirmButtonText: 'Sí',
  });
  switch (swal.isConfirmed) {
    case true:
      await showAutoLogoutAlertWeb();
      await FIREBASE_AUTH.signOut();
      localStorage.removeItem("token");
      window.location.reload();
      break;
    case false:
      break;
    default:
      break;
  }
}

async function showAutoLogoutAlertWeb() {
  let timerInterval;
  await Swal.fire({
    html: "La sesión se cerrará automáticamente en <b></b> milisegundos.",
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
}