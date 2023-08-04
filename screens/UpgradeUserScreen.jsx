import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getStripePayments, createCheckoutSession } from "@stripe/firestore-stripe-payments";
import tw from 'twrnc';

//local imports
import { FIREBASE_APP } from '../firebaseConfig';

export default function UpgradeUserScreen() {
    const [checkoutSession, setCheckoutSession] = useState(null);

    const payments = getStripePayments(FIREBASE_APP, {
        productsCollection: "products",
        customersCollection: "customers",
    });

    useEffect(() => {
        async function fetchCheckoutSession() {
            const session = await createCheckoutSession(payments, {
                price: "price_1Nb0GOGgNDimUjxYF9a96lkV",
                success_url: "https://example.com/payments/success",
                cancel_url: "https://example.com/payments/cancel",
                mode: "subscription",
            });
            setCheckoutSession(session);
            window.location.assign(session.url);
        }
        fetchCheckoutSession();
    }, []);

    if (!checkoutSession) {
        return (
            <View
                style={tw`flex-1 items-center justify-center bg-opacity-80 bg-gray-900`}
            >
                <Text style={tw`text-3xl font-bold text-white mb-8`}>Redirigiendo a la pasarela de pago...</Text>
            </View>
        );
    }

    return (
        <View>
            {checkoutSession ? <Text>{checkoutSession.id}</Text> : null}
        </View>
    );
};