import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import {IBottomModalProps} from "@/type/modal/modal";

const { width, height } = Dimensions.get('window');

const BottomModal: React.FC<IBottomModalProps> = ({ children, isBottomModal, toggleBottomModal }) => {
    return (
        <View style={styles.container}>
            <Modal
                isVisible={isBottomModal}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropColor="black"
                coverScreen={true}
                deviceHeight={height}
                deviceWidth={width}
                hasBackdrop={true}
                hideModalContentWhileAnimating={true}
                onBackdropPress={toggleBottomModal}
                onBackButtonPress={toggleBottomModal}
                useNativeDriver={true}
                style={styles.bottomModal}>
                <View style={styles.modalView}>
                    {children}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#21212E',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});

export default BottomModal;
