import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import Buttons from "@/components/(buttons)/button";
import { ICenteredModalProps } from "@/type/modal/modal";

const { width, height } = Dimensions.get("window");

const CenteredModal: React.FC<ICenteredModalProps> = (props) => {
  const {
    children,
    btnWhiteText,
    btnRedText,
    isFullBtn,
    isModal,
    toggleModal,
    onConfirm,
  } = props;

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="black"
        coverScreen={true}
        deviceHeight={height}
        deviceWidth={width}
        hasBackdrop={true}
        hideModalContentWhileAnimating={true}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={true}
      >
        <View style={styles.modalView}>
          {children}
          <View
            style={[
              styles.buttonContainer,
              isFullBtn ? styles.flexRow : styles.flexColumn,
            ]}
          >
            <View
              style={[
                styles.buttonWrapper,
                isFullBtn ? styles.fullWidthHalf : styles.marginVertical,
              ]}
            >
              <Buttons
                backgroundColor={"white"}
                title={btnWhiteText}
                textColor={"#9C0A35"}
                onPress={toggleModal} // vazifa bajarilishiga qarab click uchun props
              />
            </View>
            <View
              style={[
                styles.buttonWrapper,
                isFullBtn ? styles.fullWidthHalf : styles.marginVertical,
                isFullBtn && styles.marginHorizontal,
              ]}
            >
              <Buttons
                backgroundColor={"#9C0A35"}
                title={btnRedText}
                textColor={"white"}
                onPress={onConfirm} // vazifa bajarilishiga qarab click uchun props
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#21212E",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  buttonWrapper: {
    flex: 1,
  },
  fullWidthHalf: {
    width: "48%",
  },
  marginVertical: {
    marginVertical: 8,
  },
  marginHorizontal: {
    marginHorizontal: 6,
  },
});

export default CenteredModal;
