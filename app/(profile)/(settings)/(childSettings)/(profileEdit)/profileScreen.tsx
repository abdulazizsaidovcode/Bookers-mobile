import {
    getAgeId,
    getDistrictId,
    getRegionId,
} from "@/helpers/api-function/profile/personalData";
import useProfileStore, {RouteData} from "@/helpers/state_managment/client/clientEditStore";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import {RootStackParamList} from "@/type/root";
import {AntDesign} from "@expo/vector-icons";
import {NavigationProp} from "@react-navigation/native";
import {useFocusEffect, useNavigation} from "expo-router";
import React, {useCallback} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

type SettingsScreenNavigationProp = NavigationProp<
    RootStackParamList,
    "(profile)/(settings)/(childSettings)/(profileEdit)/profileScreen"
>;

const ProfileMasterScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    const {getMee} = useGetMeeStore();
    const {
        setRoute,
        ageId,
        districtId,
        firstName,
        lastName,
        nickName,
        phoneNumber,
        telegram,
        instagram,
        regionId,
        setDistirictIdData,
        setRegionIdData,
        regionIdData,
        distiricyIdData,
        setAgeIdData,
        ageIdData
    } = useProfileStore();

    useFocusEffect(
        useCallback(() => {
            getRegionId(regionId ? regionId : getMee && getMee.regionId ? getMee.regionId : "", setRegionIdData);
            getDistrictId(
                districtId ? districtId :
                    getMee && getMee.districtId ? getMee.districtId : "",
                setDistirictIdData
            );
            getAgeId(ageId ? ageId : getMee && getMee.ageId ? getMee.ageId : 0, setAgeIdData)

            return () => null;
        }, [])
    );

    const handlePress = (key: RouteData) => {
        setRoute(key);
        navigation.navigate(
            "(profile)/(settings)/(childSettings)/(profileEdit)/(editPages)/editPage"
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 1, value: "Никнейм"})}
            >
                <Text style={styles.label}>Никнейм</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {nickName ? nickName : getMee && getMee.nickName ? getMee.nickName : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>

            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 2, value: "Имя Фамилия"})}
            >
                <Text style={styles.label}>Имя Фамилия</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {firstName ? firstName : getMee && getMee.firstName ? getMee.firstName : "Нет данных"}{" "}
                        {lastName ? lastName : getMee && getMee.lastName ? getMee.lastName : ""}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>
            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 3, value: "Возраст"})}
            >
                <Text style={styles.label}>Возраст</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {ageIdData && ageIdData.ageRange ? ageIdData.ageRange : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>

            {/* <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress({id: 3, value: "Профессия"})}
      >
        <Text style={styles.label}>Профессия</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {job ? job : getMee && getMee.job ? getMee.job : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} /> */}

            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 4, value: "Номер телефона"})}
            >
                <Text style={styles.label}>Номер телефона</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {phoneNumber ? phoneNumber : getMee && getMee.phoneNumber ? getMee.phoneNumber : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>

            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 5, value: "Регион и Город"})}
            >
                <Text style={styles.label}>Регион</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {(regionIdData && regionIdData.name) ? regionIdData.name : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>

            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 5, value: "Регион и Город"})}
            >
                <Text style={styles.label}>Город</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {distiricyIdData && distiricyIdData.name ? distiricyIdData.name : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>

            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 6, value: "Телеграм"})}
            >
                <Text style={styles.label}>Телеграм</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {telegram ? telegram : getMee && getMee.telegram ? getMee.telegram : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}/>


            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress({id: 7, value: "Instagram"})}
            >
                <Text style={styles.label}>Instagram</Text>
                <View style={styles.itemMenu}>
                    <Text style={styles.value}>
                        {instagram ? instagram : getMee && getMee.instagram ? getMee.instagram : "Нет данных"}
                    </Text>
                    <AntDesign name={"right"} size={20} color="#4F4F4F"/>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "#B9B9C9",
        alignItems: "center",
        marginBottom: 16,
        borderRadius: 12,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#B9B9C9",
        padding: 15,
    },
    itemMenu: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    label: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
    },
    value: {
        color: "#4F4F4F",
        fontSize: 14,
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: "#000",
        alignSelf: "center",
        marginVertical: 5,
    },
});

export default ProfileMasterScreen;
