import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { INavigationProps } from "@/type/navigation/navigation";

const NavigationMenu = ({ toggleModal, name, deleteIcon }: INavigationProps) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Feather name="chevron-left" size={30} color="white" onPress={() => navigation.goBack()} />
            <Text style={styles.title}>{name}</Text>
            {deleteIcon
                ? <MaterialIcons name="delete" size={30} color="white" onPress={toggleModal} />
                : <Text></Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 20,
    },
    title: {
        color: 'white',
        fontSize: 20,
    },
});

export default NavigationMenu;
