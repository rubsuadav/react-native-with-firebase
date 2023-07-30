import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { collection, doc, setDoc } from "firebase/firestore";

//local imports
import { FIREBASE_DB } from "../firebaseConfig";

function ReservasScreen() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [personas, setPersonas] = useState("");
  const [requisitos, setRequisitos] = useState("");

  async function handleReserva() {
    const bookingRef = collection(FIREBASE_DB, "bookings");
    await setDoc(doc(bookingRef), { fecha, hora, personas, requisitos });
    setFecha("");
    setHora("");
    setPersonas("");
    setRequisitos("");
  }

  return (
    <View>
      <Text>Reservas</Text>
      <TextInput placeholder="Fecha" value={fecha} onChangeText={setFecha} />
      <TextInput placeholder="Hora" value={hora} onChangeText={setHora} />
      <TextInput
        placeholder="Número de personas"
        value={personas}
        onChangeText={setPersonas}
      />
      <TextInput
        placeholder="Requisitos dietéticos especiales"
        value={requisitos}
        onChangeText={setRequisitos}
      />
      <Button title="Reservar" onPress={handleReserva} />
    </View>
  );
}

export default ReservasScreen;
