import React, {useState} from 'react';
import {StyleSheet, TextInput} from "react-native";

const Textarea = ({value, onChangeText, placeholder}: {value?: string, onChangeText?: (text: string) => void, placeholder?: string}) => {
    const [height, setHeight] = useState(80);
    const handleContentSizeChange = (event: any) => {
        const newHeight = Math.min(Math.max(80, event.nativeEvent.contentSize.height), 200);
        setHeight(newHeight);
    };
    return (
        <TextInput
            value={value}
            style={[styles.textArea, {height}]}
            multiline
            placeholder={placeholder ? placeholder : ''}
            onContentSizeChange={handleContentSizeChange}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    textArea: {
        width: 300,
        padding: 10,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#4B4B64',
        color: '#E0E0E0',
        fontSize: 16,
        textAlignVertical: 'top', // Align text to the top
    },
});

export default Textarea;