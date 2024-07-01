import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import tw from "tailwind-react-native-classnames";
import IconsButtons from "@/components/(buttons)/icon-btn";

const datass = [
    {id: 1, name: 'aaaa'},
    {id: 2, name: 'bbbb'},
    {id: 3, name: 'cccc'},
    {id: 4, name: 'dddd'},
    {id: 5, name: 'eeee'},
    {id: 6, name: 'jikdsu'},
    {id: 7, name: 'estgfa'},
    {id: 8, name: 'eastfgw'},
]

const AppointmentCard = ({clicks, data, isBtn}: { clicks: () => void, data: any, isBtn: boolean }) => {
    return (
        <TouchableOpacity
            style={[styles.container]}
            activeOpacity={.9}
            onPress={clicks}
        >
            <Text style={styles.date}>Четверг, 28 февраля — 12:40</Text>
            <View style={styles.options}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {datass.map(client => (
                        <Text style={[styles.option, {borderWidth: 1}]} key={client.id}>{client.name}</Text>
                    ))}
                </ScrollView>
            </View>
            <Text style={styles.price}>350 000 сум</Text>
            {isBtn && (
                <View style={[tw`flex-row items-center justify-between`]}>
                    <IconsButtons
                        name={`Принять`}
                        width={`47%`}
                    />
                    <IconsButtons
                        name={`Отклонить`}
                        color={`#9C0A35`}
                        bg_color={`white`}
                        width={`47%`}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
        padding: 20,
    },
    date: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 10
    },
    option: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10,
        borderColor: '#4B4B64',
        color: '#4B4B64'
    },
    price: {
        fontSize: 20,
        color: '#9C0A35',
        marginBottom: 10,
        fontWeight: 'bold'
    },
});

export default AppointmentCard;
