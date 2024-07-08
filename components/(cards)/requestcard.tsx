import { getFile } from '@/helpers/api';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { masterOrderConfirm } from '@/helpers/api-function/oreder/oreder';
interface RequestCardProps {
  name: string;
  service: string;
  date: string;
  time: string;
  orderId: string;
  clientAttachmentId: string;
  onApprove: () => void;
  onReject: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ name, service, date, time,orderId, clientAttachmentId, onApprove, onReject }) => {
  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    setLoading(true);
    await masterOrderConfirm(orderId, setLoading, 'CONFIRMED');
    setLoading(false);
    onApprove();
  };

  const handleReject = async () => {
    setLoading(true);
    await masterOrderConfirm(orderId, setLoading, 'REJECTED');
    setLoading(false);
    onReject();
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={clientAttachmentId ? {uri: getFile + clientAttachmentId} : require('@/assets/avatar.png')} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.service}>{service}</Text>
          <Text style={styles.dateTime}>{date} - {time}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Одобрить</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject} disabled={loading}>
          {loading ? <ActivityIndicator color="#9C0A35" /> : <Text style={styles.buttonTextR}>Отклонить</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#b9b9c9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom:10
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  service: {
    backgroundColor: '#b9b9c9',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginVertical: 5,
    borderColor: '#4F4F4F',
    alignSelf: 'flex-start'
  },
  dateTime: {
    color: '#000000',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: '#9C0A35',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#9C0A35',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
  },
  buttonTextR: {
    color: '#9C0A35',
  },
  rejectButtonText: {
    color: '#9C0A35',
  },
});

export default RequestCard;
