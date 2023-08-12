import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import Swal from "sweetalert2";
import { Alert } from "react-native";

//local imports
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

//------------------USER FUNCTIONS------------------//

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

export async function getUserDisplayNameByUid(uid) {
  const userRef = doc(FIREBASE_DB, "users", uid);
  const docSnap = await getDoc(userRef);
  switch (docSnap.exists()) {
    case true:
      const name = docSnap.data().name;
      const lastName = docSnap.data().lastName;
      const displayName = `${name} ${lastName}`;
      return displayName;
    case false:
      return null;
  }
}

export async function getSubcriptionSessionByUserEmail() {
  const docRef = collection(FIREBASE_DB, "customers");
  const q = query(docRef, where("email", "==", FIREBASE_AUTH.currentUser.email));
  const querySnapshot = await getDocs(q);
  switch (!querySnapshot.empty) {
    case true:
      querySnapshot.forEach(async (docu) => {
        const colRef = collection(FIREBASE_DB, "customers", docu.id, "subscriptions");
        const querySnapshot = await getDocs(colRef);
        switch (!querySnapshot.empty) {
          case true:
            querySnapshot.forEach(async (docum) => {
              await setUserRoleByCheckoutSessionEmail();
            });
            break;
          case false:
            break;
        }
      })
      break;
    case false:
      break;
  }
}
async function setUserRoleByCheckoutSessionEmail() {
  const docRef = doc(FIREBASE_DB, "customers", FIREBASE_AUTH.currentUser.uid);
  const docSnap = await getDoc(docRef);
  switch (docSnap.exists()) {
    case true:
      const userRef = collection(FIREBASE_DB, "users");
      const email = docSnap.data().email;
      const q = query(userRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { roleId: "admin" });
      });
    case false:
      return null;
  }
}

//------------------TABLES FUNCTIONS------------------//

export async function createExampleTables() {
  const tablesCollection = collection(FIREBASE_DB, "tables");
  const table1 = {
    number: 1,
    capacity: 4,
  };
  const table2 = {
    number: 2,
    capacity: 6,
  };
  const table3 = {
    number: 3,
    capacity: 2,
  };
  const table4 = {
    number: 4,
    capacity: 4,
  };
  const table5 = {
    number: 5,
    capacity: 6,
  };

  const table6 = {
    number: 6,
    capacity: 2,
  };

  const table7 = {
    number: 7,
    capacity: 4,
  };
  const table8 = {
    number: 8,
    capacity: 10,
  };
  const table9 = {
    number: 9,
    capacity: 2,
  };
  const table10 = {
    number: 10,
    capacity: 4,
  };

  const tables = [table1, table2, table3, table4, table5, table6, table7, table8, table9, table10];
  const tablesSnapshot = await getDocs(tablesCollection);
  switch (tablesSnapshot.empty) {
    case true:
      tables.forEach(async (table) => {
        const docRef = doc(tablesCollection);
        await setDoc(docRef, table);
      });
      break;
    default:
      break;
  }
}

export async function updateTablesDueToBookings({ tables, setTables }) {
  const bookingRef = collection(FIREBASE_DB, "bookings");
  const querySnapshot = await getDocs(bookingRef);
  switch (querySnapshot.empty) {
    case true:
      for (let t of tables) {
        t.availablePlaces = t.capacity;
        setTables([...tables]);
      }
      break;
    case false:
      const numberOfBookings = querySnapshot.size;
      for (let t of tables) {
        switch (t.number) {
          case querySnapshot.docs[0].data().tableNumber:
            t.availablePlaces = t.capacity - numberOfBookings;
            setTables([...tables]);
            break;
          default:
            t.availablePlaces = t.capacity;
            setTables([...tables]);
            break;
        }
      }
      break;
    default:
      break;
  }
}

export async function canBookTables({ setCanBook, setBookings }) {
  const bookingRef = collection(FIREBASE_DB, "bookings");
  const q = query(bookingRef, where("userId", "==", FIREBASE_AUTH.currentUser.uid));
  const querySnapshot = await getDocs(q);
  const numberOfBookings = querySnapshot.size;
  setBookings(numberOfBookings);
  switch (querySnapshot.empty) {
    case true:
      setCanBook(true);
      break;
    case false:
      setCanBook(false);
      break;
    default:
      break;
  }
}

//------------------BOOKINGS FUNCTIONS------------------//

export function dropBookingsDaily() {
  setInterval(async () => {
    const bookingRef = collection(FIREBASE_DB, "bookings");
    const querySnapshot = await getDocs(bookingRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }, 24 * 60 * 60 * 1000);
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

export async function shouldLogoutAlertWeb({ setShowDropdown, setShowDropdownAdmin }) {
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
      setShowDropdown(false);
      setShowDropdownAdmin(false);
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