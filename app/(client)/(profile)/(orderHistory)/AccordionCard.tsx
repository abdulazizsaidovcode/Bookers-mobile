import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import UserProfileCard from '@/app/(profile)/(WebPage)/components/serviseCard';
import ClientProfileCard from './profileCard';

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
};

const AccordionCard: React.FC<CardProps> = ({ title, date, details, master, rating, price, location, services, phone }) => {
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
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDate}>{date}</Text>
        {expanded && (
          <View>
            <ClientProfileCard/>
            <TouchableOpacity style={styles.phoneButton} onPress={handlePhonePress}>
              <Text style={styles.phoneButtonText}>Написать сообщение</Text>
            </TouchableOpacity>
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
    marginBottom: 10
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDate: {
    color: '#888',
  },
  masterName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  service: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 3,
    marginRight: 5,
    marginVertical: 2,
  },
  phoneButton: {
    backgroundColor: '#cc0056',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  phoneButtonText: {
    color: '#fff',
  },
});

export default AccordionCard;
