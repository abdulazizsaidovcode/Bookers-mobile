import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RequestCard from '@/components/(cards)/requestcard';
import { OrderItem } from '../../availebleschedule';

interface RequestsAccordionProps {
  items: OrderItem[];
  onActionSuccess: () => void;
  onShowModal: () => void;
}

const RequestsAccordion: React.FC<RequestsAccordionProps> = ({ items, onActionSuccess, onShowModal }) => {
  const handleApprove = (index: number) => {
    console.log(`Approved request ${index}`);
    onActionSuccess();
    onShowModal();
  };

  const handleReject = (index: number) => {
    console.log(`Rejected request ${index}`);
    onActionSuccess();
    onShowModal();
  };

  const extractTimeRange = (orderDate: string) => {
    const timeRangeMatch = orderDate.match(/\d{2}:\d{2} - \d{2}:\d{2}/);
    return timeRangeMatch ? timeRangeMatch[0] : '';
  };

  return (
    <View>
      {items.length > 0 ? (
        items.map((request, index) => (
          <RequestCard
            key={request.orderId}
            name={request.clientName}
            service={request.categoryName}
            clientAttachmentId={request.clientAttachmentId}
            date={request.orderDate.split(' ')[0]} // Extracting just the date part for simplicity
            time={extractTimeRange(request.orderDate)} // Extracting the time range
            orderId={request.orderId} // Pass the orderId
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
