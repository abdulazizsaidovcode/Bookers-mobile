import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

interface WeeklCardProps {
    title: string | boolean;
    onSelect?: () => void;
    isSelected?: boolean;
}

const WeeklCard: React.FC<WeeklCardProps> = ({ title, onSelect, isSelected }) => {
    return (
        <TouchableOpacity onPress={onSelect} style={styles.container}>
            <Text style={{ color: isSelected ? '#9c0a35' : 'white', fontSize: 16 }}>{title}</Text>
        </TouchableOpacity>
    );
};

export default WeeklCard;

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#828282',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    }
});
