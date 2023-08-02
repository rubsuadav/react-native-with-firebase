import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

//local imports
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import UserForm from "../components/UserForm";
import { validate } from "../utils/Validators";

function UserAdminScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");

  async function handleCreate() {
    setEmailError("");
    setLastNameError("");
    setPasswordError("");
    setNameError("");
    setRoleError("");
    const val = validate({ name, lastName, email, password, selectedRole });
    if (Object.keys(val).length > 0) {
      setEmailError(val.emailError);
      setLastNameError(val.lastNameError);
      setPasswordError(val.passwordError);
      setNameError(val.nameError);
      setRoleError(val.roleError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        name: name,
        lastName: lastName,
        email: email,
        roleId: selectedRole,
      });
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

  return (
    <View style={tw`flex-1 p-20 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold mb-10 text-center`}>
        Administración de Usuarios
      </Text>
      <UserForm
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        handleCreate={handleCreate}
        nameError={nameError}
        lastNameError={lastNameError}
        emailError={emailError}
        passwordError={passwordError}
        roleError={roleError}
      />
    </View>
  );
}

export default UserAdminScreen;
