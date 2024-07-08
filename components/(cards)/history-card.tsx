import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import React from 'react'

interface ICardHistory {
    name: string;
    orderStatus?: string;
    statusName?: string
    description?: string;
    btnOrText: boolean;
}

const HistoryCard: React.FC<ICardHistory> = ({name, orderStatus, statusName, description, btnOrText}): JSX.Element => {
    const statusRegex = (statusR: string) => {
        if (statusR === 'CLIENT_CONFIRMED' || statusR === 'MASTER_CONFIRMED') return '#217355'
        else if (statusR === 'COMPLETED') return '#00A1D3'
        else if (statusR === 'CLIENT_REJECTED' || statusR === 'MASTER_REJECTED') return '#9C0A35'
        else if (statusR === 'WAIT') return '#ffe200'
        // else if (orderStatus === 'HALL') {
        //     return 'black'
        //     //     DEFAULT,
        //     //     WAIT,
        //     //     CLIENT_CONFIRMED,
        //     //     MASTER_CONFIRMED,
        //     //     CLIENT_REJECTED,
        //     //     MASTER_REJECTED
        //     // if (statusHall === 'DEFAULT') {}
        // }
    }
    return (
        <View style={styles.cardMain}>
            <View>
                <Text style={[styles.cardName, styles.cardText]}>{name}</Text>
                {description && <Text style={styles.cardDescription}>{description}</Text>}
            </View>
            <View>
                {btnOrText
                    ? <Text style={[styles.cardText, {color: '#9C0A35'}]}>{statusName}</Text>
                    : statusName && (
                    <TouchableOpacity
                        style={[styles.btn, {
                            borderColor: orderStatus ? statusRegex(orderStatus) : '#9C0A35'
                        }]}
                        activeOpacity={.8}
                    >
                        <Text style={[{fontSize: 13, color: orderStatus ? statusRegex(orderStatus) : '#9C0A35'}]}>
                            {statusName}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardName: {
        color: '#000000',
    },
    cardDescription: {
        color: '#000000',
        fontSize: 15,
        opacity: .5,
        marginTop: 5
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
    }
})

export default HistoryCard