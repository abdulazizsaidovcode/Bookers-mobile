import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationMenu from '@/components/navigation/navigation-menu';

const LanguageSelection: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('Русский');

    const languages = [
        'Узбекский',
        'Русский',
        'Английский'
    ];

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavigationMenu name='Сменить язык' />
            <View style={{ paddingHorizontal: 16 }}>
                <View style={styles.languageContainer}>
                    {languages.map((language, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.languageOption}
                            onPress={() => handleLanguageSelect(language)}
                        >
                            <FontAwesome
                                name={selectedLanguage === language ? 'dot-circle-o' : 'circle-o'}
                                size={24}
                                color="#9C0A35"
                                style={styles.radioIcon}
                            />
                            <Text style={styles.languageText}>{language}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#21212E',
    },
    header: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        padding: 16,
    },
    languageContainer: {
        backgroundColor: '#b9b9c9',
        borderRadius: 8,
        gap: 16,
        padding: 16,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 16,
    },
    radioIcon: {
        marginRight: 16,
    },
    languageText: {
        color: '#000',
        fontSize: 18,
    },
});

export default LanguageSelection;
