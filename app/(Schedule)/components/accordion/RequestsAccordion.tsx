import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RequestCard from '@/components/(cards)/requestcard';
import { OrderItem } from '../../availebleschedule';

interface RequestsAccordionProps {
  items: OrderItem[];
}

const RequestsAccordion: React.FC<RequestsAccordionProps> = ({ items }) => {
  const handleApprove = (index: number) => {
    console.log(`Approved request ${index}`);
  };

  const handleReject = (index: number) => {
    console.log(`Rejected request ${index}`);
  };

  const extractTimeRange = (orderDate: string) => {
    const timeRangeMatch = orderDate.match(/\d{2}:\d{2} - \d{2}:\d{2}/);
    return timeRangeMatch ? timeRangeMatch[0] : '';
  };

  return (
    <View style={styles.accordionContent}>
      {items.length > 0 ? (
        items.map((request, index) => (
          <RequestCard
            key={request.orderId}
            name={request.clientName}
            service={request.categoryName}
            clientAttachmentId={request.clientAttachmentId}
            date={request.orderDate.split(' ')[0]} // Extracting just the date part for simplicity
            time={extractTimeRange(request.orderDate)} // Extracting the time range
            orderId={request.orderId}
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
  accordionContent: {
    padding: 10,
  },
  noRequestsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default RequestsAccordion;
