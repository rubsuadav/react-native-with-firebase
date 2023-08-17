import React from "react";
import { View, Image } from "react-native";
import { Bubble } from "react-native-gifted-chat";

export default function CustomBubble(props) {
  const { currentMessage } = props;

  if (currentMessage.image) {
    return (
      <View>
        <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 150 }}
        />
      </View>
    );
  }

  return <Bubble {...props} />;
}
