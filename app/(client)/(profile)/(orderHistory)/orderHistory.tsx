import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native"; // Text komponentini import qilish
import CustomButton from "./CustomButton";
import { StatusBar } from "expo-status-bar";
import NavigationMenu from "@/components/navigation/navigation-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import AccardionHistory from "@/components/accordions/accardionHistory";
import { Feather } from "@expo/vector-icons";

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // useFocusEffect(
  //   useCallback(() => {
  //     getSeesions(setClientSession); // Fetching sessions from API
  //     setTimeout(() => {
  //       console.log(clientPastSession); // Logging fetched sessions to console
  //     }, 2000);
  //   }, [])
  // );
  const titleTex = ['Стрижка','Стрижка','Стрижка', 'укладка', "покраска волос"];
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
        <AccardionHistory title="Наращивание ресниц" date="Пн, 10 февраля 12:30 - 13:30 " >
          <View style={styles.card}>
            <View style={styles.profileContainer}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.profileImage} />
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <Text style={styles.profileName}>Натали</Text>
                    <Text style={styles.salonName}>Beauty Wave</Text>
                  </View>
                  <Text style={styles.serviceName}>Женский мастер</Text>
                </View>
              </View>
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackStars}>{'⭐'.repeat(5)}</Text>
                <Text style={styles.price}>350 000 сум</Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: 10,}}>
              {titleTex.map((title) => (
                <Text style={{ fontSize: 12, paddingHorizontal: 6,paddingVertical: 4, borderColor: '#828282',color: '#828282', borderRadius: 5, borderWidth: 1 }}>{title}</Text>
              ))}
            </View>
            <Text style={{fontSize:12,color: '#828282',marginTop: 10}}>Яккасарайский р-н, ул. Мирабад, 62а</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity style={{paddingHorizontal: 10,paddingVertical: 5,bac}}>
                <Text>Написать сообщение</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="message-square" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="phone" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </AccardionHistory>
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
  card: {
    backgroundColor: '#B9B9C9',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  salonName: {
    fontSize: 8,
    color: '#666',
    borderColor: "#828282",
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 16,
    padding: 4,
  },
  serviceName: {
    fontSize: 12,
    color: '#4F4F4F',
  },
  masterType: {
    fontSize: 12,
    paddingHorizontal: 8,
    borderColor: "#828282",
    borderWidth: 1,
  },
  feedbackContainer: {
    alignItems: 'flex-end',
  },
  feedbackStars: {
    fontSize: 10,
    color: '#9C0A35',
  },
  price: {
    fontSize: 12,
    color: '#9C0A35',
    marginTop: 8,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: '#9C0A35',
    marginRight: 8,
  }
});

export default OrderHistory;
