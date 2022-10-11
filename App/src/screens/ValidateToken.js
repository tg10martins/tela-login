import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import api from '../api';

const ValidateToken = ({ navigation }) => {

    useEffect(() => {

        setTimeout(() => {
            const validateToken = async () => {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    navigation.navigate("Home");
                } else {
                    navigation.navigate("Login");
                }
            };
            validateToken();
        }, 2000);
    }, []);



    return (
        <View style={styles.container}>
            <ActivityIndicator color="red" size={45} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default ValidateToken