import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { masterOrderHWaitStore } from '@/helpers/state_managment/order/order';
import { getMasterOrderWait } from '@/helpers/api-function/oreder/oreder';
import RequestsAccordion from './components/accordion/RequestsAccordion';
import { List } from 'react-native-paper';
import CenteredModal from '@/components/(modals)/modal-centered';

type ClientStatus = "REGULAR_VISIT" | string;

export interface OrderItem {
  categoryName: string;
  clientAttachmentId: string;
  clientName: string;
  clientStatus: ClientStatus[];
  hallStatus: string; // Assuming hallStatus is provided in the API response
  orderDate: string;
  orderId: string;
  paid: number;
  request: string;
}

interface GroupedOrders {
  [date: string]: OrderItem[];
}

const groupByDate = (data: OrderItem[]): GroupedOrders => {
  if (!data) return {};
  return data.reduce((acc, item) => {
    const datePart = item.orderDate.split(' ')[1]; // Assuming orderDate format is "16 JULY 19:30 - 20:40"
    (acc[datePart] = acc[datePart] || []).push(item);
    return acc;
  }, {} as GroupedOrders);
};

const RequestSchedule: React.FC = () => {
  const { waitData, setWaitData } = masterOrderHWaitStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const fetchData = async () => {
    try {
      const data = await getMasterOrderWait(setWaitData);
      setWaitData(data);
    } catch (error) {
      console.error('Error fetching wait data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setWaitData]);

  const groupedData = groupByDate(waitData);

  return (
    <View>
      { waitData && waitData.length > 0 ? Object.keys(groupedData).map((date) => (
        <List.Accordion
          key={date}
          title={`${date}`}
          titleStyle={styles.title}
          style={styles.accordionContainer}
          theme={{ colors: { background: 'transparent' } }}
        >
          <RequestsAccordion items={groupedData[date]} onActionSuccess={fetchData} onShowModal={toggleModal} />
        </List.Accordion>
      )) :
        <View>
          <Text style={styles.placeholderText}>нет запросов</Text>
        </View>
      }
      <CenteredModal
        isModal={isModalVisible}
        toggleModal={toggleModal}
        btnWhiteText="Close"
        btnRedText="Confirm"
        isFullBtn={false}
        onConfirm={toggleModal}
        oneBtn
      >
        <Text style={styles.buttonText}>Muvoffaqiyatli amalga oshirildi !</Text>
      </CenteredModal>
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
  },
  title: {
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    marginBottom: 20,
  },
  placeholderText: {
    color: 'gray',
},
});

export default RequestSchedule;
