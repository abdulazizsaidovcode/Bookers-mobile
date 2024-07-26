import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView, View, StatusBar, Text, TouchableOpacity, FlatList, Linking, Alert, Image,
  Dimensions, StyleSheet, TouchableWithoutFeedback, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ClientCardDetail from '@/components/(cliendCard)/clientCardDetail';
import CenteredModal from '@/components/(modals)/modal-centered';
import Textarea from '@/components/select/textarea';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { AntDesign, FontAwesome6, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { getMasterGallery, getMasterOtzif, postComment, ServicesClient } from '@/helpers/api-function/uslugi/uslugi';
import { useMapStore } from '@/helpers/state_managment/map/map';
import { useFocusEffect, useNavigation } from 'expo-router';
import ClientCardUslugi from '@/components/(cliendCard)/clientCardUslugi';
import CustomButton from '@/components/(buttons)/custom';
import { getFile } from '@/helpers/api';
import ReviewCard from '@/components/(cliendCard)/riewCard';
import BottomModal from '@/components/(modals)/modal-bottom';
import CustomButton1 from './CustomButton';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;

const MasterInformation = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { selectedClient, services, setServices, activeTab, setActiveTab, masterGallery, feedbackForMaster } = ClientStory();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>('services');
  const { setMapData } = useMapStore();
  const navigate = useNavigation<any>();
  const [bottomModal, setBottomModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const toggleBottomModal = () => setBottomModal(!bottomModal);
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setValue('');
  };
  const closeGaleryModal = () => setSelectedImage(null);

  const handleAdd = () => {
    if (value.trim() !== '') {
      postComment({
        clientId: null,
        masterId: selectedClient.id,
        adminId: null,
        message: value,
        messageStatus: 'CLIENT_MASTER_MESSAGE'
      });
      closeModal();
      setValue('');
    }
  };

  const handleImagePress = (attachment: any) => setSelectedImage(attachment);

  const handleCategorySelect = (categoryId: string, index: number) => {
    setSelectedCategory(index);
  };

  const makePhoneCall = (number: string) => {
    const url = `tel:${number}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Your device does not support this feature');
        }
      })
      .catch((err) => console.error('Error making phone call:', err));
  };

  useEffect(() => {
    setServices([
      {
        active: services,
        attachmentId: null,
        category: { /* category data */ },
        categoryId: 'b06ef8f4-05ee-4b11-b2b8-cca43137a590',
        description: 'Dbbddk',
        genderId: [1],
        genderNames: ['MALE'],
        id: 'a44ce922-e542-4afd-8ec4-1c0b64aaaeec',
        message: null,
        name: 'Kdkd',
        paymentPercent: 0,
        paymentPrice: 0,
        price: 467697,
        serviceStatus: 'APPROVED',
        serviceTime: 90
      }
    ]);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const masterId = selectedClient.id;
      const categoryId = selectedServiceId;
      ServicesClient(masterId, categoryId);
      return () => null;
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const id = selectedClient.id;
      getMasterOtzif(id);
      return () => null;
    }, [])
  );

  useEffect(() => {
    if (selectedClient?.id) {
      getMasterGallery(selectedClient.id);
    }
  }, [selectedClient]);

  const renderItem = ({ item }) => (
    <View style={tw`mb-4`}>
      <Text style={tw`text-white`}>{item.clientName}</Text>
      <Text style={tw`text-gray-400`}>{item.text}</Text>
    </View>
  );

  const renderRows = (attachments: any[]) => {
    let filteredAttachments = attachments;

    if (filteredAttachments.length === 0) {
      filteredAttachments = attachments.slice(0, 4);
    }

    const rows: any[] = [];
    for (let i = 0; i < filteredAttachments.length; i += 4) {
      const rowItems = filteredAttachments
        .slice(i, i + 3)
        .map((attachment: any, index: number) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(attachment)}>
            <Image
              key={index}
              source={{ uri: getFile + attachment.attachmentId }}
              style={styles.image}
            />
          </TouchableOpacity>
        ));
      rows.push(
        <View style={styles.imageRow} key={i}>
          {rowItems}
        </View>
      );
    }
    return rows;
  };

  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
      <StatusBar backgroundColor="#21212E" barStyle="light-content" />
      <NavigationMenu name="Подробнее о Натали" />
      <View style={tw`flex flex-row mb-5 p-3`}>
        <CustomButton1
          borderColor='#9E9E9E'
          title="Услуги"
          onPress={() => setActiveTab('upcoming')}
          active={activeTab === 'upcoming'}
          textColor='#9E9E9E'
        />
        <CustomButton1
          title="Галерея"
          borderColor='#9E9E9E'
          onPress={() => setActiveTab('past')}
          active={activeTab === 'past'}
          textColor='#9E9E9E'
        />
        <CustomButton1
          title="Отзывы"
          borderColor='#9E9E9E'
          onPress={() => {
            setActiveTab('pastStart');
            handleClick();
          }}
          active={activeTab === 'pastStart'}
          textColor='#9E9E9E'
        />
      </View>
      {activeTab === 'upcoming' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
          <View style={tw`mb-5`}>
            <FlatList
              data={clintCardUslugiData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={tw`mb-4`}>
                  <ClientCardUslugi
                    salon={item.salon}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    zaps={item.zaps}
                    masterType={item.masterType}
                    orders={item.orders}
                    clients={item.clients}
                    address={item.address}
                    spicalist={item.spicalist}
                    feedbackCount={item.feedbackCount}
                    btntext={item.btntext}
                    services={item.services}
                    onPress={openModal}
                    onPhonePress={() => makePhoneCall(phoneNumber)}
                    locationIcon={
                      <SimpleLineIcons name="location-pin" size={24} color="white"
                        onPress={() => {
                          setMapData(selectedClient);
                          navigate.navigate('(client)/(map)/(master-locations)/master-locations');
                        }}
                      />
                    }
                    anotherIcon={
                      <FontAwesome6 name="phone" size={24} color="white" />
                    }
                    phoneIcon={
                      <Octicons name="bookmark" size={26} color="white" />
                    }
                  />
                </View>
              )}
            />
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-2xl text-white font-bold`}>Услуги {selectedClient?.name}</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 16, marginBottom: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {servicec.map((service) => (
              <View key={service.id}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleCategorySelect(service.categoryId, service.id)}
                  style={[
                    styles.categoryCard,
                    selectedCategory === service.id && styles.activeCategoryCard
                  ]}
                >
                  <Image source={{ uri: getFile + service.attachmentId }} style={styles.categoryImage} />
                  <Text style={tw`text-white text-center`}>{service.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={tw`mb-4`}>
                <ClientCardDetail
                  title={item.name}
                  text={item.description}
                  price={item.price}
                  time={item.serviceTime}
                  imageId={item.attachmentId}
                  anotherIcon={
                    <FontAwesome6 name="phone" size={24} color="white" />
                  }
                  phoneIcon={
                    <Octicons name="bookmark" size={26} color="white" />
                  }
                />
              </View>
            )}
          />
        </ScrollView>
      )}
      {activeTab === 'past' && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#21212E' }}>
          <FlatList
            data={renderRows(masterGallery)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id} onPress={() => handleImagePress(item)}>
                <Image source={{ uri: getFile + item.attachmentId }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {activeTab === 'pastStart' && (
        <ScrollView style={{ backgroundColor: '#21212E', padding: 16, flex: 1 }}>
          <FlatList
            data={feedbackForMaster}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </ScrollView>
      )}
      <CenteredModal
        isVisible={modalVisible}
        onClose={closeModal}
        onAdd={handleAdd}
        value={value}
        setValue={setValue}
        title="Сообщение"
      />
      <BottomModal
        isVisible={bottomModal}
        onClose={toggleBottomModal}
        selectedImage={selectedImage}
        onImagePress={closeGaleryModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 5,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  activeCategoryCard: {
    backgroundColor: '#555',
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});

export default MasterInformation;
