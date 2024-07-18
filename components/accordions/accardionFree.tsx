import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CustomCheckbox from '../checkbox/checkbox';
import tw from 'tailwind-react-native-classnames';

interface AccordionItemProps {
    title: string;
    onValueChange: (value: boolean) => void;
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionFree: React.FC<AccordionItemProps> = ({ title , onValueChange}) => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState(false);
    const [genderIndex, setGenderIndex] = useState<number>(-1);
    const [isSelected, setSelection] = useState(false);

    const toggleExpand = () => {
        // Animatsiya
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    const radioProps = [
        { label: 'Erkak', value: 0 },
        { label: 'Ayol', value: 1 },
    ];
    const handleCheckboxChange = (newValue: boolean) => {
        setSelection(newValue);
        onValueChange(newValue);
    };

    const onPressRadioButton = (index: number) => {
        setGenderIndex(index);
    };

    return (
        <View style={[styles.container]}>
            {/* Sarlavha va belgi */}
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpand}
                activeOpacity={1}
            >
                <View style={styles.mainText}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <AntDesign name={expanded ? 'down' : 'right'} size={20} color="#4F4F4F" />
            </TouchableOpacity>

            {/* Agar accordion ochilgan bo'lsa, kontentni ko'rsatish */}
            {expanded && (
                <View style={styles.content}>
                    <RadioForm formHorizontal={true} animation={true}>
                        {radioProps.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i}>
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={genderIndex === i}
                                    onPress={onPressRadioButton}
                                    buttonInnerColor={'#9C035A'}
                                    buttonOuterColor={'#9C035A'}
                                    buttonSize={15}
                                    buttonOuterSize={25}
                                    buttonStyle={{}}
                                    buttonWrapStyle={{ marginLeft: 10 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={onPressRadioButton}
                                    labelStyle={styles.radioButtonLabel}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))}
                    </RadioForm>
                    <Text style={tw`p-3 mt-3`}>
                        <CustomCheckbox
                            title='не важно'
                            value={isSelected}
                            onValueChange={handleCheckboxChange}
                        />
                    </Text>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#B9B9C9",
        borderRadius: 8,
    },
    mainText: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 16,
        fontWeight: "600",
        color: '#111',
    },
    content: {
        backgroundColor: '#B9B9C9',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: -7,
    },
    selectedGenderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    radioButtonLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    checkbox: {
        alignSelf: 'center',
    },
});

export default AccordionFree;
