import React from "react";
import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { Video } from "expo-av";
import tw from "twrnc";

export function VideoModal(props) {
  const { videoUrl, onClose } = props;

  return (
    <Modal animationType="fade" transparent={true}>
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={tw`absolute inset-0`} />
        </TouchableWithoutFeedback>
        <View style={tw`bg-white rounded-lg overflow-hidden`}>
          <Video
            source={{ uri: videoUrl }}
            style={{ width: 1300, height: 750 }}
            useNativeControls={true}
            resizeMode="contain"
            shouldPlay={true}
            isMuted={false}
          />
        </View>
      </View>
    </Modal>
  );
}
