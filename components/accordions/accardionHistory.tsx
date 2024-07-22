import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomCheckbox from '../checkbox/checkbox';
import tw from 'tailwind-react-native-classnames';
import CommunitySliderTwo from '../communiytSlider/communitySliderTwo';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';

interface AccordionItemProps {
    title: string;
    date:string;
    children: React.ReactNode;
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccardionHistory: React.FC<AccordionItemProps> = ({ title,date,children }) => {
    const {orderExpand,setOrderExpand}=useAccardionStore()

    const toggleExpand = () => {
        // Animatsiya
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOrderExpand(!orderExpand);
    };
    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                style={styles.header}
                onPress={toggleExpand}
                activeOpacity={1}
            >
                <View style={styles.mainText}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.headerText}>{date}</Text>
                </View>
                <AntDesign name={orderExpand ? 'down':'right'} size={20} color="#4F4F4F" />
            </TouchableOpacity>
            {orderExpand && (
                <View style={styles.content}>
                    {children}
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
    titleText: {
        fontSize:12,
        color: '#494949',
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
    communitySlider: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AccardionHistory;
