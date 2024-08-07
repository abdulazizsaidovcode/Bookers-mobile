import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomCheckbox from '../checkbox/checkbox';
import tw from 'tailwind-react-native-classnames';
import {useAccardionStore} from '@/helpers/state_managment/accardion/accardionStore';

interface AccordionItemProps {
    title: string;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionFree: React.FC<AccordionItemProps> = ({title}) => {
    const {genderIndex, setGenderIndex, isSelected1, setSelected1, expanded2, setExpended2} = useAccardionStore();

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpended2(!expanded2);
    };

    const radioProps = [
        {label: 'Erkak', value: true},
        {label: 'Ayol', value: false},
    ];

    const onPressRadioButton = (value: boolean) => { // Boolean qabul qilinadi
        setGenderIndex(value);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={1}>
                <View style={styles.mainText}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <AntDesign name={expanded2 ? 'down' : 'right'} size={20} color="#4F4F4F"/>
            </TouchableOpacity>

            {expanded2 && (
                <View style={styles.content}>
                    <RadioForm formHorizontal={true} animation={true}>
                        {radioProps.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i}>
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={genderIndex === obj.value} // Boolean hisobida tekshiriladi
                                    onPress={() => onPressRadioButton(obj.value)} // Boolean qiymatini o'zgartiradi
                                    buttonInnerColor="#9C035A"
                                    buttonOuterColor="#9C035A"
                                    buttonSize={15}
                                    buttonOuterSize={25}
                                    buttonWrapStyle={styles.radioButtonWrap}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={() => onPressRadioButton(obj.value)} // Boolean qiymatini o'zgartiradi
                                    labelStyle={styles.radioButtonLabel}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))}
                    </RadioForm>
                    <Text style={tw`p-3`}>
                        <CustomCheckbox
                            value={isSelected1}
                            onValueChange={setSelected1}
                            title="не важно"
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#B9B9C9',
        borderRadius: 8,
    },
    mainText: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
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
    radioButtonLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    radioButtonWrap: {
        marginLeft: 10,
    },
    selectedGenderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default AccordionFree;