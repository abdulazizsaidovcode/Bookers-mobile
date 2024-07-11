import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { masterOrderHallStore } from '@/helpers/state_managment/order/order';
import { getMasterOrderHall } from '@/helpers/api-function/oreder/oreder';
import { List } from 'react-native-paper';
import CenteredModal from '@/components/(modals)/modal-centered';
import HallAccordion from './components/accordion/hallAccordion copy';

type ClientStatus = "REGULAR_VISIT" | string;

export interface OrderItem {
    categoryName: string;
    clientAttachmentId: string;
    clientName: string;
    clientStatus: string[];
    hallStatus: string;
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

interface GroupedOrders {
    [date: string]: OrderItem[];
}

const groupByDate = (data: OrderItem[]): GroupedOrders => {
    if (!data) return {};
    return data.reduce((acc, item) => {
        const datePart = item.orderDate; // No need to split, just use the orderDate as is
        (acc[datePart] = acc[datePart] || []).push(item);
        return acc;
    }, {} as GroupedOrders);
};

const HallSchedule: React.FC = () => {
    const { hallData, setHallData } = masterOrderHallStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const fetchData = async () => {
        try {
            const data = await getMasterOrderHall(setHallData);
            setHallData(data);
        } catch (error) {
            console.error('Error fetching hall data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [setHallData]);

    const groupedData = groupByDate(hallData);

    return (
        <View>
            {hallData && hallData.length > 0 ? Object.keys(groupedData).map((date) => (
                <List.Accordion
                    key={date}
                    title={date}
                    titleStyle={styles.title}
                    style={styles.accordionContainer}
                    theme={{ colors: { background: 'transparent' } }}
                >
                    <HallAccordion items={groupedData[date]} onActionSuccess={fetchData} onShowModal={toggleModal} />
                </List.Accordion>
            )) :
                <View>
                    <Text style={styles.placeholderText}>нет запросов</Text>
                </View>
            }
            <CenteredModal
                isModal={isModalVisible}
                toggleModal={toggleModal}
                btnWhiteText="Close"
                btnRedText="Confirm"
                isFullBtn={false}
                onConfirm={toggleModal}
                oneBtn
            >
                <Text style={styles.buttonText}>Muvoffaqiyatli amalga oshirildi !</Text>
            </CenteredModal>
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
    buttonText: {
        color: '#fff',
        marginBottom: 20,
    },
    placeholderText: {
        color: 'gray',
    },
});

export default HallSchedule;
