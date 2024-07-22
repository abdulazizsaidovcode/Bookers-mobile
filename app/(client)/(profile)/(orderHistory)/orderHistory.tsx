import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native"; // Text komponentini import qilish
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import AccardionHistory from "@/components/accordions/accardionHistory";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import ProfileCard from "./profileCard";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const titleTex = ['Стрижка', 'Стрижка', 'Стрижка', 'укладка', "покраска волос"];


  // Alert.alert(activeTab.toString());
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#21212E" />
      <NavigationMenu name="История сеансов" />
      <View style={{ padding: 16 }}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Предстоящие"
            onPress={() => setActiveTab('upcoming')}
            active={activeTab === 'upcoming'}
          />
          <CustomButton
            title="Прошедшие"
            onPress={() => setActiveTab('past')}
            active={activeTab === 'past'}
          />
        </View>
        {activeTab === 'upcoming' && (
          <ScrollView>
            <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
            <ProfileCard
              masterName="Натали"
              salonName="Beauty Wave"
              masterGender="Женский мастер"
              ratingnumber={5}
              money="100 000 сум"
              buttonName="Написать сообщение"
              Adress="Яккасарайский р-н, ул. Мирабад, 62а"
              titleTex={titleTex}
              locationIcon={<SimpleLineIcons name="location-pin" size={24} color="white" />}
              phoneIcon={<Feather name="phone" size={24} color="white" />}
            />
          </AccardionHistory>
          </ScrollView>
        )}

        {activeTab === 'past' && (
          <ScrollView>
            <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
              <ProfileCard
                masterName="Натали"
                salonName="Beauty Wave"
                masterGender="Женский мастер"
                ratingnumber={5}
                money="100 000 сум"
                buttonName="Оставить отзыв"
                Adress="Яккасарайский р-н, ул. Мирабад, 62а"
                deleteIcon={<Feather name="trash-2" size={24} color="white" />}
              />
            </AccardionHistory>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21212E",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 14,
  },
  profileInfo: {
    flex: 1,
  },
  masterType: {
    fontSize: 12,
    paddingHorizontal: 8,
    borderColor: "#828282",
    borderWidth: 1,
  },
});

export default OrderHistory;
