import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ImageBackground } from "react-native";
import tw from "twrnc";

// Importar la imagen de fondo
import backgroundImage from "../assets/background.jpg";
import { getUserProfile } from "../utils/Functions";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      await getUserProfile({ setError, setUser });
    }
    fetchData();
  }, []);

  if (!user) {
    return (
      <View
        style={tw`flex-1 items-center justify-center bg-opacity-80 bg-gray-900`}
      >
        <Text style={tw`text-3xl font-bold text-white mb-8`}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={tw`flex-1`}>
      <View
        style={tw`flex-1 items-center justify-center bg-opacity-80 bg-gray-900`}
      >
        <>
          <Text style={tw`text-3xl font-bold text-white mb-8`}>
            Perfil de {user.displayName}
          </Text>
          {error !== "" && <Text style={tw`text-red-500 mb-8`}>{error}</Text>}
          <TextInput
            placeholder="Nombre completo"
            value={user.displayName}
            style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4 bg-white`}
            editable={false}
          />
          <TextInput
            placeholder="Correo electrónico"
            value={user.email}
            style={tw`border border-gray-400 rounded-md w-80 px-4 py-2 mb-4 bg-white`}
            editable={false}
          />
          <View style={tw`flex-row justify-between w-80`}></View>
        </>
      </View>
    </ImageBackground>
  );
}
