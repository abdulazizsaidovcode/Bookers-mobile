import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import Buttons from '@/components/(buttons)/button';
import AccordionFree from '@/components/accordions/accardionFree';
import AccardionSlider from '@/components/accordions/accardionSlider';
import AccardionSliderTwo from '@/components/accordions/accardionSliderTwo';
import NavigationMenu from '@/components/navigation/navigation-menu';
import { postClientFilter } from '@/helpers/api-function/uslugi/uslugi';
import { useAccardionStore } from '@/helpers/state_managment/accardion/accardionStore';
import { useCommunitySlider } from '@/helpers/state_managment/communitySlider/communitySliderStore';
import useGetMeeStore from '@/helpers/state_managment/getMee';
import ClientStory from '@/helpers/state_managment/uslugi/uslugiStore';
import { useFocusEffect } from '@react-navigation/native';
import debounce from "lodash.debounce";
import useTopMastersStore from '@/helpers/state_managment/masters';

const Hair = () => {
    const router = useRouter();
    const { isSelected } = useAccardionStore();
    const { selectedServiceId } = ClientStory();
    const { genderIndex } = useAccardionStore();
    const { rating, value } = useCommunitySlider();
    const { userLocation } = useGetMeeStore();
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const {isLoading } = useTopMastersStore();

    useEffect(() => {
        postClientFilter(page);
      }, [page]);
    
      const loadMore = useCallback(
        debounce(() => {
          if (!loadingMore && !isLoading) {
            setLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
          }
        }, 200),
        [loadingMore, isLoading]
      );
    
      useFocusEffect(
        useCallback(() => {
          return () => loadMore.cancel();
        }, [loadMore])
      );

    useFocusEffect(
        useCallback(() => {
            const selected = selectedServiceId;
            const latitude = userLocation?.coords?.latitude || null;
            const longitude = userLocation?.coords?.longitude || null;
            postClientFilter(
                selected ? [selected] : [],
                genderIndex,
                value * 1000,
                rating,
                latitude,
                longitude,
                "",
                ()=>{},
                page,
                
            );
            return () => {};
        }, [selectedServiceId, genderIndex, value, rating, userLocation,page])
    );

    const handleButtonPress = () => {
        const latitude = userLocation?.coords?.latitude || null;
        const longitude = userLocation?.coords?.longitude || null;
        postClientFilter(
            selectedServiceId ? [selectedServiceId] : [], // Wrap in an array if `postClientFilter` expects an array
            genderIndex,
            value * 1000,
            rating,
            latitude,
            longitude,
            "",
            ()=>{},
            page,
        );
        router.push('(client)/(uslugi)/(specialist)/specialist');
    };

    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
            <StatusBar backgroundColor="#21212E" barStyle="light-content" />
            <NavigationMenu name={`Здоровье и красота волос`} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, flexGrow: 1, justifyContent: 'space-between', backgroundColor: '#21212E' }}>
                <View style={[tw`flex-1`, { backgroundColor: '#21212E' }]}>
                    <Text style={[tw`text-gray-400 text-lg`, { marginBottom: 16 }]}>Подберите критерии услуг</Text>
                    <AccordionFree title='Пол мастера' />
                    <AccardionSlider title='Рядом со мной' />
                    <AccardionSliderTwo title='Рейтинг' />
                </View>
                <View style={tw`content-end mb-5`}>
                    <View style={tw`mt-2 content-end`}>
                        <Buttons
                            title="Подобрать мастера"
                            onPress={handleButtonPress}
                            isDisebled={!isSelected} // Note: Ensure `isDisebled` is correctly spelled as `isDisabled` in the actual component
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Hair;
