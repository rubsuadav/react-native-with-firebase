import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

//local imports
import { getUserDisplayNameByUid, getUserRole, shouldLogoutAlertMobile, shouldLogoutAlertWeb } from "../utils/Functions";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function Header() {
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownAdmin, setShowDropdownAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged(async (user) => {
      switch (user) {
        case null:
          setUser(null);
          break;
        default:
          setUser({ ...user, displayName: await getUserDisplayNameByUid(user.uid) });
          const role = await getUserRole({ user });
          setUserRole(role);
          break;
      }
    });
  }, []);

  async function handleLogout() {
    setShowDropdown(false);
    setShowDropdownAdmin(false);
    try {
      switch (Platform.OS) {
        case "web":
          await shouldLogoutAlertWeb({ setShowDropdown, setShowDropdownAdmin });
          break;
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
    setShowDropdownAdmin(false);
    navigation.navigate("Profile");
  }

  async function handleUsersCRUD() {
    setShowDropdownAdmin(false);
    setShowDropdown(false);
    navigation.navigate("UserAdmin");
  }

  function handleUpgradeUser() {
    setShowDropdown(false);
    navigation.navigate("UpgradeUser");
  }

  function handleChat(userId) {
    setShowDropdown(false);
    setShowDropdownAdmin(false);
    navigation.navigate("Chat", { userId });
  }

  return (
    <View
      style={[
        tw`flex-row justify-between items-center bg-gray-900 px-4 border-b border-gray-800`,
        (showDropdown || showDropdownAdmin) && tw`pb-50`
      ]}
    >
      <Image
        source={require("../assets/logotipo.jpg")}
        style={tw`w-30 h-25 right-5`}
      />
      {error ? <Text style={tw`text-red-500`}>{error}</Text> : null}
      {user ? (
        <View style={tw`flex-row items-center relative android:pb-8`}>
          <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={tw`mb-3 android:pt-14 pb-3`}>
            <Text style={tw`text-base text-white border border-blue-300`}>{user.displayName}</Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={tw`absolute top-full right-0 bg-gray-900 rounded-md shadow-lg`}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={tw`px-4 py-2 text-base text-black bg-blue-400 mb-2`}>Cerrar sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleProfile}>
                <Text style={tw`px-4 py-2 text-base text-black bg-green-400 mb-2`}>Ver perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleChat(user.uid)}>
                <Text style={tw`px-4 py-2 text-base text-black bg-yellow-400 mb-2`}>Chatear con usuarios</Text>
              </TouchableOpacity>
              {userRole === "user" && (
                <TouchableOpacity onPress={handleUpgradeUser}>
                  <Text style={tw`px-4 py-2 text-base text-black bg-rose-500`}>Hazte admin</Text>
                </TouchableOpacity>
              )}
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
      {userRole === "admin" && (
        <View style={tw`flex-row items-center relative android:pb-8`}>
          <TouchableOpacity onPress={() => setShowDropdownAdmin(!showDropdownAdmin)} style={tw`mb-3 android:pt-14 pb-3`}>
            <Text style={tw`text-base text-yellow-400 android:px-2.88`}>Administración</Text>
          </TouchableOpacity>
          {showDropdownAdmin && (
            <View style={tw`absolute top-full right-0 bg-gray-900 rounded-md shadow-lg`}>
              <TouchableOpacity onPress={handleUsersCRUD}>
                <Text style={tw`px-6 py-2 text-sm text-black bg-red-400 mb-2`}>Usuarios</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
