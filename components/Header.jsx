import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Swal from "sweetalert2";

//local imports
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function Header({ user }) {
  const [error, setError] = useState("");
  const navigation = useNavigation();

  async function handleLogout() {
    try {
      await FIREBASE_AUTH.signOut();
      switch (Platform.OS) {
        case "web":
          localStorage.removeItem("token");
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
          window.location.reload();
          break;
        case "android":
          navigation.navigate("Login");
          break;
        default:
          break;
      }
    } catch (error) {
      switch (error.code) {
        case "auth/no-current-user":
          setError("No se encontró el usuario");
          break;
        default:
          break;
      }
    }
  }

  return (
    <View
      style={tw`flex-row justify-between items-center bg-gray-900 h-20 px-4 border-b border-gray-800`}
    >
      <Image
        source={require("../assets/logotipo.jpg")}
        style={{ width: 100, height: 80 }}
      />
      {error ? <Text style={tw`text-red-500`}>{error}</Text> : null}
      {user ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={tw`ml-4 text-base text-white`}>Cerrar sesión</Text>
        </TouchableOpacity>
      ) : (
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={tw`ml-4 text-base text-white`}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`ml-4 text-base text-white`}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
