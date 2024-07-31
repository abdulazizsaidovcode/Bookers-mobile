import { getFile } from '@/helpers/api';
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { getMasterOrderWait, masterOrderConfirm } from '@/helpers/api-function/oreder/oreder';
import tw from 'tailwind-react-native-classnames';
import { useFocusEffect } from 'expo-router';
import { masterOrderHWaitStore } from '@/helpers/state_managment/order/order';
import { FontAwesome } from '@expo/vector-icons';
interface RequestCardProps {
  item: RequestCardobjProps;
  onApprove: () => void;
  onReject: () => void;
}

interface RequestCardobjProps {
  id: string
  fullName: string;
  serviceName: string;
  startTime: string;
  finishTime: string;
  orderId: string;
  clientAttachmentId: string;
  orderStatus: string;
  clientStatus: string[];
}

const RequestCard: React.FC<RequestCardProps> = ({ item, onApprove, onReject }) => {
  const { waitData, setWaitData } = masterOrderHWaitStore();
  const [loadingAprove, setAproveLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [response, setResponse] = useState<any>(null);


  const handleApprove = async (id: string) => {
    await masterOrderConfirm(id, setAproveLoading, 'CONFIRMED', setResponse);
  };

  const handleReject = async (id: string) => {
    await masterOrderConfirm(id, setLoadingReject, 'REJECTED', setResponse);
  };

  useFocusEffect(
    useCallback(() => {
      if (response) {
        onApprove();
        onReject();
        setResponse(null)
      }
    }, [response, setResponse])
  )

  useFocusEffect(
    useCallback(() => {
      getMasterOrderWait(setWaitData);
      setResponse(null)
    }, [loadingAprove, loadingReject, response])
  )

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {
          item.orderStatus == 'WAIT' &&
          <View style={[tw`px-2 py-0.5 text-xs flex-row justify-center items-center  text-green-800 rounded-md mb-2`, { alignSelf: 'flex-start', fontSize: 10, borderColor: '#217355', borderWidth: 1 }]}>
            <FontAwesome name="star" size={10} color="#217355" />
            <Text style={[tw`px-2 py-0.5 text-xs  text-green-800 `, { alignSelf: 'flex-start', fontSize: 10 }]}>{item.clientStatus[0]}</Text>
          </View>
        }
        <View style={[tw`flex-row mb-3`]}>
          <Image source={item.clientAttachmentId ? { uri: getFile + item.clientAttachmentId } : require('@/assets/avatar.png')} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{item.fullName}</Text>
            {item.clientStatus && <Text style={[tw`px-2 py-0.5 text-xs bg-green-800 text-white rounded-md`, { alignSelf: 'flex-start', fontSize: 10 }]}>{item.clientStatus}</Text>}
          </View>
        </View>
        <Text style={styles.service}>{item.serviceName}</Text>
        <Text style={styles.dateTime}>{item.startTime.slice(0, 5)} - {item.finishTime.slice(0, 5)}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(item.id)} disabled={loadingAprove}>
          {loadingAprove ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Одобрить</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(item.id)} disabled={loadingReject}>
          {loadingReject ? <ActivityIndicator color="#9C0A35" /> : <Text style={styles.buttonTextR}>Отклонить</Text>}
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
    marginBottom: 10
  },
  cardHeader: {
    flexDirection: 'column',
    marginBottom: 10,
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
