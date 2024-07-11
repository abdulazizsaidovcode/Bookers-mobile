import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HallCard from '@/components/(cards)/hall';
import { ClientStatus } from '@/type/client/client';


interface HallAccordionProps {
  items: OrderItem[];
  onActionSuccess: () => void;
  onShowModal: () => void;
}

type ClientStatusItem = string[]

 interface OrderItem {
  categoryName: string;
  clientAttachmentId: string;
  clientName: string;
  clientStatus: string[];
  hallStatus: string; // Assuming hallStatus is provided in the API response
  orderDate: string;
  time: string;
  id: string;
  paid: number;
  request: string;
  fullName: string;
  serviceName: string;
  startTime: string;
  finishTime: string;
}
const HallAccordion: React.FC<HallAccordionProps> = ({ items, onActionSuccess, onShowModal }) => {
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
          <HallCard
            key={request.id}
            fullName={request.fullName}
            serviceName={request.serviceName}
            hallStatus={request.hallStatus} // Assuming hallStatus is provided in the API response
            clientAttachmentId={request.clientAttachmentId}
            clientStatus={request.clientStatus}
            time={extractTimeRange(request.orderDate)}
            startTime={request.startTime.slice(0,5)} // Extracting just the date part for simplicity
            finishTime={request.finishTime.slice(0,5)} // Extracting the time range
            orderId={request.id} // Pass the orderId
            onApprove={() => handleApprove(index)}
            onReject={() => handleReject(index)}
          />
        ))
      ) : (
        <Text style={styles.noRequestsText}>Нет свободных залов</Text>
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

export default HallAccordion;
