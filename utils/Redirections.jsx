import { Alert, Platform } from "react-native";

export function handleRedirect({ navigation, user }) {
  switch (Platform.OS) {
    case "android":
      Alert.alert(
        "Usuario creado exitosamente",
        "¿Qué deseas hacer ahora?",
        [
          {
            text: "Ver Perfil",
            onPress: () => navigation.navigate("Profile", { userId: user.uid }),
          },
          {
            text: "Crear otro usuario",
          },
        ],
        { cancelable: false }
      );
      break;
    case "web":
      navigation.navigate("Profile", { userId: user.uid });
      break;
    default:
      break;
  }
}
