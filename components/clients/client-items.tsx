import React from "react";
import { ClientAddressBook, ClientItemProps } from "@/type/client/client";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { getFile } from "@/helpers/api";
import Buttons from "@/components/(buttons)/button";
import FiltersButton from "@/components/(buttons)/filters-button";
import {sliceText} from "@/helpers/api-function/client/client";

// client check un
export const ClientItem: React.FC<ClientItemProps> = ({
    client,
    isSelected,
    onSelect,
}) => {
    const { selectedClientList } = clientStore();
    return (
        <TouchableOpacity
            onPress={() => onSelect(client.id)}
            style={[
                tw`flex-row items-center p-4 mb-2 rounded-2xl`,
                { backgroundColor: isSelected ? "rgba(216,216,216,0.83)" : "#B9B9C9" },
                isSelected && { borderWidth: 2, borderColor: "#9C0A35" },
            ]}
            activeOpacity={0.8}
        >
            {isSelected ? (
                <View
                    style={[
                        tw`w-7 h-7 items-center justify-center rounded-md mr-3`,
                        { backgroundColor: "#9C0A35" },
                    ]}
                >
                    <Ionicons
                        name="checkmark"
                        size={24}
                        color="white"
                        style={tw`font-bold`}
                    />
                </View>
            ) : (
                selectedClientList.length !== 0 && (
                    <View
                        style={[
                            tw`w-7 h-7 items-center justify-center rounded-md mr-3`,
                            {
                                backgroundColor: "#B9B9C9",
                                borderWidth: 2,
                                borderColor: "gray",
                            },
                        ]}
                    ></View>
                )
            )}
            <Image
                source={{ uri: client.image }}
                style={tw`w-10 h-10 rounded-full`}
            />
            <View style={tw`ml-4`}>
                <Text style={[tw`text-black text-lg font-bold`, { lineHeight: 20 }]}>
                    {client.name}
                </Text>
                <Text style={[tw`text-gray-500 text-base`, { lineHeight: 20 }]}>
                    {client.phone}
                </Text>
            </View>
        </TouchableOpacity>
    );
};


// client info un
export const FromAddressBookList = (
    {
        client,
        clicks,
        isBtn
    }: {
        client: any;
        clicks?: () => void;
        isBtn?: boolean
    }) => {
    return (
        <TouchableOpacity
            onPress={!isBtn ? clicks : undefined}
            style={[
                tw`flex-row items-center p-4 mb-3 rounded-2xl`,
                { backgroundColor: "#B9B9C9" },
            ]}
            activeOpacity={0.8}
        >
            <Image
                source={client.attachmentId !== null ? { uri: `${getFile}${client.attachmentId}` } : require('../../assets/avatar.png')}
                style={tw`w-10 h-10 rounded-full`}
            />
            <View style={tw`ml-4`}>
                <Text style={[tw`text-black text-lg font-bold`, { lineHeight: 20 }]}>
                    {client.firstName} {client.lastName}
                </Text>
                <Text style={[tw`text-gray-500 text-base`, { lineHeight: 20 }]}>
                    {client.phoneNumber}
                </Text>
            </View>
            {isBtn && (
                <View style={[tw``, { transform: 'scale(.8)' }]}>
                    <FiltersButton title={`Пригласить`} onPress={isBtn ? clicks : undefined} />
                </View>
            )}
        </TouchableOpacity>
    );
};

// client info un
export const StandardNowAndConstClient = (
    {
        client,
        clicks
    }: {
        client: any;
        clicks?: () => void;
    }) => {
    return (
        <TouchableOpacity
            onPress={clicks}
            style={[
                tw`flex-row items-start justify-start p-4 mb-3 rounded-2xl`,
                { backgroundColor: "#B9B9C9" },
            ]}
            activeOpacity={0.8}
        >
            <Image
                source={client.attachmentId !== null ? { uri: `${getFile}${client.attachmentId}` } : require('../../assets/avatar.png')}
                style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-4 flex-col`}>
                <Text style={[tw`text-black text-lg font-bold`, { lineHeight: 22 }]}>
                    {sliceText(client.firstName, client.lastName)}
                </Text>
                <Text style={[tw`text-gray-500 text-base`, { lineHeight: 22 }]}>
                    {client.phoneNumber}
                </Text>
                {client.orderTime && (
                    <View style={[tw`py-1.5 px-4 rounded-lg mt-2`, {
                        alignSelf: 'flex-start',
                        borderWidth: 2,
                        borderColor: '#9C0A35'
                    }]}>
                        <Text style={[tw`text-base font-normal`, { color: '#9C0A35' }]}>{client.orderTime}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};
