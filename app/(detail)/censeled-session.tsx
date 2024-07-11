import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import History from "@/helpers/state_managment/history";
import NavigationMenu from "@/components/navigation/navigation-menu";
import axios from "axios";
import { base_url } from "@/helpers/api";
import { config } from "@/helpers/token";
import moment from "moment";
import { addFeedbackMaster } from "@/helpers/api-function/client/client";
import Textarea from "@/components/select/textarea";
import CenteredModal from "@/components/(modals)/modal-centered";
import clientStore from "@/helpers/state_managment/client/clientStore";

const CenseledSession = () => {
  const { product } = History();
  const [me, setMe] = useState({});
  const [textVal, setTextVal] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isFeedback, setIsFeedback] = useState(false);
  const { isLoading, setIsLoading } = clientStore();

  const toggleFeedback = () => setIsFeedback(!isFeedback);

  const rejected = async () => {
    try {
      await axios.put(
        `${base_url}order/confirm-order?orderId=${product.id}&status=REJECTED`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRating = (value: number) => setRating(value);

  const completed = async () => {
    try {
      await axios.put(
        `${base_url}order/confirm-order?orderId=${product.id}&status=CONFIRMED`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkStatus = () => {
    if (product.orderStatus === "WAIT") {
      return (
        <View style={tw`flex-row`}>
          <TouchableOpacity
            onPress={rejected}
            activeOpacity={0.8}
            style={[
              tw`py-1 px-2 border rounded-lg`,
              { borderColor: "#9c0935" },
            ]}
          >
            <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
              Отменён
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={completed}
            activeOpacity={0.8}
            style={[
              tw`py-1 px-2 rounded-lg ml-2`,
              { backgroundColor: "#9c0935" },
            ]}
          >
            <Text style={tw`text-white`}>Принять</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (product.orderStatus === "MASTER_REJECTED") {
      return (
        <TouchableOpacity
          onPress={rejected}
          activeOpacity={0.8}
          style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#9c0935" }]}
        >
          <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
            Отменён
          </Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "CLIENT_REJECTED") {
      return (
        <TouchableOpacity
          onPress={rejected}
          activeOpacity={0.8}
          style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#9c0935" }]}
        >
          <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
            Отменён
          </Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "COMPLETED") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#00A1D3" }]}
        >
          <Text style={[{ color: "#00A1D3" }]}>Выполнен</Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "MASTER_CONFIRMED") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#217355" }]}
        >
          <Text style={[{ color: "#217355" }]}>Одобрено</Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "CLIENT_CONFIRMED") {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#217355" }]}
        >
          <Text style={[{ color: "#217355" }]}>Одобрено</Text>
        </TouchableOpacity>
      );
    }
  };

  const checkAdditionally = () => {
    if (product.orderStatus === "WAIT") {
      return null;
    } else if (product.orderStatus === "COMPLETED") {
      return (
        <TouchableOpacity
          onPress={toggleFeedback}
          activeOpacity={0.8}
          style={[tw`py-2 rounded-lg bg-white`]}
        >
          <Text
            style={[
              tw`text-center text-lg`,
              { color: "#9c0935", borderColor: "#9c0935" },
            ]}
          >
            Оставить отзыв
          </Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "MASTER_CONFIRMED") {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[tw`py-2 rounded-lg flex-row items-center bg-gray-300 px-3`]}
          >
            <FontAwesome name="arrows" size={24} color="#9C0A35" />
            <Text style={[tw`font-bold text-lg ml-2`]}>Передвинуть</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rejected}
            activeOpacity={0.8}
            style={[
              tw`py-2 rounded-lg mt-2 bg-gray-300 flex-row items-center px-3`,
            ]}
          >
            <AntDesign name="closecircleo" size={24} color="#9C0A35" />
            <Text style={[tw`font-bold text-lg ml-2`]}>Отменить</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (product.orderStatus === "CLIENT_CONFIRMED") {
      return (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[tw`py-2 rounded-lg flex-row items-center bg-gray-300 px-3`]}
          >
            <FontAwesome name="arrows" size={24} color="#9C0A35" />
            <Text style={[tw`font-bold text-lg ml-2`]}>Передвинуть</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rejected}
            activeOpacity={0.8}
            style={[
              tw`py-2 rounded-lg mt-2 bg-gray-300 flex-row items-center px-3`,
            ]}
          >
            <AntDesign name="closecircleo" size={24} color="#9C0A35" />
            <Text style={[tw`font-bold text-lg ml-2`]}>Отменить</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (product.orderStatus === "MASTER_REJECTED") {
      return (
        <TouchableOpacity
          onPress={toggleFeedback}
          activeOpacity={0.8}
          style={[tw`py-2 rounded-lg bg-white`]}
        >
          <Text
            style={[
              tw`text-center text-lg`,
              { color: "#9c0935", borderColor: "#9c0935" },
            ]}
          >
            Оставить отзыв
          </Text>
        </TouchableOpacity>
      );
    } else if (product.orderStatus === "CLIENT_REJECTED") {
      return (
        <TouchableOpacity
          onPress={toggleFeedback}
          activeOpacity={0.8}
          style={[tw`py-2 rounded-lg bg-white`]}
        >
          <Text
            style={[
              tw`text-center text-lg`,
              { color: "#9c0935", borderColor: "#9c0935" },
            ]}
          >
            Оставить отзыв
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const getMe = async () => {
    try {
      const { data } = await axios.get(`${base_url}user/me`, config);
      setMe(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "#21212E",
      }}
    >
      <View style={tw`mt-5`}>
        <NavigationMenu name="" />
      </View>
      <View
        style={[styles.profileContainer, tw`mt-2 bg-gray-300 p-3 rounded-lg`]}
      >
        <Image
          source={{
            uri: `http://45.67.35.86:8080/attachment/getFile/${product.attachmentId}`,
          }} // Replace with the actual image URL or local image path
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{product.fullName}</Text>
          <Text style={styles.profilePhone}>{product.phone}</Text>
        </View>
      </View>
      <View style={[styles.buttonsContainer, tw`bg-gray-300 rounded-lg p-3`]}>
        {product.serviceName.split(",").map((item) => (
          <TouchableOpacity style={styles.button}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={[
          styles.detailsContainer,
          tw`bg-gray-300 rounded-lg p-3 flex-row items-center justify-between`,
        ]}
      >
        <View>
          <Text style={styles.detailText}>
            {moment(product.orderDate).format(
              `dd, ${product.orderDate.slice(5, 7)}, MMMM`
            )}
          </Text>
          <Text style={tw`text-gray-500`}>
            Длительность - {product.serviceHour} час
          </Text>
        </View>
        <Text style={styles.detailTime}>
          {product.startTime.slice(0, 5)} - {product.finishTime.slice(0, 5)}
        </Text>
      </View>
      <View
        style={tw`bg-gray-300 rounded-lg p-3 flex-row items-center justify-between`}
      >
        <Text style={styles.detailCost}>Стоимость:</Text>
        <Text style={[tw`text-lg font-bold`, { color: "#9c0935" }]}>
          {product.toPay} сум
        </Text>
      </View>
      <View
        style={tw`bg-gray-300 rounded-lg p-3 mt-5 flex-row items-center justify-between`}
      >
        <Text style={styles.detailCost}>Статус:</Text>
        {checkStatus()}
      </View>
      <Text style={styles.contactTitle}>Контактная информация</Text>
      <View
        style={[styles.contactContainer, tw`bg-gray-300 rounded-lg p-3 mt-2`]}
      >
        <Text style={styles.contactInfo}>
          <Feather name="phone" size={20} color="#9c0935" /> {me.phoneNumber}
        </Text>
        <Text style={[styles.contactInfo, tw`my-5`]}>
          <AntDesign name="instagram" size={20} color="#9c0935" />
          {me.instagram === null ? "No instagram" : me.instagram}
        </Text>
        <Text style={styles.contactInfo}>
          <FontAwesome5 name="telegram-plane" size={20} color="#9c0935" />
          {me.telegram === null ? "No telegram" : me.telegram}
        </Text>
      </View>
      <View style={tw`flex-1`}>
        {product.orderStatus !== "WAIT" && (
          <Text style={styles.contactTitle}>Дополнительно</Text>
        )}
        {checkAdditionally()}
      </View>
      {/* Feedback modal */}
      <CenteredModal
        isFullBtn={false}
        isModal={isFeedback}
        btnWhiteText={isLoading ? "loading..." : `Отправить`}
        btnRedText={`Закрыть`}
        onConfirm={() =>
          addFeedbackMaster(rating, setIsLoading, toggleFeedback, textVal)
        }
        toggleModal={() => {
          toggleFeedback();
          setRating(0);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.message}>Оцените клиента!</Text>
          <View style={styles.stars}>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => handleRating(index + 1)}
                >
                  <AntDesign
                    name={index < rating ? "star" : "staro"}
                    size={30}
                    color="#B00000"
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
          </View>
          <Textarea
            placeholder={`Оставить отзыв`}
            value={textVal}
            onChangeText={(e) => setTextVal(e)}
          />
        </View>
      </CenteredModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2b2d42",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },
  profilePhone: {
    color: "#8d99ae",
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderColor: "#828282",
    borderWidth: 1,
    borderRadius: 5,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailText: {
    color: "#000",
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "900",
  },
  detailTime: {
    color: "#9c0935",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "900",
  },
  detailCost: {
    color: "#000",
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "900",
  },
  detailStatus: {
    color: "#edf2f4",
    fontSize: 16,
  },
  statusCancelled: {
    color: "#ef233c",
  },
  contactContainer: {
    marginBottom: 16,
  },
  contactTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
    marginTop: 10,
  },
  contactInfo: {
    color: "#8d99ae",
    fontSize: 16,
    marginBottom: 4,
  },
  reviewButton: {
    padding: 12,
    backgroundColor: "#8d99ae",
    borderRadius: 5,
    alignItems: "center",
  },
  reviewText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "900",
  },
  modalContainer: {
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "#FFFFFF",
    marginVertical: 20,
    textAlign: "center",
    opacity: 0.7,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
});

export default CenseledSession;
