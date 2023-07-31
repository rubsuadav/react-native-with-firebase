import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

export default function Footer() {
  return (
    <View style={tw`bg-gray-900 py-4 px-6`}>
      <Text style={tw`text-white text-center`}>
        © {new Date().getFullYear()} La Cocina del Mar. All rights reserved.
      </Text>
    </View>
  );
}
