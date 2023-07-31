import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

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

export async function showAutoLogoutAlert() {
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