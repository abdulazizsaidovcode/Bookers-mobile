import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RequestCard from '@/components/(cards)/requestcard';
import { OrderItem } from '../../availebleschedule';

interface RequestsAccordionProps {
  item: OrderItem[];
}

const RequestsAccordion: React.FC<RequestsAccordionProps> = ({ items = [] }) => {
  const handleApprove = (index: number) => {
    console.log(`Approved request ${index}`);
  };

  const handleReject = (index: number) => {
    console.log(`Rejected request ${index}`);
  };

  return (
    <View>
      {items.length > 0 ? (
        items.map((request: any, index: any) => (
          <RequestCard
            key={index}
            name={request.clientName}
            service={request.categoryName}
            date={request.orderDate}
            time={`${request.orderDate.split(' ')[1]}`} // Assuming `orderDate` is in "Today 12:00 - 13:10" format
            onApprove={() => handleApprove(index)}
            onReject={() => handleReject(index)}
          />
        ))
      ) : (
        <Text style={styles.noRequestsText}>No requests available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  noRequestsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default RequestsAccordion;
