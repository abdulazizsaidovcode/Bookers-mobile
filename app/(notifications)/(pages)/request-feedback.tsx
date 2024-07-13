import Buttons from '@/components/(buttons)/button';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { editFeedbeckOrder, fetchAllData } from '@/helpers/api-function/notifications/notifications';
import useNotificationsStore from '@/helpers/state_managment/notifications/notifications';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RequestFeedback = () => {
  const { feedbackData, setFeedbackData } = useNotificationsStore();
  const [hasChanges, setHasChanges] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllData(setFeedbackData, 'FEEDBACK');
  }, []);

  const onMessageChange = (text: string) => {
    setFeedbackData({ ...feedbackData, text });
    setHasChanges(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navigationMenu}>
          <NavigationMenu name='Напоминание о отзыве' />
        </View>
        <View style={styles.content}>
          <Text style={{ color: 'white', fontSize: 20 }}>Уведомление с просьбой оставить отзыв о мастере и об оказанных услугах</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Шаблон сообщения</Text>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={10}
              onChangeText={onMessageChange}
              defaultValue={feedbackData.text}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title="Сохранить"
            onPress={() => editFeedbeckOrder(feedbackData.text, setHasChanges, navigation.goBack())}
            isDisebled={hasChanges}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21212E',
  },
  navigationMenu: {
    padding: 16,
  },
  navigationTitle: {
    color: '#fff',
    fontSize: 18,
  },
  content: {
    padding: 16,
    height: screenHeight / 1.35,
  },
  messageContainer: {
    backgroundColor: '#B9B9C9',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  messageLabel: {
    color: '#000',
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: '#3a3a4e',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    height: 'auto',
    maxHeight: screenHeight / 3,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    padding: 10,
  },
});
