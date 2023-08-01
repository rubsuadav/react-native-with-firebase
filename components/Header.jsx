import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

//local imports
import { shouldLogoutAlertMobile, shouldLogoutAlertWeb } from "../utils/Functions";

export default function Header({ user }) {
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();

  async function handleLogout() {
    setShowDropdown(false);
    try {
      switch (Platform.OS) {
        case "web":
          await shouldLogoutAlertWeb();
        case "android":
          await shouldLogoutAlertMobile({ navigation });
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

  function handleProfile() {
    setShowDropdown(false);
    navigation.navigate("Profile");
  }

  return (
    <View
      style={[
        tw`flex-row justify-between items-center bg-gray-900 px-4 border-b border-gray-800`,
        showDropdown && tw`pb-15`
      ]}
    >
      <Image
        source={require("../assets/logotipo.jpg")}
        style={tw`w-30 h-25`}
      />
      {error ? <Text style={tw`text-red-500`}>{error}</Text> : null}
      {user ? (
        <View style={tw`flex-row items-center relative`}>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={tw`mb-3`}>
            <Text style={tw`text-base text-white`}>{user.displayName}</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={tw`absolute top-full right-0 bg-gray-900 rounded-md shadow-lg`}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={tw`block px-4 py-2 text-sm text-black bg-blue-400 mb-2`}>Cerrar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleProfile}>
                <Text style={tw`block px-4 py-2 text-sm text-black bg-green-400`}>Ver perfil</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
