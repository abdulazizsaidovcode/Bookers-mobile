import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { masterOrderHWaitStore } from '@/helpers/state_managment/order/order';
import { getMasterOrderWait } from '@/helpers/api-function/oreder/oreder';
import RequestsAccordion from './components/accordion/RequestsAccordion';
import { List } from 'react-native-paper';

type ClientStatus = "REGULAR_VISIT" | string;

export interface OrderItem {
  categoryName: string;
  clientAttachmentId: string;
  clientName: string;
  clientStatus: ClientStatus[];
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
    (acc[item.orderDate] = acc[item.orderDate] || []).push(item);
    return acc;
  }, {} as GroupedOrders);
};

const RequestSchedule: React.FC = () => {
  const { waitData, setWaitData } = masterOrderHWaitStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMasterOrderWait(setWaitData);
        setWaitData(data);
      } catch (error) {
        console.error('Error fetching wait data:', error);
      }
    };
    fetchData();
    console.log(waitData);
    
  }, [setWaitData]);

  const groupedData = groupByDate(waitData);

  return (
    <View>
      {Object.keys(groupedData).map((date) => (
        <List.Accordion
          key={date}
          title={`${date}`}
          titleStyle={styles.title}
          style={styles.accordionContainer}
          theme={{ colors: { background: 'transparent' } }}
        >
          <RequestsAccordion items={groupedData[date]} />
        </List.Accordion>
      ))}
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
});

export default RequestSchedule;
