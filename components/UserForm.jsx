import RoleList from "./RoleList";
import { View, Text, TextInput, Button } from "react-native";
import tw from "twrnc";

function UserForm({
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  selectedRole,
  setSelectedRole,
  handleCreate,
  nameError,
  lastNameError,
  emailError,
  passwordError,
  roleError,
}) {
  return (
    <View style={tw`mb-10 bg-white rounded-lg shadow-lg p-5`}>
      <Text style={tw`font-bold mb-2 text-lg text-center`}>Crear Usuario</Text>
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
        placeholder="Apellidos"
        value={lastName}
        onChangeText={setLastName}
        style={tw`mb-2 p-2 border border-gray-400 rounded`}
      />
      {lastNameError ? (
        <Text style={tw`text-red-500 mb-2`}>{lastNameError}</Text>
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
      {!selectedRole && <Text style={tw`text-red-500`}>{roleError}</Text>}
      <RoleList onSelectRole={setSelectedRole} />
      <Button title="Crear" onPress={handleCreate} color="#FF6B6B" />
    </View>
  );
}
export default UserForm;
