import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { View, Text } from 'react-native';
import tw from 'twrnc';

//local imports
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { getSubcriptionSessionByUserEmail } from '../utils/Functions';

export default function UpgradeUserScreen() {
    const [isLoading, setIsLoading] = useState(true);

    async function handleUpgrade() {
        const colRef = collection(FIREBASE_DB, "customers", FIREBASE_AUTH.currentUser.uid, "checkout_sessions");
        const newDocRef = await addDoc(colRef, {
            price: "price_1Nb0GOGgNDimUjxYF9a96lkV",
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        onSnapshot(newDocRef, (snap) => {
            const { error, url } = snap.data();
            if (error) {
                alert(`An error occured: ${error.message}`);
            }
            if (url) {
                setIsLoading(false);
                window.location.assign(url);
            }
        });
        await getSubcriptionSessionByUserEmail();
    }

    useEffect(() => {
        async function fetchSubcriptionSession() {
            await handleUpgrade();
        }
        fetchSubcriptionSession();
    }, [])

    if (isLoading) {
        return (
            <View
                style={tw`flex-1 items-center justify-center bg-opacity-80 bg-gray-900`}
            >
                <Text style={tw`text-3xl font-bold text-white mb-8`}>Redirigiendo a la pasarela de pago...</Text>
            </View>
        );
    }
    return null;
};
