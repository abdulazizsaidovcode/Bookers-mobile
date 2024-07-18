import { getMe } from "@/helpers/api";
import {
  getDistrictId,
  getRegion,
  getRegionId,
} from "@/helpers/api-function/profile/personalData";
import clientStore from "@/helpers/state_managment/client/clientStore";
import useGetMeeStore from "@/helpers/state_managment/getMee";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ProfileScreen = () => {
  const { getMee } = useGetMeeStore();
  const [region, setRegion] = useState<any | null>(null);
  const [city, setCity] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      getRegionId(getMee && getMee.regionId ? getMee.regionId : "", setRegion);
      getDistrictId(
        getMee && getMee.districtId ? getMee.districtId : "",
        setCity
      );
    }, [])
  );

  const handlePress = (key: string) => {
    console.log(`${key} pressed`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("nickName")}
      >
        <Text style={styles.label}>Никнейм</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.nickname ? getMee.nickname : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("firstName")}
      >
        <Text style={styles.label}>Имя Фамилия</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.firstName ? getMee.firstName : "Нет данных"}{" "}
            {getMee && getMee.lastName ? getMee.lastName : ""}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("birthdate")}
      >
        <Text style={styles.label}>Дата рождения</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.birthDate ? getMee.birthDate : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("specialist")}
      >
        <Text style={styles.label}>Профессия</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.job ? getMee.job : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("phoneNumber")}
      >
        <Text style={styles.label}>Номер телефона</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.phoneNumber ? getMee.phoneNumber : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("regionId")}
      >
        <Text style={styles.label}>Регион</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>{region && region.name ? region.name : "Нет данных"}</Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("districtId")}
      >
        <Text style={styles.label}>Город</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>{city && city.name ? city.name : "Нет данных"}</Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePress("telegram")}
      >
        <Text style={styles.label}>Телеграм</Text>
        <View style={styles.itemMenu}>
          <Text style={styles.value}>
            {getMee && getMee.telegram ? getMee.telegram : "Нет данных"}
          </Text>
          <AntDesign name={"right"} size={20} color="#4F4F4F" />
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

export default ProfileScreen;
