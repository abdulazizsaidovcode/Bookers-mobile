import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

interface DistanceSliderProps {
    icon?: React.ReactNode;
    title: string;
}

const CommunitySlider: React.FC<DistanceSliderProps> = ({ icon, title }) => {
    const [value, setValue] = useState(1.5);

    return (
        <View style={styles.container}>
            <View style={styles.value}>
                <Text >{icon} {value.toFixed(1)}{title}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5}
                step={0.1}
                value={value}
                onValueChange={setValue}
                minimumTrackTintColor="#8B1A1A"
                maximumTrackTintColor="#fff"
                thumbTintColor="#8B1A1A"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: width * 0.8, // to fit most screens
        alignItems: 'center',
    },
    value: {
        fontSize: 14,        
        color: '#8B1A1A',
        position: 'absolute',
        top: 12,
        left: 25,
    },
    slider: {
        fontWeight: 800,
        width: '100%',
        height: 30,
        marginTop: 40,
        marginBottom: -14,
    },
});

export default CommunitySlider;
