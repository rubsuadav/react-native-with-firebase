import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";

//local imports
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { validate } from "../utils/Validators";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  async function handleRegister() {
    setError("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const val = validate({
      name,
      lastName,
      email,
      password,
      selectedRole: "user",
    });
    if (Object.keys(val).length > 0) {
      setError(val[Object.keys(val)[0]]);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        name: name,
        lastName: lastName,
        email: email,
        roleId: "user",
      });
      localStorage.setItem("token", await user.getIdToken());
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("El correo electrónico ya está en uso");
          break;
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/weak-password":
          setError("La contraseña es demasiado débil");
          break;
        default:
          setError("Ocurrió un error al registrar el usuario");
          break;
      }
    }
  }
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-3xl font-bold mb-8`}>Registrarse</Text>
      {error !== "" && <Text style={tw`text-red-500 mb-8`}>{error}</Text>}
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
        style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4`}
      />
      <TextInput
        placeholder="Apellidos"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4`}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4`}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4`}
      />
      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4`}
      />
      <View style={tw`flex-row justify-between w-80`}>
        <Button title="Registrarse" onPress={handleRegister} />
        <Button title="Volver al menú" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
