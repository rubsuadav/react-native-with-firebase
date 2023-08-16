import React, { useState, useLayoutEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { IconButton, MD3Colors } from 'react-native-paper';

// local imports
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../firebaseConfig'
import CustomBubble from '../components/CustomBubble';
import { pickImage } from '../utils/Functions';

export default function ChatScreen() {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const collectionRef = collection(FIREBASE_DB, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMessages(
                querySnapshot.docs.map((doc) => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                    image: doc.data().image || null,
                }))
            )
        })
        return () => unsubscribe;
    }, [])

    const onSend = useCallback((messages = []) => {
        const newMessages = messages.map(async message => {
            if (message.image) {
                const imageName = `${Date.now()}-${message.user._id}`;
                const storageRef = ref(FIREBASE_STORAGE, `images/${imageName}`);
                await uploadString(storageRef, message.image, 'data_url');
                const imageUrl = await getDownloadURL(storageRef);
                addDoc(collection(FIREBASE_DB, 'chats'), {
                    _id,
                    createdAt,
                    text,
                    user,
                    image: imageUrl
                })
                return {
                    ...message,
                    image: imageUrl
                }
            }
            return message;
        })

        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

        const { _id, createdAt, text, user, image } = messages[0];
        addDoc(collection(FIREBASE_DB, 'chats'), {
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            placeholder='Escribe un mensaje'
            user={{
                _id: FIREBASE_AUTH.currentUser.email,
                avatar: 'https://i.pravatar.cc/30'
            }}
            messagesContainerStyle={{ backgroundColor: '#fff' }}
            renderActions={() => (
                <>
                    <IconButton
                        icon="image" iconColor={MD3Colors.tertiary20}
                        onPress={() => pickImage({ onSend })} />
                </>
            )}
            renderBubble={(props) => (
                <CustomBubble {...props} />
            )}
        />
    )
}