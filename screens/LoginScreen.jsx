import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

//local imports
import { FIREBASE_AUTH } from "../firebaseConfig";
import backgroundImage from "../assets/background.jpg";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigation = useNavigation();

  async function handleLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      switch (Platform.OS) {
        case "web":
          localStorage.setItem("token", await user.getIdToken());
          window.location.reload();
          break;
        case "android":
          navigation.navigate("Profile");
          break;
        default:
          break;
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido");
          break;
        case "auth/user-disabled":
          setError("El usuario está deshabilitado");
          break;
        case "auth/user-not-found":
          setError("El usuario no existe");
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta");
          break;
        default:
          break;
      }
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={tw`flex-1`}>
      <View
        style={tw`flex-1 items-center justify-center bg-opacity-80 bg-gray-900`}
      >
        <Text style={tw`text-3xl font-bold text-white mb-8`}>
          Iniciar sesión
        </Text>
        {error !== "" && <Text style={tw`text-red-500 mb-8`}>{error}</Text>}
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4 bg-white`}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4 bg-white`}
        />
        <View style={tw`flex-row justify-between w-80`}>
          <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
        <View style={tw`mt-4`}>
          <Text style={tw`text-gray-500 text-sm`}>
            ¿No tienes cuenta? Regístrate aquí:
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={tw`ml-2`}
            >
              <Text style={tw`text-blue-500`}>Registrarse</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
