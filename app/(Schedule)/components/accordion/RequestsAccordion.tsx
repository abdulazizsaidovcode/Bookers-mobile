import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import RequestCard from '../RequestCard';

const requests = [
  {
    name: 'Мелисара',
    service: 'Стрижка, укладка, милирование',
    date: '08:00',
    time: '09:30',
  },
  {
    name: 'Мелисара',
    service: 'Стрижка, укладка, милирование',
    date: '08:00',
    time: '09:30',
  },
];

const RequestsAccordion: React.FC = () => {
  const handleApprove = (index: number) => {
    console.log(`Approved request ${index}`);
  };

  const handleReject = (index: number) => {
    console.log(`Rejected request ${index}`);
  };

  return (
    <List.Accordion
      title="Запросы клиентов на бронь"
      titleStyle={styles.title}
      style={styles.accordionContainer}
      theme={{colors: { background: 'transParent' } }}
    >
      <View style={styles.accordionContent}>
        {/* <Text style={styles.headerText}>Чт, Сегодня</Text> */}
        {requests.map((request, index) => (
          <RequestCard
            key={index}
            name={request.name}
            service={request.service}
            date={request.date}
            time={request.time}
            onApprove={() => handleApprove(index)}
            onReject={() => handleReject(index)}
          />
        ))}
      </View>
    </List.Accordion>
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
  accordionContent: {
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RequestsAccordion;
