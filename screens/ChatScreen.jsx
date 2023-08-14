import React, { useState,useLayoutEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig'

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
                    user: doc.data().user
                }))
            )
        })
        return () => unsubscribe;
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

        const { _id, createdAt, text, user } = messages[0];
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
            user={{
                _id: FIREBASE_AUTH.currentUser.email,
                avatar: 'https://i.pravatar.cc/30'
            }}
            messagesContainerStyle={{ backgroundColor: '#fff' }}
        />
    )
}