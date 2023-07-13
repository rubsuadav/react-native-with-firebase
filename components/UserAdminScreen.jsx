import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, Picker } from "react-native";
import tw from "twrnc";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function UserAdminScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleSelected, setRoleSelected] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  useEffect(() => {
    // Agregar roles predeterminados si aún no existen
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

  const handleCreate = async () => {
    if (!roleSelected) {
      Alert.alert("Please select a role");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        roleId: selectedRole,
      });
      Alert.alert("User created successfully");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setEmailError(error.message);
      } else if (error.code === "auth/weak-password") {
        setPasswordError(error.message);
      }
    }
  };

  return (
    <View style={tw`flex-1 p-20`}>
      <Text style={tw`text-2xl font-bold mb-10`}>User Administration</Text>
      <View style={tw`mb-10`}>
        <Text style={tw`font-bold mb-2`}>Create User</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        {emailError ? (
          <Text style={tw`text-red-500 mb-2`}>{emailError}</Text>
        ) : null}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        {passwordError ? (
          <Text style={tw`text-red-500 mb-2`}>{passwordError}</Text>
        ) : null}
        <Picker
          selectedValue={selectedRole}
          onValueChange={(itemValue) => {
            setSelectedRole(itemValue);
            setRoleSelected(true);
          }}
          style={tw`mb-2 border border-gray-400 rounded`}
        >
          <Picker.Item label="Select a role" value="" />
          {roles.map((role) => (
            <Picker.Item key={role.id} label={role.name} value={role.id} />
          ))}
        </Picker>
        {!roleSelected ? (
          <Text style={tw`text-red-500 mb-2`}>Please select a role</Text>
        ) : null}
        <Button title="Create" onPress={handleCreate} />
      </View>
    </View>
  );
}

export default UserAdminScreen;
