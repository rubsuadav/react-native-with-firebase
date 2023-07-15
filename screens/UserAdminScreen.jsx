import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import tw from "twrnc";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import RoleList from "../components/RoleList";

function UserAdminScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const handleCreate = async () => {
    setEmailError("");
    setPasswordError("");
    setNameError("");

    if (name.length < 6) {
      setNameError("El nombre debe tener al menos 6 caracteres");
      return;
    }

    if (password.length === 0) {
      setPasswordError("La contraseña no puede estar vacía");
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
      Alert.alert("Usuario creado exitosamente");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setEmailError("El correo electrónico es inválido");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("La contraseña es débil");
      }
    }
  };

  return (
    <View style={tw`flex-1 p-20`}>
      <Text style={tw`text-2xl font-bold mb-10`}>
        Administración de Usuarios
      </Text>
      <View style={tw`mb-10`}>
        <Text style={tw`font-bold mb-2`}>Crear Usuario</Text>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        {nameError ? (
          <Text style={tw`text-red-500 mb-2`}>{nameError}</Text>
        ) : null}
        <TextInput
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        {emailError ? (
          <Text style={tw`text-red-500 mb-2`}>{emailError}</Text>
        ) : null}
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={tw`mb-2 p-2 border border-gray-400 rounded`}
        />
        {passwordError ? (
          <Text style={tw`text-red-500 mb-2`}>{passwordError}</Text>
        ) : null}
        {!selectedRole && (
          <Text style={tw`text-red-500`}>Please select a role</Text>
        )}
        <RoleList onSelectRole={setSelectedRole} />
        <Button title="Crear" onPress={handleCreate} />
      </View>
    </View>
  );
}

export default UserAdminScreen;
