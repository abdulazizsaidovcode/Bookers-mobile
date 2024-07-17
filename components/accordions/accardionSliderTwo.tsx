import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomCheckbox from '../checkbox/checkbox';
import tw from 'tailwind-react-native-classnames';
import CommunitySlider from '../communiytSlider/communitySlider';

interface AccordionItemProps {
    title: string;
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccardionSliderTwo: React.FC<AccordionItemProps> = ({ title }) => {
    const [expanded, setExpanded] = useState(false);
    const [isSelected, setSelection] = useState(false);

    const toggleExpand = () => {
        // Animatsiya
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
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
                    <CommunitySlider icon={<AntDesign name="star" size={18} color="#9C0A35" />} title="KM" textColor='#9C0A35' />
                    <Text style={tw`p-3`}>
                        <CustomCheckbox
                            value={isSelected}
                            onValueChange={setSelection}
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
        paddingHorizontal: 20,
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

export default AccardionSliderTwo;
