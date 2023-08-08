import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
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
    <ScrollView style={tw`pt-20`}>
      <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
        <View style={tw`pt-2 mb-4`}>
          <Text style={tw`ml-3 text-2xl font-bold text-justify capitalize`}>hay <Text style={tw`text-red-500`}>{tables.length}</Text> mesas totales.
            elige <Text style={tw`text-blue-800`}>1</Text> para reservarla
          </Text>
        </View>
        <View style={tw`flex-row flex-wrap justify-center pt-20`}>
          {tables.map((table) => (
            <View key={table.id} style={tw`bg-white rounded-lg shadow-md mb-12 w-80 mx-2`}>
              <Text style={tw`text-lg font-bold text-center capitalize 
                ${table.number % 2 === 0 ? 'text-green-600' : 'text-sky-600'}`}>mesa número {table.number}
              </Text>
              <Text style={tw`text-black text-center`}>capacidad: {<Text style={tw`text-red-500 text-lg font-bold`}>{table.capacity}</Text>} personas</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}