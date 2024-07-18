import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CustomCheckbox from '../checkbox/checkbox';
import tw from 'tailwind-react-native-classnames';
import CommunitySlider from '../communiytSlider/communitySlider';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';

interface AccordionItemProps {
    title: string;
}

// Platform uchun LayoutAnimation to'g'ri ishlashi uchun
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionSlider: React.FC<AccordionItemProps> = ({ title }) => {
    const {expanded,setExpanded,setSelection,isSelected}=useAccardionStore()

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={1}>
                <Text style={styles.headerText}>{title}</Text>
                <AntDesign name={expanded ? 'down' : 'right'} size={20} color="#4F4F4F" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.content}>
                    <View style={styles.communitySlider}>
                        <CommunitySlider title="KM" textColor="#9C0A35" />
                    </View>
                    <View style={tw`p-3 mt-3`}>
                        <CustomCheckbox title="не важно" value={isSelected} onValueChange={setSelection} />
                    </View>
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
    communitySlider: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AccordionSlider;