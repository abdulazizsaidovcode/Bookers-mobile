import {View, Text, StyleSheet} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {INavigationProps} from "@/type/navigation/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/type/root";
type SettingsScreenNavigationProp = NavigationProp<RootStackParamList, 'settings-locations-main'>;

const NavigationMenu = ({toggleModal, name, deleteIcon, clicks}: INavigationProps) => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    return (
        <View style={styles.container}>
            <Feather name="chevron-left" size={30} color="white" onPress={clicks ? clicks : () => navigation.goBack()}/>
            <Text style={styles.title}>{name}</Text>
            {deleteIcon
                ? <MaterialIcons name="delete" size={30} color="white" onPress={toggleModal}/>
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
