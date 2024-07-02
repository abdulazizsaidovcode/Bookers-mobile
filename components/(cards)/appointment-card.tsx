import {StyleSheet, View, Text, ScrollView} from 'react-native';
import tw from "tailwind-react-native-classnames";
import IconsButtons from "@/components/(buttons)/icon-btn";
import {HistorySessions} from "@/type/client/client";
import moment from "moment";

const AppointmentCard = ({clicks, serviceName, isBtn, data}: {
    clicks?: () => void,
    serviceName: string[],
    isBtn?: boolean,
    data: HistorySessions
}) => {
    console.log('data: ', data)
    return (
        <View
            style={[styles.container]}
        >
            <Text style={styles.date}>
                {moment(data.orderDate).format('dddd, DD MMMM')} {isBtn && `- ${data.startTime.slice(0, 5)}`}
            </Text>
            <View style={styles.options}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {serviceName.length > 0 && serviceName.map(item =>
                        <Text style={[styles.option, {borderWidth: 1}]}>{item}</Text>
                    )}
                </ScrollView>
            </View>
            <Text style={styles.price}>{data.servicePrice} сум</Text>
            {isBtn && (
                <View style={[tw`flex-row items-center justify-between`]}>
                    <IconsButtons
                        name={`Принять`}
                        width={`47%`}
                    />
                    <IconsButtons
                        name={`Отклонить`}
                        color={`#9C0A35`}
                        bg_color={`white`}
                        width={`47%`}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
        padding: 20,
    },
    date: {
        fontSize: 18,
        marginBottom: 14,
        fontWeight: 'bold',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 14
    },
    option: {
        backgroundColor: '#B9B9C9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 16,
        borderColor: '#4B4B64',
        color: '#4B4B64'
    },
    price: {
        fontSize: 20,
        color: '#9C0A35',
        marginBottom: 10,
        fontWeight: 'bold'
    },
});

export default AppointmentCard;
