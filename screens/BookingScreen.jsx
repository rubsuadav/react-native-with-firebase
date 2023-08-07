import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import tw from "twrnc";

//local imports
import { FIREBASE_DB } from "../firebaseConfig";
import { createExampleTables } from "../utils/Functions";

export default function BookingScreen() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    createExampleTables();
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, "tables"), (querySnapshot) => {
      const tables = [];
      querySnapshot.forEach((doc) => {
        tables.push({
          id: doc.id,
          number: doc.data().number,
          capacity: doc.data().capacity,
        });
      });
      setTables(tables);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Lista de tables:</Text>
      {tables.map((table) => (
        <View key={table.id} style={tw`bg-white rounded-lg shadow-md p-4 mb-4 w-80`}>
          <Text style={tw`text-lg font-bold`}>table {table.number}</Text>
          <Text style={tw`text-gray-500`}>capacity: {table.capacity}</Text>
        </View>
      ))}
    </View>
  );
}