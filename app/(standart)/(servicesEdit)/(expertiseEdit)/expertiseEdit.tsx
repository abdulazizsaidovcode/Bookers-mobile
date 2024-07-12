import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import NavigationMenu from '@/components/navigation/navigation-menu';
import ServicesCategory from '@/components/services/servicesCatgegory';
import Buttons from '@/components/(buttons)/button';
import CenteredModal from '@/components/(modals)/modal-centered';
import { router } from 'expo-router';
import servicesStore from '@/helpers/state_managment/services/servicesStore';
import axios from 'axios';
import { category_child, getSpecialization, master_add_specialization, masterAdd_category } from '@/helpers/api';
import { useRoute } from '@react-navigation/native';
import Textarea from '@/components/select/textarea';
import { getConfig } from '@/app/(tabs)/main';


const ExpertiseEdit: React.FC = () => {
    const route = useRoute();
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const { childCategoryData, categoryFatherId, setChildCategoryData , selectedCategoryId} = servicesStore();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const [validate, setValidate] = useState(false);
    const [specialization, setSpecialization] = useState([]);
    const { id } = route.params as { id: string };

    useEffect(() => {
        if (categoryFatherId && categoryFatherId.key) {
            postCategory(categoryFatherId.key, '');
        }
    }, []);

    useEffect(() => {
        if (value.trim() === "") {
            setValidate(false);
        } else {
            setValidate(true);
        }
    }, [value]);

    const getChildCategory = async (id: string) => {
        try {
            const config = await getConfig()
            const response = await axios.get(`${category_child}${selectedCategoryId}`, config);
            if (response.data.success) {
                const child =
                    response.data.body &&
                    response.data.body.map((item: any) => ({
                        key: item.id,
                        name: item.name,
                    }));
                setChildCategoryData(child);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    useEffect(() => {
        getChildCategory(selectedCategoryId);
    }, [selectedCategoryId]);

    // const getSpecializationData = async (categoryId: string) => {
    //     try {
    //         const response = await axios.get(`${getSpecialization}?categoryId=${categoryId}`, config);
    //         console.log("Fetched specialization data:", response.data.body);
    //         setSpecialization(response.data.body);
    //     } catch (error) {
    //         console.error("Error fetching specializations:", error);
    //     }
    // };
    
    const postCategory = async (id: string, name: string) => {
        try {
            const config = await getConfig()
            const response = await axios.post(`${masterAdd_category}/${selectedCategoryId}?name=${name}`, {}, config);
            if (response.data.success) {
                setChildCategoryData([...childCategoryData, { id, name }]);
                getChildCategory(id);
            } else {
                setChildCategoryData([]);
            }
        } catch (error) {
            console.error("Error fetching child categories:", error);
        }
    };

    const postService = async (id: string) =>{
        try{
            const config = await getConfig()
            const response = await axios.post (`${master_add_specialization}/${id}`, config);
            console.log(response);    
        }
        catch(error){
            console.log("Error", error);}
        };
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleAdd = () => {
        if (value.trim() !== "") {
            postCategory(id, value);
            closeModal();
            setValue("");
        }
    };

    const handleCategorySelect = (id: number) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((categoryId) => categoryId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const renderItem = ({ item }: { item: any }) => {
        // const isSelected = selectedServices.find((service: any) => service.name === item.name);
        return (
            <TouchableOpacity onPress={() =>handleCategorySelect(item.id)}>
                <ServicesCategory
                    title={item.name}
                    // style={{ backgroundColor: isSelected ? 'gray' : 'transparent' }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor={`#21212E`} barStyle={`light-content`} />
            <NavigationMenu name="Специализация" />
            <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                    <View style={tw`w-full`}>
                        <FlatList
                            data={childCategoryData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    <View style={tw`content-end mb-3`}>
                        <Buttons title="Другое" backgroundColor="white" textColor="red" onPress={openModal} />
                        <View style={tw`mt-2 content-end`}>
                            <Buttons
                                title="Сохранить"
                                onPress={() =>router.push('../test')}
                                // isDisebled={selectedServices.length !== 0}
                            />
                        </View>
                        <CenteredModal
                            isModal={modalVisible}
                            btnWhiteText='Добавить'
                            btnRedText='Закрыть '
                            isFullBtn={false}
                            toggleModal={closeModal}
                            onConfirm={handleAdd}>
                            <View style={tw`p-4 text-center`}>
                                <Text style={tw`text-white text-xl mb-2 w-full`}>Добавьте свою специализацию</Text>
                                <Textarea
                                    placeholder=''
                                    onChangeText={(text) => setValue(text)}
                                    value={value} />
                            </View>
                        </CenteredModal>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExpertiseEdit;
