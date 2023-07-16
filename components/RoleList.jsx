import React, { useState, useEffect } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { FIREBASE_DB } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";

function RoleList({ onSelectRole }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const db = FIREBASE_DB;

  useEffect(() => {
    const addDefaultRoles = async () => {
      const rolesRef = collection(db, "roles");
      const adminRole = await getDoc(doc(rolesRef, "admin"));
      const userRole = await getDoc(doc(rolesRef, "user"));
      if (!adminRole.exists()) {
        await setDoc(doc(rolesRef, "admin"), { name: "admin" });
      }
      if (!userRole.exists()) {
        await setDoc(doc(rolesRef, "user"), { name: "user" });
      }
    };
    addDefaultRoles();

    // Obtener roles de la base de datos
    const unsubscribe = onSnapshot(collection(db, "roles"), (querySnapshot) => {
      const roles = [];
      querySnapshot.forEach((doc) => {
        roles.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setRoles(roles);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={tw`mb-10`}>
      <Picker
        selectedValue={selectedRole}
        onValueChange={(itemValue) => {
          setSelectedRole(itemValue);
          onSelectRole(itemValue);
        }}
        mode="dropdown"
        dropdownIconColor="#808080"
        enabled={true}
      >
        <Picker.Item
          label="Selecciona un rol"
          value=""
          style={tw`bg-gray-200`}
        />
        {roles.map((role) => (
          <Picker.Item
            key={role.id}
            label={role.name}
            value={role.id}
            style={tw`bg-gray-200`}
          />
        ))}
      </Picker>
    </View>
  );
}

export default RoleList;
