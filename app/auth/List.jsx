import { View, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function List({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        onPress={() => navigation.navigate("details")}
        title="Open details"
      />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sign out" />
    </View>
  );
}
