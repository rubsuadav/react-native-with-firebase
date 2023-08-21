import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, listAll, ref, uploadString } from "firebase/storage";
import { IconButton, MD3Colors } from "react-native-paper";
import tw from "twrnc";

// local imports
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../firebaseConfig";
import CustomBubble from "../components/CustomBubble";
import { pickImage } from "../utils/Functions";
import { pickVideo, sendVideos } from "../utils/Video";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const collectionRef = collection(FIREBASE_DB, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          image: doc.data().image || null,
        }))
      );
    });
    const storageRef = ref(FIREBASE_STORAGE, "videos/");
    listAll(storageRef).then((res) => {
      res.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const videoMessage = {
          _id: Date.now(),
          createdAt: new Date(),
          user: {
            _id: FIREBASE_AUTH.currentUser.email,
            avatar: "https://i.pravatar.cc/30",
          },
          video: url,
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [videoMessage])
        );
      });
    });

    return () => unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    const newMessages = messages.map(async (message) => {
      if (message.image) {
        const imageName = `${Date.now()}-${message.user._id}`;
        const storageRef = ref(FIREBASE_STORAGE, `images/${imageName}`);
        await uploadString(storageRef, message.image, "data_url");
        const imageUrl = await getDownloadURL(storageRef);
        return {
          ...message,
          image: imageUrl,
        };
      }
      if (message.video) {
        await sendVideos(message, { setMessages });
      }
      return message;
    });

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const { _id, createdAt, text, user, image, video } = messages[0];

    if (image) {
      addDoc(collection(FIREBASE_DB, "chats"), {
        _id,
        createdAt,
        text,
        user,
        image,
      });
    }
    if (video) {
      return;
    } else {
      addDoc(collection(FIREBASE_DB, "chats"), {
        _id,
        createdAt,
        text,
        user,
      });
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      placeholder="Escribe un mensaje"
      user={{
        _id: FIREBASE_AUTH.currentUser.email,
        avatar: "https://i.pravatar.cc/30",
      }}
      messagesContainerStyle={tw`bg-white p-8`}
      renderActions={() => (
        <>
          <IconButton
            icon="image"
            iconColor={MD3Colors.tertiary20}
            onPress={() => pickImage({ onSend })}
          />
          <IconButton
            icon="video"
            iconColor={MD3Colors.primary50}
            onPress={() => pickVideo({ onSend })}
          />
        </>
      )}
      renderBubble={(props) => <CustomBubble {...props} />}
    />
  );
}
