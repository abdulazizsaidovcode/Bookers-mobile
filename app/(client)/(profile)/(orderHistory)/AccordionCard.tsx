import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import ClientProfileCard from "./profileCard";
import { AntDesign, FontAwesome5, Octicons } from "@expo/vector-icons";
import Buttons from "@/components/(buttons)/button";
import IconsButtons from "@/components/(buttons)/icon-btn";

type CardProps = {
  title: string;
  date: string;
  details: string;
  master: string;
  rating: number;
  price: string;
  location: string;
  services: string[];
  phone: string;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionCard: React.FC<CardProps> = ({
  title,
  date,
  details,
  master,
  rating,
  price,
  location,
  services,
  phone,
  isOpen,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(false);

  //   const renderStars = (rating: number) => {
  //     const stars = [];
  //     for (let i = 1; i <= 5; i++) {
  //       stars.push(<FontAwesome key={i} name={i <= rating ? 'star' : 'star-o'} size={16} color="#cc0056" />);
  //     }
  //     return stars;
  //   };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity>
        <TouchableOpacity onPress={onToggle}>
          <View style={styles.header}>
            <View>
              <Text style={styles.cardDate}>{date}</Text>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <AntDesign
              name={isOpen ? "down" : "right"}
              size={20}
              color="#4F4F4F"
            />
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View>
            <ClientProfileCard />
            <View style={styles.bottom}>
              <IconsButtons textSize="text-sm mt-1"  name="Написать сообщение" clicks={handlePhonePress} />
              <IconsButtons
                icon={<Octicons name="location" size={26} color="white" />}
                name=""
              />
              <IconsButtons
                icon={<FontAwesome5 name="phone-alt" size={26} color="white" />}
                name=""
              />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B9B9C9",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDate: {
    color: "#888",
  },
  masterName: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B9B9C9",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  service: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 3,
    marginRight: 5,
    marginVertical: 2,
  },
  phoneButton: {
    backgroundColor: "#cc0056",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  phoneButtonText: {
    color: "#fff",
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 5
  }
});

export default AccordionCard;
