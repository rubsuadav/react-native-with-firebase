import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

//local imports
import { getUserDisplayNameByUid } from '../utils/Functions';
import { FIREBASE_AUTH, FIREBASE_DB } from '../firebaseConfig';
import { validatePhone } from '../utils/Validators';

export default function BookingFormScreen({ route }) {
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [phone, setPhone] = useState('');
    const { tableNumber } = route.params;

    const navigation = useNavigation();

    async function getUserName() {
        const userId = FIREBASE_AUTH.currentUser.uid;
        const displayName = await getUserDisplayNameByUid(userId);
        setFullName(displayName);
    }

    useEffect(() => {
        getUserName();
    }, [])

    async function handleBooking() {
        if (!validatePhone(phone, setError)) return;
        try {
            const colRef = collection(FIREBASE_DB, 'bookings');
            const docRef = doc(colRef);
            await setDoc(docRef, {
                tableNumber,
                phone,
                fullName,
                userId: FIREBASE_AUTH.currentUser.uid,
                createdAt: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
            });
            const swal = await Swal.fire({
                title: 'Reserva realizada',
                text: 'Tu reserva se ha realizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            swal.isConfirmed && navigation.goBack();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <ScrollView style={tw`ml-50 pt-30`}>
            <View style={tw`flex-1 justify-center items-center bg-white p-6 rounded-t-full rounded-r-full shadow-md w-4/5`}>
                <Text style={tw`text-2xl font-bold mb-4 pt-12 capitalize`}>Has seleccionado la mesa número{<Text> </Text>}
                    {<Text style={tw`text-red-500`}>{tableNumber}</Text>} para reservarla
                </Text>
                {error ? <Text style={tw`text-red-500 mb-4`}>{error}</Text> : null}
                <View style={tw`mb-4`} />
                <View style={tw`w-1/2 mb-4 pb-5 rounded-full`}>
                    <TextInput
                        placeholder="Escribe tu teléfono móvil"
                        value={phone}
                        onChangeText={setPhone}
                        style={tw`border-2 border-gray-400 p-2 bg-gray-100`}
                    />
                </View>
                <TouchableOpacity style={tw`bg-cyan-500 p-2 rounded-md mb-4`} onPress={handleBooking}>
                    <Text style={tw`text-black text-center text-lg font-bold`}>Reservar</Text>
                </TouchableOpacity>
                <View style={tw`mb-2`} />
            </View>
            <View style={tw`mt-12 w-4/5`}>
                <TouchableOpacity style={tw`bg-red-400 rounded-md w-40 mx-auto my-4 py-2`} onPress={() => navigation.goBack()}>
                    <Text style={tw`text-white text-center text-lg font-bold`}>Seleccionar otra mesa</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}
