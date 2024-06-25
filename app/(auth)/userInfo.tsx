import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const UserInfo = () => {
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
    const [activeStep, setActiveStep] = useState(1);

    const handleInputChange = (id, text) => {
        const newInputs = inputs.map(input => {
            if (input.id === id) {
                return { ...input, value: text };
            }
            return input;
        });

        if (text !== '' && id === activeStep) {
            setInputs([...newInputs, { id: inputs.length + 1, value: '' }]);
            setActiveStep(activeStep + 1);
        } else {
            setInputs(newInputs);
        }
    };

    const handleStepPress = (step) => {
        setActiveStep(step);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressContainer}>
                {[1, 2, 3, 4].map((step) => (
                    <View
                        key={step}
                        style={[
                            styles.progressStep,
                            step <= activeStep ? styles.activeStep : null,
                        ]}
                    />
                ))}
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Ваше имя и фамилия</Text>
                {inputs.map((input, index) => (
                    <TextInput
                        key={input.id}
                        style={styles.input}
                        placeholder={index === 0 ? 'Имя' : 'Фамилия'}
                        placeholderTextColor="#666"
                        onChangeText={text => handleInputChange(input.id, text)}
                        value={input.value}
                    />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                {[1, 2, 3, 4].map((step) => (
                    <TouchableOpacity
                        key={step}
                        style={[
                            styles.button,
                            step === activeStep ? styles.activeButton : null,
                        ]}
                        onPress={() => handleStepPress(step)}
                    >
                        <Text style={styles.buttonText}>Step {step}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C1B2E',
    },
    progressContainer: {
        flexDirection: 'row',
        height: 4,
        marginVertical: 16,
        marginHorizontal: 16,
    },
    progressStep: {
        flex: 1,
        height: 4,
        backgroundColor: '#444',
        marginHorizontal: 2,
    },
    activeStep: {
        backgroundColor: '#E70062',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#2A2A3D',
        color: '#FFF',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#444',
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activeButton: {
        backgroundColor: '#E70062',
    },
    buttonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
