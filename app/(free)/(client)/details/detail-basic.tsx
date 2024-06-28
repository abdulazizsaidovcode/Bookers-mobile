import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ClientDetailBasic = () => {
    return (
        <>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../../../../assets/avatar.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Гузаль Шерматова</Text>
            </View>

            <TouchableOpacity style={styles.deleteButton}>
                {/*<Icon name="delete" color="#FFF"/>*/}
                <Text style={styles.deleteButtonText}>Удалить клиента</Text>
            </TouchableOpacity>

            <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Контактная информация</Text>
                <View style={styles.contactItem}>
                    {/*<Icon name="phone" type="font-awesome"/>*/}
                    <Text style={styles.contactText}>+998 93 123-45-67</Text>
                </View>
                <View style={styles.contactItem}>
                    {/*<Icon name="instagram" type="font-awesome"/>*/}
                    <Text style={styles.contactText}>@guzal_1987</Text>
                </View>
                <View style={styles.contactItem}>
                    {/*<Icon name="telegram" type="font-awesome"/>*/}
                    <Text style={styles.contactText}>@guzalll_1987</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteButton: {
        flexDirection: 'row',
        backgroundColor: '#FF4D4F',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    deleteButtonText: {
        color: '#FFF',
        marginLeft: 10,
    },
    contactInfo: {
        backgroundColor: '#2C2C34',
        padding: 15,
        borderRadius: 10,
    },
    contactTitle: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 10,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        color: '#FFF',
        marginLeft: 10,
    },
});

export default ClientDetailBasic;
