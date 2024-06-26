import registerStory from '@/helpers/state_managment/auth/register';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UserInfo = () => {
    const { firstName, setFirstName, lastName, setLastName } = registerStory()
    const isButtonEnabled = firstName.length > 0 && lastName.length > 0;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.progressBar}>
                    <View style={styles.progressIndicator} />
                    <View style={styles.progressSegment} />
                    <View style={styles.progressSegment} />
                    <View style={styles.progressSegment} />
                </View>
                <Text style={styles.label}>Ваше имя и фамилия</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    placeholderTextColor="#8A8A8A"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Фамилия"
                    placeholderTextColor="#8A8A8A"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>
            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: isButtonEnabled ? '#9C0A35' : '#8A8A8A' },
                    ]}
                    disabled={!isButtonEnabled}
                    onPress={() => {
                        router.push('(auth)/userInfo2')
                    }}
                >
                    <Text style={styles.buttonText}>Продолжить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
        padding: 20,
        justifyContent: 'space-between',
    },
    topSection: {
        flex: 1,
    },
    progressBar: {
        flexDirection: 'row',
        height: 5,
        marginTop: 40,
        borderRadius: 5,
    },
    progressIndicator: {
        flex: 1,
        backgroundColor: '#9C0A35',
        borderRadius: 5,
    },
    progressSegment: {
        flex: 1,
        backgroundColor: '#8A8A8A',
        marginLeft: 5,
        borderRadius: 5,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#4B4B64',
        backgroundColor: '#4B4B64',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        color: '#FFFFFF',
    },
    bottomSection: {
        justifyContent: 'flex-end',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default UserInfo;
