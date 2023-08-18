import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

//local imports
import { getUserDisplayNameByUid } from "../utils/Functions";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    FIREBASE_AUTH.onAuthStateChanged(async (user) => {
      switch (user) {
        case null:
          setUser(null);
          break;
        default:
          setUser({
            ...user,
            displayName: await getUserDisplayNameByUid(user.uid),
          });
          break;
      }
    });
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View
        style={tw`bg-white p-8 rounded-3xl items-center justify-center border-r-4 border-l-4 border-t-8 
        border-b-8 border-t-indigo-300 border-b-indigo-300 border-r-cyan-300 border-l-cyan-300`}
      >
        {user && (
          <Text style={tw`text-3xl font-bold mb-12 text-center`}>
            Bienvenido {user.displayName}
          </Text>
        )}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text
            style={tw`text-base text-black bg-indigo-300 text-center pt-2 pb-2 rounded-full mx-2`}
          >
            {"  "}
            Ver Funcionalidades Disponibles{"  "}
          </Text>
        </TouchableOpacity>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View
            style={tw`flex-1 items-center justify-center bg-black bg-opacity-50`}
          >
            <View
              style={tw`bg-white p-5 rounded-2xl items-center justify-center`}
            >
              <Text style={tw`text-2xl font-bold mb-5 text-center`}>
                Selecciona una opción
              </Text>
              <View style={tw`flex-row justify-center mt-8`}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Bookings");
                  }}
                  style={tw`mr-4`}
                >
                  <Text
                    style={tw`text-base text-black bg-cyan-300 text-center pt-2 pb-2 rounded-full`}
                  >
                    {"  "}
                    Ver Mesas Disponibles{"  "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Chat");
                  }}
                  style={tw`mx-4`}
                >
                  <Text
                    style={tw`text-base text-black bg-green-300 text-center pt-2 pb-2 rounded-full`}
                  >
                    {"  "}
                    Chat{"  "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={tw`ml-2`}
                >
                  <Text
                    style={tw`text-base text-black bg-red-300 text-center pt-2 pb-2 rounded-full`}
                  >
                    {"  "}
                    Cerrar{"  "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
