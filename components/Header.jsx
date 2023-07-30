import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Header({ user }) {
  const [error, setError] = React.useState("");
  const navigation = useNavigation();

  async function handleLogout() {
    try {
      await FIREBASE_AUTH.signOut();
      localStorage.removeItem("token");
      window.location.reload();
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
      style={tw`flex-row justify-between items-center bg-white h-20 px-4 border-b border-gray-300`}
    >
      <Text style={tw`font-bold text-lg`}>Logo de la app</Text>
      {error ? <Text style={tw`text-red-500`}>{error}</Text> : null}
      {user ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={tw`ml-4 text-base text-gray-500`}>Cerrar sesión</Text>
        </TouchableOpacity>
      ) : (
        <View style={tw`flex-row`}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={tw`ml-4 text-base text-gray-500`}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={tw`ml-4 text-base text-gray-500`}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
