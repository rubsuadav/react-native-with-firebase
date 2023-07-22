import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import tw from "twrnc";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import UserForm from "../components/UserForm";
import { handleRedirect } from "../utils/Redirections";

function UserAdminScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const navigation = useNavigation();

  async function handleCreate() {
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setRoleError("");

    if (name.length < 6) {
      setNameError("El nombre debe tener al menos 6 caracteres");
      return;
    }

    if (password.length === 0) {
      setPasswordError("La contraseña no puede estar vacía");
      return;
    }

    if (!email) {
      setEmailError("El correo electrónico no puede estar vacío");
      return;
    }

    if (!selectedRole) {
      setRoleError("Debes seleccionar un rol");
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
      handleRedirect({ navigation, user });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setEmailError("El correo electrónico ya está en uso");
          break;
        case "auth/invalid-email":
          setEmailError("El correo electrónico es inválido");
          break;
        case "auth/weak-password":
          setPasswordError("La contraseña es débil");
          break;
        default:
          break;
      }
    }
  }

  const { width, height } = useWindowDimensions();

  return (
    <View style={[tw`flex-1 p-20 bg-gray-100`, { width, height }]}>
      <Text style={tw`text-2xl font-bold mb-10 text-center`}>
        Administración de Usuarios
      </Text>
      <UserForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        handleCreate={handleCreate}
        nameError={nameError}
        emailError={emailError}
        passwordError={passwordError}
        roleError={roleError}
      />
    </View>
  );
}

export default UserAdminScreen;
