import React, { useState } from "react";
import { View, Image, TouchableWithoutFeedback, Modal } from "react-native";
import { Bubble } from "react-native-gifted-chat";
import { Video } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";

//local imports
import { VideoModal } from "./VideoModal";

export default function CustomBubble(props) {
  const { currentMessage } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showModal, setShowModal] = useState(false);

  function handlePlay() {
    setIsPlaying(true);
    setShowPlayButton(false);
    setShowModal(true);
  }

  function handleCloseModal() {
    setIsPlaying(false);
    setShowPlayButton(true);
    setShowModal(false);
  }

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

  if (currentMessage.video) {
    return (
      <View>
        <TouchableWithoutFeedback onPress={handlePlay}>
          <View>
            <Video
              source={{ uri: currentMessage.video }}
              style={{ width: 200, height: 150 }}
              useNativeControls={true}
              resizeMode="contain"
              shouldPlay={isPlaying}
              isMuted={false}
            />
            {showPlayButton && (
              <View
                style={tw`absolute inset-0 flex items-center justify-center`}
              >
                <FontAwesome name="play-circle" size={50} color="black" />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <Modal visible={showModal} transparent={true}>
          <VideoModal
            videoUrl={currentMessage.video}
            onClose={handleCloseModal}
          />
        </Modal>
      </View>
    );
  }

  return <Bubble {...props} />;
}
