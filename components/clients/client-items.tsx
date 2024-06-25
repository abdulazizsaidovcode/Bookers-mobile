import React from "react";
import { ClientData, ClientItemProps } from "@/type/client/client";
import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import clientStore from "@/helpers/state_managment/client/clientStore";

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
export const FromAddressBookList = ({
  client,
  clicks,
}: {
  client: ClientData;
  clicks?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={clicks}
      style={[
        tw`flex-row items-center p-4 mb-3 rounded-2xl`,
        { backgroundColor: "#B9B9C9" },
      ]}
      activeOpacity={0.8}
    >
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
